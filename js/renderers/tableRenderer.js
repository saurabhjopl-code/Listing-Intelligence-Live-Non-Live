let PAGE = 50;

export function renderTable(containerId, columns, data){

const container = document.getElementById(containerId);

let visible = data.slice(0,PAGE);

let html = "<table class='table'>";

html += "<thead><tr>";

columns.forEach(col=>{

html += `<th>${col}</th>`;

});

html += "</tr></thead><tbody>";

visible.forEach(row=>{

html += "<tr>";

columns.forEach(col=>{

html += `<td>${row[col] || ""}</td>`;

});

html += "</tr>";

});

html += "</tbody></table>";

html += `<button id="loadMoreBtn">Load More</button>`;

container.innerHTML = html;

document.getElementById("loadMoreBtn").onclick = () => {

PAGE += 50;

renderTable(containerId,columns,data);

};

}
