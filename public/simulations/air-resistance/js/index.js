let canvasController;
let deviceJudge;

function setup() {
  canvasController = new BicpemaCanvasController(true, false);
  deviceJudge = new BicpemaDeviceJudge();
  canvasController.fullScreen();
  deviceJudge.judge();
  settingInit();
  elementSelectInit();
  elementInit();
  valueInit();
}

function draw() {
  scale(width / 1000);
  background(0);
  stroke(0);
  count++;
  freeBall.fallBallDraw();
  freeBall.trajectoryDraw();
  viscosityBall.fallBallDraw();
  viscosityBall.trajectoryDraw();
  inertiaBall.fallBallDraw();
  inertiaBall.trajectoryDraw();
  if (count % FPS == 0) {
    fbtrajectry.push(freeBall.posY - 50);
    vbtrajectory.push(viscosityBall.posY - 50);
    ibtrajectory.push(inertiaBall.posY - 50);
    if (count % FPS == 0) countArray.push(count / FPS);
  }
  graphDraw();
  deviceJudge.rotateInstruction();
}

function windowResized() {
  canvasController.resizeScreen();
  elementInit();
  valueInit();
}
