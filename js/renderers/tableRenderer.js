let expandedMP=null;

export function renderMatrix(container,data,mpGroups,listingSet){

let html="<table><thead><tr>";

html+="<th>uniware_sku</th><th>styleid</th><th>category</th><th>size</th>";

Object.keys(mpGroups).forEach(mp=>{

html+=`<th class="mpHeader" data-mp="${mp}">
${mp} (${mpGroups[mp].length})
</th>`;

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


if(expandedMP){

const accounts=mpGroups[expandedMP];

accounts.forEach(acc=>{

const key=acc.channel+"|"+r.uniware_sku;

const live=listingSet.has(key);

const cls=live?"live":"nonlive";

html+="<tr class='subRow'>";

html+="<td></td><td></td><td></td><td>"+acc.account+"</td>";

Object.keys(mpGroups).forEach(mp=>{

if(mp===expandedMP){

html+=`<td class="${cls}">${live?"LIVE":"NONLIVE"}</td>`;

}else{

html+="<td></td>";

}

});

html+="</tr>";

});

}

});

html+="</tbody></table>";

container.innerHTML=html;


document.querySelectorAll(".mpHeader").forEach(h=>{

h.onclick=()=>{

const mp=h.dataset.mp;

expandedMP= expandedMP===mp ? null : mp;

renderMatrix(container,data,mpGroups,listingSet);

};

});

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
