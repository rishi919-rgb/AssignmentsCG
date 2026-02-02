//board
let board;
const rowCount = 21;
const coloumnCount = 19;
const tileSize = 32;
const boardWidth = coloumnCount * tileSize;
const boardHeight = rowCount * tileSize;
let context;

//images
let blueGhostImage;
let pinkGhostImage;
let redGhostImage;
let orangeGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;
let FoodImage;
let powerMode = false;
let powerTimer = null;
let scaredGhostImage;
//X = wall, O = skip, P = pac man, ' ' = food
//Ghosts: b = blue, o = orange, p = pink, r = red
const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "Xf               fX",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "Xf               fX",
    "XXXXXXXXXXXXXXXXXXX"
];

const walls = new Set();
const foods = new Set();
const ghosts = new Set();
const superFood = new Set();
let pacman;

const directions = ['U', 'D', 'L', 'R'];
let score = 0;
let lives = 3;
let gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d") //Used for drawing on the board
    loadImages();
    loadMap();

    for (let ghost of ghosts.values()) {
        const newDirection = directions[Math.floor(Math.random() * 4)];
        ghost.updateDirection(newDirection);
    }
    //     console.log(walls.size);
    //     console.log(foods.size);
    //     console.log(ghosts.size);
    update();
    document.addEventListener('keyup', movePacman);
}

function update() {
    if (gameOver) {
        return;
    }
    move();
    draw();
    setTimeout(update, 50);
}

function draw() {
    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
    for (let ghost of ghosts.values()) {
        if (powerMode) {
            context.drawImage(scaredGhostImage, ghost.x, ghost.y, ghost.width, ghost.height);
        } else {
            context.drawImage(
                ghost.image,
                ghost.x,
                ghost.y,
                ghost.width,
                ghost.height
            );
        }
    }
    for (let wall of walls.values()) {
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }
    context.fillStyle = 'white';
    for (let food of foods.values()) {
        context.fillRect(food.x, food.y, food.width, food.height);
    }
    for (let foood of superFood.values()) {
        context.drawImage(foood.image, foood.x, foood.y, foood.height, foood.width);
    }

    //score
    context.fillStyle = 'white';
    context.font = '14px sans-serif';
    if (gameOver) {
        context.fillText('GAme Over: ' + String(score), tileSize / 2, tileSize / 2);
    } else {
        context.fillText('X' + String(lives) + ' ' + String(score), tileSize / 2, tileSize / 2);
    }

}

function loadImages() {
    wallImage = new Image();
    wallImage.src = './wall.png';

    blueGhostImage = new Image();
    blueGhostImage.src = './blueGhost.png';

    orangeGhostImage = new Image();
    orangeGhostImage.src = './orangeGhost.png';

    pinkGhostImage = new Image();
    pinkGhostImage.src = './pinkGhost.png';

    redGhostImage = new Image();
    redGhostImage.src = './redGhost.png';

    pacmanUpImage = new Image();
    pacmanUpImage.src = './pacmanUp.png'

    pacmanDownImage = new Image();
    pacmanDownImage.src = './pacmanDown.png';

    pacmanLeftImage = new Image();
    pacmanLeftImage.src = './pacmanLeft.png';

    pacmanRightImage = new Image();
    pacmanRightImage.src = './pacmanRight.png';

    FoodImage = new Image();
    FoodImage.src = './SuperFood.png';

    scaredGhostImage = new Image();
    scaredGhostImage.src = './scaredGhost.png'
}

function loadMap() {
    walls.clear();
    foods.clear();
    ghosts.clear();
    superFood.clear();

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < coloumnCount; c++) {
            const row = tileMap[r];
            const tileMapChar = row[c];

            const x = c * tileSize;
            const y = r * tileSize;

            if (tileMapChar == 'X') {  //block wall
                const wall = new Block(wallImage, x, y, tileSize, tileSize)
                walls.add(wall);
            }
            else if (tileMapChar == 'b') {
                const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'o') {
                const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            } else if (tileMapChar == 'p') {
                const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            } else if (tileMapChar == 'r') {
                const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            } else if (tileMapChar == 'P') {
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize)
            } else if (tileMapChar == ' ') {
                const food = new Block(null, x + 14, y + 14, 4, 4);
                foods.add(food);
            } else if (tileMapChar == 'f') {
                const supFood = new Block(FoodImage, x, y, tileSize, tileSize);
                superFood.add(supFood);
            }
        }
    }
}

