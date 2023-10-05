///全画面表示
function fullScreen() {
    createCanvas(windowWidth, 6 * windowHeight / 10)
}

let reflectSelect,
    reflectOptionArr,
    startButton,
    stopButton,
    restartButton,
    resetButton,
    waveSelect,
    waveOptionArr;
// DOM要素の生成
function startButtonFunction() {
    waveArr.push(new incidenceWave(100, waveSelect.value()))
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
    reflectSelect = createSelect()
    reflectOptionArr = ["固定端反射", "自由端反射"]
    for (let i = 0; i < reflectOptionArr.length; i++)reflectSelect.option(reflectOptionArr[i])
    startButton = createButton("波の発射").mousePressed(startButtonFunction)
    stopButton = createButton("一時停止").mousePressed(stopButtonFunction)
    restartButton = createButton("再開").mousePressed(restartButtonFunction)
    resetButton = createButton("リセット").mousePressed(resetButtonFunction)
    waveSelect = createSelect()
    waveOptionArr = ["sin波", "-sin波"]
    for (let i = 0; i < waveOptionArr.length; i++)waveSelect.option(waveOptionArr[i])
}
// DOM要素の設定
function elInit() {

}

let mediumWave;
let waveArr;
let moveIs;
// 初期値やシミュレーションの設定

function initValue() {
    textAlign(CENTER)
    textSize(20)
    let max_time = 50 * Math.floor(width / 50)
    mediumWave = [];
    waveArr = []
    moveIs = false
    for (let i = 50; i < max_time - 50; i++)mediumWave.push(0);

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
    stroke(68, 122, 191)
    let max_amp = 50 * ((Math.floor(height / 50)) / 2)
    let max_time = 50 * Math.floor(width / 50)

    for (let x = 50; x < max_time; x += 50)line(x, 0, x, height)
    for (let y = height / 2; y > 0; y -= 50)line(50, y, max_time - 50, y)
    for (let y = height / 2; y < height; y += 50)line(50, y, max_time - 50, y)
    noStroke()

    // 縦軸（振幅）の描画

    // for (let y = 0; y <= max_amp; y += 50)text(y / 50, 25, height / 2 - y)
    // for (let y = 50; y <= max_amp; y += 50)text(-y / 50, 25, height / 2 + y)
    // 横軸（時間）の描画

    // for (let x = 50; x < max_time; x += 50)text(x / 50, 50 + x, height / 2 + 25)
    text("O", 50 - 25, height / 2 + 7)
    text("y", 50 - 25, 20)
    text("x", max_time - 50 - 15, height / 2 + 30)

    stroke(0)
    strokeWeight(3)
    line(max_time - 50, height / 2, max_time - 62, height / 2 - 12)
    line(max_time - 50, height / 2, max_time - 62, height / 2 + 12)
    line(50, height / 2 - max_amp, 38, height / 2 - max_amp + 12)
    line(50, height / 2 - max_amp, 62, height / 2 - max_amp + 12)
    line(50, height / 2 - max_amp, 50, height / 2 + max_amp)
    line(50, height / 2, max_time - 50, height / 2)
}
// draw関数
function draw() {
    stroke(0)
    strokeWeight(1)
    backgroundSetting()
    let max_time = 50 * Math.floor(width / 50)
    if (moveIs) {
        for (let i = 0; i < waveArr.length; i++) {
            waveArr[i]._draw()
        }
    }
    stroke(68, 122, 191)
    strokeWeight(5)
    noFill()
    beginShape()
    for (let i = 50; i < max_time - 50; i++) {
        let y = 0
        for (let j = 0; j < waveArr.length; j++) y += waveArr[j].arr[i - 50]
        vertex(i, y + height / 2)
    }
    endShape()
}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    elInit()
    initValue()
}

class incidenceWave {
    constructor(h, t) {
        this.arr = []
        let max_time = 50 * Math.floor(width / 50)
        for (let i = 50; i < max_time - 50; i++)this.arr.push(0)
        this.count = 0
        this.height = h
        this.judge = false
        if (t == "sin波") {
            this.waveType = -1
        } else {
            this.waveType = 1
        }
    }
    _draw() {
        let max_time = 50 * Math.floor(width / 50)
        if (max_time + 360 - 50 > this.count) {
            this.count += 3
            if (this.count <= 360) {
                this.arr[0] = this.height * sin(this.waveType * 2 * PI * this.count / 360)
            }
            for (let j = 0; j < 3; j++) {
                for (let i = this.arr.length - 1; i > 0; i--) {
                    this.arr[i] = this.arr[i - 1]
                }
            }
        }
        if (this.arr[this.arr.length - 1] != 0 && this.judge == false) {
            waveArr.push(new reflectingWave(this.height, this.waveType))
            this.judge = true
        }
    }
}
class reflectingWave {
    constructor(h, t) {
        this.arr = []
        let max_time = 50 * Math.floor(width / 50)
        for (let i = 50; i < max_time - 50; i++)this.arr.push(0)
        this.count = 0
        this.height = h
        this.waveType = t
    }
    _draw() {
        let reflectType;
        if (reflectSelect.value() == "固定端反射") {
            reflectType = -1
        } else {
            reflectType = 1
        }
        let max_time = 50 * Math.floor(width / 50)
        if (max_time + 360 - 50 > this.count) {
            this.count += 3
            if (this.count <= 360) {
                this.arr[this.arr.length - 1] = this.height * sin(this.waveType * reflectType * 2 * PI * this.count / 360)
            }
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < this.arr.length - 1; i++) {
                    this.arr[i] = this.arr[i + 1]
                }
            }
        }
    }
}