export function getMarketplaceCoverage(mpSkuIndex, catalog){

const total = catalog.length;

const result = [];

Object.keys(mpSkuIndex).forEach(mp => {

const live = mpSkuIndex[mp].length;

result.push({

mp,
live,
total,
coverage: Math.round((live / total) * 100)

});

});

return result;

}
