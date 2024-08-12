/**
 * スケールの表示をする。
 */
const drawScale = () => {
  fill(255);
  rect(0, CANVAS_HEIGHT / 2 - 50, CANVAS_WIDTH, 50);
  rect(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH, 50);
  fill(0);
  stroke(0);
  strokeWeight(1);
  for (let x = 0; x <= CANVAS_WIDTH; x += 5) {
    if (x % 50 == 0) {
      line(x, CANVAS_HEIGHT / 2 - 50, x, CANVAS_HEIGHT / 2 - 30);
      text(x / 50, x, CANVAS_HEIGHT / 2 - 10);
      line(x, CANVAS_HEIGHT - 50, x, CANVAS_HEIGHT - 30);
      text(x / 50, x, CANVAS_HEIGHT - 10);
    } else {
      line(x, CANVAS_HEIGHT / 2 - 50, x, CANVAS_HEIGHT / 2 - 40);
      line(x, CANVAS_HEIGHT - 50, x, CANVAS_HEIGHT - 40);
    }
  }
};
