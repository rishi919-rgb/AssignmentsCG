// button monitor
var player1 = prompt("Enter name of 1st Player: ");
console.log(player1);
var player2 = prompt("Enter name of 2nd Player");
const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset");
const new1 = document.querySelector("#new1");
const result = document.querySelector('.result');
let player = true; // true or false
console.log(boxes);

const winner = [
    [0, 9, 18,27,36,45,54,63,72],
    [1, 10, 19,28,37,46,55,64,73],
    [2, 11,20,29,38,47,56,65,74],
    [3, 12, 21,30,39,48,57,66,75],
    [4, 13, 22,31,40,49,58,67,76],
    [5, 14, 23,32,41,50,59,68,77],
    [6,15,24,33,42,51,60,69,78],
    [7,16,25,34,43,52,61,70,79],
    [8,17,26,35,44,53,62,71,80],

    [0,10,20,30,40,50,60,70,80],
    [8,16,24,32,40,48,56,64,72]


    [0, 1, 2,3,4,5,6,7,8],
    [9,10,11,12,13,14,15,16,17],
    [18,19,20,21,22,23,24,25,26],
    [27,28,29,30,31,32,33,34,35],
    [36,37,38,39,40,41,42,43,44],
    [45,46,47,48,49,50,51,52,53],
    [54,55,56,57,58,59,60,61,62],
    [63,64,65,66,67,68,69,70,71],
    [72,73,74,75,76,77,78,79,80],


];
function checkwinnner() {
    for (let data of winner) {
        const btn1 = boxes[data[0]].innerHTML;
        const btn2 = boxes[data[1]].innerHTML;
        const btn3 = boxes[data[2]].innerHTML;
        const btn4 = boxes[data[3]].innerHTML;
        const btn5 = boxes[data[4]].innerHTML;
        const btn6 = boxes[data[5]].innerHTML;
        const btn7 = boxes[data[6]].innerHTML;
        const btn8 = boxes[data[7]].innerHTML;
        const btn9 = boxes[data[8]].innerHTML;
        

        if (btn1 != "" && btn2 != "" && btn3 != "" && btn4 != ""&& btn5 != ""&& btn6 != "" && btn7 != ""&& btn7 != "" && btn8 != "" && btn9 != ""){
            if (btn1 === btn2 && btn2 === btn3 && btn3 === btn4  && btn4 === btn5 && btn5 === btn6 && btn6 === btn7 && btn7 === btn8 && btn8 === btn9) {
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
            // else if(btn1 != btn2 && btn2!= btn3)
            //         console.log("Its a DRAW");
    }
}
}
function enableAll() {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
    box.style.backgroundColor="rgb(205, 194, 252)";
  }
}

function reset1() {
  for (let box of boxes) {
    box.disabled = false;
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
