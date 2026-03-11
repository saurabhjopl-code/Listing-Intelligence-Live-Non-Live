import { loadSheets } from "./core/sheetLoader.js";
import { applySearch, applySearchDebounced } from "./core/searchEngine.js";

import { buildCatalog } from "./engines/masterCatalogEngine.js";
import { buildListingMap } from "./engines/listingPresenceEngine.js";
import { computeSkuStatus } from "./engines/skuStatusEngine.js";
import { computeStyleCoverage } from "./engines/styleCoverageEngine.js";

import { renderSummary } from "./renderers/summaryRenderer.js";
import { renderTable } from "./renderers/tableRenderer.js";
import { renderFilters } from "./renderers/filterRenderer.js";
import { initTabs } from "./renderers/tabRenderer.js";

import { startProgress, updateProgress, finishProgress } from "./engines/progressEngine.js";

let DATA = {};
let CURRENT_TAB = "summary";

async function init(){

startProgress();

updateProgress(15);

const sheets = await loadSheets();

updateProgress(35);

const catalog = buildCatalog(sheets);

updateProgress(50);

const listings = buildListingMap(sheets);

updateProgress(65);

const skuStatus = computeSkuStatus(catalog,listings);

updateProgress(80);

DATA = {
catalog,
listings,
skuStatus
};

renderFilters(DATA,applyAll);

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
box.value="";
applyAll();
};

}



function applyAll(){

const mp = document.getElementById("mpFilter")?.value;
const acc = document.getElementById("accFilter")?.value;
const cat = document.getElementById("catFilter")?.value;
const term = document.getElementById("searchBox")?.value;

let data = DATA.skuStatus.map(sku=>{

const catalog = DATA.catalog.find(c=>c.uniware_sku===sku.uniware_sku) || {};
const listing = DATA.listings.find(l=>l.uniware_sku===sku.uniware_sku) || {};

return {
...sku,
category:catalog.category,
styleid:catalog.styleid,
parent_remark:catalog.parent_remark,
mp:listing.mp,
account:listing.account
};

});



if(mp) data = data.filter(r=>r.mp===mp);

if(acc) data = data.filter(r=>r.account===acc);

if(cat) data = data.filter(r=>r.category===cat);

data = applySearch(data,term);



if(CURRENT_TAB==="summary"){

const summary = computeStyleCoverage(data);

renderSummary(summary);

renderTable(
"app",
["styleid","live","total","category","parent_remark"],
summary
);

}



if(CURRENT_TAB==="live"){

const live = data.filter(r=>r.status==="LIVE");

renderTable(
"app",
["uniware_sku","styleid","stock","status","mp","account"],
live
);

}



if(CURRENT_TAB==="nonlive"){

const nonlive = data.filter(r=>r.status==="NON_LIVE");

renderTable(
"app",
["uniware_sku","styleid","stock","status","mp","account"],
nonlive
);

}

}
init();
