const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');
const tileSize = 30;
const rows = 20;
const cols = 20;
let score = 0;

const pacman = {
  x: tileSize * 2,
  y: tileSize * 2,
  dx: tileSize,
  dy: 0,
  speed: 200,
  lastMove: Date.now(),
};

const monster = {
  x: tileSize * 17,
  y: tileSize * 17,
  speed: 220,
  lastMove: Date.now(),
};

let treats = [];
let walls = [];

function init() {
  generateWallsAndTreats();
  gameLoop();
  window.addEventListener('keydown', handleKeydown);
  restartButton.addEventListener('click', handleRestart);
}

function handleKeydown(e) {
  if (e.key === 'w' && pacman.dy === 0) {
    pacman.dx = 0;
    pacman.dy = -tileSize;
  } else if (e.key === 'a' && pacman.dx === 0) {
    pacman.dx = -tileSize;
    pacman.dy = 0;
  } else if (e.key === 's' && pacman.dy === 0) {
    pacman.dx = 0;
    pacman.dy = tileSize;
  } else if (e.key === 'd' && pacman.dx === 0) {
    pacman.dx = tileSize;
    pacman.dy = 0;
  }
}

function handleRestart() {
  score = 0;
  pacman.x = tileSize * 2;
  pacman.y = tileSize * 2;
  pacman.dx = tileSize;
  pacman.dy = 0;
  monster.x = tileSize * 17;
  monster.y = tileSize * 17;
  generateWallsAndTreats();
}

function generateWallsAndTreats() {
  walls = [];
  treats = [];

  // Add your logic to randomly generate walls and treats.
  for (let i = 0; i < 10; i++) {
    const treat = {
      x: Math.floor(Math.random() * cols) * tileSize,
      y: Math.floor(Math.random() * rows) * tileSize,
    };
    treats.push(treat);
  }

  for (let i = 0; i < 15; i++) {
    const wall = {
      x: Math.floor(Math.random() * cols) * tileSize,
      y: Math.floor(Math.random() * rows) * tileSize,
    };
    walls.push(wall);
  }
}

function gameLoop() {
  updatePacman();
  updateMonster();
  checkCollisions();
  draw();
  window.requestAnimationFrame(gameLoop);
}

function updatePacman() {
  const now = Date.now();
  if (now - pacman.lastMove > pacman.speed) {
    pacman.x += pacman.dx;
    pacman.y += pacman.dy;
    pacman.lastMove = now;
  }
}

function updateMonster() {
  const now = Date.now();
  if (now - monster.lastMove > monster.speed) {
    const dx = Math.sign(pacman.x - monster.x) * tileSize;
    const dy = Math.sign(pacman.y - monster.y) * tileSize;
    if (Math.abs(dx) > Math.abs(dy)) {
      monster.x += dx;
    } else {
      monster.y += dy;
    }
    monster.lastMove = now;
  }
}

function checkCollisions() {
  // Check collisions between Pacman, treats, walls, monster, and border
  if (pacman.x < 0 || pacman.y < 0 || pacman.x >= canvas.width || pacman.y >= canvas.height) {
    handleGameOver();
    return;
  }

  for (let i = treats.length - 1; i >= 0; i--) {
    const treat = treats[i];
    if (pacman.x === treat.x && pacman.y === treat.y) {
      treats.splice(i, 1);
      score += 10;
    }
  }

  for (const wall of walls) {
    if (pacman.x === wall.x && pacman.y === wall.y) {
      pacman.x -= pacman.dx;
      pacman.y -= pacman.dy;
    }
  }

  if (pacman.x === monster.x && pacman.y === monster.y) {
    handleGameOver();
    return;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPacman();
  drawMonster();
  drawTreats();
  drawWalls();
  scoreDisplay.textContent = score;
}

function drawPacman() {
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(pacman.x + tileSize / 2, pacman.y + tileSize / 2, tileSize / 2, 0.2 * Math.PI, 1.8 * Math.PI);
  ctx.lineTo(pacman.x + tileSize / 2, pacman.y + tileSize / 2);
  ctx.closePath();
  ctx.fill();
}

function drawMonster() {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(monster.x + tileSize / 2, monster.y + tileSize / 2, tileSize / 2, 0, 2 * Math.PI);
  ctx.fill();
}

function drawTreats() {
  ctx.fillStyle = 'white';
  for (const treat of treats) {
    ctx.beginPath();
    ctx.arc(treat.x + tileSize / 2, treat.y + tileSize / 2, tileSize / 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function drawWalls() {
  ctx.fillStyle = 'blue';
  for (const wall of walls) {
    ctx.fillRect(wall.x, wall.y, tileSize, tileSize);
  }
}

function handleGameOver() {
  alert('Game Over');
  handleRestart();
}

init();

