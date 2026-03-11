import { loadSheets } from "./core/sheetLoader.js";
import { applyFilters } from "./core/filterEngine.js";
import { applySearch } from "./core/searchEngine.js";

import { buildCatalog } from "./engines/masterCatalogEngine.js";
import { buildListingMap } from "./engines/listingPresenceEngine.js";
import { computeSkuStatus } from "./engines/skuStatusEngine.js";
import { computeStyleCoverage } from "./engines/styleCoverageEngine.js";
import { buildIndexes } from "./engines/indexEngine.js";

import { getMissingSizes } from "./engines/missingSizeEngine.js";
import { getCriticalSkus } from "./engines/criticalSkuEngine.js";

import { renderSummary } from "./renderers/summaryRenderer.js";
import { renderTable } from "./renderers/tableRenderer.js";
import { renderFilters } from "./renderers/filterRenderer.js";
import { initTabs } from "./renderers/tabRenderer.js";

import { startProgress, updateProgress, finishProgress } from "./engines/progressEngine.js";


let DATA = {};
let CURRENT_TAB = "summary";

async function init(){

startProgress();

const sheets = await loadSheets();

updateProgress(30);

const catalog = buildCatalog(sheets);
const listings = buildListingMap(sheets);

const skuStatus = computeSkuStatus(catalog,listings);

const indexes = buildIndexes(catalog,listings,sheets.size_count);

const styleCoverage = computeStyleCoverage(
indexes.styleSkuIndex,
skuStatus,
catalog
);

const missing = getMissingSizes(catalog,listings);
const critical = getCriticalSkus(skuStatus);

DATA = {
catalog,
listings,
skuStatus,
styleCoverage,
missing,
critical
};

renderSummary(styleCoverage);

renderFilters(DATA,applyAll);

initTabs(tab=>{
CURRENT_TAB = tab;
applyAll();
});

setupSearch();

applyAll();

finishProgress();

}


function setupSearch(){

const box = document.getElementById("searchBox");
const clear = document.getElementById("clearSearch");

box.oninput = applyAll;

clear.onclick = ()=>{
box.value="";
applyAll();
};

}


function applyAll(){

const mp = document.getElementById("mpFilter")?.value;
const cat = document.getElementById("catFilter")?.value;

const term = document.getElementById("searchBox")?.value;

let data = DATA.styleCoverage;

data = applyFilters(data,{mp,category:cat});

data = applySearch(data,term);

renderTable(
"app",
["styleid","live","total","category","parent_remark"],
data
);

}


init();
