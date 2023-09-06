///全画面表示
function fullScreen() {
    createCanvas(2 * windowWidth / 3, 1 * windowHeight / 10 + 7 * windowHeight / 10, WEBGL)
}

// 外部ファイルの読み込み
function preload() {

}

function createCelloColabInput() {
    for (let i = 0; i < parseInt(colabNum.value()); i++) {
        celloColabInputArr[i][0].show().style("font-size:16px; display:flex; align-items:center;")
        celloColabInputArr[i][1].show()
        celloColabInputArr[i][2].show().style("font-size:16px; display:flex; align-items:center;")
        celloColabInputArr[i][3].show()
    }
    for (let i = parseInt(colabNum.value()); i < 10; i++) {
        celloColabInputArr[i][0].hide()
        celloColabInputArr[i][1].hide()
        celloColabInputArr[i][2].hide()
        celloColabInputArr[i][3].hide()
    }
}

// DOM要素の生成
function elCreate() {
    polarizerIntro = createElement("label", "偏光板の配置").class("form-label")
    polarizer = createSelect().class("form-select")
    optionArr = ["平行ニコル配置", "直交ニコル配置"]
    for (let i = 0; i < optionArr.length; i++)polarizer.option(optionArr[i])
    opdInputIntro = createElement("label", "光路差").class("form-label")
    opdInput = createInput(216.15, "number").class("form-control")
    colabNumIntro = createElement("label", "セロハンの組み合わせの数").class("form-label")
    colabNum = createSelect().input(createCelloColabInput).class("form-select")
    for (let i = 0; i < 11; i++)colabNum.option(i)
    celloColabInputArr = []
    for (let i = 0; i < 10; i++) {
        celloColabInputArr.push(
            [
                createElement("label", str(i + 1) + "組目：枚数").hide().class("form-label"),
                createInput(1, "number").hide().attribute("min", 0).attribute("max", 10).class("form-control"),
                createElement("label", "　角度").hide().class("form-label"),
                createInput(1, "number").hide().class("form-control")
            ]
        )
    }
    beforeColor = createDiv("入射光").class("colorDiv")
    afterColor = createDiv("出射光").class("colorDiv")
    calculationButton = createButton("色の計算").class("btn btn-danger").mousePressed(calculate)
}

//出射光の計算をする
function calculate() {
    beforeColor.style("background-color:rgb("+str(r1)+","+str(g1)+","+str(b1)+ ")")
    afterColor.style("background-color:rgb("+str(r2)+","+str(g2)+","+str(b2)+ ")")
}

// DOM要素の設定
function elInit() {
    polarizerIntro.position(width, windowHeight / 10).size(windowWidth / 3, windowHeight / 18)
    polarizer.position(width, windowHeight / 10 + windowHeight / 18).size(windowWidth / 3, windowHeight / 18)
    opdInputIntro.position(width, windowHeight / 10 + 2 * windowHeight / 18).size(windowWidth / 3, windowHeight / 18)
    opdInput.position(width, windowHeight / 10 + 3 * windowHeight / 18).size(windowWidth / 3, windowHeight / 18)
    colabNumIntro.position(width, windowHeight / 10 + 4 * windowHeight / 18).size(windowWidth / 3, windowHeight / 18)
    colabNum.position(width, windowHeight / 10 + 5 * windowHeight / 18).size(windowWidth / 3, windowHeight / 18)
    for (let i = 0; i < 10; i++) {
        celloColabInputArr[i][0].position(width, windowHeight / 10 + (6 + i) * windowHeight / 18).size(windowWidth / 6, windowHeight / 18)
        celloColabInputArr[i][1].position(width + windowWidth / 6, windowHeight / 10 + (6 + i) * windowHeight / 18).size(windowWidth / 24, windowHeight / 18)
        celloColabInputArr[i][2].position(width + windowWidth / 6 + windowWidth / 24, windowHeight / 10 + (6 + i) * windowHeight / 18).size(windowWidth / 12, windowHeight / 18)
        celloColabInputArr[i][3].position(width + windowWidth / 6 + windowWidth / 24 + windowWidth / 12, windowHeight / 10 + (6 + i) * windowHeight / 18).size(windowWidth / 24, windowHeight / 18)
    }
    beforeColor.position(0, 9 * windowHeight / 10).size(width / 3, windowHeight / 10)
    afterColor.position(width / 3, 9 * windowHeight / 10).size(width / 3, windowHeight / 10)
    calculationButton.position(2 * width / 3, 9 * windowHeight / 10).size(width / 3, windowHeight / 10)
}


let r1,g1,b1;
let r2,g2,b2;
// 初期値やシミュレーションの設定
function initValue() {
    r1 = 255
    g1 = 255
    b1 = 0
    r2 = 255
    g2 = 0
    b2 = 255
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
    strokeWeight(1);
    stroke(0, 200);
    box(size, size, 0);
    if (pattern == 0) {
        for (let i = 0; i < size; i += 5) {
            line(-size / 2 + i, size / 2, 0, -size / 2 + i, -size / 2, 0);
        }
    } else {
        for (let i = 0; i < size; i += 5) {
            line(-size / 2, -size / 2 + i, 0, size / 2, -size / 2 + i, 0);
        }
    }
    pop();
}

function createCellophane(n, r, a) {
    noStroke()
    push()
    rotateZ(r * PI / 180)
    fill(157, 204, 224, 50)
    for (let i = 0; i < n; i++) {
        push()
        translate(-0, 0, -0.1 * (i + a) + 50)
        box(100, 200, 0.1)
        pop()
    }
    pop()
}

// draw関数
function draw() {
    orbitControl(10)
    background(100)
    createPolarizer(200, 0, 0, 50, 0)
    celloNum = 0
    for (let i = 0; i < colabNum.value(); i++)celloNum += parseInt(celloColabInputArr[i][1].value())
    if (polarizer.value() == "平行ニコル配置") createPolarizer(200, 0, 0, 50 - 0.1 * celloNum, 0)
    if (polarizer.value() == "直交ニコル配置") createPolarizer(200, 0, 0, 50 - 0.1 * celloNum, 1)
    let z = 0
    for (let i = 0; i < colabNum.value(); i++) {
        createCellophane(parseInt(celloColabInputArr[i][1].value()), parseInt(celloColabInputArr[i][3].value()), z)
        z += parseInt(celloColabInputArr[i][1].value())
    }
}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    elInit()
    initValue()
}