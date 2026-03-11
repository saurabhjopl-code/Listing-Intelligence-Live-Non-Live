export function renderFilters(data){

const bar = document.getElementById("filterBar");

const mps = [...new Set(data.listings.map(r=>r.mp))];

const categories = [...new Set(data.catalog.map(r=>r.category))];

bar.innerHTML = `

<select id="mpFilter">
<option value="">All MP</option>
${mps.map(m=>`<option>${m}</option>`).join("")}
</select>

<select id="catFilter">
<option value="">All Category</option>
${categories.map(c=>`<option>${c}</option>`).join("")}
</select>

`;

}
