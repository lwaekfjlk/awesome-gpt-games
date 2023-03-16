const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleHeight = 100;
const paddleWidth = 10;
const ballRadius = 5;

let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 1;

document.addEventListener('mousemove', (e) => {
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;
  leftPaddleY = mouseY - paddleHeight / 2;
});

function drawPaddle(x, y) {
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX - ballRadius <= paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  } else if (ballX + ballRadius >= canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX + ballRadius < 0 || ballX - ballRadius > canvas.width) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
  }
}

function computerMovement() {
  const paddleCenter = rightPaddleY + paddleHeight / 2;
  if (paddleCenter < ballY - 35) {
    rightPaddleY += 2;
  } else if (paddleCenter > ballY + 35) {
    rightPaddleY -= 2;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle(0, leftPaddleY);
  drawPaddle(canvas.width - paddleWidth, rightPaddleY);
  drawBall(ballX, ballY);

  updateBall();
  computerMovement();

  requestAnimationFrame(draw);
}

draw();