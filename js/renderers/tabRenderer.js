export function initTabs(){

const buttons = document.querySelectorAll(".tabs button");

buttons.forEach(btn => {

btn.addEventListener("click", () => {

const tab = btn.dataset.tab;

switchTab(tab);

});

});

}

function switchTab(tab){

const app = document.getElementById("app");

app.innerHTML = `<h2>${tab.toUpperCase()}</h2>`;

}
