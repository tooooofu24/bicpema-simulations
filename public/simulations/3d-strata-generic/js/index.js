function preload() {
  font = loadFont("../../assets/fonts/ZenMaruGothic-Regular.ttf");
}
// setup関数
// シミュレーションを実行する際に１度だけ呼び出される。
function setup() {
  settingInit();
  elementSelectInit();
  elementPositionInit();
  valueInit();
  loadTestDataButtonFunction();
}

let rotateTime = 0;
// draw関数
// シミュレーションを実行した後、繰り返し呼び出され続ける
function draw() {
  background(255);
  // データ登録モーダルを開いている時にオービットコントロールを無効化
  let modalIs = $("#dataRegisterModal").is(":hidden");
  if (modalIs) {
    orbitControl();
  }
  let coordinateData = calculateValue();
  // 緊急的な措置としての変数の代入
  // 今後軸ラベルの最小値と最大値をスライダーで変更できる仕様に変える必要がある
  backgroundSetting(coordinateData);
  drawDirMark(-600, -600);
  rotateTime += 3;
  for (let key in dataInputArr) {
    drawStrata(key, rotateTime, xMin, xMax, yMin, yMax, zMin, zMax);
  }
  connectStrata();
}

// windowResized関数
// シミュレーションを利用しているデバイスの画面サイズが変わった際に呼び出される。
function windowResized() {
  canvasController.resizeScreen();
  elementPositionInit();
}
