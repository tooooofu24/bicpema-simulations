function setup() {
  settingInit();
  deviceJudge.judge();
  canvasController.fullScreen();
  elementInit();
  valueInit();
}

function draw() {
  scale(width / 1000);
  background(255);
  deviceJudge.rotateInstruction();
  if (moveIs) {
    // 波の数だけ繰り返す
    for (let num = 0; num < waveNum; num++) {
      // 波の速度だけ繰り返す
      for (let speed = 0; speed < waveArr[num].frequency.value() * waveArr[num].waveLength.value(); speed++) {
        waveArr[num]._update();
      }
      waveArr[num]._draw();
    }
    time += 1;
  }
  for (let num = 0; num < waveNum; num++) {
    waveArr[num]._draw();
  }
  timer.html(nf(time / 60, 2, 2));
  drawGrid();
  drawScale();
}

function windowResized() {
  canvasController.resizeScreen();
  elementInit();
  valueInit();
}
