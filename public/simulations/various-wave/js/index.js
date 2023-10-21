// 全画面表示
function fullScreen() {
    createCanvas(windowWidth, 9 * windowHeight / 10)
}

// DOM要素を格納する変数
let startButton,
    stopButton,
    restartButton,
    resetButton,
    waveColabAddButton,
    waveColabRemoveButton;

// 波の発射ボタンを押したときの処理
function startButtonFunction() {
    if (waveColabNum > 0) {
        // モーダルで設定した數分だけwaveArrに波を追加
        for (let i = 0; i < waveColabNum; i++) {
            let newWave = new incidenceWave(
                waveColabArr[i].waveLengthInput,
                waveColabArr[i].amplitudeInput,
                waveColabArr[i].frequencyInput,
                waveColabArr[i].colorInput,
                waveColabArr[i].waveNumInput,
                waveColabArr[i].waveTypeInput
            )
            waveArr.push(newWave)
            waveNum += 1
        }
        moveIs = true
    }

}

// 一時停止ボタンを押したときの処理
function stopButtonFunction() {
    moveIs = false
}

// 再開ボタンを押したときの処理
function restartButtonFunction() {
    if (waveColabNum > 0) {
        moveIs = true
    }
}

// リセットボタンを押したときの処理
function resetButtonFunction() {
    initValue()
}

// ボタンの組を追加するボタンを押したときの処理
function waveColabAddButtonFunction() {
    waveColabNum += 1
    let dom = new DOM(waveColabNum);
    waveColabArr.push(dom)
}

// ボタンの組を削除するボタンを押したときの処理
function waveColabRemoveButtonFunction() {
    if (waveColabNum > 0) {
        waveColabArr.pop(-1)
        let targetDom = select("#parentDiv-" + waveColabNum)
        targetDom.remove()
        waveColabNum -= 1
    }
}

// DOM要素を生成する処理
function elCreate() {
    startButton = select("#startButton").mousePressed(startButtonFunction)
    stopButton = select("#stopButton").mousePressed(stopButtonFunction)
    restartButton = select("#restartButton").mousePressed(restartButtonFunction)
    resetButton = select("#resetButton").mousePressed(resetButtonFunction)
    waveColabAddButton = select("#waveColabAddButton").mousePressed(waveColabAddButtonFunction)
    waveColabRemoveButton = select("#waveColabRemoveButton").mousePressed(waveColabRemoveButtonFunction)
}

// 初期値やシミュレーションの設定
let waveArr = [];
let waveNum = 0
let moveIs = false;
let waveColabNum = 0;
let waveColabArr = [];

function initValue() {
    textAlign(CENTER)
    textSize(20)
    waveArr = []
    moveIs = false
    waveNum = 0
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
    line(60, height / 2, max_time, height / 2)
}

// draw関数
function draw() {
    background(255)

    if (moveIs) {
        // 波の数だけ繰り返す
        for (let num = 0; num < waveNum; num++) {
            // 波の速度だけ繰り返す
            for (let speed = 0; speed < waveArr[num].frequency.value() * waveArr[num].waveLength.value(); speed++) {
                waveArr[num]._update()
            }
            waveArr[num]._draw()
        }
    }
    for (let num = 0; num < waveNum; num++) {
        waveArr[num]._draw()
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
    constructor(l, a, f, c, n, t) {
        this.posx = 0
        this.waveLength = l
        this.amplitude = a
        this.frequency = f
        this.color = c
        this.waveNum = n
        this.waveType = t
    }
    _update() {
        this.posx += 1
    }
    _draw() {
        fill(255)
        strokeWeight(5)
        noFill()
        stroke(this.color.value())
        push()
        translate(this.posx, height / 2)
        beginShape()
        for (let i = 0; i <= 60 * 2 * this.waveLength.value()*this.waveNum.value(); i++) {
            let amp = 60 * this.amplitude.value()
            let pha = 0
            if (this.waveType.value() == "-sin波") {
                pha = 2 * PI * i / (2 * 60 * this.waveLength.value())
            } else if (this.waveType.value() == "sin波") {
                pha = - 2 * PI * i / (2 * 60 * this.waveLength.value())
            }
            vertex(-i+60, amp * sin(pha))
        }
        endShape()
        pop()
    }
}

class DOM {
    constructor(n) {
        this.num = n
        this.parentDiv = createDiv().parent("#waveSettingDiv").id("parentDiv-" + this.num).class("input-group mb-2")
        this.span = createSpan(this.num + "組目").parent(this.parentDiv).class("input-group-text")
        this.waveLengthInput = createInput(1, "number").parent(this.parentDiv).id("waveLengthInput-" + this.num).attribute("placeholder", "波長").attribute("min", "1").class("form-control")
        this.amplitudeInput = createInput(1, "number").parent(this.parentDiv).id("amplitudeInput-" + this.num).attribute("placeholder", "振幅").attribute("min", "1").class("form-control")
        this.frequencyInput = createInput(1, "number").parent(this.parentDiv).id("frequencyInput-" + this.num).attribute("placeholder", "振動数").attribute("min", "1").class("form-control")
        this.waveTypeInput = createSelect().parent(this.parentDiv).id("waveTypeInput-" + this.num).class("form-select")
        let optionArr = ["sin波", "-sin波"]
        for (let i = 0; i < optionArr.length; i++) this.waveTypeInput.option(optionArr[i])
        this.waveNumInput = createInput(1, "number").parent(this.parentDiv).id("waveNumInput-" + this.num).attribute("placeholder", "波数").attribute("min", "1").class("form-control")
        this.colorInput = createColorPicker().parent(this.parentDiv).id("colorInput-" + this.num).class("form-control form-control-color")
    }
}