let progress = 0;

export function startProgress(){

const bar = document.getElementById("progressBar");

progress = 5;

bar.style.display = "block";

bar.style.width = progress + "%";

}

export function updateProgress(value){

const bar = document.getElementById("progressBar");

progress = value;

bar.style.width = progress + "%";

}

export function finishProgress(){

const bar = document.getElementById("progressBar");

bar.style.width = "100%";

setTimeout(()=>{

bar.style.display = "none";

},400);

}
