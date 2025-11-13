var n = "Enter password";
var m = prompt(n);

if( m === "12345"){

  alert("Welcome Rishikesh sir");



// button monitor
// button monitor
var player1 = prompt("Enter name of 1st Player: ");
console.log(player1);
var player2 = prompt("Enter name of 2nd Player");
const boxes = document.querySelectorAll(".box")
const reset = document.querySelector("#reset");
const new1 = document.querySelector("#new1");
const result = document.querySelector('.result');

let player = true; // true or false
console.log(boxes);

const winner = [
  [0, 6, 12, 18, 24, 30],
  [1, 7, 13, 19, 25, 31],
  [2, 8, 14, 20, 26, 32],
  [3, 9, 15, 21, 27, 33],
  [4, 10, 16, 22, 28, 34],
  [5, 11, 17, 23, 29, 35],
  [0, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29],
  [30, 31, 32, 33, 34, 35],
  [0, 7, 14, 21, 28, 35],
  [5, 10, 15, 20, , 25, 30],

];
function checkwinnner() {
  for (let data of winner) {
    const btn1 = boxes[data[0]].innerHTML;
    const btn2 = boxes[data[1]].innerHTML;
    const btn3 = boxes[data[2]].innerHTML;
    const btn4 = boxes[data[3]].innerHTML;
    const btn5 = boxes[data[4]].innerHTML;
    const btn6 = boxes[data[5]].innerHTML;


    if (btn1 != "" && btn2 != "" && btn3 != "" && btn4 != "" && btn5 != "" && btn6 != "") {
      if (btn1 === btn2 && btn2 === btn3 && btn3 === btn4 && btn4 === btn5 && btn5 === btn6) {
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

}

else{
  alert("Wrong password");
}