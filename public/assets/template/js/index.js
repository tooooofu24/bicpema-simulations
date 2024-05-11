function setup() {
  settingInit();
  deviceJudge.judge();
  canvasController.fullScreen();
  elementSelectInit();
  elementPositionInit();
  valueInit();
}

function draw() {
  scale(width / 1000);
  background(0);
  // drawGraph();
  deviceJudge.rotateInstruction();
}

function windowResized() {
  canvasController.resizeScreen();
  elementPositionInit();
}
