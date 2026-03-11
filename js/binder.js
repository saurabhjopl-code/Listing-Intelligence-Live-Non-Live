import { loadSheets } from "./core/sheetLoader.js";
import { applyFilters } from "./core/filterEngine.js";
import { applySearchDebounced } from "./core/searchEngine.js";

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

let DATA={};
let CURRENT_TAB="summary";

async function init(){

startProgress();

updateProgress(20);

const sheets=await loadSheets();

updateProgress(40);

const catalog=buildCatalog(sheets);
const listings=buildListingMap(sheets);

updateProgress(60);

const skuStatus=computeSkuStatus(catalog,listings);

const indexes=buildIndexes(catalog,listings,sheets.size_count);

updateProgress(80);

const styleCoverage=computeStyleCoverage(
indexes.styleSkuIndex,
skuStatus,
catalog
);

const missing=getMissingSizes(catalog,listings);
const critical=getCriticalSkus(skuStatus);

DATA={
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
CURRENT_TAB=tab;
applyAll();
});

setupSearch();

applyAll();

updateProgress(100);

finishProgress();

}

function setupSearch(){

const box=document.getElementById("searchBox");
const clear=document.getElementById("clearSearch");

box.oninput=()=>{
applySearchDebounced(applyAll);
};

clear.onclick=()=>{
box.value="";
applyAll();
};

}

function applyAll(){

const mp=document.getElementById("mpFilter")?.value;
const acc=document.getElementById("accFilter")?.value;
const cat=document.getElementById("catFilter")?.value;

const term=document.getElementById("searchBox")?.value?.toLowerCase();

let data;

if(CURRENT_TAB==="summary") data=DATA.styleCoverage;
if(CURRENT_TAB==="live") data=DATA.skuStatus.filter(r=>r.status==="LIVE");
if(CURRENT_TAB==="partial") data=DATA.missing;
if(CURRENT_TAB==="nonlive") data=DATA.skuStatus.filter(r=>r.status==="NON_LIVE");
if(CURRENT_TAB==="critical") data=DATA.critical;

// data=applyFilters(data,{mp,acc,category:cat});

if(term){
data=data.filter(r=>
JSON.stringify(r).toLowerCase().includes(term)
);
}

renderTable(
"app",
Object.keys(data[0]||{}),
data
);

}

init();
