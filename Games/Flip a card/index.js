//DOM Elements
const board = document.getElementById("board");
const movesEl = document.getElementById("moves");
const pairsEl = document.getElementById('pairs');
const timeEl = document.getElementById("timeLeft");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");
const bestScoreEl = document.getElementById("bestScore");
const overlay = document.getElementById("countdownOverlay");

// Game configuration
const rows = 3; // grid Layout choosen via CSS; use 6x3 - 18 cards (9 pairs)
const cols = 6;
const totalPairs = 9;
const initialTime = 60; // seconds

//State
let firstCard = null;
let secondCard = null;
let busy = false;
let moves = 0;
let matchedPairs = 0;
let timeLeft = initialTime;
let timerId = null;
let pendingTimeouts = [];
let bestScore = null;
var count = 0;

//step-1
//call -> entire previous datra -> store -> -> bestscore variable...
function onLoad() {
    restartBtn.disabled = true;

    var temp = localStorage.getItem('highScore');
    if (temp != null) {
        bestScore = parseInt(temp);
    } else {
        bestScore = 0;
    }
}
//Actual content reflect -> html file me...
function displayContent() {
    timeEl.textContent = timeLeft;
    bestScoreEl.textContent = bestScore;
    movesEl.textContent = moves;
    pairsEl.textContent = matchedPairs;


}

//Step2 Implement
// --> Destructure --> [arrray , object]
// arr1 = [1,2,3], arr2 = [4,5,6]  arr3 = [...arr1,...arr2]
//usde this instead of loop + push 
//         ---- e [1-9]9 ->Destrucvture
// number - 
//         ----> Shuffle logo
onLoad();
displayContent();

var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('inner');

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = value;

    inner.appendChild(front);
    inner.appendChild(back);

    card.appendChild(inner);

    return card;
}
function start() {
    cardMaking();
    startBtn.style.pointerEvents = 'none';
    restartBtn.disabled = false;
        board.style.pointerEvents = 'auto';

    timerId = setInterval(function () {
        timeLeft--;
        if (timeLeft == 0) {
            endGame();
        }
        displayContent();
    }, 1000);
}

function endGame() {
    board.style.pointerEvents = 'none';
    timeLeft = 60;

    clearInterval(timerId);
    board.innerHTML = '';
    localStorage.setItem('highScore', bestScore);
    if (matchedPairs > bestScore) {
        bestScore = matchedPairs;
    }
    displayContent();
    matchedPairs = 0;
    moves = 0;
}
function restart() {
    board.innerHTML = '';
    clearInterval(timerId);
    timeLeft = 60;
    cardMaking();
    moves = 0;
    firstCard = null;
    secondCard = null;
    matchedPairs = 0;
    board.style.pointerEvents = 'auto';
    timerId = setInterval(function () {
        timeLeft--;
        if (timeLeft == 0) {
            endGame();
        }
        displayContent();
    }, 1000);
    displayContent();

}

function reset() {

    endGame();
    bestScore = 0;
    displayContent();
    startBtn.style.pointerEvents = 'auto';
}
function matchFound(card) {
    if (card === firstCard || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    if (firstCard == null) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;
    movesEl.textContent = moves;

    console.log(firstCard);
    console.log(secondCard);

    var a = firstCard.querySelector('.back');
    console.log('The back card for a :' + a.textContent);

    var b = secondCard.querySelector('.back');
    console.log('The back card for b :' + b.textContent);

    if (a.textContent === b.textContent) {

        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard = null;
        secondCard = null;
        matchedPairs++;
        pairsEl.textContent = matchedPairs;
        if (matchedPairs === 9) {
            setTimeout(function () {
                
                endGame();
            }, 1500);

        }
    } else {
        setTimeout(function () {

            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
            board.style.pointerEvents = 'auto';

        }, 700);
        board.style.pointerEvents = 'none';


    }
}


function cardMaking() {
    // board.innerHTML = '';
    //destructuring method concept...
    var arr3 = [...arr1, ...arr1];
    console.log(`before shuffle ${arr3}`);

    //shuffling -> position exchange..
    for (let i = arr3.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        // console.log(j)
        var a = arr3[i];
        arr3[i] = arr3[j];
        arr3[j] = a;
    }
    console.log(`After shuffle ${arr3}`);
    var i = 0;
    arr3.forEach((value) => {
        i++;
        const card = createCard(value);
        console.log(i);
        console.log(card);
        board.appendChild(card);
        card.addEventListener('click', function () {
            matchFound(card);
        });
    })
}

startBtn.addEventListener('click', start);
restartBtn.addEventListener('click', restart);
resetBtn.addEventListener('click', reset);