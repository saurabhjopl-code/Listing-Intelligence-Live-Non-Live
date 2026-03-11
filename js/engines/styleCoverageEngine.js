export function computeStyleCoverage(styleSkuIndex, skuStatus, catalog){

const skuStatusMap = {};

skuStatus.forEach(r=>{
skuStatusMap[r.uniware_sku] = r.status;
});

const styleMeta = {};

catalog.forEach(r=>{
if(!styleMeta[r.styleid]){
styleMeta[r.styleid] = {
category:r.category,
parent_remark:r.parent_remark
};
}
});

const result = [];

Object.keys(styleSkuIndex).forEach(styleid=>{

const skus = styleSkuIndex[styleid];

let live = 0;

skus.forEach(sku=>{
if(skuStatusMap[sku]==="LIVE"){
live++;
}
});

result.push({
styleid,
category:styleMeta[styleid]?.category || "",
parent_remark:styleMeta[styleid]?.parent_remark || "",
live,
total:skus.length
});

});

return result;

}
