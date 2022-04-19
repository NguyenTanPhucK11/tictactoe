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
let isHardMode = false;
let isAOrB = true; // who win the last match (for machine)
let playerA = [];
let playerB = [];
let markRemain = [];

table.appendChild(thead);
table.appendChild(tbody);
let elemAutoPlay = document.getElementById("autoPlay");
let elemHardMode = document.getElementById("hardMode");
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
  if (isWin) return;
  const elemId = document.getElementById(id);
  if (elemId.textContent != "") return;

  let mark = [parseInt((id - 1) / 3), id];

  if (isPlayerA) {
    elemId.innerHTML = "X";
    elemPlayerA.setAttribute("class", "col mx-1 btn btn-primary");
    elemPlayerB.setAttribute("class", "col mx-1 btn btn-danger");
    playerA.push(mark);
    markRemain.splice(markRemain.indexOf(parseInt(id)), 1);
    isPlayMachine = !elemAutoPlay.checked;
  } else {
    elemId.innerHTML = "O";
    elemPlayerA.setAttribute("class", "col mx-1 btn btn-danger");
    elemPlayerB.setAttribute("class", "col mx-1 btn btn-primary");
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
  if (!isPlayMachine && markRemain.length > 0 && !isWin)
    isHardMode && playerA.length >= 2 ? playHardMode() : playWithMachine();
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
    elemResult.innerHTML = "DRAW";
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
      await alert("B win");
      await setTimeout(() => Restart(), 2000);
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
    Math.abs(a - b) == Math.abs(b - c) ||
    Math.abs(a - b) == Math.abs(a - c) ||
    Math.abs(a - c) == Math.abs(b - c)
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
  //   elemAutoPlay.checked = false;
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
  let randMark = markRemain[Math.floor(Math.random() * markRemain.length)];
  isPlayMachine = true;
  marks(randMark);
};

let checkAutoPlay = () => {
  if (playerA.length > 0) elemAutoPlay.checked = false;
  elemAutoPlay.checked ? isPlayMachine : !isPlayMachine;
};

let checkPlayerA = (player) => {
  for (let i = 0; i < player.length - 2; i++) {
    for (let j = i + 1; j < player.length - 1; j++) {
      for (let k = j + 1; k < player.length; k++) {
        if (isRow(player[i][0], player[j][0], player[k][0])) {
          let temp = player[k][1];
          playerA.pop();
          isPlayMachine = true;
          marks(temp);
          return;
        } else if (isCol(player[i][0], player[j][0], player[k][0]))
          if (isSpace(player[i][1], player[j][1], player[k][1])) {
            let temp = player[k][1];
            playerA.pop();
            isPlayMachine = true;
            marks(temp);
            return;
          }
      }
    }
  }
  playerA.pop();
};

let checkHardMode = () => {
  if (!elemAutoPlay.checked) elemHardMode.checked = false;
  else if (elemHardMode.checked) isHardMode = true;
};
let playHardMode = () => {
  for (let i = 0; i < markRemain.length; i++) {
    let id = markRemain[i];
    playerA.push([parseInt((id - 1) / 3), id]);
    checkPlayerA(playerA);
  }
  if (!isPlayMachine) playWithMachine();
};
