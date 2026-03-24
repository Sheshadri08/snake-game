const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake, food, dx, dy, score, gameInterval;

function startGame() {
  snake = [{ x: 200, y: 200 }];
  food = randomFood();
  dx = 20;
  dy = 0;
  score = 0;
  document.getElementById("score").innerText = score;

  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 120);
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 20) * 20,
    y: Math.floor(Math.random() * 20) * 20
  };
}

function gameLoop() {
  moveSnake();

  if (checkCollision()) {
    clearInterval(gameInterval);
    alert("Game Over! Score: " + score);
    return;
  }

  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = randomFood();
  } else {
    snake.pop();
  }

  drawGame();
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
}

function checkCollision() {
  const head = snake[0];

  // Wall collision
  if (head.x < 0 || head.y < 0 || head.x >= 400 || head.y >= 400) {
    return true;
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function drawGame() {
  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Snake
  ctx.fillStyle = "#22c55e";
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, 20, 20);
  });

  // Food
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(food.x, food.y, 20, 20);
}

// Controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -20;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = 20;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -20; dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = 20; dy = 0;
  }
});
