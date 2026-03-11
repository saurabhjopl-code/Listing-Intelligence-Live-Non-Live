export function exportCSV(filename, data){

if(!data.length) return;

const headers = Object.keys(data[0]);

let csv = headers.join(",") + "\n";

data.forEach(row=>{

csv += headers.map(h => row[h]).join(",") + "\n";

});

const blob = new Blob([csv], { type: "text/csv" });

const url = URL.createObjectURL(blob);

const a = document.createElement("a");

a.href = url;

a.download = filename;

a.click();

}
