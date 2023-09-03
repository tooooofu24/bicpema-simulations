// 必要な要素
// 速度や加速度の異なる球の運動を比較できるように
// 初速、加速度を入力できるようにする
// スタートボタンストップボタンを入れる
// 経過時間も入れる
// 進んだ距離を表示する
// 進んだ距離がわかりやすいようにする
// 軌跡を残す間隔を選べるようにするÏ

//全画面表示
function fullScreen() {
    createCanvas(3 * windowWidth / 4, 9 * windowHeight / (10 * 2))
}

// 外部ファイルの読み込み
function preload() {
}

// DOM要素の生成
function elCreate() {
    b1VelocityIntro = createElement("label", "上のボールの初速[]")
    b1Velocity = createInput(10, "number", 0.1);
    b1AccelerationIntro = createElement("label", "上のボールの加速度[]")
    b1Acceleration = createInput(10, "number", 0.1);
    b2VelocityIntro = createElement("label", "下のボールの初速[]")
    b2Velocity = createInput(10, "number", 0.1);
    b2AccelerationIntro = createElement("label", "下のボールの加速度[]")
    b2Acceleration = createInput(10, "number", 0.1);
    moveButton = createButton("スタート/ストップ")
    resetButton = createButton("リセット")
}
function buttonAction() {
    if (moveIs == false) {
        moveIs = true
    } else {
        moveIs = false
    }
}
function resetAction(){
    initValue()
}
// DOM要素の設定
function elInit() {
    let DOMarr = [b1VelocityIntro, b1Velocity, b1AccelerationIntro, b1Acceleration, b2VelocityIntro, b2Velocity, b2AccelerationIntro, b2Acceleration, moveButton,resetButton]
    for (let i = 0; i < DOMarr.length; i++) {
        DOMarr[i].position(width, windowHeight / 10 + i * (9 * windowHeight / 10) / DOMarr.length).size(windowWidth / 4, (9 * windowHeight / 10) / DOMarr.length)
        if (i == 8) DOMarr[i].class("btn btn-primary").mousePressed(buttonAction)
        if (i == 9) DOMarr[i].class("btn btn-secondary").mousePressed(resetAction)
    }
}

let ballRadi;
let b1, b2;
let fps;
let moveIs
// 初期値やシミュレーションの設定
function initValue() {
    ballRadi = 15
    b1 = new Ball(ballRadi, height / 2 - 2 * ballRadi, parseFloat(b1Velocity.value()), parseFloat(b1Acceleration.value()))
    b2 = new Ball(ballRadi, height - 2 * ballRadi, parseFloat(b2Velocity.value()), parseFloat(b2Acceleration.value()))
    fps = 60
    moveIs = false
    frameRate(fps)
    textSize(10)
    textAlign(CENTER)
}

// setup関数
function setup() {
    fullScreen()
    elCreate()
    elInit()
    initValue()
}

function backgroundSettings() {
    background(255)
    for (let x = 0; x < width; x += 10) {
        strokeWeight(1)
        if (x % 100 == 0) {
            strokeWeight(1.5)
        }
        line(x, 0, x, height)
    }

}

// draw関数
function draw() {
    backgroundSettings()
    b1._draw()
    b2._draw()
}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    elInit()
    initValue()
}

// ボールのクラス
class Ball {
    constructor(x, y, v_0, a) {
        this.posx = x
        this.posy = y
        this.velocity_0 = v_0
        this.acceleration = a
    }
    _move() {
        if (moveIs == true) {
            this.posx += this.velocity_0 / fps
            this.velocity_0 += this.acceleration / fps
        }
    }
    _draw() {
        this._move()
        rect(0, this.posy + ballRadi, width, ballRadi)
        for (let x = 0; x < width; x += 100)text(x, x, this.posy + 1.5 * ballRadi)
        ellipse(this.posx, this.posy, ballRadi * 2, ballRadi * 2)
    }
}