///全画面表示
function fullScreen() {
  let p5Canvas = select("#p5Canvas")
  let canvas = createCanvas(windowWidth / 2, 9 * windowHeight / 20, WEBGL)
  canvas.parent(p5Canvas)
}

// DOM要素の生成
function elCreate() {
}

let theoreticalArr = []
let coordinateArr = []
// 初期値やシミュレーションの設定
function initValue() {
  for (let x = 1; x < 11; x += 0.01) {
    let y = 255 / sq(x)
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
  strokeWeight(7.5)
  stroke(100, 100, 100, 10)
  push()
  rotateY(PI / 2)
  for (let x = -25; x <= 25; x += 3) {
    for (let y = -25; y <= 25; y += 3) {
      if (abs(sq(x) + sq(y)) <= 10000) {
        let z = sqrt(10000 - sq(x) - sq(y))
        point(x, y, z)

      }
    }
  }
  for (let x = -50; x <= 50; x += 3) {
    for (let y = -50; y <= 50; y += 3) {
      if (abs(sq(x) + sq(y)) <= 40000) {
        let z = sqrt(40000 - sq(x) - sq(y))
        point(x, y, z)

      }
    }
  }
  for (let x = -75; x <= 75; x += 3) {
    for (let y = -75; y <= 75; y += 3) {
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
        label: "理論値",
        data: theoreticalArr,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderColor: "rgba(0,0,0,1)",
        pointRadius: 0,
        fill: 'start',
        showLine: true

      }, {
        label: "１枚目の偏光板を透過した時のスペクトル",
        data: [],
        backgroundColor: "rgba(0,0,0,0.5)",
        borderColor: "rgba(0,0,0,1)",
        pointRadius: 0,
        fill: 'start',
        showLine: true

      },

    ],

  };

  //グラフの表示設定
  let mainOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16
          }
        }
      },
      title: {
        display: true,
        text: '１枚目の偏光板を透過した後とシミュレーションのスペクトルの比較',
        font: {
          size: 20
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: '波長(nm)',
          font: {
            size: 16
          }
        },
        max: 750,
        min: 380,
        ticks: {
          font: {
            size: 14
          }
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: '強度(a.u.)',
          font: {
            size: 16
          }
        },
        max: 1,
        min: 0,
        ticks: {
          font: {
            size: 14
          }
        }
      },
    },
  };

  let mainChartsetup = {
    type: "scatter",
    data: mainData,
    options: mainOptions,
  };

  let mainCtx = document.getElementById("plotGraph");
  mainChartObj = new Chart(mainCtx, mainChartsetup);

}