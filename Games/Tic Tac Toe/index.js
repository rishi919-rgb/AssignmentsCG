// button monitor
var player1 = prompt("Enter name of 1st Player: ");
console.log(player1);
var player2 = prompt("Enter name of 2nd Player");
console.log(player2);

const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset");
const new1 = document.querySelector("#new1");
const result = document.querySelector('.result');

let player = true; // true or false
console.log(boxes);

const winner = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],

];
function checkwinnner() {
  for (let data of winner) {
    const btn1 = boxes[data[0]].innerHTML;
    const btn2 = boxes[data[1]].innerHTML;
    const btn3 = boxes[data[2]].innerHTML;

    if (btn1 != "" && btn2 != "" && btn3 != "") {
      if (btn1 === btn2 && btn2 === btn3) {
        if (btn3 === "O") {
          alert("The winner is " + player1);
          result.innerHTML="The WINNER is " +player1;
          

          for (let box of boxes) {
            box.disabled = true;
     
          }
        }
        else {
          alert("The WINNER is " + player2);
             result.innerHTML="The WINNER is " +player2;
          for (let box of boxes) {
            box.disabled = true;
          
          }
        }
      }

    }
  }
}

function enableAll() {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
    box.style.backgroundColor="rgb(205, 194, 252)";
        result.innerHTML="";

  }
}

function reset1() {
  for (let box of boxes) {
    box.disabled = false;
    result.innerHTML="";
}}


boxes.forEach((box) => {
  // console.log(box.innerHTML);
  box.addEventListener("click", () => {
    // console. log(box. innerHTML):
    if (player) {
      box.innerHTML = "O";
      player = false;
      box.style.backgroundColor = "hotpink";

    }
    else {
      box.innerHTML = "X";
      player = true;
      box.style.backgroundColor = "red";

    }
    box.disabled = true
    checkwinnner();
  });
});

if (reset) {
  reset.addEventListener("click", () => {
    reset1();
  });
} 

if (new1) {
  new1.addEventListener("click", () => {
    enableAll();
    console.clear();
  });
}