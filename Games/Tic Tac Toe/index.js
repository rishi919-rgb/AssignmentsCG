// button monitor




var player1 = prompt("Enter name of 1st Player: ");
console.log(player1);
var player2 = prompt("Enter name of 2nd Player");
console.log(player2);

// let player1 = sessionStorage.getItem("player1") || prompt("Enter your name player1:");
// let player2 = sessionStorage.getItem("player2") || prompt("Enter your name player2:");

sessionStorage.setItem("player1", player1);
sessionStorage.setItem("player2", player2);

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
  for (var data of winner) {
    const btn1 = boxes[data[0]].innerHTML;
    const btn2 = boxes[data[1]].innerHTML;
    const btn3 = boxes[data[2]].innerHTML;

    if (btn1 != "" && btn2 != "" && btn3 != "") {
      if (btn1 === btn2 && btn2 === btn3) {
        if (btn3 === "O") {
          alert("The winner is " + player1);
          result.innerHTML = "The WINNER is " + player1;


          for (let box of boxes) {
            box.disabled = true;

          }
        }
        else {
          alert("The WINNER is " + player2);
          result.innerHTML = "The WINNER is " + player2;
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
    box.style.backgroundColor = "rgb(205, 194, 252)";
    result.innerHTML = "";
    player = true;
  }
}

function reset1() {
  for (let box of boxes) {
    box.disabled = false;
    result.innerHTML = "";
  }
}


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





// // button monitor
// var player1 = prompt("Enter name of 1st Player: ");
// console.log(player1);
// var player2 = prompt("Enter name of 2nd Player");
// console.log(player2);

// const boxes = document.querySelectorAll(".box");
// const reset = document.querySelector("#reset");
// const new1 = document.querySelector("#new1");
// const result = document.querySelector('.result');

// let player = true; // true = O, false = X
// console.log(boxes);

// const winner = [
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// // ✅ Save game state to sessionStorage
// function saveGameState() {
//   let state = [];
//   boxes.forEach((box) => state.push(box.innerHTML));
//   sessionStorage.setItem("gameState", JSON.stringify(state));
//   sessionStorage.setItem("playerTurn", player); // save turn
//   sessionStorage.setItem("result", result.innerHTML); // save result text
// }

// // ✅ Load game state from sessionStorage
// function loadGameState() {
//   let state = JSON.parse(sessionStorage.getItem("gameState"));
//   let turn = sessionStorage.getItem("playerTurn");
//   let resText = sessionStorage.getItem("result");

//   if (state) {
//     boxes.forEach((box, index) => {
//       box.innerHTML = state[index];
//       if (state[index] === "O") box.style.backgroundColor = "hotpink";
//       else if (state[index] === "X") box.style.backgroundColor = "red";
//       box.disabled = state[index] !== ""; // disable if already filled
//     });
//   }

//   if (turn !== null) player = (turn === "true"); // restore turn
//   if (resText) result.innerHTML = resText;
// }

// function checkwinnner() {
//   for (var data of winner) {
//     const btn1 = boxes[data[0]].innerHTML;
//     const btn2 = boxes[data[1]].innerHTML;
//     const btn3 = boxes[data[2]].innerHTML;

//     if (btn1 != "" && btn2 != "" && btn3 != "") {
//       if (btn1 === btn2 && btn2 === btn3) {
//         if (btn3 === "O") {
//           alert("The winner is " + player1);
//           result.innerHTML = "The WINNER is " + player1;
//         } else {
//           alert("The WINNER is " + player2);
//           result.innerHTML = "The WINNER is " + player2;
//         }
//         for (let box of boxes) box.disabled = true;
//       }
//     }
//   }
//   saveGameState(); // ✅ save after checking winner
// }

// function enableAll() {
//   for (let box of boxes) {
//     box.disabled = false;
//     box.innerHTML = "";
//     box.style.backgroundColor = "rgb(205, 194, 252)";
//   }
//   result.innerHTML = "";
//   player = true;
//   saveGameState(); // reset storage
// }

// function reset1() {
//   for (let box of boxes) {
//     box.disabled = false;
//   }
//   result.innerHTML = "";
//   saveGameState();
// }

// boxes.forEach((box) => {
//   box.addEventListener("click", () => {
//     if (player) {
//       box.innerHTML = "O";
//       box.style.backgroundColor = "hotpink";
//       player = false;
//     } else {
//       box.innerHTML = "X";
//       box.style.backgroundColor = "red";
//       player = true;
//     }
//     box.disabled = true;
//     checkwinnner();
//     saveGameState(); // ✅ save after every move
//   });
// });

// if (reset) {
//   reset.addEventListener("click", () => {
//     reset1();
//   });
// }

// if (new1) {
//   new1.addEventListener("click", () => {
//     enableAll();
//     console.clear();
//   });
// }

// // ✅ Load saved game if available
// window.onload = loadGameState;






// // var player1 =prompt("enter your name palyer1:");
// // console.log(player1);

// // var player2 =prompt("enter your name player2:");
// // console.log(player2);

// let player1 = sessionStorage.getItem("player1") || prompt("Enter your name player1:");
// let player2 = sessionStorage.getItem("player2") || prompt("Enter your name player2:");

// sessionStorage.setItem("player1", player1);
// sessionStorage.setItem("player2", player2);

// console.log(player1);
// console.log(player2);

// const boxes = document.querySelectorAll(".box");
// const result = document.getElementById("result");  // <--
// const resetBtn = document.getElementById("reset"); // <--

// let player = true;



// const winner = [
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];

// function checkwinner() {
//     for (let data of winner) {
//         const [a, b, c] = data;       
//         const btn1 = boxes[a].innerHTML;
//         const btn2 = boxes[b].innerHTML;
//         const btn3 = boxes[c].innerHTML;

//         if (btn1 !== "" && btn2 !== "" && btn3 !== "") {
//             if (btn1 === btn2 && btn2 === btn3) {
//                 //   console.log("The Winner is " + btn1);  
//                 if(btn1==="O"){
//                 result.innerText = "🎉 The Winner is " + player1 + " 🎉";
//                 }
//                 else{
//                     result.innerText = "🎉 The Winner is " + player2 + " 🎉";
//                 }
//                  boxes.forEach((box) => (box.disabled = true));
                 
//             }
//         }
//     }
// };

// boxes.forEach((box) => {
//     // console.log(box.innerHTML);

//     box.addEventListener("click", () => {
//         // console.log(box.innerHTML);

//         if (player) {
//             box.innerHTML = "O";
//             player = false;
//         }
//         else {
//             box.innerHTML = "X";
//             player = true;
//         }
//         box.disabled = true;
//         checkwinner();
        
//     });
// });
// resetBtn.addEventListener("click", () => {
//   boxes.forEach((box) => {
//     box.innerHTML = "";
//     box.disabled = false;
//   });
//   result.innerText = "";
//   player = true;
// });