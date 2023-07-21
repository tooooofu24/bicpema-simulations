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

let voltageValue;
// 初期値やシミュレーションの設定
function initValue() {
    voltageValue = 200
}

// setup関数
function setup() {
    fullScreen()
    elCreate()
    elInit()
    initValue()
    camera(300, -300, 300, 0, 300, 0, 0, 1, 0)
}

function drawFoundation() {
    fill(255)
    noStroke()
    beginShape()
    vertex(0, 0, 0)
    vertex(150, 0, 0)
    vertex(150, 0, 50)
    vertex(0, 0, 50)
    endShape()

    beginShape()
    vertex(100, 0, 0)
    vertex(150, 0, 0)
    vertex(150, 0, 150)
    vertex(100, 0, 150)
    endShape()

    beginShape()
    vertex(0, 0, 0)
    vertex(50, 0, 0)
    vertex(50, 0, 100)
    vertex(0, 0, 100)
    endShape()

    beginShape()
    vertex(0, 0, 100)
    vertex(0, voltageValue, 200)
    vertex(50, voltageValue, 200)
    vertex(50, 0, 100)
    endShape()

    beginShape()
    vertex(0, voltageValue, 200)
    vertex(0, voltageValue, 300)
    vertex(50, voltageValue, 300)
    vertex(50, voltageValue, 200)
    endShape()

    beginShape()
    vertex(50, voltageValue, 300)
    vertex(150, voltageValue, 300)
    vertex(150, voltageValue, 250)
    vertex(50, voltageValue, 250)
    endShape()

    beginShape()
    vertex(100, voltageValue, 250)
    vertex(100, voltageValue, 100)
    vertex(150, voltageValue, 100)
    vertex(150, voltageValue, 250)
    endShape()

    stroke(0)
    beginShape()
    vertex(0, 0, 0)
    vertex(150, 0, 0)
    vertex(150, -25, 0)
    vertex(0, -25, 0)
    endShape()

    beginShape()
    vertex(150, 0, 0)
    vertex(150, 0, 150)
    vertex(150, -25, 150)
    vertex(150, -25, 0)
    endShape()
    
    beginShape()
    vertex(150, 0, 150)
    vertex(100, 0, 150)
    vertex(100, -25, 150)
    vertex(150, -25, 150)
    endShape()

    beginShape()
    vertex(150, 0, 150)
    vertex(100, 0, 150)
    vertex(100, -25, 150)
    vertex(150, -25, 150)
    endShape()

    beginShape()
    vertex(100, 0, 150)
    vertex(100, 0, 50)
    vertex(100, -25, 50)
    vertex(100, -25, 150)
    endShape()

    beginShape()
    vertex(100, 0, 50)
    vertex(50, 0, 50)
    vertex(50, -25, 50)
    vertex(100, -25, 50)
    endShape()

    beginShape()
    vertex(0, 0, 0)
    vertex(0, 0, 100)
    vertex(0, -25, 100)
    vertex(0, -25, 0)
    endShape()

    beginShape()
    vertex(50, 0, 50)
    vertex(50, 0, 100)
    vertex(50, -25, 100)
    vertex(50, -25, 50)
    endShape()

    beginShape()
    vertex(50, 0, 100)
    vertex(50, voltageValue, 200)
    vertex(50, voltageValue-25, 200)
    vertex(50, -25, 100)
    endShape()

    beginShape()
    vertex(0, 0, 100)
    vertex(0, voltageValue, 200)
    vertex(0, voltageValue-25, 200)
    vertex(0, -25, 100)
    endShape()

    beginShape()
    vertex(50, voltageValue, 200)
    vertex(50, voltageValue, 250)
    vertex(50, voltageValue-25, 250)
    vertex(50, voltageValue-25, 200)
    endShape()

    beginShape()
    vertex(50, voltageValue, 250)
    vertex(100, voltageValue, 250)
    vertex(100, voltageValue-25, 250)
    vertex(50, voltageValue-25, 250)
    endShape()

    beginShape()
    vertex(100, voltageValue, 250)
    vertex(100, voltageValue, 100)
    vertex(100, voltageValue-25, 100)
    vertex(100, voltageValue-25, 250)
    endShape()

    beginShape()
    vertex(100, voltageValue, 100)
    vertex(150, voltageValue, 100)
    vertex(150, voltageValue-25, 100)
    vertex(100, voltageValue-25, 100)
    endShape()

    beginShape()
    vertex(150, voltageValue, 300)
    vertex(150, voltageValue, 100)
    vertex(150, voltageValue-25, 100)
    vertex(150, voltageValue-25, 300)
    endShape()

    beginShape()
    vertex(0, voltageValue, 300)
    vertex(150, voltageValue, 300)
    vertex(150, voltageValue-25, 300)
    vertex(0, voltageValue-25, 300)
    endShape()

    beginShape()
    vertex(0, voltageValue, 300)
    vertex(0, voltageValue, 200)
    vertex(0, voltageValue-25, 200)
    vertex(0, voltageValue-25, 300)
    endShape()

    // ポンプと電源を繋いでいる部分
    push()
    translate(125, voltageValue/2, 125)
    cylinder(5, voltageValue, 10, 10, false,false)
    pop()

    // 電源
    push()
    translate(125, voltageValue/2, 125)
    box(50)
    pop()
}

function drawWaterFlow(){
noStroke()
fill(0,255,255,100)

push()
translate(75,-10,25)
box(149,19,49)
pop()

push()
translate(125,-10,100)
box(49,19,99)
pop()

}

// draw関数
function draw() {
    orbitControl(10)
    background(100)
    drawFoundation()
    drawWaterFlow()
}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    elInit()
    initValue()
}

// class Sample{

// }