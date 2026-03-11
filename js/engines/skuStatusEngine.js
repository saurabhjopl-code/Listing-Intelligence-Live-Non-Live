export function computeSkuStatus(catalog,listings){

const listingIndex = {};

listings.forEach(row=>{

listingIndex[row.uniware_sku] = true;

});


return catalog.map(sku=>{

const listed = !!listingIndex[sku.uniware_sku];

let status = "LIVE";

if(!listed && sku.stock > 0){

status = "CRITICAL";

}

else if(!listed){

status = "NON_LIVE";

}

return{

...sku,

listed,

status

};

});

}
