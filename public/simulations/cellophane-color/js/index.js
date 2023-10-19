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

let polarizerSelect,
    opdInput,
    cellophaneAddButton,
    cellophaneRemoveButton;

// DOM要素の生成
function elCreate() {
    polarizerSelect = select("#polarizerSelect")
    opdInput = select("#opdInput")
    cellophaneAddButton = select("#cellophaneAddButton")
    cellophaneRemoveButton = select("#cellophaneRemoveButton")
}

//出射光の計算をする
function calculate() {
    beforeColor.style("background-color:rgb(" + str(255) + "," + str(255) + "," + str(255) + ")")
    afterColor.style("background-color:rgb(" + str(rAfter) + "," + str(gAfter) + "," + str(bAfter) + ")")
}

function cellophaneAddButtonFunction() {
    colabNum += 1
    cellophaneArr.push(new Cellophane(colabNum))
}
function cellophaneRemoveButtonFunction() {
    if (colabNum > 0) {
        let targetDiv = select("#cellophane-" + colabNum)
        cellophaneArr.pop(-1)
        targetDiv.remove()
        colabNum -= 1
    }
}
// DOM要素の設定
function elInit() {
    cellophaneAddButton.mousePressed(cellophaneAddButtonFunction)
    cellophaneRemoveButton.mousePressed(cellophaneRemoveButtonFunction)
}

let cmfRowNum;
let osRowNum;
let waveLengthArr;
let xLambda, yLambda, zLambda;
let osArr;
let xArrAfter = [], yArrAfter = [], zArrAfter = [];
let xArrBefore = [], yArrBefore = [], zArrBefore = [];
let lightArr;
let cellophaneNum;
let cellophaneArr = [];
let rBefore = 0, gBefore = 0, bBefore = 0;
let rAfter = 0, gAfter = 0, bAfter = 0;
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
        xArrAfter.push(0);
        yArrAfter.push(0);
        zArrAfter.push(0);
        xArrBefore.push(0);
        yArrBefore.push(0);
        zArrBefore.push(0);
    }
    lightArr = osTable.getColumn("light")
    colabNum = 0
    cellophaneNum = 0
}

