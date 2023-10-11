//全画面表示
function fullScreen() {
    createCanvas(windowWidth, 9 * windowHeight / 10, WEBGL);
}

// 外部ファイルの読み込み
function preload() {
    jaFont = loadFont('../../assets/fonts/ZenMaruGothic-Regular.ttf');
}

// 地点を追加、削除するボタン
let placeAddButton,
    placeRemoveButton;
// DOM要素の生成
function elCreate() {
    placeAddButton = select("#addButton")
    placeRemoveButton = select("#removeButton")
}

// 地点のデータを入力するインプットの連想配列
let dataInputArr = {}
// データ構造
// dataInputArr {地点+地点番号:
// {
// name: 地点の名前,
// data:
//     {
//         x: 経度,
//         y: 緯度
//     },
// edit: データを編集するボタン,
// layer:
//      [
//          [
//              1層目の浅い方の深さ,
//              1層目の深い方の深さ,
//              岩層の種類,
//          ],
//          [
//              2層目の浅い方の深さ,
//              2層目の深い方の深さ,
//              岩層の種類,
//          ]
//      ]
// }


// 地点データが入力された時に動く関数
function placeNameInputFunction() {

    // 地点データの数
    let placeNum = Object.keys(dataInputArr).length

    // データを編集するボタンのhtml要素を書き換える繰り返し
    for (let i = 0; i < placeNum; i++) {
        let place = "地点" + str(i + 1)
        let placeName = dataInputArr[place].name.value()
        if (placeName == "") {
            placeName = place
            dataInputArr[place].edit.html("地点" + str(i + 1) + "のデータを編集")
        } else {
            dataInputArr[place].edit.html(placeName + "のデータを編集")
        }
        document.getElementById("placeDataInput" + str(i + 1))
            .onclick = function () {
                let win = window.open("child-window.html?" + placeName, "window_name", "width=1000,height=500")
            };
    }

}

// 地点データの追加ボタンを押した時に動く関数
function addButtonFunction() {

    // 地点データの数
    let placeNum = Object.keys(dataInputArr).length

    // 新しく生成する地点データの番号
    let newPlaceNum = placeNum + 1

    // 新しく生成する地点データ入力オブジェクト
    let newDom = new DOM(newPlaceNum)

    // 新しく生成する地点名
    let placeName = "地点" + str(newPlaceNum)

    // 生成したオブジェクトを連想配列に登録
    dataInputArr[placeName] = { name: newDom.placeNameInput, data: { x: "", y: "" }, edit: "", layer: "" }
    dataInputArr[placeName]["data"]["x"] = newDom.xInput
    dataInputArr[placeName]["data"]["y"] = newDom.yInput
    dataInputArr[placeName]["edit"] = newDom.placeDataInput

    // サブウィンドウを開く機構の付与
    document.getElementById("placeDataInput" + str(newPlaceNum))
        .onclick = function () {
            let win = window.open("child-window.html?" + placeName, "window_name", "width=1000,height=500")
        };

}

// 地点データの削除ボタンを押した時に動く関数
function removeButtonFunction() {

    // 地点データの個数を取得
    let placeNum = Object.keys(dataInputArr).length

    if (placeNum > 0) {
        select("#placeNameInput" + str(placeNum)).remove()
        select("#placeDataInput" + str(placeNum)).remove()
        delete dataInputArr["地点" + placeNum]
    }

}

// DOM要素の設定
function elInit() {
    placeAddButton.mousePressed(addButtonFunction)
    placeRemoveButton.mousePressed(removeButtonFunction)
}

