export function renderFilters(DATA, onChange){

const bar = document.getElementById("filterBar");

const mps = [...new Set(DATA.listings.map(r=>r.mp))];
const cats = [...new Set(DATA.catalog.map(r=>r.category))];

bar.innerHTML = `

<select id="mpFilter">
<option value="">All MP</option>
${mps.map(m=>`<option value="${m}">${m}</option>`).join("")}
</select>

<select id="catFilter">
<option value="">All Category</option>
${cats.map(c=>`<option value="${c}">${c}</option>`).join("")}
</select>

`;

document.getElementById("mpFilter").onchange = onChange;
document.getElementById("catFilter").onchange = onChange;

}
