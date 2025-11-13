const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

const colorBoxes = document.querySelectorAll('.color-box');
console.log(colorBoxes);

const newRoundBtn = document.querySelector('#newRoundBtn');

const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');

var currentStreak = 0;
var bestStreak = 0;
var pickCorrectColor = 0;
var color = [];
var num = 6;

function webLoad() {
    onLoad();
    setGame();
    displayContent();
}


// Whenever the website will load, it will first check the previous data stored....if there will be any stored value...it will be displayed in the highestBestStreak else it will display Zero
function onLoad() {
    var temp = localStorage.getItem('highBestStreak');
    if (temp != null) {
        bestStreak = parseInt(temp);  //Here the value will be stored in form of string...to convert it into integer parseInt is used.
    }
    else {
        bestStreak = 0;
    }
}


function displayContent() {
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}


function colorGenerate() {
    var a = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var c = Math.floor(Math.random() * 256);
    return rgb(`${a}, ${b}, ${c}`);
}

function generateColor(num) {
    const arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(colorGenerate());
    }
    return arr;  //here arr is a local variable therefore it is returned in the function and will get deleted as soon as the function is closed.
}

function pickGenerator(){
    const index = Math.floor(Math.random()*color.length);
    console.log(index);
    return color[index];
}

function setGame() {
    color = generateColor(num);
    pickCorrectColor = pickGenerator();
    console.log(color);
    console.log(pickCorrectColor);
    colorDisplay.textContent = pickCorrectColor;
    for (var i = 0; i < color.length; i++) {
        colorBoxes[i].style.backgroundColor = color[i];
    }
}

webLoad();

function winGuess(event){
    var tempBox = event.target;
    if(pickCorrectColor == tempBox.style.backgroundColor){
        messageDisplay.textContent = "You answered it right";
        currentStreak++;
        displayContent();
        setGame();
        if(currentStreak>bestStreak){
            bestStreak=currentStreak;
            localStorage.setItem('highBestStreak',bestStreak);
        }
    }
    else{
        messageDisplay.textContent = "Try Again";
    }
}

colorBoxes.forEach((box)=>{
    box.addEventListener('click',winGuess);
})

function resetStreak(){
    bestStreak = 0;
    currentStreak = 0;
    localStorage.removeItem('highBestStreak');
    messageDisplay.textContent = "Game is Reseted!";
    displayContent();
}

function newRound(){
    bestStreak = currentStreak;
    currentStreak = 0;
    messageDisplay.textContent = "New Round Started";
    displayContent();
    setGame();
}

function easyGame(){
    num = 3;
    messageDisplay.textContent = "Easy Mode Activated!";
    newRound(); 
    displayContent();
    for (let j = 3; j <= 5; j++) {
        colorBoxes[j].style.display = 'none';
    }
}

function hardGame(){
    num = 6;
    messageDisplay.textContent = "Hard Mode Activated!"
    newRound();
    displayContent();
    for(var i=0;i<color.length;i++){
        colorBoxes[i].style.display='';
    }
}

resetStreakBtn.addEventListener('click',resetStreak);
newRoundBtn.addEventListener('click',newRound);
easyBtn.addEventListener('click',easyGame);
hardBtn.addEventListener('click',hardGame);