// 初期値やシミュレーションの設定
function initValue() {
    camera(800, -500, 800, 0, 0, 0, 0, 1, 0)
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

// 緯度経度の最小値と最大値を計算する関数
function calculateValue() {
    let latitudeArr = []
    let longitudeArr = []
    for (let key in dataInputArr) {
        let value = dataInputArr[key]
        let data = value.data
        let latitude = data.y.value()
        let longitude = data.x.value()
        if (latitude != "") {
            latitudeArr.push(int(latitude))
        } else {
            latitudeArr.push(0)
        }
        if (longitude != "") {
            longitudeArr.push(int(longitude))
        } else {
            longitudeArr.push(0)
        }
    }
    return {
        x: {
            min: min(longitudeArr),
            max: max(longitudeArr)
        },
        y: {
            min: min(latitudeArr),
            max: max(latitudeArr)
        },
    }
}

//背景を設定する関数
function backgroundSetting(min_unit, max_unit) {
    background(240)
    strokeWeight(3)
    // x軸
    stroke(255, 0, 0)
    line(-500, 0, -500, 500, 0, -500)
    // z軸
    stroke(0, 255, 0)
    line(-500, 0, -500, -500, 1000, -500)
    // y軸
    stroke(0, 0, 255)
    line(-500, 0, -500, -500, 0, 500)
    // 格子線
    smooth()
    strokeWeight(1)
    stroke(170, 150)
    fill(0)
    for (let x = 0; x <= 1000; x += 50) {
        line(x - 500, 0, -500, x - 500, 1000, -500)
        line(x - 500, 0, -500, x - 500, 0, 500)
        if (x % 100 == 0) {
            push()
            translate(-500, 0, 500)
            let x_map = map(x, 0, 1000, min_unit, max_unit)
            if (min_unit == max_unit) x_map = x
            text(nf(x_map, 1, 1), x, -10, 0)
            pop()
        }
    }
    push()
    translate(0, 0, 500)
    text("経度", 0, -50)
    pop()

    for (let z = 0; z <= 1000; z += 50) {
        line(-500, z, -500, 500, z, -500)
        line(-500, z, -500, -500, z, 500)
        if (z % 100 == 0) {
            push()
            translate(0, 0, -500)
            text(z, -500, z)
            pop()
        }
    }
    push()
    translate(0, 0, -500)
    text("深さ", -550, 500, 0)
    pop()
    for (let y = 0; y <= 1000; y += 50) {
        line(-500, 0, y - 500, 500, 0, y - 500)
        line(-500, 0, y - 500, -500, 1000, y - 500)
        if (y % 100 == 0) {
            push()
            let y_map = map(y, 0, 1000, min_unit, max_unit)
            if (min_unit == max_unit) y_map = y
            rotateY(PI / 2)
            translate(-y + 500, 0, 500)
            text(nf(y_map, 1, 1), 0, -10)
            pop()
        }
    }
    push()
    rotateY(PI / 2)
    translate(0, -50, 500)
    text("緯度", 0, -10)
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

// 子ウィンドウからデータを取得するための関数
function submit(arr) {
    let name = arr[0]
    let dataArr = arr[1]
    for (let key in dataInputArr) {
        let placeName = dataInputArr[key].name.value()
        if (placeName == "") placeName = key
        if (placeName == name) {
            dataInputArr[key].layer = dataArr
        }
    }
}

// 方角を描画する関数
function drawDirMark(x, y) {
    push()
    rotateX(PI / 2)
    strokeWeight(1)
    stroke(0)
    line(x + 50, y, x - 50, y)
    line(x + 20, y - 50, x - 20, y - 50)
    line(x, y - 100, x, +y + 100)
    line(x, y - 100, x - 20, y - 50)
    text("東", x + 70, y + 8)
    text("西", x - 70, y + 8)
    text("南", x, y + 70 + 60)
    text("北", x, y - 70 - 40)
    pop()
}


function drawStrata(key, rotateTime, min_unit, max_unit) {
    let name = dataInputArr[key].name.value()
    if (name == "") name = key
    let data = dataInputArr[key].data
    let x = data.x.value()
    if (x == "") x = 0
    x = map(x, min_unit, max_unit, -500, 500)
    let y = data.y.value()
    if (y == "") y = 0
    y = map(y, min_unit, max_unit, -500, 500)
    fill(0)
    push()
    translate(x, 0, y)
    rotateY(radians(rotateTime))
    text(name, 0, -55)
    fill(255, 0, 0)
    noStroke()
    translate(0, -25, 0)
    cone(10, 50, 10, 3, true);
    pop()
    let layer = dataInputArr[key].layer
    for (let i = 0; i < layer.length; i++) {
        let z = layer[i][0]
        let zLength = layer[i][1] - layer[i][0]
        let kind = layer[i][2]
        if (kind == "砂岩層") fill(108, 94, 85, 150)
        if (kind == "泥岩層") fill(132, 132, 120, 150)
        if (kind == "れき岩層") fill(68, 78, 41, 150)
        if (kind == "石灰岩層") fill(174, 170, 170, 150)
        if (kind == "凝灰岩層・火山灰層") fill(190, 145, 91, 150)
        if (kind == "ローム層") fill(112, 58, 21, 150)
        if (kind == "その他の層") fill(0, 150)
        push()
        translate(x, int(z) + zLength / 2, y)
        box(50, zLength, 50)
        pop()
    }
}

// draw関数
let rotateTime = 0;
function draw() {
    let coordinateData = calculateValue()
    let x_min = coordinateData.x.min
    if (x_min == Infinity) x_min = 0
    let x_max = coordinateData.x.max
    if (x_max == -Infinity) x_max = 0
    let y_min = coordinateData.y.min
    if (y_min == Infinity) y_min = 0
    let y_max = coordinateData.y.max
    if (y_max == -Infinity) y_max = 0
    let min_unit = min([x_min, y_min])
    let max_unit = max([x_max, y_max])
    backgroundSetting(min_unit, max_unit)
    drawDirMark(-600, -600)

    // データ登録モーダルを開いている時にオービットコントロールを無効化
    let modalIs = $("#dataRegisterModal").is(":hidden")
    if (modalIs) {
        orbitControl(2)
    }

    rotateTime += 2;
    for (let key in dataInputArr) {
        drawStrata(key, rotateTime, min_unit, max_unit)
    }

    // fill(100, 50)
    // //泥岩のサンプル
    // createPlane1(xArr[0], yArr[0], shallowArr[0], xArr[2], yArr[2], shallowArr[2], xArr[4], yArr[4], shallowArr[4])
    // createPlane1(xArr[0], yArr[0], deepArr[0], xArr[2], yArr[2], deepArr[2], xArr[4], yArr[4], deepArr[4])
    // createPlane2(xArr[0], yArr[0], shallowArr[0], xArr[2], yArr[2], shallowArr[2], xArr[2], yArr[2], deepArr[2], xArr[0], yArr[0], deepArr[0])
    // createPlane2(xArr[0], yArr[0], shallowArr[0], xArr[4], yArr[4], shallowArr[4], xArr[4], yArr[4], deepArr[4], xArr[0], yArr[0], deepArr[0])
    // createPlane2(xArr[2], yArr[2], shallowArr[2], xArr[4], yArr[4], shallowArr[4], xArr[4], yArr[4], deepArr[4], xArr[2], yArr[2], deepArr[2])

    // fill(116, 80, 48, 50)
    // //泥岩のサンプル
    // createPlane1(xArr[1], yArr[1], shallowArr[1], xArr[3], yArr[3], shallowArr[3], xArr[5], yArr[5], shallowArr[5])
    // createPlane1(xArr[1], yArr[1], deepArr[1], xArr[3], yArr[3], deepArr[3], xArr[5], yArr[5], deepArr[5])
    // createPlane2(xArr[1], yArr[1], shallowArr[1], xArr[3], yArr[3], shallowArr[3], xArr[3], yArr[3], deepArr[3], xArr[1], yArr[1], deepArr[1])
    // createPlane2(xArr[1], yArr[1], shallowArr[1], xArr[5], yArr[5], shallowArr[5], xArr[5], yArr[5], deepArr[5], xArr[1], yArr[1], deepArr[1])
    // createPlane2(xArr[3], yArr[3], shallowArr[3], xArr[5], yArr[5], shallowArr[5], xArr[5], yArr[5], deepArr[5], xArr[3], yArr[3], deepArr[3])
}

// windowがリサイズされたときの処理
function windowResized() {
    fullScreen()
    elInit()
    initValue()
}



class DOM {
    constructor(n) {
        this.n = n
        this.parentDiv = createDiv()
            .parent(placePointNameInput)
            .class("mb-2")
            .id("placeNameInput" + str(this.n))
        this.inputGroup1 = createDiv()
            .parent(this.parentDiv)
            .class("input-group")
        this.inputGroup2 = createDiv()
            .parent(this.parentDiv)
            .class("input-group")
        // input要素の上の部分
        createElement("span", "地点" + str(this.n) + "：")
            .parent(this.inputGroup1)
            .class("input-group-text")
        this.placeNameInput = createInput()
            .parent(this.inputGroup1)
            .class("form-control")
            .input(placeNameInputFunction)
        // input要素の下の部分
        createElement("span", "緯度")
            .parent(this.inputGroup2)
            .class("input-group-text")
        this.yInput = createInput(0, "number")
            .parent(this.inputGroup2)
            .class("form-control")

        createElement("span", "経度")
            .parent(this.inputGroup2)
            .class("input-group-text")
        this.xInput = createInput(0, "number")
            .parent(this.inputGroup2)
            .class("form-control")

        createDiv("地点" + str(this.n) + "の名前、緯度、経度を入力してください。")
            .parent(this.parentDiv)
            .class("form-text")
        // サブウィンドウ生成用のDOM
        this.placeDataInput = createA("javascript:void(0)", "地点" + str(this.n) + "のデータを編集")
            .class("btn btn-outline-primary mb-2")
            .parent("placePointDataInput")
            .id("placeDataInput" + str(this.n))
    }
}