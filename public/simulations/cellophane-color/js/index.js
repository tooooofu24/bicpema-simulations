///全画面表示
function fullScreen() {
    createCanvas(2 * windowWidth / 3, 1 * windowHeight / 10 + 9 * windowHeight / 20, WEBGL)
}

// 外部ファイルの読み込み
function preload() {

}

function createCelloColabInput() {
    for (let i = 0; i < parseInt(colabNum.value()); i++) {
        celloColabInputArr[i].show()
    }
    for (let i = parseInt(colabNum.value()); i < 10; i++) {
        celloColabInputArr[i].hide()
    }
}

// DOM要素の生成
function elCreate() {
    polarizerIntro = createElement("label", "偏光板の配置")
    polarizer = createSelect()
    optionArr = ["平行ニコル配置", "直行ニコル配置"]
    for (let i = 0; i < optionArr.length; i++)polarizer.option(optionArr[i])
    opdInputIntro = createElement("label", "光路差")
    opdInput = createInput(216.15, "number")
    colabNumIntro = createElement("label", "セロハンの組み合わせの数")
    colabNum = createInput(1, "number").attribute("min", 0).attribute("max", 10).input(createCelloColabInput)
    celloColabInputArr = []
    for (let i = 0; i < 10; i++)celloColabInputArr.push(createInput(1, "number").hide())
    celloColabInputArr[0].show()
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

function createPolarizer(size, x, y, z, pattern) {
    push();
    translate(x, y, z);
    noFill();
    strokeWeight(2);
    stroke(0,200);
    box(size, size, 0);
    if (pattern == 0) {
        for (let i = 0; i < size; i += 5) {
            line(-size / 2 + i, size / 2, 0, -size / 2 + i, -size / 2, 0);
        }
    } else {
        for (let i = 0; i < size; i += 5) {
            line(-size / 2 , -size / 2+i, 0, size / 2 , -size / 2+i, 0);
        }
    }
    pop();
}

// draw関数
function draw() {
    orbitControl(10)
    background(100)
    createPolarizer(200, 0, 0, 50, 0)
    if (polarizer.value() == "平行ニコル配置")createPolarizer(200, 0, 0, -50, 0)
    if (polarizer.value() == "直行ニコル配置")createPolarizer(200, 0, 0, -50, 1)
}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    elInit()
    initValue()
}

// class Sample{

// }