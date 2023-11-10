///全画面表示
function fullScreen() {
    let p5Canvas = select("#p5Canvas")
    let canvas = createCanvas(windowWidth / 2, 9 * windowHeight / 20, WEBGL)
    canvas.parent(p5Canvas)
}

// DOM要素の生成
function elCreate() {
}
// 初期値やシミュレーションの設定
function initValue() {
}


// setup関数
function setup() {
    fullScreen()
    elCreate()
    initValue()
}

// draw関数
function draw() {
    orbitControl(1)
    background(0);
    noStroke()
    fill(255, 255, 0)
    sphere(30)
    stroke(255)
    strokeWeight(0.6)
    for (k = 0; k <= 180; k += 30) {
        push()
        rotateZ(radians(k))
        for (let j = 0; j <= 180; j += 30) {
            push()
            rotateX(radians(j))
            for (let i = 0; i <= 180; i += 10) {
                push()
                rotateY(radians(i))
                line(-200, 0, 0, 200, 0, 0)
                pop()
            }
            pop()
        }
        pop()
    }
}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    initValue()
}
