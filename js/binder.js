import { loadSheets } from "./core/sheetLoader.js";

import { buildCatalog } from "./engines/masterCatalogEngine.js";

import { buildListingMap } from "./engines/listingPresenceEngine.js";

import { computeSkuStatus } from "./engines/skuStatusEngine.js";

import { computeStyleCoverage } from "./engines/styleCoverageEngine.js";

import { buildIndexes } from "./engines/indexEngine.js";

import { getMarketplaceCoverage } from "./engines/marketplaceCoverageEngine.js";

import { getMissingSizes } from "./engines/missingSizeEngine.js";

import { getCriticalSkus } from "./engines/criticalSkuEngine.js";

import { renderSummary } from "./renderers/summaryRenderer.js";

import { renderTable } from "./renderers/tableRenderer.js";

import { initTabs } from "./renderers/tabRenderer.js";

import { startProgress, updateProgress, finishProgress } from "./engines/progressEngine.js";


let DATA = {};


async function init(){

const sheets = await loadSheets();

const catalog = buildCatalog(sheets);

const listings = buildListingMap(sheets);

const skuStatus = computeSkuStatus(catalog,listings);

const indexes = buildIndexes(

catalog,
listings,
sheets.size_count

);

const styleCoverage = computeStyleCoverage(

indexes.styleSkuIndex,
skuStatus

);

const mpCoverage = getMarketplaceCoverage(

indexes.mpSkuIndex,
catalog

);

const missing = getMissingSizes(catalog,listings);

const critical = getCriticalSkus(skuStatus);


DATA = {

catalog,
listings,
skuStatus,
styleCoverage,
mpCoverage,
missing,
critical,
indexes

};


renderSummary(styleCoverage);


renderTable(

"app",

["styleid","live","total"],

styleCoverage

);


initTabs(renderTab);

}


function renderTab(tab){

if(tab==="summary"){

renderTable(

"app",

["styleid","live","total"],

DATA.styleCoverage

);

}

if(tab==="partial"){

renderTable(

"app",

["styleid","size","stock"],

DATA.missing

);

}

if(tab==="critical"){

renderTable(

"app",

["uniware_sku","styleid","stock"],

DATA.critical

);

}

if(tab==="live"){

const live = DATA.skuStatus.filter(r=>r.status==="LIVE");

renderTable(

"app",

["uniware_sku","styleid","stock"],

live

);

}

if(tab==="nonlive"){

const nonlive = DATA.skuStatus.filter(r=>r.status==="NON_LIVE");

renderTable(

"app",

["uniware_sku","styleid","stock"],

nonlive

);

}

}


init();

startProgress()

updateProgress(20)
loadSheets()

updateProgress(40)
buildCatalog()

updateProgress(60)
buildIndexes()

updateProgress(80)
computeStyleCoverage()

updateProgress(100)
finishProgress()
