const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document.querySelector('#startBtn');
const holes = document.querySelectorAll('.hole');
console.log(holes);
const moles = document.querySelectorAll('.mole');
const reset = document.querySelector('#resetBtn');
const pause = document.querySelector('#pauseBtn');
const scc = document.querySelector('.scc');
const waka = document.querySelector('.waka');
const hit = document.querySelector('.hits');
const fass = document.querySelector('.fass');
const lastGame = document.querySelector('.lastGame'); // assume this exists
pause.disabled = true;
//req variables
var intervalId = null;      // separate interval id for game timer
var score = 0;
var time = 30;
var bestScore = 0;
var playGame = false;
var flag = true;
var popTimeout = null;
var stTime = 0;
var timeTaken = 0;
var fastest = Infinity;
function webLoad() {
    onLoad();
    displayContent();
}

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



//step 2 2nd phase Reflecting the actual avlue in the required html element using textcontent

function displayContent() {
    scoreDisplay.textContent = score;
    hit.textContent = `Hits:- ${score}`;
    timeLeftDisplay.textContent = time;
    maxScoreDisplay.textContent = bestScore;
}
webLoad();



//randome index which will generate the distinct element
function randomIndex() {
    var index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

//random time generator implewmentation
function randomTimeGenerator(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//implememt pop game
function popImageGame() {
    if (!playGame) return;
    stTime = Date.now();
    //task4
    var randomTime;
    if (time < 10) {
        var randomTime = randomTimeGenerator(500, 1000);
    } else {
        var randomTime = randomTimeGenerator(800, 1200);
    }
    var hole = randomIndex();
    var mole = hole.querySelector('.mole');
    if (score > 20) {
        scc.style.color = "gold"
    } else {
        scc.style.color = "white"
    }
    // show the mole
    mole.classList.add('up');

    // store timeout id so we can clear it later
    popTimeout = setTimeout(function () {
        mole.classList.remove('up');
        // also ensure bonked class removed (in case)
        mole.classList.remove('bonked');
        // recursively pop next mole only if still playing
        if (playGame) popImageGame();
    }, randomTime);
}
//ENDGAME implementation
function endGame() {
    playGame = false;
    startBtn.disabled = false;
        startBtn.textContent = "Play Again";
    //task7
    sessionStorage.setItem('lastScore', score)

    scc.innerHTML = 'Last <br> Score'

    var last = sessionStorage.getItem('lastScore');
    //   gameId = null
    clearInterval(intervalId);
    intervalId = null;
    if (popTimeout) {
        clearTimeout(popTimeout);
        popTimeout = null;
    }

    if (last > Number(bestScore)) {
        bestScore = last;
        maxScoreDisplay.style.textShadow = "0 0 10px yellow";
        setTimeout(function () {
            maxScoreDisplay.style.textShadow = "0 0 0 white";
        }, 4500)
        localStorage.setItem('highScoreGame', bestScore);
        alert(`You Score is higher than the previous one: ${last}`)
    } else {
        alert(`your score is: ${score}`);
    }
    lastGame.textContent = `Last: ${last}`;
    displayContent();
    pause.disabled = true;
    pause.style.backgroundColor = "#8e6c6c";
    //task3
}

//Actual game start;
function startGame() {
    score = 0;
    time = 30;
    playGame = true;
    fastest = Infinity;
    fass.textContent = "__";
    scc.innerHTML = 'Score';
    startBtn.disabled = true;
    popImageGame();
    intervalId = setInterval(function () {
        time--;
        if (time == 0) {
            endGame();
        }
        displayContent();
    }, 1000);
    pause.disabled = false;
    pause.style.backgroundColor = "red"
    displayContent();

}
function bonk(event) {
    const mole = event.currentTarget;
    if (playGame == false) return;
    if (mole.classList.contains('up')) {

        score++;
        timeTaken = Date.now() - stTime;

        mole.classList.remove('up');
        mole.classList.add('bonked');

        setTimeout(() => mole.classList.remove('bonked'), 200);
        //task8
        if (timeTaken < fastest) {
            fastest = timeTaken;
            fass.textContent = `${timeTaken}ms`;
        }
    }

    //taskkkk
    setTimeout(function () {
        waka.textContent = ""
    }, 700);
    waka.textContent = "Whack!!!";
    lastGame.textContent = '';


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
    intervalId = null;
    playGame = false;            // ✅ ensure game fully stopped
    pause.textContent = "Pause";
    pause.style.backgroundColor = "#8e6c6c";
    webLoad();
    pause.disabled = true;
    if (popTimeout) {
        clearTimeout(popTimeout);
        popTimeout = null;
    }
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    // reset fastest UI
    fastest = Infinity;
    fass.textContent = '--';
    displayContent();
    startBtn.disabled = false;

}
var flag = true;
function pauseGame() {

    if (flag == true) {
        pause.style.backgroundColor = "green";
        pause.textContent = "Resume";
        flag = false;
        clearInterval(intervalId);
        playGame = false;
        intervalId = null;
        if (popTimeout) {
            clearTimeout(popTimeout);
            popTimeout = null;
        }
    } else {
        pause.style.backgroundColor = "red";
        pause.textContent = "Pause";
        flag = true;
        playGame = true;
        popImageGame();
        intervalId = setInterval(function () {
            time--;
            if (time <= 0) {
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