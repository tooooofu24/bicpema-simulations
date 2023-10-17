///全画面表示
function fullScreen() {
    let p5Canvas = document.getElementById("p5Canvas")
    let canvas = createCanvas(p5Canvas.clientWidth, p5Canvas.clientHeight, WEBGL)
    canvas.parent("p5Canvas")
}

// 外部ファイルの読み込み
function preload() {
    cmfTable = loadTable("./data/cmf.csv", "csv", "header")
    osTable = loadTable("./data/os.csv", "csv", "header")
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
    opdInput = createInput(213.4931888, "number").class("form-control")
    colabNumIntro = createElement("label", "セロハンの組み合わせの数").class("form-label")
    colabNum = createSelect().input(createCelloColabInput).class("form-select")
    for (let i = 1; i <= 10; i++)colabNum.option(i)
    celloColabInputArr = []
    for (let i = 0; i < 10; i++) {
        celloColabInputArr.push(
            [
                createElement("label", str(i + 1) + "組目：枚数").hide().class("form-label"),
                createInput(1, "number").hide().attribute("min", 1).attribute("max", 10).class("form-control"),
                createElement("label", "　角度").hide().class("form-label"),
                createInput(90, "number").hide().class("form-control")
            ]
        )
    }
    beforeColor = createDiv("入射光").class("colorDiv")
    afterColor = createDiv("出射光").class("colorDiv")
    calculationButton = createButton("色の計算").class("btn btn-danger").mousePressed(calculate)
}

//出射光の計算をする
function calculate() {
    beforeColor.style("background-color:rgb(" + str(255) + "," + str(255) + "," + str(255) + ")")
    afterColor.style("background-color:rgb(" + str(R) + "," + str(G) + "," + str(B) + ")")
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
    celloColabInputArr[0][0].show()
    celloColabInputArr[0][1].show()
    celloColabInputArr[0][2].show()
    celloColabInputArr[0][3].show()
    beforeColor.position(0, 9 * windowHeight / 10).size(width / 3, windowHeight / 10)
    afterColor.position(width / 3, 9 * windowHeight / 10).size(width / 3, windowHeight / 10)
    calculationButton.position(2 * width / 3, 9 * windowHeight / 10).size(width / 3, windowHeight / 10)
}


let cmfRowNum;
let osRowNum;
let waveLengthArr;
let xLambda, yLambda, zLambda;
let osArr;
let xArr = [], yArr = [], zArr = [];
let xArr2 = [], yArr2 = [], zArr2 = [];
let R, G, B;
let lightArr;
// 初期値やシミュレーションの設定
function initValue() {
    cmfRowNum = cmfTable.getRowCount();
    waveLengthArr = cmfTable.getColumn("wave-length")
    xLambda = cmfTable.getColumn("x(lambda)")
    yLambda = cmfTable.getColumn("y(lambda)")
    zLambda = cmfTable.getColumn("z(lambda)")
    osRowNum = osTable.getRowCount();
    osArr = osTable.getColumn("optical-strength")
    osArrOrigin = osTable.getColumn("optical-strength")
    for (let i = 0; i < osRowNum; i++) {
        xArr.push(0);
        yArr.push(0);
        zArr.push(0);
        xArr2.push(0);
        yArr2.push(0);
        zArr2.push(0);
    }
    lightArr = osTable.getColumn("light")
}

