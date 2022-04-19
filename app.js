let table = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
let isPlayerA = true;
let playerA = [];
let playerB = [];

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
  let mark = [parseInt((id - 1) / 3), id];
  isPlayerA ? playerA.push(mark) : playerB.push(mark);

  document.getElementById(id).innerHTML = isPlayerA ? "X" : "O";

  if (playerA.length >= 3 && isPlayerA) {
    checkMarks(playerA);
  }
  if (playerB.length >= 3 && !isPlayerA) {
    checkMarks(playerB);
  }
  console.log(playerA);
  console.log(playerB);

  isPlayerA = !isPlayerA;
};

let checkMarks = (player) => {
  for (let i = 0; i < player.length - 2; i++) {
    for (let j = i + 1; j < player.length - 1; j++) {
      for (let k = j + 1; k < player.length; k++) {
        if (isRow(player[i][0], player[j][0], player[k][0]))
          alert(isPlayerA ? "A win!" : "B win!");
        else if (isCol(player[i][0], player[j][0], player[k][0]))
          if (isSpace(player[i][1], player[j][1], player[k][1]))
            alert(isPlayerA ? "A win!" : "B win!");
      }
    }
  }

  console.log("playerA: " + playerA);
  console.log("playerB: " + playerB);
};

let isRow = (a, b, c) => {
  return a == b && b == c;
};

let isCol = (a, b, c) => {
  console.log(a, b, c);
  return a != b && b != c && a != c;
};

let isSpace = (a, b, c) => {
  return (
    Math.abs(a - b) == Math.abs(b - c) || Math.abs(a - b) == Math.abs(a - c)
  );
};
