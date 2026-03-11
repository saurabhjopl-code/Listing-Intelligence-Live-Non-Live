export function buildListingMap(sheets){

const data = sheets.data;
const channel = sheets.channel_name;

const channelMap = {};

channel.forEach(row=>{

channelMap[row.channel_name] = {
mp: row.mp,
account: row.account
};

});

return data.map(row=>{

const mapping = channelMap[row.channel_name] || {};

return{

uniware_sku:row.uniware_sku,
mp:mapping.mp || "",
account:mapping.account || "",
mp_sku:row.mp_sku,
pid:row.pid

};

});

}
