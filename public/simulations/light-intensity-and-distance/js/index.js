///全画面表示
function fullScreen() {
  let p5Canvas = select("#p5Canvas")
  let canvas = createCanvas(windowWidth / 2, 9 * windowHeight / 20, WEBGL)
  canvas.parent(p5Canvas)
}


let dataNum = 0
let data = []

function dataAddButtonFunctioon() {
  dataNum++
  data.push(new DOM(dataNum))
  inputFunction()
}

function dataRemoveButtonFunction() {
  if (dataNum > 0) {
    let target = select("#data-" + dataNum)
    target.remove()
    dataNum--
  }
  inputFunction()
}


let dataAddButton
// DOM要素の生成
function elCreate() {
  dataAddButton = select("#dataAddButton").mousePressed(dataAddButtonFunctioon)
  dataRemoveButton = select("#dataRemoveButton").mousePressed(dataRemoveButtonFunction)
}

let theoreticalArr = []
let coordinateArr = []
// 初期値やシミュレーションの設定
function initValue() {
  theoreticalArr = []
  coordinateArr = []
  for (let x = 1; x < 41; x += 0.01) {
    let y = 1275 / sq(x)
    theoreticalArr.push({ "x": x, "y": y })
  }
  for (let i = 0; i < 200; i++) {
    coordinateArr.push([random(-180, 180), random(-180, 180), random(-180, 180)])
  }
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
  fill(200, 200, 0)
  sphere(20)
  stroke(255)
  strokeWeight(0.5)
  for (i = 0; i < 200; i++) {
    push()
    rotateX(radians(coordinateArr[i][0]))
    rotateY(radians(coordinateArr[i][1]))
    rotateZ(radians(coordinateArr[i][2]))
    line(-400, 0, 0, 400, 0, 0)
    pop()
  }

  strokeWeight(1)
  stroke(255, 0, 0)
  push()
  rotateZ(PI / 12)
  push()
  rotateY(PI / 12)
  line(-400, 0, 0, 400, 0, 0)
  pop()
  push()
  rotateY(-PI / 12)
  line(-400, 0, 0, 400, 0, 0)
  pop()
  pop()

  push()
  rotateZ(-PI / 12)
  push()
  rotateY(PI / 12)
  line(-400, 0, 0, 400, 0, 0)
  pop()
  push()
  rotateY(-PI / 12)
  line(-400, 0, 0, 400, 0, 0)
  pop()
  pop()
  strokeWeight(15)
  stroke(100, 100, 100, 10)
  push()
  rotateY(PI / 2)
  for (let x = -25; x <= 25; x += 6) {
    for (let y = -25; y <= 25; y += 6) {
      if (abs(sq(x) + sq(y)) <= 10000) {
        let z = sqrt(10000 - sq(x) - sq(y))
        point(x, y, z)

      }
    }
  }
  for (let x = -50; x <= 50; x += 6) {
    for (let y = -50; y <= 50; y += 6) {
      if (abs(sq(x) + sq(y)) <= 40000) {
        let z = sqrt(40000 - sq(x) - sq(y))
        point(x, y, z)

      }
    }
  }
  for (let x = -75; x <= 75; x += 6) {
    for (let y = -75; y <= 75; y += 6) {
      if (abs(sq(x) + sq(y)) <= 90000) {
        let z = sqrt(90000 - sq(x) - sq(y))
        point(x, y, z)

      }
    }
  }
  pop()
  drawGraph()
}

// windowがリサイズされたときの処理
function windowResized() {
  fullScreen()
  initValue()
}


let mainChartObj
function drawGraph() {

  if (typeof mainChartObj !== 'undefined' && mainChartObj) {
    mainChartObj.destroy();
  }
  //データ
  let mainData = {
    datasets: [
      {
        label: "理論値（光源からの距離が1 cmの時の光の強度を1275とした場合）",
        data: theoreticalArr,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderColor: "rgba(0,0,0,1)",
        pointRadius: 0,
        showLine: true

      }, {
        label: "実測値",
        data: dataArr,
        backgroundColor: "rgba(255,0,0,0.5)",
        borderColor: "rgba(255,0,0,1)",
        pointRadius: 0,
        showLine: true

      },

    ],

  };

  //グラフの表示設定
  let mainOptions = {
    legend: {
      labels: {
        fontSize: 16
      }
    },
    title: {
      display: true,
      fontSize: 20,
      text: '光の強度と距離の関係'
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: '光源との距離[cm]',
            fontSize: 16
          },
          ticks: {
            min: 1,
            max: 40,
            fontSize: 14
          }
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: '光の強度[a.u.]',
            fontSize: 16
          },
          ticks: {
            min: 0,
            max: 255 * 5,
            stepSize: 100,
            fontSize: 14
          }
        },
      ],
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
  };

  let mainChartsetup = {
    type: "scatter",
    data: mainData,
    options: mainOptions,
  };

  let mainCtx = document.getElementById("plotGraph");
  mainChartObj = new Chart(mainCtx, mainChartsetup);

}

let dataArr = []
function inputFunction() {
  dataArr = []
  for (let i = 0; i < dataNum; i++) {
    let targetInput1 = select("#lengthInput-" + str(i + 1))
    let targetInput2 = select("#intensityInput-" + str(i + 1))
    dataArr.push({ "x": targetInput1.value(), "y": targetInput2.value() })
  }
  dataArr.sort((a, b) => {
    return a.x - b.x
  })
}

class DOM {
  constructor(n) {
    this.number = n
    let parentDiv = createDiv().parent("#dataRedisterParent").id("data-" + this.number).class("mb-1 pb-1")
    let inputGroup = createDiv().parent(parentDiv).class("input-group")
    let numSpan = createSpan("データ" + this.number).parent(inputGroup).class("input-group-text")
    let lengthSpan = createSpan("光源からの距離[cm]").parent(inputGroup).class("input-group-text")
    let lengthInput = createInput(1, "number").parent(inputGroup).class("form-control").attribute("min", 0).id("lengthInput-" + this.number).input(inputFunction)
    let intensitySpan = createSpan("光の強度").parent(inputGroup).class("input-group-text")
    let intensityInput = createInput(1, "number").parent(inputGroup).class("form-control").id("intensityInput-" + this.number).input(inputFunction)
  }
}
