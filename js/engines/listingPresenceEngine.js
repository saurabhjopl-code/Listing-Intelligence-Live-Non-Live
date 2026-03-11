export function buildListingMap(sheets){

const data = sheets.data;
const channels = sheets.channel_name;

const map = {};

channels.forEach(r=>{
map[r.channel_name] = {
mp: r.mp,
account: r.account
};
});

return data.map(r=>{

const ch = map[r.channel_name] || {};

return {

channel_name:r.channel_name,
uniware_sku:r.uniware_sku,
mp: ch.mp || "",
account: ch.account || "",
mp_sku:r.mp_sku,
pid:r.pid

};

});

}
