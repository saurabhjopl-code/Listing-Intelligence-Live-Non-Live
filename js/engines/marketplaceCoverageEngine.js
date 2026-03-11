export function getMarketplaceCoverage(listings, catalog){

const mpMap = {};

listings.forEach(row=>{

if(!mpMap[row.mp]){

mpMap[row.mp] = new Set();

}

mpMap[row.mp].add(row.uniware_sku);

});

const total = catalog.length;

const result = [];

Object.keys(mpMap).forEach(mp=>{

const live = mpMap[mp].size;

const coverage = Math.round((live / total) * 100);

result.push({

mp:mp,

live:live,

total:total,

coverage:coverage

});

});

return result;

}
