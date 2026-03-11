export function getMissingSizes(catalog, listings){

const listingSet = new Set();

listings.forEach(row=>{
listingSet.add(row.uniware_sku);
});

const missing = [];

catalog.forEach(row=>{

if(!listingSet.has(row.uniware_sku)){

missing.push(row);

}

});

return missing;

}
