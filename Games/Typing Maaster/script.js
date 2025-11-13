//DOM Elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerDisplay = document.querySelector('#timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWPMDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const fifteen = document.querySelector('#fifteen');
const thirty = document.querySelector('#thirty');
const sixty = document.querySelector('#sixty');

//Test texts
const testTexts = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster. ",
    "Technology has revolutionized the way we communicate and work in the modern digital era. ",
    "Typing speed is an essential skill for anyone working with computers in today's workplace. "
];

//gamestate
let currentText = '';
let timeLeft = 60;
let timerInterval = null;
let startTime = null;
let isTestActive = false;
let bestWPM = 0;
let wpm = 0;

function webLoad() {
    displayContent();
    onLoad();


}
//step2 add eventlistener
//startbtn --> disabled
//time control --> decremert

function onLoad() {
    var temp = sessionStorage.getItem('getHighWpm');
    if (temp != null) {
        bestWPM = parseInt(temp);
    } else {
        bestWPM = 0;
    }
}

function displayContent() {
    timerDisplay.textContent = timeLeft;
    bestWPMDisplay.textContent = bestWPM;
}

webLoad();

function endGame() {

    clearInterval(timerInterval);

    timeLeft = 60;

    startBtn.disabled = false;
    if (wpm > bestWPM) {
        bestWPM = wpm;
        sessionStorage.setItem('getHighWpm', bestWPM);
        alert(`Scored high score than the previous one :${wpm}`);
    } else {
        alert(`Score is : ${wpm}`);
    }
    wpm = 0;
    wpmDisplay.textContent = wpm;
    typingArea.value = "";
    typingArea.disabled = true;
    displayContent();
    fifteen.style.pointerEvents = "auto";
    thirty.style.pointerEvents = "auto";
    sixty.style.pointerEvents = "auto";
}

function startGame() {
    startBtn.disabled = true;
    fifteen.style.pointerEvents = "none";
    thirty.style.pointerEvents = "none";
    sixty.style.pointerEvents = "none";

    textDisplay.style.cursor = "none";


    currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
    textDisplay.textContent = currentText;

    typingArea.disabled = false;
    typingArea.value = "";
    typingArea.setAttribute('placeholder', 'Now the input box is enabled, use it to type something');

    timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endGame();
        }
        displayContent();
    }, 1000);
}

function updateStatus() {
    var typed = typingArea.value;
    const minute = Math.floor(Date.now() - startTime) / 1000 / 60;     //Converting in minute
    console.log(minute);
    const word = typed.trim().split(/\s+/).filter(w => w.length > 0);
    console.log(word);
    wpm = (minute > 0) ? Math.floor(word.length / minute) : 0;
    wpmDisplay.textContent = wpm;

    var currentScore = 0;
    // To add extra when finished
    if (currentText.length - 1 == typed.length) {
        currentText += testTexts[Math.floor(Math.random() * testTexts.length)];
        textDisplay.textContent = currentText;
        highLight();
    }

    for (var i = 0; i < currentText.length; i++) {
        if (currentText[i] === typed[i]) {
            currentScore++;
        }
    }
    const accuracy = (typed.length > 0) ? Math.floor(currentScore / typed.length * 100) : 0;
    accuracyDisplay.textContent = accuracy;
}

function highLight() {
    var typed = typingArea.value;
    var highText = '';

    for (let i = 0; i < currentText.length; i++) {
        if (i < typed.length) {  //red or green for only typed , already typed
            if (currentText[i] === typed[i]) {
                highText += `<span class="correct">${currentText[i]}</span>`;
            } else {
                highText += `<span class="incorrect">${currentText[i]}</span>`;
            }
        } else {
            highText += currentText[i]
        }
    } textDisplay.innerHTML = highText;
}

function typeControl() {
    if (startTime == null) {
        startTime = Date.now();        //date.now() --> number (millisecond) in 24 hrs format
    }
    console.log(startTime);
    updateStatus();
    highLight();
}

function fift() {
    timeLeft = 15;
    webLoad();
}

function thirt() {
    timeLeft = 30;
    webLoad();
}

function sixt() {
    timeLeft = 60;
    webLoad();
}
//step3 : update status --> a>WPM -- :1.Minute(P) , 2. Word(P) 3.Word/minute ,,,   b> Acuracy
// 1.wpm --> word --(user/keypres)--> single character -->array->word<-index 
// const word = text.trim().split(/\s+/).filter(w => w.length > 0)
// filter array --> length > 0
// split --> string--(position)--> array
// trim removes spaces as usual
// var text = typeArea.value; {"regular expression"}

//individial character color change approach --> 
//eg --> GOOD_AFTERNOON
//eg --> GOODAFTER_NOON check top bottom but the problem is we cannot change individually so we do use span tag like <span>GOOD</span> (green)
//textContent = "GoodAfternoon"

//difference between innerhtml and text context 
// innerhtml is used to include thge tags also like we didi in this code where we icluded span tag also while the text content is just used to add the content
startBtn.addEventListener('click', startGame);

//user --> interact with input bbox

typingArea.addEventListener('input', typeControl);    //for keys
fifteen.addEventListener('click', fift);
thirty.addEventListener('click', thirt);
sixty.addEventListener('click', sixt);