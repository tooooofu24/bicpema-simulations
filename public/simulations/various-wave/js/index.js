// 全画面表示
function fullScreen() {
    createCanvas(windowWidth, 9 * windowHeight / 10)
}

let startButton,
    stopButton,
    restartButton,
    resetButton,
    waveSelect,
    speedInput,
    amplitudeInput;
// DOM要素の生成
function startButtonFunction() {
    waveArr.push(new incidenceWave())
    moveIs = true
}
function stopButtonFunction() {
    moveIs = false
}
function restartButtonFunction() {
    moveIs = true
}
function resetButtonFunction() {
    initValue()
}
function elCreate() {
    startButton = select("#startButton").mousePressed(startButtonFunction)
    stopButton = select("#stopButton").mousePressed(stopButtonFunction)
    restartButton = select("#restartButton").mousePressed(restartButtonFunction)
    resetButton = select("#resetButton").mousePressed(resetButtonFunction)
    waveSelect = select("#waveSelect")
    speedInput = select("#speedInput")
    amplitudeInput = select("#amplitudeInput")
}


// 初期値やシミュレーションの設定
let waveArr;
let moveIs;
function initValue() {
    textAlign(CENTER)
    textSize(20)
    waveArr = []
    moveIs = false
}

// setup関数
function setup() {
    fullScreen()
    elCreate()
    initValue()
}


// 背景の設定
function drawGrid() {
    fill(0)
    strokeWeight(1)
    stroke(68, 122, 191)
    let max_time = width

    for (let x = 60; x <= max_time; x += 60)line(x, 0, x, height)
    for (let y = height / 2; y > 0; y -= 60)line(60, y, max_time, y)
    for (let y = height / 2; y < height; y += 60)line(60, y, max_time, y)
}

// スケールの設定
function drawScale() {
    fill(255)
    noStroke()
    rect(0, 0, 60, height)
    strokeWeight(1)
    let max_amp = 60 * ((Math.floor(height / 60)) / 2)
    let max_time = width
    noStroke()
    fill(0)
    for (let x = 300; x <= max_time; x += 300)text(x / 60, x + 60, height / 2 + 20)
    for (let y = height / 2 - 60; y > 0; y -= 60)text(int((height / 2 - y) / 60), 30, y + 8)
    for (let y = height / 2 + 60; y < height; y += 60)text(int(height / 120) - int(y / 60), 30, y + 8)
    text("O", 60 - 30, height / 2 + 7)
    text("y", 60 - 30, 20)
    text("x", max_time - 15, height / 2 + 30)
    stroke(0)
    strokeWeight(3)
    line(max_time, height / 2, max_time - 12, height / 2 - 12)
    line(max_time, height / 2, max_time - 12, height / 2 + 12)
    line(60, height / 2 - max_amp, 48, height / 2 - max_amp + 12)
    line(60, height / 2 - max_amp, 72, height / 2 - max_amp + 12)
    line(60, height / 2 - max_amp, 60, height / 2 + max_amp)
    // line(60, height / 2, max_time, height / 2)
}

// draw関数
function draw() {
    stroke(0)
    strokeWeight(1)
    background(255)
    if (moveIs) {
        for (let speed = 0; speed < speedInput.value(); speed++) {
            for (let i = 0; i < waveArr.length; i++) {
                waveArr[i]._update()
            }
        }
    }
    for (let i = 0; i < waveArr.length; i++) {
        waveArr[i]._draw()
    }
    drawGrid()
    drawScale()
}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    initValue()
}

class incidenceWave {
    constructor() {
        this.posx = 0
    }
    _update() {
        this.posx++
    }
    _draw() {
        fill(255)
        strokeWeight(5)
        stroke(68, 122, 191)
        line(0, height / 2, width, height / 2)
        push()
        translate(this.posx, height / 2)
        noStroke()
        rect(0, -60, 60, 120)
        stroke(68, 122, 191)
        beginShape()
        for (let i = 0; i <= 60; i++) {
            vertex(i, 60 * sin(i / 60 * 2 * PI))
        }
        endShape()
        pop()
    }
}