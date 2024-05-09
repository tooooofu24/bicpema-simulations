function setup() {
  settingInit();
  deviceJudge.judge();
  controller.fullScreen();
  elementInit();
  valueInit();
}

function draw() {
  scale(width / 1000);
  background(0);
  drawGraph();
  deviceJudge.rotateInstruction();
}

function windowResized() {
  controller.resizeScreen();
  elementInit();
  valueInit();
}
