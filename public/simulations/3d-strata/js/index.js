//全画面表示
function fullScreen() {
    let p5Canvas = document.getElementById('p5Canvas');
    let canvas = createCanvas(windowWidth, 9 * windowHeight / 10, WEBGL);
    canvas.parent(p5Canvas);
}

// 外部ファイルの読み込み
function preload() {
    dataTable = loadTable("./data/sample-data.csv", "csv", "header")
    jaFont = loadFont('js/ZenMaruGothic-Regular.ttf');
}

let placeAddButton;
let placeRemoveButton;
// DOM要素の生成
function elCreate() {
    placeAddButton = select("#addButton")
    placeRemoveButton = select("#removeButton")
}

// 地点データの配列、地点データインプットの配列、地点データの個数、地層データインプットの配列
let placeNameArr = [],
    placeNameInputArr = [],
    placeNameInputNum = 0,
    placeDataInputArr = [];

// 地点データが入力された時に動く関数
function placeNameInputFunction() {
    for (let i = 0; i < placeNameInputNum; i++) {
        placeNameArr[i] = placeNameInputArr[i].value()
        placeDataInputArr[i]
            .html(str(placeNameArr[i]) + "のデータを編集")
        document.getElementById("placeDataInput" + str(i+1))
        .onclick = function () { window.open("child-window.html?" +placeNameArr[i], "window_name", "width=600,height=500"); };
    }
}

// // サブウィンドウを生成する関数
// function disp(a) {
//     window.open("child-window.html?" + a, "window_name", "width=500,height=500");
// }

// 地点データの追加ボタンを押した時に動く関数
function addButtonFunction() {
    placeNameInputNum += 1
    placeNameArr.push("地点" + str(placeNameInputNum))
    let parentDiv = createDiv()
        .parent(placePointNameInput)
        .class("mb-2")
        .id("placeNameInput" + str(placeNameInputNum))
    let inputGroup1 = createDiv()
        .parent(parentDiv)
        .class("input-group")
    let inputGroup2 = createDiv()
        .parent(parentDiv)
        .class("input-group")
    // input要素の上の部分
    createElement("span", "地点" + str(placeNameInputNum) + "：")
        .parent(inputGroup1)
        .class("input-group-text")
    let placeNameInput = createInput()
        .parent(inputGroup1)
        .class("form-control")
        .input(placeNameInputFunction)
    placeNameInputArr.push(placeNameInput)
    // input要素の下の部分
    createElement("span", "緯度")
        .parent(inputGroup2)
        .class("input-group-text")
    createInput(0, "number")
        .parent(inputGroup2)
        .class("form-control")
    createElement("span", "経度")
        .parent(inputGroup2)
        .class("input-group-text")
    createInput(0, "number")
        .parent(inputGroup2)
        .class("form-control")
    createDiv("地点" + str(placeNameInputNum) + "の名前、緯度、経度を入力してください。")
        .parent(parentDiv)
        .class("form-text")
    // サブウィンドウ生成用のDOM
    let placeDataInput = createA("javascript:void(0)", str(placeNameArr[placeNameInputNum - 1]) + "のデータを編集")
        .class("btn btn-outline-primary mb-2")
        .parent("placePointDataInput")
        .id("placeDataInput" + str(placeNameInputNum))
    document.getElementById("placeDataInput" + str(placeNameInputNum))
        .onclick = function () { window.open("child-window.html?" +placeNameArr[placeNameInputNum-1], "window_name", "width=1000,height=500"); };
    placeDataInputArr.push(placeDataInput)
}

// 地点データの削除ボタンを押した時に動く関数
function removeButtonFunction() {
    if (placeNameInputNum > 0) {
        select("#placeNameInput" + str(placeNameInputNum)).remove()
        placeNameArr.pop()
        placeNameInputArr.pop()
        select("#placeDataInput" + str(placeNameInputNum)).remove()
        placeDataInputArr.pop()
        placeNameInputNum -= 1
    }
}

// DOM要素の設定
function elInit() {
    placeAddButton.mousePressed(addButtonFunction)
    placeRemoveButton.mousePressed(removeButtonFunction)
}

// 初期値やシミュレーションの設定
placeArr = []
xArr = []
yArr = []
shallowArr = []
deepArr = []
kindsArr = []
function initValue() {
    camera(800, -500, 800, 0, 0, 0, 0, 1, 0)
    placeArr = dataTable.getColumn("place-name")
    xArr = dataTable.getColumn("x-point")
    yArr = dataTable.getColumn("y-point")
    shallowArr = dataTable.getColumn("shallow-point")
    deepArr = dataTable.getColumn("deep-point")
    kindsArr = dataTable.getColumn("kinds")
    textSize(25)
    textFont(jaFont);
    textAlign(CENTER);

}

// setup関数
function setup() {
    fullScreen()
    elCreate()
    elInit()
    initValue()
}

