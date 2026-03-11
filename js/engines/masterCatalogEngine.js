export function buildCatalog(sheets){

const master = sheets.master_listings;

const stock = sheets.uniware_stock;

const stockMap = {};

stock.forEach(row=>{

stockMap[row.uniware_sku] = Number(row.stock || 0);

});


return master.map(row=>{

return{

uniware_sku:row.uniware_sku,

styleid:row.styleid,

size:row.size,

category:row.category,

stock:stockMap[row.uniware_sku] || 0

};

});

}
