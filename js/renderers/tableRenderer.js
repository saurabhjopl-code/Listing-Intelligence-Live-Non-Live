let expandedMP = null
let expandedSKU = null
let visibleRows = 50

export function renderMatrix(container,data,mpGroups,listingSet,distribution){

const slice = data.slice(0,visibleRows)

let html="<table><thead><tr>"

html+="<th></th>"
html+="<th>uniware_sku</th><th>styleid</th><th>category</th><th>size</th>"

Object.keys(mpGroups).forEach(mp=>{

html+=`<th class="mpHeader" data-mp="${mp}">
${mp} (${mpGroups[mp].length})
</th>`

})

html+="</tr></thead><tbody>"

slice.forEach(r=>{

const isExpanded = expandedSKU===r.uniware_sku

html+="<tr>"

html+=`<td class="expandBtn" data-sku="${r.uniware_sku}">
${isExpanded ? "▼" : "▶"}
</td>`

html+=`<td class="skuCell" data-sku="${r.uniware_sku}">
${r.uniware_sku}
</td>`

html+=`<td>${r.styleid}</td>`
html+=`<td>${r.category}</td>`
html+=`<td>${r.size}</td>`

Object.keys(mpGroups).forEach(mp=>{

const cls=r[mp]==="LIVE"?"live":"nonlive"

html+=`<td class="${cls}">${r[mp]}</td>`

})

html+="</tr>"

if(isExpanded){

const dist = distribution[r.uniware_sku] || {}

Object.keys(dist).forEach(mp=>{

html+="<tr class='skuExpand'>"

html+="<td></td>"
html+="<td colspan='4'>"+mp+"</td>"
html+="<td colspan='20'>"+dist[mp]+"</td>"

html+="</tr>"

})

}

})

html+="</tbody></table>"

if(data.length>visibleRows){

html+=`
<div style="padding:20px;text-align:center">
<button id="loadMore">Load More</button>
</div>
`

}

container.innerHTML=html

attachEvents(container,data,mpGroups,listingSet,distribution)

}

function attachEvents(container,data,mpGroups,listingSet,distribution){

document.querySelectorAll(".mpHeader").forEach(h=>{

h.onclick=()=>{

const mp=h.dataset.mp

expandedMP = expandedMP===mp ? null : mp

renderMatrix(container,data,mpGroups,listingSet,distribution)

}

})

document.querySelectorAll(".expandBtn").forEach(b=>{

b.onclick=()=>{

const sku=b.dataset.sku

expandedSKU = expandedSKU===sku ? null : sku

renderMatrix(container,data,mpGroups,listingSet,distribution)

}

})

const btn=document.getElementById("loadMore")

if(btn){

btn.onclick=()=>{

visibleRows+=50

renderMatrix(container,data,mpGroups,listingSet,distribution)

}

}

}
