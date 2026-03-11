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

startProgress();

updateProgress(10);

const sheets = await loadSheets();

updateProgress(25);

const catalog = buildCatalog(sheets);

updateProgress(40);

const listings = buildListingMap(sheets);

updateProgress(55);

const skuStatus = computeSkuStatus(catalog,listings);

updateProgress(65);

const indexes = buildIndexes(
catalog,
listings,
sheets.size_count
);

updateProgress(75);

const styleCoverage = computeStyleCoverage(
indexes.styleSkuIndex,
skuStatus
);

updateProgress(85);

const mpCoverage = getMarketplaceCoverage(
indexes.mpSkuIndex,
catalog
);

updateProgress(90);

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
["styleid","live","total","category","parent_remark"],
styleCoverage
);

initTabs(renderTab);

updateProgress(100);

finishProgress();

}


function renderTab(tab){

if(tab==="summary"){

renderTable(
"app",
["styleid","live","total","category","parent_remark"],
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
