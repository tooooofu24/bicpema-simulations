const FPS = 30;
let canvasController, deviceJudge;
function settingInit() {
  frameRate(FPS);
  textAlign(CENTER, CENTER);
  textSize(16);
  deviceJudge = new BicpemaDeviceJudge();
  canvasController = new BicpemaCanvasController(true, false);
}

//   let graph, graphCanvas;
function elementSelectInit() {
  //   graph = select("#graph");
  //   graphCanvas = select("#graphCanvas");
}

function elementPositionInit() {}

function valueInit() {}
