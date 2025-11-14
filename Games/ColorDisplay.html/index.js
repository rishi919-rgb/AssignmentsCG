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
const dil1 = document.querySelector('.buti');
const dil2 = document.querySelector('.buti1');
const dil3 = document.querySelector('.buti2');
const name = document.querySelector('.name');
const bst = document.querySelector('.bst');
const waka = document.querySelector('.waka')
var currentStreak = 0; //user track
var bestStreak = 0; //data store
var pickCorrectColor = 0; //random color
var color = []; //empty array to store random color
var num = 6;  //loop control
var count = 0;

var player1 = prompt("Enter name of Player: ");
console.log(player1);
name.textContent = player1;

// made this so we do not have to call again and again
function webLoad() {
    onLoad();
    displayContent();
    setGame();
}
//Step 1 : if user already played then 1st thing to do is to bring the saved data from user's last game and if no data saved meaning the user is new then let it be zero by the if else below

// When web loads , first it will load the entire data
function onLoad() {
    var temp = localStorage.getItem('highBestStreak');
    if (temp != null) {
        // used parseint to convert into integer
        bestStreak = parseInt(temp); //localstorage contains data then return
    }
    else {
        bestStreak = 0; // if there is no data then keep 0 as it is else null will come
    }
}


//  To display content mewssage
function displayContent() {
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}

// This is why we are using math.random , to randomise the 3 values of rgb
function colorGenerate() {
    var a = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var c = Math.floor(Math.random() * 256);
    return `rgb(${a}, ${b}, ${c})`;
}

function generateColor(num) {
    const arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(colorGenerate());
    }
    return arr;
}

function pickGenerator() {
    const index = Math.floor(Math.random() * color.length);
    console.log(index);
    return color[index];
}

function setGame() {
    color = generateColor(num);
    pickCorrectColor = pickGenerator();
    console.log(color);
    console.log(pickCorrectColor);

    colorDisplay.textContent = pickCorrectColor
    for (var i = 0; i < color.length; i++) {
        colorBoxes[i].style.backgroundColor = color[i];
    }
}

webLoad();

function winGuess(event) {
    var tempBox = event.target;
    if (pickCorrectColor === tempBox.style.backgroundColor) {
        //task 2,4 (3already implemented when pressed hard then easy styles to hard , hard styles to easy)
        //2. "Streak!" Message When Streak ≥ 3
        //4. Show "First Win!" on First Correct Answer
        if (currentStreak === 0) {
            messageDisplay.textContent = "First Winnn!"
        }
        else if (currentStreak >= 2) {
            messageDisplay.textContent = "STREAKKKK!!!"
        } else {
            messageDisplay.textContent = "You Won";
        }
        setTimeout(function () {
            tempBox.style.border = "0px";
        }, 1500);

        tempBox.style.border = "5px solid gold"


        colorBoxes.forEach(box => {
            box.style.pointerEvents = "auto";
            box.style.opacity = "1";
        });
        setGame();
        currentStreak++;

        //task5
        //5. Header Text Becomes Bold on New Best Streak
        if (currentStreak > bestStreak) {
            bst.innerHTML = "<h2>Best Streakkk</h2>"
        } else {
            bst.innerHTML = "<h3>Best Streakkk</h3>"
        }
        bestStreak = Math.max(bestStreak, currentStreak);
        localStorage.setItem('highBestStreak', bestStreak);
        if (count === 1) {
            dil1.style.display = "block";
        } else if (count === 2) {
            dil2.style.display = "block";
        }
        --count;
        if (count === -3) {
            count = 1;
        }
        displayContent();


    } else {
        messageDisplay.textContent = "Try Again";
        tempBox.style.pointerEvents = "none";
        tempBox.style.opacity = "0.4";
        //task6
        tempBox.classList.add('shake');
        setTimeout(function () {
            tempBox.classList.remove('shake');

        },1000)
        ++count;
        dil();

    }
}

colorBoxes.forEach((box) => {
    console.log(box);
    box.addEventListener('click', winGuess);
});

function reset() {
    setGame();
    messageDisplay.textContent = "Pick a color!";
    colorBoxes.forEach(box => {
        box.style.pointerEvents = "auto";
        box.style.opacity = "1";
    });
    dil1.style.display = "block";
    dil2.style.display = "block";
    dil3.style.display = "block";
    count = 0;
    name.style.textDecoration = "none"


}

function easy() {
    num = 3;
    for (var j = 3; j < color.length; j++) {
        colorBoxes[j].style.display = "none";

    }
    reset();
    count = 0;
    hardBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    hardBtn.style.borderColor = "rgba(255, 255, 255, 0.3)";
    hardBtn.style.color = "white";

    easyBtn.style.backgroundColor = "white";
    easyBtn.style.borderColor = "white";
    easyBtn.style.color = "#232526";
}
function hard() {
    num = 6;
    for (var j = 0; j < 6; j++) {
        colorBoxes[j].style.display = "block";

    }
    reset();
    count = 0;
    easyBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    easyBtn.style.borderColor = "rgba(255, 255, 255, 0.3)";
    easyBtn.style.color = "white";

    hardBtn.style.backgroundColor = "white";
    hardBtn.style.borderColor = "white";
    hardBtn.style.color = "#232526";
}

function resetStreak() {
    bestStreak = 0;
    currentStreak = 0;
    localStorage.removeItem('highBestStreak');
    messageDisplay.textContent = "Game is Reseted!";
    displayContent();
    count = 0;
}

function dil() {
    if (count === 1) {
        dil1.style.display = "none";
    }
    else if (count === 2) {
        dil2.style.display = "none";

    }
    else if (count === 3) {
        dil3.style.display = "none";
        currentStreak = 0;
        name.style.textDecoration = "line-through"
        displayContent();
        colorBoxes.forEach(box => {
            box.style.pointerEvents = "none";
            box.style.opacity = ".4";
            messageDisplay.textContent = "Aww... Lives went Out of Stock"
        });
    }
}


newRoundBtn.addEventListener('click', reset);
easyBtn.addEventListener('click', easy);
hardBtn.addEventListener('click', hard);
resetStreakBtn.addEventListener('click', resetStreak)