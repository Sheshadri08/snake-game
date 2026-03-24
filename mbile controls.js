function setDirection(dir) {
  if (dir === "up" && dy === 0) { dx = 0; dy = -20; }
  if (dir === "down" && dy === 0) { dx = 0; dy = 20; }
  if (dir === "left" && dx === 0) { dx = -20; dy = 0; }
  if (dir === "right" && dx === 0) { dx = 20; dy = 0; }
}