// setup関数
function setup() {
    fullScreen()
    elCreate()
    elInit()
    initValue()
    rBefore, gBefore, bBefore = beforeColorCalculate()
    camera(0, 0, 300, 0, 0, 0, 0, 1, 0);
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

function createCellophane(n, rAfter, a) {
    // noStroke()
    push()
    rotateZ(rAfter * PI / 180)
    fill(157, 204, 224, 50)
    for (let i = 0; i < n; i++) {
        push()
        translate(-0, 0, -0.1 * (i + a))
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


function numInputFunction() {
    cellophaneNum = 0
    for (let i = 0; i < colabNum; i++) {
        let num = i + 1
        let numInput = select("#numInput-" + num)
        cellophaneNum += int(numInput.value())
    }
    return cellophaneNum
}


// 偏光板１枚を透過したときの色の計算
function beforeColorCalculate() {
    for (let i = 380; i <= 750; i++) {
        xArrBefore[i - 380] = lightArr[i - 380] * xLambda[i - 380]
        yArrBefore[i - 380] = lightArr[i - 380] * yLambda[i - 380]
        zArrBefore[i - 380] = lightArr[i - 380] * zLambda[i - 380]
    }
    xSumBefore = math.sum(xArrBefore)
    ySumBefore = math.sum(yArrBefore)
    zSumBefore = math.sum(zArrBefore)
    xNumBefore = map(xSumBefore, xSumBefore + ySumBefore + zSumBefore, 0, 1, 0)
    yNumBefore = map(ySumBefore, xSumBefore + ySumBefore + zSumBefore, 0, 1, 0)
    zNumBefore = map(zSumBefore, xSumBefore + ySumBefore + zSumBefore, 0, 1, 0)
    tosRGB = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ]
    rgbBefore = math.multiply(tosRGB, [xNumBefore, yNumBefore, zNumBefore])
    rBefore = toRGB(rgbBefore[0])
    gBefore = toRGB(rgbBefore[1])
    bBefore = toRGB(rgbBefore[2])
    let beforeColor = select("#beforeColor")
    beforeColor.style("background-color:rgb(" + str(rBefore) + "," + str(gBefore) + "," + str(bBefore) + ")")
    return rBefore, gBefore, bBefore
}

function afterColorCalculate() {
    if (colabNum >= 1) {
        let referenceAngle = select("#rotateInput-1")
        // 本シミュレーションにおいては一枚目のセロハンに対する相対角度で計算を行う
        // aは一組目のセロハンに対する偏光板一枚目の相対的な回転角
        let a = radians(referenceAngle.value())
        E_1 = [[sin(a)], [cos(a)]]
        let num = select("#numInput-1")
        for (let i = 380; i <= 750; i++) {
            let l = i
            delta = num.value() * 2 * opdInput.value() * PI / l
            cello = [[1, 0], [0, math.exp(math.complex(0, -delta))]]
            E_2 = math.multiply(cello, E_1)
            if (colabNum > 1) {
                let sample2 = select("#rotateInput-2")
                // bはセロハン二枚目の回転角
                let bAfter = radians(sample2.value() - referenceAngle.value())
                num = select("#numInput-2")
                delta = num.value() * 2 * opdInput.value() * PI / l
                cello = [[1, 0], [0, math.exp(math.complex(0, -delta))]]
                E_3 = math.multiply(r_theta(bAfter), math.multiply(cello, math.multiply(mai_r_theta(bAfter), E_2)))
                for (let ss = 3; ss <= colabNum; ss++) {
                    num = select("#numInput-" + ss)
                    delta = num.value() * 2 * opdInput.value() * PI / l
                    cello = [[1, 0], [0, math.exp(math.complex(0, -delta))]]
                    let sample2 = select("#rotateInput-" + ss)
                    // bはセロハン二枚目の回転角
                    let bAfter = radians(sample2.value() - referenceAngle.value())
                    // cは一組目のセロハンに対する偏光板二枚目の相対的な回転角
                    E_3 = math.multiply(r_theta(bAfter), math.multiply(cello, math.multiply(mai_r_theta(bAfter), E_3)))
                }
                // cは一組目のセロハンに対する偏光板二枚目の相対的な回転角
                let c = radians(referenceAngle.value())
                E_4 = math.multiply(jhons(c), E_3)
            } else {
                // cは一組目のセロハンに対する偏光板二枚目の相対的な回転角
                let c = radians(referenceAngle.value())
                E_4 = math.multiply(jhons(c), E_2)
            }
            let magni = math.abs(math.abs(math.multiply(E_4[0], E_4[0])) + math.abs(math.multiply(E_4[1], E_4[1])))
            console.log(magni)
            osArr[i - 380] = (magni * osArrOrigin[i - 380])
            xArrAfter[i - 380] = osArr[i - 380] * xLambda[i - 380]
            yArrAfter[i - 380] = osArr[i - 380] * yLambda[i - 380]
            zArrAfter[i - 380] = osArr[i - 380] * zLambda[i - 380]
        }
        xSumAfter = math.sum(xArrAfter)
        ySumAfter = math.sum(yArrAfter)
        zSumAfter = math.sum(zArrAfter)
        xNumAfter = map(xSumAfter, xSumAfter + ySumAfter + zSumAfter, 0, 1, 0)
        yNumAfter = map(ySumAfter, xSumAfter + ySumAfter + zSumAfter, 0, 1, 0)
        zNumAfter = map(zSumAfter, xSumAfter + ySumAfter + zSumAfter, 0, 1, 0)
        tosRGB = [
            [3.2406, -1.5372, -0.4986],
            [-0.9689, 1.8758, 0.0415],
            [0.0557, -0.2040, 1.0570]
        ]
        sRGB = math.multiply(tosRGB, [xNumAfter, yNumAfter, zNumAfter])
        rAfter = toRGB(sRGB[0])
        gAfter = toRGB(sRGB[1])
        bAfter = toRGB(sRGB[2])
    } else {
        rAfter = rBefore
        gAfter = gBefore
        bAfter = bBefore
    }
    let afterColor = select("#afterColor")
    afterColor.style("background-color:rgb(" + str(rAfter) + "," + str(gAfter) + "," + str(bAfter) + ")")
    return rAfter, gAfter, bAfter
}

// draw関数
let rotateTime = 0
function draw() {
    background(100)
    orbitControl(10)
    // rotateTime += 0.25
    // rotateY(rotateTime * PI / 180)
    // 入射光側
    fill(rBefore, gBefore, bBefore, 100)
    noStroke()
    // rect(-100, -100, 200, 200)
    ellipse(0, 0, 100, 100)
    createPolarizer(200, 0, 0, 0, 0)
    cellophaneNum = numInputFunction()
    if (polarizerSelect.value() == "平行ニコル配置") createPolarizer(200, 0, 0, - 0.1 * cellophaneNum, 0)
    if (polarizerSelect.value() == "直交ニコル配置") createPolarizer(200, 0, 0, - 0.1 * cellophaneNum, 1)
    push()
    rotateX(PI / 2)
    translate(0, -0.05 * cellophaneNum, 0)
    fill(0)
    cylinder(1, 0.1 * cellophaneNum + 50, 10, 3, true, true);
    translate(0, -25 - 0.05 * cellophaneNum, 0)
    rotateZ(PI)
    cone(5, 10, 10, 3, false);
    pop()
    let z = 0
    for (let i = 0; i < colabNum; i++) {
        let num = i + 1
        let numInput = select("#numInput-" + num)
        let rotateInput = select("#rotateInput-" + num)
        createCellophane(numInput.value(), rotateInput.value(), z)
        z += parseInt(numInput.value())
    }
    rAfter, gAfter, bAfter = afterColorCalculate()
    noStroke()
    fill(rAfter, gAfter, bAfter)
    push()
    translate(0, 0, - 0.1 * cellophaneNum - 1)
    ellipse(0, 0, 100, 100)
    pop()


}

// windowがリサイズされたときの処理
function windowResized() {
    let p5Canvas = document.getElementById("p5Canvas")
    let canvas = resizeCanvas(p5Canvas.clientWidth, p5Canvas.clientHeight, WEBGL)
    elInit()
    for (let i = 0; i < cellophaneNum; i++)cellophaneRemoveButtonFunction()
    initValue()
    camera(0, 0, 300, 0, 0, 0, 0, 1, 0);
    beforeColorCalculate()
}

class Cellophane {
    constructor(n) {
        this.number = n
        let parentDiv = createDiv().parent("#cellophaneColabNum").id("cellophane-" + this.number).class("mb-1 pb-1")
        let inputGroup = createDiv().parent(parentDiv).class("input-group")
        let numSpan = createSpan(this.number + "組目の枚数").parent(inputGroup).class("input-group-text")
        let numInput = createInput(1, "number").parent(inputGroup).class("form-control").attribute("min", 1).id("numInput-" + this.number)
        let rotateSpan = createSpan(this.number + "組目の回転角").parent(inputGroup).class("input-group-text")
        let rotateInput = createInput(1, "number").parent(inputGroup).class("form-control").id("rotateInput-" + this.number)
    }
}