// setup関数
function setup() {
    fullScreen()
    // elCreate()
    // elInit()
    // initValue()
    camera(0, 0, 500, 0, 0, 0, 0, 1, 0);
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
    // noStroke()
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


function r_theta(theta) {
    return [[cos(theta), -sin(theta)], [sin(theta), cos(theta)]]
}
function mai_r_theta(theta) {
    return [[cos(theta), sin(theta)], [-sin(theta), cos(theta)]]
}
function jhons(theta) {
    return [[sin(theta) ** 2, -sin(theta) * cos(theta)], [-sin(theta) * cos(theta), cos(theta) ** 2]]
}
function toRGB(a) {
    if (a <= 0.031308) {
        return 12.92 * a * 255
    } else {
        return (1.055 * a ** (1 / 2.4) - 0.055) * 255
    }
}
// draw関数
function draw() {
    background(100)
    createPolarizer(200, 0, 0, 50, 0)
    // celloNum = 0
    // for (let i = 0; i < colabNum.value(); i++)celloNum += parseInt(celloColabInputArr[i][1].value())
    // if (polarizer.value() == "平行ニコル配置") createPolarizer(200, 0, 0, 50 - 0.1 * celloNum, 0)
    // if (polarizer.value() == "直交ニコル配置") createPolarizer(200, 0, 0, 50 - 0.1 * celloNum, 1)
    // let z = 0
    // for (let i = 0; i < colabNum.value(); i++) {
    //     createCellophane(parseInt(celloColabInputArr[i][1].value()), parseInt(celloColabInputArr[i][3].value()), z)
    //     z += parseInt(celloColabInputArr[i][1].value())
    // }
    // // 本シミュレーションにおいては一枚目のセロハンに対する相対角度で計算を行う
    // // aは一組目のセロハンに対する偏光板一枚目の相対的な回転角
    // let I = 0
    // let a = radians(celloColabInputArr[0][3].value())
    // E_1 = [[sin(a)], [cos(a)]]
    // // bはセロハン二枚目の回転角
    // let b = radians(celloColabInputArr[1][3].value() - celloColabInputArr[0][3].value())
    // // cは一組目のセロハンに対する偏光板二枚目の相対的な回転角
    // let c = radians(celloColabInputArr[0][3].value())
    // for (let i = 380; i <= 750; i++) {
    //     let l = i
    //     delta = 2 * opdInput.value() * PI / l
    //     cello = [[1, 0], [0, math.exp(math.complex(0, -delta))]]
    //     E_2 = math.multiply(cello, E_1)
    //     E_3 = math.multiply(r_theta(b), math.multiply(cello, math.multiply(mai_r_theta(b), E_2)))
    //     E_4 = math.multiply(jhons(c), E_3)
    //     let magni = math.abs(math.abs(math.multiply(E_4[0], E_4[0])) + math.abs(math.multiply(E_4[1], E_4[1])))
    //     osArr[i - 380] = (magni * osArrOrigin[i - 380])
    //     xArr[i - 380] = osArr[i - 380] * xLambda[i - 380]
    //     yArr[i - 380] = osArr[i - 380] * yLambda[i - 380]
    //     zArr[i - 380] = osArr[i - 380] * zLambda[i - 380]
    //     xArr2[i - 380] = lightArr[i - 380] * xLambda[i - 380]
    //     yArr2[i - 380] = lightArr[i - 380] * yLambda[i - 380]
    //     zArr2[i - 380] = lightArr[i - 380] * zLambda[i - 380]
    // }
    // x_sum = math.sum(xArr)
    // y_sum = math.sum(yArr)
    // z_sum = math.sum(zArr)
    // x_sum2 = math.sum(xArr2)
    // y_sum2 = math.sum(yArr2)
    // z_sum2 = math.sum(zArr2)
    // x_num = map(x_sum, x_sum + y_sum + z_sum, 0, 1, 0)
    // y_num = map(y_sum, x_sum + y_sum + z_sum, 0, 1, 0)
    // z_num = map(z_sum, x_sum + y_sum + z_sum, 0, 1, 0)
    // x_num2 = map(x_sum2, x_sum2 + y_sum2 + z_sum2, 0, 1, 0)
    // y_num2 = map(y_sum2, x_sum2 + y_sum2 + z_sum2, 0, 1, 0)
    // z_num2 = map(z_sum2, x_sum2 + y_sum2 + z_sum2, 0, 1, 0)
    // tosRGB =
    //     [[3.2406, -1.5372, -0.4986],
    //     [-0.9689, 1.8758, 0.0415],
    //     [0.0557, -0.2040, 1.0570]]
    // sRGB = math.multiply(tosRGB, [x_num, y_num, z_num])
    // sRGB2 = math.multiply(tosRGB, [x_num2, y_num2, z_num2])
    // R = toRGB(sRGB[0])
    // G = toRGB(sRGB[1])
    // B = toRGB(sRGB[2])
    // R2 = toRGB(sRGB2[0])
    // G2 = toRGB(sRGB2[1])
    // B2 = toRGB(sRGB2[2])
    // beforeColor.style("background-color:rgb(" + str(R2) + "," + str(G2) + "," + str(B2) + ")")
    // afterColor.style("background-color:rgb(" + str(R) + "," + str(G) + "," + str(B) + ")")
}

// windowがリサイズされたときの処理
function windowResized() {
    let p5Canvas = document.getElementById("p5Canvas")
    let canvas = resizeCanvas(p5Canvas.clientWidth, p5Canvas.clientHeight, WEBGL)
    // elInit()
    initValue()
}