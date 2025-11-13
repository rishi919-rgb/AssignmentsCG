const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document.querySelector('#startBtn');
const holes = document.querySelectorAll('.hole');
console.log(holes);
const moles = document.querySelectorAll('.mole');
const reset = document.querySelector('#resetBtn');
const pause = document.querySelector('#pauseBtn');
pause.disabled = true;
//req variables
var score = 0;
var time = 30;
var bestScore = 0;
var playGame = false;
var gameId = null;
var flag = true;
var popTimeout = null;

//step 2 1st phase load the entire data
function onLoad() {
    var temp = localStorage.getItem('highScoreGame');
    if (temp != null) {
        bestScore = temp;
    } else {
        bestScore = 0;
    }
};

//call on every starrt game

function webLoad() {
    onLoad();
    displayContent();
}


//step 2 2nd phase Reflecting the actual avlue in the required html element using textcontent

function displayContent() {
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = time;
    maxScoreDisplay.textContent = bestScore;
}
webLoad();

//random time generator implewmentation
function randomTimeGenerator(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//randome index which will generate the distinct element
function randomIndex() {
    var index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

//implememt pop game
function popImageGame() {
    if (!playGame) return;
    var randomTime = randomTimeGenerator(100, 1000);
    var hole = randomIndex();
    var mole = hole.querySelector('.mole');
    if (playGame) {
        mole.classList.add('up');
        setTimeout(function () {
            mole.classList.remove('up');
            popImageGame();
        }, randomTime);
    }
}
//ENDGAME implementation
function endGame() {
    clearInterval(gameId);
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('highScoreGame', bestScore);
        alert(`You Score is higher than the previous one: ${score}`)
    } else {
        alert(`your score is: ${score}`);
    }
    score = 0;
    displayContent();
    startBtn.disabled = false;
    playGame = false;
    pause.disabled = true;
    pause.style.backgroundColor = "#8e6c6c";
    clearTimeout(popTimeout);  // ✅ stop mole loop

}

//Actual game start;
function startGame() {
    score = 0;
    time = 30;
    playGame = true;

    startBtn.disabled = true;
    popImageGame();
    gameId = setInterval(function () {
        time--;
        if (time == 0) {
            endGame();
        }
        displayContent();
    }, 1000);
    pause.disabled = false;
    pause.style.backgroundColor = "red"

}
function bonk(event) {
    if (playGame == false) return;
    if (event.target.classList.contains('up')) {
        score++;
        event.target.classList.remove('up');
        event.target.classList.add('bonked');
    }
    displayContent();
}



//reset
function resetGame() {
    playGame = false;
    score = 0;
    bestScore = 0;
    time = 30;
    startBtn.disabled = false;
    localStorage.setItem('highScoreGame', bestScore);
    gameId = null;
    playGame = false;            // ✅ ensure game fully stopped
    flag = true;                 // ✅ reset pause toggle state
    pause.textContent = "Pause";
    pause.style.backgroundColor = "#8e6c6c";
    webLoad();
    pause.disabled = true;
    clearTimeout(gameId);
    clearInterval(gameId);
    gameId = null;
    clearTimeout(popTimeout);  // ✅ stop mole loop


}

function pauseGame() {

    if (flag == true) {
        pause.style.backgroundColor = "green";
        pause.textContent = "Resume";
        flag = false;
        clearInterval(gameId);
        playGame = false;

    } else {
        pause.style.backgroundColor = "red";
        pause.textContent = "Pause";
        flag = true;
        playGame = true;
        popImageGame();
        gameId = setInterval(function () {
            time--;
            playGame = true;
            popImageGame();
            if (time == 0) {
                endGame();
            }
            displayContent();
        }, 1000);
    }
}
//add event listeneer
startBtn.addEventListener('click', startGame);
reset.addEventListener('click', resetGame);
pause.addEventListener('click', pauseGame);
//this is a normal loop use to apply the add event listener in each mole class
moles.forEach((box) => {
    box.addEventListener('click', bonk);
});