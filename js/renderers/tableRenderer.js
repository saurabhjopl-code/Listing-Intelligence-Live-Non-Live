let expandedMP = null
let expandedSKU = null
let visibleRows = 50


/* ================= MATRIX TABLE ================= */

export function renderMatrix(container,data,mpGroups){

const slice = data.slice(0,visibleRows)

let html="<table><thead><tr>"

html+="<th>uniware_sku</th>"
html+="<th>styleid</th>"
html+="<th>category</th>"
html+="<th>size</th>"

Object.keys(mpGroups).forEach(mp=>{
html+=`<th class="mpHeader" data-mp="${mp}">
${mp} (${mpGroups[mp].length})
</th>`
})

html+="</tr></thead><tbody>"

slice.forEach(r=>{

html+="<tr>"

html+=`<td>${r.uniware_sku}</td>`
html+=`<td>${r.styleid}</td>`
html+=`<td>${r.category}</td>`
html+=`<td>${r.size}</td>`

Object.keys(mpGroups).forEach(mp=>{

const status = r[mp]

let cell=""

if(status==="LIVE"){
cell=`<span class="dot liveDot"></span>`
}else{
cell=`<span class="dot nonLiveDot"></span>`
}

html+=`<td>${cell}</td>`

})

html+="</tr>"


/* ACCOUNT EXPANSION */

if(expandedMP){

const accounts = mpGroups[expandedMP]

accounts.forEach(acc=>{

html+="<tr class='accountRow'>"

html+="<td></td>"
html+=`<td colspan="3">${acc.account}</td>`

Object.keys(mpGroups).forEach(mp=>{

if(mp===expandedMP){
html+=`<td class="subIndicator">•</td>`
}else{
html+="<td></td>"
}

})

html+="</tr>"

})

}

})

html+="</tbody></table>"


if(data.length>visibleRows){

html+=`
<div class="loadMoreArea">
<button id="loadMoreBtn">Load More</button>
</div>
`

}

container.innerHTML=html

attachMatrixEvents(container,data,mpGroups)

}


function attachMatrixEvents(container,data,mpGroups){

document.querySelectorAll(".mpHeader").forEach(h=>{

h.onclick=()=>{

const mp=h.dataset.mp

expandedMP = expandedMP===mp ? null : mp

renderMatrix(container,data,mpGroups)

}

})

const btn=document.getElementById("loadMoreBtn")

if(btn){

btn.onclick=()=>{
visibleRows+=50
renderMatrix(container,data,mpGroups)
}

}

}


/* ================= COUNT TABLE ================= */

export function renderCount(container,data,distribution){

const slice=data.slice(0,visibleRows)

let html="<table><thead><tr>"

html+="<th></th>"
html+="<th>uniware_sku</th>"
html+="<th>styleid</th>"
html+="<th>category</th>"
html+="<th>LIVE mp_sku count</th>"

html+="</tr></thead><tbody>"

slice.forEach(r=>{

const expanded = expandedSKU===r.uniware_sku

html+="<tr>"

html+=`<td class="expandBtn" data-sku="${r.uniware_sku}">
${expanded?"▼":"▶"}
</td>`

html+=`<td>${r.uniware_sku}</td>`
html+=`<td>${r.styleid}</td>`
html+=`<td>${r.category}</td>`
html+=`<td>${r.count}</td>`

html+="</tr>"


/* DISTRIBUTION EXPANSION */

if(expanded){

const dist=distribution[r.uniware_sku]||{}

Object.keys(dist).forEach(mp=>{

html+="<tr class='distRow'>"

html+="<td></td>"
html+=`<td colspan="3">${mp}</td>`
html+=`<td>${dist[mp]}</td>`

html+="</tr>"

})

}

})

html+="</tbody></table>"


if(data.length>visibleRows){

html+=`
<div class="loadMoreArea">
<button id="loadMoreCountBtn">Load More</button>
</div>
`

}

container.innerHTML=html

attachCountEvents(container,data,distribution)

}


function attachCountEvents(container,data,distribution){

document.querySelectorAll(".expandBtn").forEach(btn=>{

btn.onclick=()=>{

const sku=btn.dataset.sku

expandedSKU = expandedSKU===sku ? null : sku

renderCount(container,data,distribution)

}

})

const btn=document.getElementById("loadMoreCountBtn")

if(btn){

btn.onclick=()=>{
visibleRows+=50
renderCount(container,data,distribution)
}

}

}
