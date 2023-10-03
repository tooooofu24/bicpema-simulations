///全画面表示
function fullScreen() {
    createCanvas(windowWidth, 9 * windowHeight / 10)
}

// 外部ファイルの読み込み
function preload() {

}

// DOM要素の生成
function elCreate() {

}

// DOM要素の設定
function elInit() {

}

let mediumWave;

// 初期値やシミュレーションの設定
function initValue() {
    textAlign(CENTER)
    let max_time = 50 * Math.floor(width / 50)
    mediumWave = [];
    
}

// setup関数
function setup() {
    fullScreen()
    elCreate()
    elInit()
    initValue()
}

function backgroundSetting() {
    fill(0)
    background(255)
    // 方眼の描画
    strokeWeight(1)
    for (let x = 0; x < width; x += 50)line(x, 0, x, height)
    for (let y = height / 2; y > 0; y -= 50)line(0, y, width, y)
    for (let y = height / 2; y < height; y += 50)line(0, y, width, y)

    // 縦軸（振幅）の描画
    let max_amp = 50 * ((Math.floor(height / 50)) / 2)
    line(50, height / 2 - max_amp, 25, height / 2 - max_amp + 25)
    line(50, height / 2 - max_amp, 75, height / 2 - max_amp + 25)
    for (let y = 0; y <= max_amp; y += 50)text(y, 25, height / 2 - y)
    for (let y = 50; y <= max_amp; y += 50)text(-y, 25, height / 2 + y)

    // 横軸（時間）の描画
    let max_time = 50 * Math.floor(width / 50)
    line(max_time, height / 2, max_time - 25, height / 2 - 25)
    line(max_time, height / 2, max_time - 25, height / 2 + 25)
    for (let x = 50; x < max_time; x += 50)text(x, 50 + x, height / 2 + 25)
}
// draw関数
function draw() {
    backgroundSetting()
}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    elInit()
    initValue()
}

class incidenceWave{
    constructor(){
    }
    _draw(){
    }
}