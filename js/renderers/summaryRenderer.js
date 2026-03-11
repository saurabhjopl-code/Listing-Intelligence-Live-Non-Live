export function renderSummary(data){

const grid = document.getElementById("summaryGrid");

const total = data.length;

const fullLive = data.filter(d=>d.live===d.total).length;

const partial = data.filter(d=>d.live>0 && d.live<d.total).length;

const nonLive = data.filter(d=>d.live===0).length;


grid.innerHTML = `

<div class="card">Total Styles : ${total}</div>

<div class="card">Full Live : ${fullLive}</div>

<div class="card">Partial Live : ${partial}</div>

<div class="card">Non Live : ${nonLive}</div>

`;

}
