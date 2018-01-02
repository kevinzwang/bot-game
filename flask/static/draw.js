var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

const Moves = {
    NONE: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4
}

var moveDetect = Moves.NONE;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    switch (e.keyCode) {
        case 37:
            moveDetect = Moves.LEFT;
            break;
        case 38:
            moveDetect = Moves.UP;
            break;
        case 39:
            moveDetect = Moves.RIGHT;
            break;
        case 40:
            moveDetect = Moves.DOWN;
            break;
        default:
            break;
    }
}

var gridSize = 9;

var playerX = canvas.width / 2;
var playerY = canvas.height / 2;

var blockWidth = canvas.width / gridSize;
var blockHeight = canvas.height / gridSize;

var offset = blockWidth / 2;

var gridX = 0;
var gridY = 0;

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX - offset, playerY - offset, blockWidth, blockHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawGrid() {
    // draw border first
    ctx.strokeStyle = "grey";
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();
    ctx.moveTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
    ctx.moveTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();

    gridX = gridX % blockWidth;
    gridY = gridY % blockHeight;

    // draw horizontal lines
    for (let i = gridY; i < canvas.height; i += blockHeight) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // draw vertical lines
    for (let i = gridX; i < canvas.width; i += blockWidth) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
}

var count = 0;
var currMove = Moves.NONE;

function draw() {
    if (count < 20) {
        if (currMove != Moves.NONE) {
            if (currMove == Moves.UP) {
                gridY += blockWidth / 20;
            } else if (currMove == Moves.DOWN) {
                gridY -= blockWidth / 20;
            } else if (currMove == Moves.LEFT) {
                gridX += blockHeight / 20;
            } else if (currMove == Moves.RIGHT) {
                gridX -= blockHeight / 20;
            }

            var jump = -0.2 * Math.pow((count + 1) - 10, 2) + 20
            playerY = canvas.height / 2 - jump;
        }

        moveDetect = Moves.NONE;
    } else if (moveDetect != currMove) {
        currMove = moveDetect;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawPlayer();
    count = (count + 1) % 100;
}

setInterval(draw, 10);
