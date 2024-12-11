// init.jsは初期処理専用のファイルです。

/////////////////////////// 以上の記述は不必要であれば削除してください。/////////////////////////////////

// settingInit関数
// シミュレーションそのものの設定を行う関数
const FPS = 30;
let canvasController, deviceJudge;
function settingInit() {
  deviceJudge = new BicpemaDeviceJudge();
  canvasController = new BicpemaCanvasController(true, false);
  deviceJudge.judge();
  canvasController.fullScreen();
  frameRate(FPS);
  textAlign(CENTER, CENTER);
  textFont(font);
  textSize(16);
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
function elementPositionInit() { }

// valueInit関数
// 初期値を設定するための関数
let radio;
function valueInit() {
  background(255);
  radio = createRadio()
  radio.option("a.");
  radio.option("b.");
  radio.option("c.");
  radio.option("d.");
  radio.position(width * 3.15 / 4, height * 6.95 / 7);
  // すべてのラジオボタンを取得してサイズ変更
  // すべてのラジオボタンを取得してサイズ変更
  let inputs = radio.elt.querySelectorAll('input[type="radio"]');
  inputs.forEach(input => {
    input.style.transform = 'scale(1.5)'; // サイズ変更
    input.style.marginRight = '5px';     // ラベルとの間隔
  });

  // ラジオボタンを囲む親要素（<div>）に間隔を追加
  let divs = radio.elt.querySelectorAll('div');
  divs.forEach(div => {
    div.style.marginBottom = '40px'; // ボタン同士の間隔を設定
  });
}
