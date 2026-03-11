export function buildListingMap(sheets){

const data = sheets.data;

const channel = sheets.channel_name;

const channelMap = {};

channel.forEach(row=>{

channelMap[row.channel_name] = row.mp;

});


return data.map(row=>{

return{

uniware_sku:row.uniware_sku,

mp:channelMap[row.channel_name] || "Unknown",

mp_sku:row.mp_sku,

pid:row.pid

};

});

}
