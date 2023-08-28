//音波のインスタンス
let sounds;

//ボタンのインスタンス
let backgroundDiv, startButton, stopButton, resetButton, speedButton;

//音源の座標
let posx;
let posy;

//その他の変数
let count;
let resetCount;
let clickedCount;
let fps = 60;

//フルスクリーンにする手続き
function fullScreen() {
  createCanvas(windowWidth, (8 * windowHeight) / 10);
}

//初期化する手続き
function initSettings() {
  frameRate(fps);
  posx = 50;
  posy = height / 2;
  count = 0;
  resetCount = true;
  clickedCount = false;
  panelCount = false;
  textSize(width / 100);
  textAlign(CENTER, CENTER);
}

//ボタンを初期化するメソッド
function buttonSettings() {
  backgroundDiv.size(width, windowHeight / 10).style("background-color", "white");
  startButton
    .mousePressed(moveButtonAction)
    .size(windowWidth / 3, windowHeight / 10)
    .position(0, height+windowHeight/10)
    .addClass("btn btn-outline-primary")
    .parent(backgroundDiv);
  stopButton
    .mousePressed(moveButtonAction)
    .size(windowWidth / 3, windowHeight / 10)
    .position(0, height+windowHeight/10)
    .addClass("btn btn-outline-danger")
    .hide()
    .parent(backgroundDiv);
  resetButton
    .mousePressed(resetButtonAction)
    .size(windowWidth / 3, windowHeight / 10)
    .position(windowWidth / 3, height+windowHeight/10)
    .addClass("btn btn-outline-secondary")
    .parent(backgroundDiv);
  speedButton
    .size(windowWidth / 3, windowHeight / 10)
    .position((2 * windowWidth) / 3, height+windowHeight/10)
    .style("text-align", "center")
    .parent(backgroundDiv);
}

//スタートストップボタンの手続き
function moveButtonAction() {
  if (clickedCount == false) {
    clickedCount = true;
    resetCount = false;
    startButton.hide();
    stopButton.show();
  } else {
    clickedCount = false;
    startButton.show();
    stopButton.hide();
  }
}

//リセットボタンの手続き
function resetButtonAction() {
  posx = 50;
  resetCount = true;
  clickedCount = false;
  startButton.show();
  stopButton.hide();
  count = 0;
  for (let i = 0; i < sounds.length; i++) {
    sounds.length = 0;
  }
}

//背景を描画する手続き
function backGround() {
  background(255);
  stroke(0, 100);
  for (let i = 0; i < width - 50; i += 10) {
    if (i % 100 == 0) {
      strokeWeight(2);
    } else {
      strokeWeight(1);
    }
    line(i + 50, 0, i + 50, height);
  }
  for (let i = 0; i < height / 2; i += 10) {
    if (i % 100 == 0) {
      strokeWeight(2);
    } else {
      strokeWeight(1);
    }
    line(50, height / 2 + i, width, height / 2 + i);
    line(50, height / 2 - i, width, height / 2 - i);
  }
  stroke(0);
}

//setup関数
function setup() {
  fullScreen();
  initSettings();
  sounds = new Array();
  backgroundDiv = createElement("div");
  startButton = createButton("スタート");
  stopButton = createButton("ストップ");
  resetButton = createButton("リセット");
  speedButton = createInput(340, "number");
  buttonSettings();
}

//draw関数
function draw() {
  backGround();
  if (clickedCount == true) {
    count++;
  }
  if (count % (fps / 10) == 0 && clickedCount == true) {
    sounds.push(new SOUND(posx, 0));
  }
  for (let i = 0; i < sounds.length; i++) {
    sounds[i]._draw();
  }
  posx = (speedButton.value() * count) / fps + 50;
  fill(0);
  ellipse(posx, posy, 20, 20);
  textSize(20);
  text(speedButton.value() + " m/s", posx, posy + 20);
}

//音波オブジェクト
class SOUND {
  constructor(x, r) {
    this.soundx = x;
    this.radi = r;
  }
  _draw() {
    if (clickedCount == true) {
      this.radi += 340 / 60;
    }
    noFill();
    ellipse(this.soundx, height / 2, this.radi * 2, this.radi * 2);
  }
}

//ウィンドウがリサイズされた時の手続き
function windowResized() {
  fullScreen();
  initSettings();
  buttonSettings();
  resetButtonAction();
}
