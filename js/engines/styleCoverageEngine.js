export function computeStyleCoverage(styleSkuIndex, skuStatus){

const skuMap = {};

skuStatus.forEach(row => {

skuMap[row.uniware_sku] = row.status;

});


const result = [];

Object.keys(styleSkuIndex).forEach(style => {

const skus = styleSkuIndex[style];

let live = 0;

skus.forEach(sku => {

if(skuMap[sku] === "LIVE"){
live++;
}

});

result.push({

styleid:style,
live,
total:skus.length

});

});

return result;

}