function move() {
    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;

    //check wal colison
    for (let wall of walls.values()) {
        if (collision(pacman, wall)) {
            pacman.x -= pacman.velocityX;
            pacman.y -= pacman.velocityY;
            break;
        }
    }
    for (let ghost of ghosts.values()) {

        // 1️⃣ Handle collision with Pac-Man
        if (collision(ghost, pacman)) {
            if (powerMode) {
                score += 200;
                ghost.reset();
                continue;
            } else {
                lives -= 1;
                if (lives === 0) {
                    gameOver = true;
                    return;
                }
                resetPositions();
            }
        }

        // 2️⃣ Direction control
        if (ghost.y === tileSize * 9 && ghost.direction !== 'U' && ghost.direction !== 'D') {
            ghost.updateDirection('U');
        }

        // 3️⃣ Always move ghost
        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;

        // 4️⃣ Wall collision
        for (let wall of walls.values()) {
            if (collision(ghost, wall) || ghost.x <= 0 || ghost.x + ghost.width >= boardWidth) {
                ghost.x -= ghost.velocityX;
                ghost.y -= ghost.velocityY;
                const newDirection = directions[Math.floor(Math.random() * 4)];
                ghost.updateDirection(newDirection);
                break;
            }
        }
    }

    //check fod collision
    let foodEaten = null;
    let supFoodEaten = null;
    for (let food of foods.values()) {
        if (collision(pacman, food)) {
            foodEaten = food;
            score += 10;
            break;
        }
    }
    for (let supfood of superFood.values()) {
        if (collision(pacman, supfood)) {
            supFoodEaten = supfood;
            score += 100;

            activatePowerMode();  //Activate power mode
            break;
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////
    }
    foods.delete(foodEaten);
    superFood.delete(supFoodEaten);
    if (foods.size == 0) {
        loadMap();
        resetPositions();
    }
}

function movePacman(e) {
    if (gameOver) {
        loadMap();
        resetPositions();
        lives = 3;
        score = 0;
        gameOver = false;
        update(); //resrat game loop
        return;
    }
    if (e.code == 'ArrowUp' || e.code == 'KeyW') {
        pacman.updateDirection('U');
    } else if (e.code == 'ArrowDown' || e.code == 'KeyS') {
        pacman.updateDirection('D');
    } else if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
        pacman.updateDirection('L');
    } else if (e.code == 'ArrowRight' || e.code == 'KeyD') {
        pacman.updateDirection('R');
    }

    if (pacman.direction == 'U') {
        pacman.image = pacmanUpImage;
    } else if (pacman.direction == 'D') {
        pacman.image = pacmanDownImage;
    } else if (pacman.direction == 'L') {
        pacman.image = pacmanLeftImage;
    } else if (pacman.direction == 'R') {
        pacman.image = pacmanRightImage;
    }
}

function collision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function resetPositions() {
    pacman.reset();
    pacman.velocityX = 0;
    pacman.velocityY = 0;
    for (let ghost of ghosts.values()) {
        ghost.reset();
        const newDirection = directions[Math.floor(Math.random() * 4)];
        ghost.updateDirection(newDirection)
    }
}

function activatePowerMode() {
    powerMode = true;

    //Optional: visual feedback
    pacman.image = pacmanRightImage;

    if (powerTimer) {
        clearTimeout(powerTimer);
    }
    powerTimer = setTimeout(() => {
        powerMode = false;
    }, 5000);
}

class Block {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.startX = x;
        this.startY = y;

        this.direction = 'R';
        this.velocityX = 0;
        this.velocityY = 0;
    }

    updateDirection(direction) {
        const prevDirection = this.direction;
        this.direction = direction;
        this.updateVelocity();
        this.x += this.velocityX;
        this.y += this.velocityY;

        for (let wall of walls.values()) {
            if (collision(this, wall)) {
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = prevDirection;
                this.updateVelocity();
                return;
            }
        }
    }

    updateVelocity() {
        if (this.direction == 'U') {
            this.velocityX = 0;
            this.velocityY = -tileSize / 4;
        } else if (this.direction == 'D') {
            this.velocityX = 0;
            this.velocityY = tileSize / 4;
        } else if (this.direction == 'L') {
            this.velocityX = -tileSize / 4;
            this.velocityY = 0;
        } else if (this.direction == 'R') {
            this.velocityX = tileSize / 4;
            this.velocityY = 0;
        }
    }
    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
}