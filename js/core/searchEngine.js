export function applySearch(data, term){

if(!term) return data;

term = term.toLowerCase();

return data.filter(row=>{

return (
row.styleid?.toLowerCase().includes(term) ||
row.uniware_sku?.toLowerCase().includes(term)
);

});

}
