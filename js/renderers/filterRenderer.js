export function renderFilters(DATA, onChange){

const bar = document.getElementById("filterBar");

const mps = [...new Set(DATA.listings.map(r=>r.mp).filter(Boolean))];
const accs = [...new Set(DATA.listings.map(r=>r.account).filter(Boolean))];
const cats = [...new Set(DATA.catalog.map(r=>r.category).filter(Boolean))];

bar.innerHTML = `

<select id="mpFilter">
<option value="">All MP</option>
${mps.map(m=>`<option value="${m}">${m}</option>`).join("")}
</select>

<select id="accFilter">
<option value="">All ACC</option>
${accs.map(a=>`<option value="${a}">${a}</option>`).join("")}
</select>

<select id="catFilter">
<option value="">All Category</option>
${cats.map(c=>`<option value="${c}">${c}</option>`).join("")}
</select>

`;

document.getElementById("mpFilter").onchange = onChange;
document.getElementById("accFilter").onchange = onChange;
document.getElementById("catFilter").onchange = onChange;

}
