import { loadSheets } from "./core/sheetLoader.js";

import { buildCatalog } from "./engines/masterCatalogEngine.js";

import { buildListingMap } from "./engines/listingPresenceEngine.js";

import { computeSkuStatus } from "./engines/skuStatusEngine.js";

import { computeStyleCoverage } from "./engines/styleCoverageEngine.js";

import { buildStyleMpIndex } from "./engines/styleMpIndexEngine.js";

import { getPartialStyles } from "./engines/missingSizeEngine.js";

import { getCriticalSkus } from "./engines/criticalSkuEngine.js";

import { renderSummary } from "./renderers/summaryRenderer.js";


async function init(){

const sheets = await loadSheets();

const catalog = buildCatalog(sheets);

const listings = buildListingMap(sheets);

const skuStatus = computeSkuStatus(catalog,listings);

const styleCoverage = computeStyleCoverage(skuStatus);

const styleMpIndex = buildStyleMpIndex(catalog,listings);

const partialStyles = getPartialStyles(styleMpIndex);

const criticalSkus = getCriticalSkus(skuStatus);

console.log("Partial Styles", partialStyles);

console.log("Critical SKUs", criticalSkus);

renderSummary(styleCoverage);

}

init();
