const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 640;
document.body.appendChild(canvas);

const scale = 20;
const colors = ['red', 'blue', 'green', 'purple', 'orange', 'yellow', 'cyan'];
let score = 0;

class Piece {
  constructor(shape, color) {
    this.shape = shape;
    this.color = color;
    this.x = Math.floor(canvas.width / scale / 2) - 2;
    this.y = 0;
  }

  draw() {
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.fillStyle = this.color;
          ctx.fillRect((this.x + x) * scale, (this.y + y) * scale, scale, scale);
          ctx.strokeStyle = 'black';
          ctx.strokeRect((this.x + x) * scale, (this.y + y) * scale, scale, scale);
        }
      });
    });
  }
}

const pieces = [
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
];

function getRandomPiece() {
  const shape = pieces[Math.floor(Math.random() * pieces.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return new Piece(shape, color);
}

let board = Array.from({ length: canvas.height / scale }, () => Array(canvas.width / scale).fill(0));
let piece = getRandomPiece();

function checkCollision(piece, board, x, y) {
  for (let row = 0; row < piece.shape.length; row++) {
    for (let col = 0; col < piece.shape[row].length; col++) {
      if (piece.shape[row][col] && (board[row + y] && board[row + y][col + x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function merge(piece, board) {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        board[y + piece.y][x + piece.x] = piece.color;
      }
    });
  });
}

function removeFullRows() {
  let rowsRemoved = 0;
  outer: for (let y = board.length - 1; y >= 0; --y) {
    for (let x = 0; x < board[y].length; ++x) {
      if (!board[y][x]) {
        continue outer;
      }
    }

    const row = board.splice(y, 1)[0].fill(0);
    board.unshift(row);
    ++y;
    rowsRemoved++;
  }

  if (rowsRemoved > 0) {
    score += rowsRemoved * rowsRemoved * 100;
  }
}


function drawBoard() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        ctx.fillStyle = value;
        ctx.fillRect(x * scale, y * scale, scale, scale);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x * scale, y * scale, scale, scale);
      }
    });
  });

  piece.draw();
}

function updateScore() {
  const scoreElement = document.getElementById('score');
  if (scoreElement) {
    scoreElement.textContent = `Score: ${score}`;
  }
}

function movePiece(dir) {
  if (!checkCollision(piece, board, piece.x + dir, piece.y)) {
    piece.x += dir;
  }
}

function dropPiece() {
  if (!checkCollision(piece, board, piece.x, piece.y + 1)) {
    piece.y++;
  } else {
    merge(piece, board);
    removeFullRows();
    piece = getRandomPiece();

    if (checkCollision(piece, board, piece.x, piece.y)) {
      // Game over
      board = Array.from({ length: canvas.height / scale }, () => Array(canvas.width / scale).fill(0));
      score = 0;
    }
  }
}

function rotatePiece() {
  const tempMatrix = piece.shape[0].map((_, i) => piece.shape.map(row => row[i])).reverse();
  if (!checkCollision({ ...piece, shape: tempMatrix }, board, piece.x, piece.y)) {
    piece.shape = tempMatrix;
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    movePiece(-1);
  } else if (event.key === 'd') {
    movePiece(1);
  } else if (event.key === 's') {
    dropPiece();
  } else if (event.key === 'w') {
    rotatePiece();
  }
});

function update() {
  drawBoard();
  dropPiece();
  updateScore();
}

setInterval(update, 1000 / 2);

