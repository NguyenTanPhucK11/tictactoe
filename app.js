let table = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
let isPlayerA = true;
let playerA = [];
let playerB = [];
let colA = [];
let colB = [];
let rowA = [];
let rowB = [];

table.appendChild(thead);
table.appendChild(tbody);
document.getElementById("tictactoe").appendChild(table);

for (let i = 0; i < 3; i++) {
  let tr = document.createElement("tr");
  tbody.appendChild(tr);
  for (let j = 0; j < 3; j++) {
    let td = document.createElement("td");
    td.setAttribute("id", i * 3 + (j + 1));
    td.setAttribute("class", "tdata");
    td.setAttribute("onclick", "marks(id)");
    tbody.appendChild(td);
  }
}

let marks = (id) => {
  isPlayerA ? playerA.push(id) : playerB.push(id);

  document.getElementById(id).innerHTML = isPlayerA ? "X" : "O";

  if (playerA.length >= 3 && isPlayerA) {
    checkMarks(playerA);
  }
  if (playerB.length >= 3 && !isPlayerA) {
    checkMarks(playerB);
  }

  isPlayerA = !isPlayerA;
};

let checkMarks = (player) => {
  console.log("checkMarks");
  player.sort((a, b) => a - b);
  for (let i = 0; i < player.length - 1; i++) {
    if (isPlayerA) {
      colA.push(Math.abs(player[i] - player[i + 1]));
      rowA.push(
        Math.abs(
          parseInt((player[i] - 1) / 3) - parseInt((player[i + 1] - 1) / 3)
        )
      );
    } else {
      colB.push(Math.abs(player[i] - player[i + 1]));
      rowB.push(
        Math.abs(
          parseInt((player[i] - 1) / 3) - parseInt((player[i + 1] - 1) / 3)
        )
      );
    }
  }
  console.log("subArr: " + subArray(colA, rowA));
  //   if (checkDuplicate(colA) && checkDuplicate(rowA)) alert("A win!");
  //   if (checkDuplicate(colB) && checkDuplicate(rowB)) alert("B win!");
  console.log("playerA: " + playerA);
  console.log("playerB: " + playerB);
  console.log("colA: " + colA);
  console.log("colB: " + colB);
  console.log("rowA: " + rowA);
  console.log("rowB: " + rowB);
  colA = [];
  colB = [];
  rowA = [];
  rowB = [];
};
