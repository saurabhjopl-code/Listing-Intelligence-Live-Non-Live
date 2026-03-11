const SHEETS = {

data: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-JkfNtpddZXlSelTeFcrXsS4lZaZQdZu2ZdApqtaB7PDGTfeBnH_zhGQB3yQuqvvBRotFfD-q0HV7/pub?gid=765260582&single=true&output=csv",

channel_name: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-JkfNtpddZXlSelTeFcrXsS4lZaZQdZu2ZdApqtaB7PDGTfeBnH_zhGQB3yQuqvvBRotFfD-q0HV7/pub?gid=1645772386&single=true&output=csv",

master_listings: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-JkfNtpddZXlSelTeFcrXsS4lZaZQdZu2ZdApqtaB7PDGTfeBnH_zhGQB3yQuqvvBRotFfD-q0HV7/pub?gid=69497712&single=true&output=csv",

size_count: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-JkfNtpddZXlSelTeFcrXsS4lZaZQdZu2ZdApqtaB7PDGTfeBnH_zhGQB3yQuqvvBRotFfD-q0HV7/pub?gid=1410030111&single=true&output=csv",

uniware_stock: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-JkfNtpddZXlSelTeFcrXsS4lZaZQdZu2ZdApqtaB7PDGTfeBnH_zhGQB3yQuqvvBRotFfD-q0HV7/pub?gid=2106875462&single=true&output=csv"

};


async function fetchCSV(url){

const res = await fetch(url);

const text = await res.text();

return parseCSV(text);

}


function parseCSV(text){

const lines = text.trim().split("\n");

const headers = lines[0].split(",");

return lines.slice(1).map(row=>{

const values = row.split(",");

const obj = {};

headers.forEach((h,i)=>{

obj[h.trim()] = values[i] ? values[i].trim() : "";

});

return obj;

});

}


export async function loadSheets(){

const sheets = {};

for(const key in SHEETS){

sheets[key] = await fetchCSV(SHEETS[key]);

}

console.log("Sheets Loaded", sheets);

return sheets;

}
