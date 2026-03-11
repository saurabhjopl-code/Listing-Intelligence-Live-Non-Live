import { loadSheets } from "./core/sheetLoader.js";
import { applySearch, applySearchDebounced } from "./core/searchEngine.js";
import { applyFilters } from "./core/filterEngine.js";

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

updateProgress(20);

const sheets = await loadSheets();

updateProgress(40);

const catalog = buildCatalog(sheets);
const listings = buildListingMap(sheets);

updateProgress(60);

const skuStatus = computeSkuStatus(catalog,listings);

const indexes = buildIndexes(catalog,listings,sheets.size_count);

updateProgress(80);

DATA = {
catalog,
listings,
skuStatus,
indexes
};

renderFilters(DATA, applyAll);

initTabs(tab=>{
CURRENT_TAB = tab;
applyAll();
});

setupSearch();

applyAll();

updateProgress(100);

finishProgress();

}



function setupSearch(){

const box = document.getElementById("searchBox");
const clear = document.getElementById("clearSearch");

box.oninput = ()=>{
applySearchDebounced(applyAll);
};

clear.onclick = ()=>{
box.value = "";
applyAll();
};

}



function applyAll(){

const mp = document.getElementById("mpFilter")?.value;
const acc = document.getElementById("accFilter")?.value;
const cat = document.getElementById("catFilter")?.value;
const term = document.getElementById("searchBox")?.value;

let data = [...DATA.skuStatus];

data = applyFilters(data,{
mp,
acc,
category:cat
});

data = applySearch(data,term);


let tableData = [];


if(CURRENT_TAB === "summary"){

tableData = computeStyleCoverage(
DATA.indexes.styleSkuIndex,
data,
DATA.catalog
);

renderSummary(tableData);

renderTable(
"app",
["styleid","live","total","category","parent_remark"],
tableData
);

}


if(CURRENT_TAB === "live"){

tableData = data.filter(r=>r.status==="LIVE");

renderTable(
"app",
["uniware_sku","styleid","stock","status"],
tableData
);

}


if(CURRENT_TAB === "partial"){

tableData = getMissingSizes(DATA.catalog, DATA.listings);

renderTable(
"app",
["uniware_sku","styleid","stock"],
tableData
);

}


if(CURRENT_TAB === "nonlive"){

tableData = data.filter(r=>r.status==="NON_LIVE");

renderTable(
"app",
["uniware_sku","styleid","stock","status"],
tableData
);

}


if(CURRENT_TAB === "critical"){

tableData = getCriticalSkus(data);

renderTable(
"app",
["uniware_sku","styleid","stock","status"],
tableData
);

}

}


init();
