export function buildStyleMpIndex(catalog, listings){

const skuListingMap = {};
const styleIndex = {};

listings.forEach(row=>{

if(!skuListingMap[row.uniware_sku]){
skuListingMap[row.uniware_sku] = [];
}

skuListingMap[row.uniware_sku].push(row.mp);

});


catalog.forEach(sku=>{

const style = sku.styleid;

if(!styleIndex[style]){
styleIndex[style] = {};
}

const mpList = skuListingMap[sku.uniware_sku] || [];

mpList.forEach(mp=>{

if(!styleIndex[style][mp]){

styleIndex[style][mp] = {
styleid:style,
mp:mp,
total_sizes:0,
live_sizes:0,
missing_skus:[]
};

}

styleIndex[style][mp].total_sizes++;

if(mpList.length>0){

styleIndex[style][mp].live_sizes++;

}else{

styleIndex[style][mp].missing_skus.push(sku.uniware_sku);

}

});

});

return styleIndex;

}
