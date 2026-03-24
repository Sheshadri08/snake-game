if (score > highScore) {
  highScore = score;
  localStorage.setItem("highScore", highScore);
}
