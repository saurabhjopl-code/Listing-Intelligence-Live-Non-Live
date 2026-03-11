export function initTabs(onChange){

const buttons = document.querySelectorAll(".tabs button");

buttons.forEach(btn=>{

btn.onclick = ()=>{

buttons.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

const tab = btn.dataset.tab;

onChange(tab);

};

});

buttons[0].classList.add("active");

}
