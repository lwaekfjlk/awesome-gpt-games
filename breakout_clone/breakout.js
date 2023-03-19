const canvas = document.getElementById('breakout');
const ctx = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 600;

let ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  dx: 2,
  dy: -2,
  radius: 10
};

let paddle = {
  width: 100,
  height: 20,
  x: (canvas.width - 100) / 2,
  y: canvas.height - 20
};

const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function detectCollision() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy;
          b.status = 0;
        }
      }
    }
  }
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  detectCollision();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width
) {
ball.dy = -ball.dy;
} else {
resetGame();
}
}

ball.x += ball.dx;
ball.y += ball.dy;

requestAnimationFrame(updateGame);
}

function resetGame() {
ball.x = canvas.width / 2;
ball.y = canvas.height - 30;
ball.dx = 2;
ball.dy = -2;

for (let c = 0; c < brickColumnCount; c++) {
for (let r = 0; r < brickRowCount; r++) {
bricks[c][r].status = 1;
}
}
}

function movePaddle(event) {
let relativeX = event.clientX - canvas.offsetLeft;
if (relativeX > paddle.width / 2 && relativeX < canvas.width - paddle.width / 2) {
paddle.x = relativeX - paddle.width / 2;
}
}

canvas.addEventListener('mousemove', movePaddle, false);

updateGame();