function backgroundSetting() {
    background(240)
    strokeWeight(3)
    // x軸
    stroke(255, 0, 0)
    line(0, 0, 0, 500, 0, 0)
    // y軸
    stroke(0, 255, 0)
    line(0, 0, 0, 0, 500, 0)
    // z軸
    stroke(0, 0, 255)
    line(0, 0, 0, 0, 0, 500)
    // 格子線
    strokeWeight(1)
    stroke(0)
    fill(0)
    for (let x = 0; x <= 500; x += 50) {
        line(x, 0, 0, x, 500, 0)
        line(x, 0, 0, x, 0, 500)
        if (x % 100 == 0) {
            push()
            translate(0, 0, 500)
            text(x, x, -10, 0)
            pop()
        }
    }
    push()
    translate(0, 0, 500)
    text("緯度", 250, -50)
    pop()

    for (let y = 0; y <= 500; y += 50) {
        line(0, y, 0, 500, y, 0)
        line(0, y, 0, 0, y, 500)
        if (y % 100 == 0) text(y, 0, y, 0)
    }
    text("深さ", -50, 250, 0)
    for (let z = 0; z <= 500; z += 50) {
        line(0, 0, z, 500, 0, z)
        line(0, 0, z, 0, 500, z)
        if (z % 100 == 0) {
            push()
            rotateY(PI / 2)
            translate(-z, 0, 500)
            text(z, 0, -10)
            pop()
        }
    }
    push()
    rotateY(PI / 2)
    translate(-250, -50, 500)
    text("経度", 0, -10)
    pop()
}

function createPlane1(x1, z1, y1, x2, z2, y2, x3, z3, y3) {
    beginShape()
    vertex(x1, y1, z1)
    vertex(x2, y2, z2)
    vertex(x3, y3, z3)
    endShape(CLOSE)
}

function createPlane2(x1, z1, y1, x2, z2, y2, x3, z3, y3, x4, z4, y4) {
    beginShape()
    vertex(x1, y1, z1)
    vertex(x2, y2, z2)
    vertex(x3, y3, z3)
    vertex(x4, y4, z4)
    endShape(CLOSE)
}

// draw関数
let rotateTime = 0;
function draw() {
    let modalIs = $("#dataRegisterModal").is(":hidden")
    if (modalIs) {
        orbitControl(2)
    }
    backgroundSetting()
    rotateTime += 5;
    for (let i = 0; i < placeArr.length; i++) {
        let x = xArr[i]
        let y = yArr[i]
        let z = shallowArr[i]
        let zLength = deepArr[i] - shallowArr[i]
        let kind = kindsArr[i]
        fill(0)
        push()
        translate(x, 0, y)
        rotateY(radians(rotateTime))
        text(placeArr[i], 0, -55)
        fill(255, 0, 0)
        noStroke()
        translate(0, -25, 0)
        cone(10, 50, 10, 3, true);
        pop()
        if (kind == "泥岩") fill(100, 150)
        if (kind == "砂岩") fill(116, 80, 48, 150)
        push()
        translate(x, int(z) + zLength / 2, y)
        box(50, zLength, 50)
        pop()
    }
    fill(100, 50)
    //泥岩のサンプル
    createPlane1(xArr[0], yArr[0], shallowArr[0], xArr[2], yArr[2], shallowArr[2], xArr[4], yArr[4], shallowArr[4])
    createPlane1(xArr[0], yArr[0], deepArr[0], xArr[2], yArr[2], deepArr[2], xArr[4], yArr[4], deepArr[4])
    createPlane2(xArr[0], yArr[0], shallowArr[0], xArr[2], yArr[2], shallowArr[2], xArr[2], yArr[2], deepArr[2], xArr[0], yArr[0], deepArr[0])
    createPlane2(xArr[0], yArr[0], shallowArr[0], xArr[4], yArr[4], shallowArr[4], xArr[4], yArr[4], deepArr[4], xArr[0], yArr[0], deepArr[0])
    createPlane2(xArr[2], yArr[2], shallowArr[2], xArr[4], yArr[4], shallowArr[4], xArr[4], yArr[4], deepArr[4], xArr[2], yArr[2], deepArr[2])

    fill(116, 80, 48, 50)
    //泥岩のサンプル
    createPlane1(xArr[1], yArr[1], shallowArr[1], xArr[3], yArr[3], shallowArr[3], xArr[5], yArr[5], shallowArr[5])
    createPlane1(xArr[1], yArr[1], deepArr[1], xArr[3], yArr[3], deepArr[3], xArr[5], yArr[5], deepArr[5])
    createPlane2(xArr[1], yArr[1], shallowArr[1], xArr[3], yArr[3], shallowArr[3], xArr[3], yArr[3], deepArr[3], xArr[1], yArr[1], deepArr[1])
    createPlane2(xArr[1], yArr[1], shallowArr[1], xArr[5], yArr[5], shallowArr[5], xArr[5], yArr[5], deepArr[5], xArr[1], yArr[1], deepArr[1])
    createPlane2(xArr[3], yArr[3], shallowArr[3], xArr[5], yArr[5], shallowArr[5], xArr[5], yArr[5], deepArr[5], xArr[3], yArr[3], deepArr[3])
}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    elInit()
    initValue()
}

// class Sample{

// }