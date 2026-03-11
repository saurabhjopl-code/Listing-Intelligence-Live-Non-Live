export function computeStyleCoverage(data){

const styles = {};

data.forEach(row=>{

if(!styles[row.styleid]){

styles[row.styleid]={
styleid:row.styleid,
category:row.category,
parent_remark:row.parent_remark,
live:0,
total:0
};

}

styles[row.styleid].total++;

if(row.status==="LIVE"){
styles[row.styleid].live++;
}

});

return Object.values(styles);

}
