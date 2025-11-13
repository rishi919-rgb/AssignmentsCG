var currentScore = document.querySelector('#currentScore')
var highScore = document.querySelector('#highScore')
var timer = document.querySelector('#timer')
var clickButton = document.querySelector('#clickButton')
var startButton = document.querySelector('#startButton')
var statusMessage = document.querySelector('#statusMessage')
var resetButton = document.querySelector('#resetButton')
var pauseButton = document.querySelector('#pauseButton')
var resumeButton = document.querySelector('#resumeButton')
var vido = document.querySelector('.vido');
var userName = prompt("Eeter Your name :");
var current = 0;
var high = 0; 
var timerleft = 10;
var timeid = null;
var flag = false;


function onWebsite(){
    loadData();
    displayContext();
}

function loadData(){
    var temp = localStorage.getItem('highScore');
    if(temp !== null){
        high =temp;
    }
    else{
        high = 0;
    }
}

function temp(){
    localStorage.setItem('highScore', current);
    highScore = current;
}


function displayContext(){
    currentScore.textContent = current;
    highScore.textContent = high;
    timer.textContent = timerleft;
}

function statusMsg(msg){
    statusMessage.textContent = msg ;
}

function startGame(){
    current = 0;
    timerleft = 10;
    flag = true;

    clickButton.disabled = false;
    startButton.disabled = true;

    displayContext();
    statusMsg(` Game is Progress... Click Fast! `);

    timeid = setInterval (function() {
        timerleft--;
        displayContext();

        if(timerleft <=0){
            endGame();
        }
    },1000 );

}

function endGame() {
    clearInterval(timeid);
    timeid = null;
    flag = false;
    
    clickButton.disabled = true;
    startButton.disabled = false;
    
    if (current > high) {
        temp();
        statusMsg(`🎉 New High Score: ${current}! Amazing!  ${userName}`);
        vido.style.display ="block";
    } else {
        statusMsg(`Game Over!  ${userName} score: ${current} `);
    }
    
    displayContext();
}

function userClick(){
    if(flag){
        current++;
        displayContext();
    }
}

function resetScore() {
    const confirmed = confirm('Are you sure you want to reset your high score?');
    
    if (confirmed) {
        localStorage.removeItem('clickGameHighScore');
        high = 0;
        displayContext();
        statusMsg('High score has been reset!');
    }
}
function pauseGame(){
    clickButton.disabled= true;
    resetButton.disabled= true;
    resumeButton.style.display = "block";
    pauseButton.style.display = "none";
     clearInterval(timeid);
     statusMsg('The Game is Paused');
}
function resumeGame(){
    clickButton.disabled = false;
    resetButton.disabled= true;
    resumeButton.style.display = "none";
    pauseButton.style.display = "block";
    statusMsg(`Game is Progress... Click Fast!  `)
     timeid = setInterval (function() {
        timerleft--;
        displayContext();

        if(timerleft <=0){
            endGame();
        }
    },1000 );
}


onWebsite();

clickButton.addEventListener('click', userClick);
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetScore);
pauseButton.addEventListener('click', pauseGame);
resumeButton.addEventListener('click',resumeGame);
