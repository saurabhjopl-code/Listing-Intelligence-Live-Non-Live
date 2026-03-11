export function renderMatrix(container,data,mpGroups){

let html="<table><thead><tr>";

html+="<th>uniware_sku</th><th>styleid</th><th>category</th><th>size</th>";

Object.keys(mpGroups).forEach(mp=>{

html+=`<th>${mp} (${mpGroups[mp].length})</th>`;

});

html+="</tr></thead><tbody>";

data.forEach(r=>{

html+="<tr>";

html+=`<td>${r.uniware_sku}</td>`;
html+=`<td>${r.styleid}</td>`;
html+=`<td>${r.category}</td>`;
html+=`<td>${r.size}</td>`;

Object.keys(mpGroups).forEach(mp=>{

const cls=r[mp]==="LIVE"?"live":"nonlive";

html+=`<td class="${cls}">${r[mp]}</td>`;

});

html+="</tr>";

});

html+="</tbody></table>";

container.innerHTML=html;

}


export function renderCount(container,data){

let html="<table><thead><tr>";

html+="<th>uniware_sku</th><th>styleid</th><th>category</th><th>LIVE mp_sku count</th>";

html+="</tr></thead><tbody>";

data.forEach(r=>{

html+="<tr>";

html+=`<td>${r.uniware_sku}</td>`;
html+=`<td>${r.styleid}</td>`;
html+=`<td>${r.category}</td>`;
html+=`<td>${r.count}</td>`;

html+="</tr>";

});

html+="</tbody></table>";

container.innerHTML=html;

}
