// init.jsは初期処理専用のファイルです。

/////////////////////////// 以上の記述は不必要であれば削除してください。/////////////////////////////////

// settingInit関数
// シミュレーションそのものの設定を行う関数
const FPS = 60;
let canvasController, deviceJudge;
function settingInit() {
  deviceJudge = new BicpemaDeviceJudge();
  canvasController = new BicpemaCanvasController(true, false);
  deviceJudge.judge();
  canvasController.fullScreen();
  frameRate(FPS);
  textAlign(CENTER, CENTER);
  textSize(14);
}

// elementSelectInit関数
// 仮想DOMを読み込むための関数
// グラフを利用する際には、graph,graphCanvasのコメントアウトをはずしてください。
//   let graph, graphCanvas;
function elementSelectInit() {
  //   graph = select("#graph");
  //   graphCanvas = select("#graphCanvas");
}

// elementPositionInit関数
// 仮想DOMの場所や実行関数を設定するための関数
function elementPositionInit() {}

// valueInit関数
// 初期値を設定するための関数
let ball;
let gravity = 2;
let slopeHeight, diameter;
let ground;
function valueInit() {
  slopeHeight = 6;
  diameter = 10;
  ground = (1000 * 9) / 16 - 50;
  const TAN = (slopeHeight * 50) / 350;
  const THETA = atan(TAN);
  const t = 12.5 * (1 - cos(THETA));
  ball = new Ball(50 + t * sin(THETA), ground - 50 * slopeHeight - 12.5 - t * cos(THETA));
}
