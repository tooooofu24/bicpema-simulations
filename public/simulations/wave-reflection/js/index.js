///全画面表示
function fullScreen() {
    createCanvas(windowWidth, 6 * windowHeight / 10)
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

function mousePressed() {
    waveArr.push(new incidenceWave(100))

}
let mediumWave;
let waveArr;
// 初期値やシミュレーションの設定

function initValue() {
    textAlign(CENTER)
    textSize(16)
    let max_time = 50 * Math.floor(width / 50)
    mediumWave = [];
    waveArr = []
    for (let i = 50; i < max_time; i++)mediumWave.push(0);
    for (let i = 0; i < 1; i++)waveArr.push(new incidenceWave(100))

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
    for (let x = 0; x < width; x += 50)line(x, 0, x, height)
    for (let y = height / 2; y > 0; y -= 50)line(0, y, width, y)
    for (let y = height / 2; y < height; y += 50)line(0, y, width, y)
    stroke(0)
    // 縦軸（振幅）の描画
    let max_amp = 50 * ((Math.floor(height / 50)) / 2)
    for (let y = 0; y <= max_amp; y += 50)text(y / 50, 25, height / 2 - y)
    for (let y = 50; y <= max_amp; y += 50)text(-y / 50, 25, height / 2 + y)

    // 横軸（時間）の描画
    let max_time = 50 * Math.floor(width / 50)
    for (let x = 50; x < max_time; x += 50)text(x / 50, 50 + x, height / 2 + 25)

    strokeWeight(3)
    line(max_time, height / 2, max_time - 25, height / 2 - 25)
    line(max_time, height / 2, max_time - 25, height / 2 + 25)
    line(50, height / 2 - max_amp, 25, height / 2 - max_amp + 25)
    line(50, height / 2 - max_amp, 75, height / 2 - max_amp + 25)
    line(50, height / 2 - max_amp, 50, height / 2 + max_amp)
    line(50, height / 2, max_time, height / 2)
}
// draw関数
function draw() {
    stroke(0)
    strokeWeight(1)
    backgroundSetting()
    let max_time = 50 * Math.floor(width / 50)
    for (let i = 0; i < waveArr.length; i++) {
        waveArr[i]._draw()
    }
    stroke(68, 122, 191)
    strokeWeight(10)
    noFill()
    beginShape()
    for (let i = 0; i < max_time; i++) {
        let y = 0
        for (let j = 0; j < waveArr.length; j++) y += waveArr[j].arr[i]
        vertex(i + 50, y + height / 2)
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
    constructor(h) {
        this.arr = []
        let max_time = 50 * Math.floor(width / 50)
        for (let i = 50; i < max_time; i++)this.arr.push(0)
        this.count = 0
        this.height = h
        this.judge = false
    }
    _draw() {
        let max_time = 50 * Math.floor(width / 50)
        if (max_time + 360 - 50 > this.count) {
            this.count += 2
            if (this.count <= 360) {
                this.arr[0] = this.height * sin(-2 * PI * this.count / 360)
            }
            for (let j = 0; j < 2; j++) {
                for (let i = this.arr.length - 1; i > 0; i--) {
                    this.arr[i] = this.arr[i - 1]
                }
            }
        }
        if(this.arr[this.arr.length-1] != 0 && this.judge == false){
            waveArr.push(new reflectingWave(this.height))
            this.judge = true
        }
    }
}
class reflectingWave {
    constructor(h) {
        this.arr = []
        let max_time = 50 * Math.floor(width / 50)
        for (let i = 50; i < max_time; i++)this.arr.push(0)
        this.count = 0
        this.height = h
    }
    _draw() {
        let max_time = 50 * Math.floor(width / 50)
        if (max_time+360-50 > this.count) {
            this.count += 2
            if (this.count <= 360) {
                this.arr[this.arr.length-1] = this.height * sin(-2 * PI * this.count / 360)
            }
            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < this.arr.length-1; i++) {
                    this.arr[i] = this.arr[i + 1]
                }
            }
        }
    }
}