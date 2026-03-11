export function buildMatrix(master,data,channel){

const map={};

channel.forEach(r=>{
map[r.channel_name]={mp:r.mp,account:r.account};
});

const mpGroups={};

channel.forEach(r=>{
if(!mpGroups[r.mp]) mpGroups[r.mp]=[];
mpGroups[r.mp].push(r.account);
});

const listingSet=new Set();

data.forEach(r=>{
listingSet.add(r.channel_name+"|"+r.uniware_sku);
});

const matrix=master.map(r=>{

const row={

uniware_sku:r.uniware_sku,
styleid:r.styleid,
category:r.category,
size:r.size

};

Object.keys(mpGroups).forEach(mp=>{

const accounts=mpGroups[mp];

let live=false;

accounts.forEach(a=>{

const key=a+"|"+r.uniware_sku;

if(listingSet.has(key)) live=true;

});

row[mp]=live?"LIVE":"NONLIVE";

});

return row;

});

return{matrix,mpGroups};

}
