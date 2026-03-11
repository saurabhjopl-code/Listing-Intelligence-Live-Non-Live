export function buildIndexes(catalog, listings, sizeCount){

const skuListingIndex = {};
const styleSkuIndex = {};
const styleSizeIndex = {};
const mpSkuIndex = {};


catalog.forEach(row => {

const sku = row.uniware_sku;
const style = row.styleid;

if(!styleSkuIndex[style]){
styleSkuIndex[style] = [];
}

styleSkuIndex[style].push(sku);

});


sizeCount.forEach(row => {

styleSizeIndex[row.styleid] = Number(row.size_count);

});


listings.forEach(row => {

const sku = row.uniware_sku;
const mp = row.mp;

if(!skuListingIndex[sku]){
skuListingIndex[sku] = [];
}

skuListingIndex[sku].push(mp);


if(!mpSkuIndex[mp]){
mpSkuIndex[mp] = [];
}

mpSkuIndex[mp].push(sku);

});


return {

skuListingIndex,
styleSkuIndex,
styleSizeIndex,
mpSkuIndex

};

}
