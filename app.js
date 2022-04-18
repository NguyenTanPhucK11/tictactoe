let table = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");

table.appendChild(thead);
table.appendChild(tbody);
document.getElementById("tictactoe").appendChild(table);

for (let i = 0; i < 3; i++) {
  let tr = document.createElement("tr");
  tbody.appendChild(tr);
  for (let j = 0; j < 3; j++) {
    let td = document.createElement("td");
    td.setAttribute("id", "td" + (i * 3 + (j + 1)));
    td.setAttribute("class", "tdata");
    td.setAttribute("onclick", "function1(id)");
    tbody.appendChild(td);
  }
}

let function1 = (id) => {
  console.log(id);
  document.getElementById(id).innerHTML = "X";
};
