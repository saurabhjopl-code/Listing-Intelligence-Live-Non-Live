export function renderSummary(data){

const grid = document.getElementById("summaryGrid");

const total = data.length;

const fullLive = data.filter(d => d.live === d.total).length;

const partial = data.filter(d => d.live > 0 && d.live < d.total).length;

const nonLive = data.filter(d => d.live === 0).length;

grid.innerHTML = `

<div class="card">
<div>Total Styles</div>
<h2>${total}</h2>
</div>

<div class="card">
<div>Fully Live</div>
<h2>${fullLive}</h2>
</div>

<div class="card">
<div>Partial Live</div>
<h2>${partial}</h2>
</div>

<div class="card">
<div>Non Live</div>
<h2>${nonLive}</h2>
</div>

<div class="card">
<div>Coverage</div>
<h2>${Math.round((fullLive/total)*100)}%</h2>
</div>

`;

}
