// gameoflife.js

class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  makeBoard() {
    let board = [];
    for (let y = 0; y < this.height; y++) {
      board[y] = [];
      for (let x = 0; x < this.width; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  liveNeighbors(x, y) {
    const directions = [
      [-1, -1], [0, -1], [1, -1],
      [-1, 0],           [1, 0],
      [-1, 1], [0, 1], [1, 1]
    ];

    let count = 0;
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && ny >= 0 && nx < this.width && ny < this.height && this.board[ny][nx]) {
        count++;
      }
    }
    return count;
  }

  nextGeneration() {
    const newBoard = this.makeBoard();

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const alive = this.board[y][x];
        const count = this.liveNeighbors(x, y);

        if (alive && (count === 2 || count === 3)) {
          newBoard[y][x] = true;
        } else if (!alive && count === 3) {
          newBoard[y][x] = true;
        }
      }
    }

    this.board = newBoard;
  }
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const cellSize = 10;
const width = Math.floor(canvas.width / cellSize);
const height = Math.floor(canvas.height / cellSize);
const game = new GameOfLife(width, height);

canvas.addEventListener('click', (e) => {
  const x = Math.floor(e.offsetX / cellSize);
  const y = Math.floor(e.offsetY / cellSize);
  game.board[y][x] = !game.board[y][x];
  draw();
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    } else {
      intervalId = setInterval(() => {
        game.nextGeneration();
        draw();
      }, 500);
    }
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < game.height; y++) {
    for (let x = 0; x < game.width; x++) {
      if (game.board[y][x]) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

let intervalId = null;
draw();