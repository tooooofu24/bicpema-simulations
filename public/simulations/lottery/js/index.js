// index.jsはメインのメソッドを呼び出すためのファイルです。

/////////////////////////// 以上の記述は不必要であれば削除してください。/////////////////////////////////

// preload関数
// setup関数よりも前に一度だけ呼び出される。
let colH = 0;
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
  let cnv = select("#p5Canvas");
  cnv.mousePressed(requestMotionPermission);
  colorMode(HSB);
}

// draw関数
// シミュレーションを実行した後、繰り返し呼び出され続ける
function draw() {
  scale(width / 1000);
  background(colH, 100, 100);
}

// windowResized関数
// シミュレーションを利用しているデバイスの画面サイズが変わった際に呼び出される。
function windowResized() {
  canvasController.resizeScreen();
  elementPositionInit();
}

function deviceShaken() {
  colH++;
  if (colH > 360) {
    colH = 0;
  }
}

function requestMotionPermission() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission().then((permissionState) => {
      if (permissionState === "granted") {
        // デバイスモーションの許可が得られた
      }
    });
  }
}
