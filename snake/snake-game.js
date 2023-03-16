const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const blockSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let snake = [{ x: Math.floor(canvasWidth / 2 / blockSize) * blockSize, y: Math.floor(canvasHeight / 2 / blockSize) * blockSize }];
let food = generateRandomFood();
let direction = 'right';

document.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
}

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100);
}

function update() {
  let newX = snake[0].x;
  let newY = snake[0].y;

  switch (direction) {
    case 'up':
      newY -= blockSize;
      break;
    case 'down':
      newY += blockSize;
      break;
    case 'left':
      newX -= blockSize;
      break;
    case 'right':
      newX += blockSize;
      break;
  }

  if (newX < 0 || newY < 0 || newX >= canvasWidth || newY >= canvasHeight || checkCollision(newX, newY)) {
    snake = [{ x: Math.floor(canvasWidth / 2 / blockSize) * blockSize, y: Math.floor(canvasHeight / 2 / blockSize) * blockSize }];
    direction = 'right';
    return;
  }

  if (newX === food.x && newY === food.y) {
    food = generateRandomFood();
  } else {
    snake.pop();
  }

  snake.unshift({ x: newX, y: newY });
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = 'green';
  for (let block of snake) {
    ctx.fillRect(block.x, block.y, blockSize, blockSize);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, blockSize, blockSize);
}

function generateRandomFood() {
  let x = Math.floor(Math.random() * canvasWidth / blockSize) * blockSize;
  let y = Math.floor(Math.random() * canvasHeight / blockSize) * blockSize;

  for (let block of snake) {
    if (block.x === x && block.y === y) {
      return generateRandomFood();
    }
  }

  return { x, y };
}

function checkCollision(x, y) {
  for (let block of snake) {
    if (block.x === x && block.y === y) {
      return true;
    }
  }
  return false;
}

gameLoop();