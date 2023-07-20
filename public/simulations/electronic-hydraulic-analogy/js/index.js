///全画面表示
function fullScreen() {
    createCanvas(windowWidth, 9 * windowHeight / 10, WEBGL)
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

// 初期値やシミュレーションの設定
function initValue() {
}

// setup関数
function setup() {
    fullScreen()
    elCreate()
    elInit()
    initValue()
}

// draw関数
function draw() {
    orbitControl(10)
    background(100)
    strokeWeight(10)
    stroke(255, 0, 0)
    line(0, 0, 0, 1000, 0, 0)
    stroke(0, 255, 0)
    line(0, 0, 0, 0, 1000, 0)
    stroke(0, 0, 255)
    line(0, 0, 0, 0, 0, 1000)
    strokeWeight(1)

    beginShape()
    vertex(0,0,0)
    vertex(200,0,0)
    vertex(200,0,75)
    vertex(0,0,75)
    endShape()

    beginShape()
    vertex(125,0,0)
    vertex(200,0,0)
    vertex(200,0,200)
    vertex(125,0,200)
    endShape()

    beginShape()
    vertex(0,0,0)
    vertex(75,0,0)
    vertex(75,0,100)
    vertex(0,0,100)
    endShape()
}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    elInit()
    initValue()
}

// class Sample{

// }