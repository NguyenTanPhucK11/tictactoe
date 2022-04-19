const table = document.createElement("table");
const thead = document.createElement("thead");
const tbody = document.createElement("tbody");
const elemPlayerA = document.getElementById("playerA");
const elemPlayerB = document.getElementById("playerB");
const elemResult = document.getElementById("result");
let isPlayerA = true;
let scoreA = 0;
let scoreB = 0;
let isWin = false;
let isDouble = false;
let isPlayMachine = false;
let isAOrB = true; // who win the last match (for machine)
let playerA = [];
let playerB = [];
let markRemain = [];

table.appendChild(thead);
table.appendChild(tbody);
let elemSwitch = document.getElementById("defaultCheck1");
document.getElementById("tictactoe").appendChild(table);
let init = () => {
  for (let i = 0; i < 3; i++) {
    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    for (let j = 0; j < 3; j++) {
      let td = document.createElement("td");
      td.setAttribute("id", i * 3 + (j + 1));
      td.setAttribute("class", "tdata");
      td.setAttribute("onclick", "marks(id)");
      tbody.appendChild(td);
      markRemain.push(i * 3 + (j + 1));
    }
  }
};
init();

let marks = (id) => {
  if (isWin) Restart();
  const elemId = document.getElementById(id);
  if (elemId.textContent != "") return;

  let mark = [parseInt((id - 1) / 3), id];

  if (isPlayerA) {
    elemId.innerHTML = "X";
    elemPlayerA.setAttribute("class", "col btn btn-primary");
    elemPlayerB.setAttribute("class", "col btn btn-danger");
    playerA.push(mark);
    markRemain.splice(markRemain.indexOf(parseInt(id)), 1);
    isPlayMachine = !elemSwitch.checked;
  } else {
    elemId.innerHTML = "O";
    elemPlayerA.setAttribute("class", "col btn btn-danger");
    elemPlayerB.setAttribute("class", "col btn btn-primary");
    playerB.push(mark);
    markRemain.splice(markRemain.indexOf(parseInt(id)), 1);
  }
  if (playerA.length >= 3 && isPlayerA) {
    checkMarks(playerA);
  }
  if (playerB.length >= 3 && !isPlayerA) {
    checkMarks(playerB);
  }
  isPlayerA = !isPlayerA;
  if (!isPlayMachine && markRemain.length > 0 && !isWin) playWithMachine();
};

let checkMarks = async (player) => {
  for (let i = 0; i < player.length - 2; i++) {
    for (let j = i + 1; j < player.length - 1; j++) {
      for (let k = j + 1; k < player.length; k++) {
        if (isRow(player[i][0], player[j][0], player[k][0])) {
          playerWin(player[i][1], player[j][1], player[k][1]);
        } else if (isCol(player[i][0], player[j][0], player[k][0]))
          if (isSpace(player[i][1], player[j][1], player[k][1])) {
            playerWin(player[i][1], player[j][1], player[k][1]);
          }
      }
    }
  }
  if (!isWin && playerA.length + playerB.length == 9) {
    await alert("DRAW");
    await setTimeout(() => Restart(), 2000);
  }
};

let playerWin = async (a, b, c) => {
  isWin = true;
  document.getElementById(a).style.color = "red";
  document.getElementById(b).style.color = "red";
  document.getElementById(c).style.color = "red";
  if (isPlayerA) {
    scoreA++;
    document.getElementById("scoreA").innerHTML = "Score : " + scoreA;
    if (!isDouble) {
      elemResult.innerHTML = "A win";
      await alert("A win");
      await setTimeout(() => Restart(), 2000);
      isDouble = true;
    }
  } else if (!isPlayerA) {
    scoreB++;
    document.getElementById("scoreB").innerHTML = "Score : " + scoreB;
    if (!isDouble) {
      elemResult.innerHTML = "B win";
      isDouble = true;
    }
  }
};

let isRow = (a, b, c) => {
  return a == b && b == c;
};

let isCol = (a, b, c) => {
  return a != b && b != c && a != c;
};

let isSpace = (a, b, c) => {
  return (
    Math.abs(a - b) == Math.abs(b - c) || Math.abs(a - b) == Math.abs(a - c)
  );
};

let Restart = () => {
  playerA = [];
  playerB = [];
  markRemain = [];
  //   isWin ? (isPlayerA = !isPlayerA) : isPlayerA;
  isPlayerA = true;
  isWin = false;
  isPlayMachine = false;
  isDouble = false;
  elemSwitch.checked = false;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let td = document.getElementById(i * 3 + j + 1);
      markRemain.push(i * 3 + (j + 1));
      td.style.color = "";
      td.innerHTML = "";
    }
  }
};

let playWithMachine = () => {
  let indexRemain = markRemain[Math.floor(Math.random() * markRemain.length)];
  isPlayMachine = true;
  marks(indexRemain);
};

let checkChecked = () => {
  elemSwitch.checked ? isPlayMachine : !isPlayMachine;
};
