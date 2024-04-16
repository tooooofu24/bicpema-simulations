///全画面表示
function fullScreen() {
    createCanvas(windowWidth, windowHeight)
}

// 外部ファイルの読み込み
function preload() {

}

// 初期値やシミュレーションの設定
function initValue() {

}

// setup関数
function setup() {
    fullScreen()
    background(100)

    //ランプ
    noStroke()
    fill(245, 180, 30)
    rect(width * 2 / 5, 0, width / 12, height / 8)
    fill(255)
    ellipse(width * 53 / 120, height / 6, width / 9, width / 9)

    //白目
    fill(255)
    ellipse(width * 5 / 6, height * 2 / 3, width / 12, height / 4)
    ellipse(width * 5 / 6 + width / 12, height * 2 / 3, width / 12, height / 4)

    //黒目
    fill(0)
    ellipse(width * 39 / 48, height * 2 / 3, width / 24, height / 10)
    ellipse(width * 39 / 48 + width / 12, height * 2 / 3, width / 24, height / 10)

    //光源からのbeam
    let x = -100
    y = 100
    push()
    translate(width * 19 / 50, height / 8)
    strokeWeight(10)

    //RED
    stroke(255, 0, 0)
    line(x, y, 0, 0)
    line(x, y, x, y - 20)
    line(x, y, x + 20, y)

    //Blue
    stroke(0, 0, 255)
    line(x, y + 50, 0, 50)
    line(x, y + 50, x, y + 30)
    line(x, y + 50, x + 20, y + 50)

    //GREEN
    stroke(0, 255, 0)
    line(x, y + 100, 0, 100)
    line(x, y + 100, x, y + 80)
    line(x, y + 100, x + 20, y + 100)

    pop()

}

// draw関数
function draw() {




}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    elInit()
    initValue()
}



//class