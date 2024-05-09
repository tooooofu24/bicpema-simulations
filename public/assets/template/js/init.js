const fps = 30;
let canvasController, deviceJudge;
function settingInit() {
  frameRate(fps);
  textAlign(CENTER, CENTER);
  textSize(16);
  deviceJudge = new BicpemaDeviceJudge();
  canvasController = new BicpemaCanvasController(true, false);
}

//   let graph, graphCanvas;
function elementInit() {
  //   graph = select("#graph");
  //   graphCanvas = select("#graphCanvas");
}

function valueInit() {}
