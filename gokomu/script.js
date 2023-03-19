const boardSize = 19;
const board = document.getElementById("board");
const message = document.getElementById("message");
let cells = [];
let currentPlayer = "black";
let gameOver = false;

for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", handleCellClick.bind(null, i));
    board.appendChild(cell);
    cells.push(cell);
}

function handleCellClick(index) {
    if (gameOver || cells[index].classList.contains("black") || cells[index].classList.contains("white")) {
        return;
    }
    cells[index].classList.add(currentPlayer);
    if (checkWin(index)) {
        message.innerText = `${currentPlayer.toUpperCase()} wins!`;
        gameOver = true;
    } else if (isDraw()) {
        message.innerText = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === "black" ? "white" : "black";
        message.innerText = `Next player: ${currentPlayer.toUpperCase()}`;
    }
}

function isDraw() {
    return cells.every(cell => cell.classList.contains("black") || cell.classList.contains("white"));
}

function checkWin(index) {
    const [row, col] = [Math.floor(index / boardSize), index % boardSize];
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
    ];

        for (const [dr, dc] of directions) {
        let count = 1;
        for (let i = 1; i < 5; i++) {
            const newRow = row + dr * i;
            const newCol = col + dc * i;
            if (isInBounds(newRow, newCol) && cells[newRow * boardSize + newCol].classList.contains(currentPlayer)) {
                count++;
            } else {
                break;
            }
        }
        for (let i = 1; i < 5; i++) {
            const newRow = row - dr * i;
            const newCol = col - dc * i;
            if (isInBounds(newRow, newCol) && cells[newRow * boardSize + newCol].classList.contains(currentPlayer)) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 5) {
            return true;
        }
    }
    return false;
}

function isInBounds(row, col) {
    return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}

message.innerText = `Next player: ${currentPlayer.toUpperCase()}`;

