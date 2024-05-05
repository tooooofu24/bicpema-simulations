// #upperGraphV-T,
// #upperGraphX-T,
// #lowerGraphV-T,
// #lowerGraphX-Tのリサイズ処理

function fullScreen() {
  let parent = document.getElementById("p5Canvas");
  let canvas = createCanvas((2 * windowWidth) / 3, (9 * windowHeight) / 10);
  canvas.parent(parent);
}

function preload() {
  yellowCarImg = loadImage("/assets/img/yCar.png");
  redCarImg = loadImage("/assets/img/rCar.png");
}

let upperGraphParent, lowerGraphParent;
let upperGraph, lowerGraph;
let upperGraphButton, lowerGraphButton;
let upperGraphButtonX_T, upperGraphButtonV_T;
let lowerGraphButtonX_T, lowerGraphButtonV_T;
function elCreate() {
  upperGraphParent = select("#upperGraphParent");
  lowerGraphParent = select("#lowerGraphParent");
  upperGraph = select("#upperGraph");
  lowerGraph = select("#lowerGraph");
  upperGraphButton = select("#upperGraphButton");
  lowerGraphButton = select("#lowerGraphButton");
  upperGraphButtonX_T = select("#upperGraphButtonX_T");
  upperGraphButtonV_T = select("#upperGraphButtonV_T");
  lowerGraphButtonX_T = select("#lowerGraphButtonX_T");
  lowerGraphButtonV_T = select("#lowerGraphButtonV_T");
}

function upperGraphButtonX_TFunction() {
  upperGraphData = true;
}

function upperGraphButtonV_TFunction() {
  upperGraphData = false;
}

function lowerGraphButtonX_TFunction() {
  lowerGraphData = true;
}

function lowerGraphButtonV_TFunction() {
  lowerGraphData = false;
}

function elInit() {
  lowerGraphParent.position(width, (55 * windowHeight) / 100).size(windowWidth / 3, (4 * windowHeight) / 10);
  upperGraphButton.position(width, (5 * windowHeight) / 10);
  lowerGraphButton.position(width, (9.5 * windowHeight) / 10);
  upperGraphButtonX_T.mousePressed(upperGraphButtonX_TFunction);
  upperGraphButtonV_T.mousePressed(upperGraphButtonV_TFunction);
  lowerGraphButtonX_T.mousePressed(lowerGraphButtonX_TFunction);
  lowerGraphButtonV_T.mousePressed(lowerGraphButtonV_TFunction);
}

let canvasWidth, canvasHeight;
let yellowCar, redCar;
let time;
let scaleImg;
let upperGraphData, lowerGraphData;
let yellowCarCorrection, redCarCorrection;
function initValue() {
  canvasWidth = (2 * windowWidth) / 3;
  canvasHeight = (9 * windowHeight) / 10;
  yellowCarImg.resize(150, 0);
  redCarImg.resize(150, 0);
  yellowCar = new CAR(0, canvasHeight / 2 - yellowCarImg.height - 50, yellowCarImg, 3, [], []);
  redCar = new CAR(0, canvasHeight - redCarImg.height - 50, redCarImg, 2, [], []);
  time = 0;
  textSize(15);
  textAlign(CENTER);
  frameRate(30);
  scaleImg = createGraphics(canvasWidth, 50);
  scaleImg.background(255);
  scaleImg.textAlign(CENTER);
  for (let x = 0; x < canvasWidth; x += 5) {
    if (x % 50 == 0) {
      scaleImg.line(x, 0, x, 25);
      scaleImg.text(x / 50, x, 40);
    } else {
      scaleImg.line(x, 0, x, 15);
    }
  }
  // graphのデータはtrueのときにはX-T、falseの時にはV-T
  upperGraphData = true;
  lowerGraphData = true;
}

function setup() {
  fullScreen();
  elCreate();
  elInit();
  initValue();
}

function draw() {
  background(0);
  image(scaleImg, 0, canvasHeight / 2 - 50);
  image(scaleImg, 0, canvasHeight - 50);
  redCar._draw();
  yellowCar._draw();

  // time <= 300により１０秒間の計測を実装

  if (time == 0) {
    yellowCarCorrection = yellowCar.posx;
    redCarCorrection = redCar.posx;
  }
  if (time % 30 == 0 && time <= 300) {
    yellowCar.xarr.push({ x: int(time / 30), y: (yellowCar.posx - yellowCarCorrection) / 50 });
    redCar.xarr.push({ x: int(time / 30), y: (redCar.posx - redCarCorrection) / 50 });
    yellowCar.varr.push({ x: int(time / 30), y: yellowCar.speed });
    redCar.varr.push({ x: int(time / 30), y: redCar.speed });
  }
  time += 1;
  graphDraw();
}

function windowResized() {
  fullScreen();
  elInit();
  initValue();
}

class CAR {
  constructor(x, y, i, v, xa, va) {
    this.posx = x;
    this.posy = y;
    this.img = i;
    this.speed = v;
    this.xarr = xa;
    this.varr = va;
  }
  _draw() {
    tint(255, 150);
    stroke(255, 0, 0);
    strokeWeight(3);
    for (let i = 0; i < this.xarr.length; i++) {
      image(this.img, (this.xarr[i]["y"] - this.xarr[0]["y"]) * 50 - this.img.width / 2, this.posy);
      line(
        (this.xarr[i]["y"] - this.xarr[0]["y"]) * 50,
        this.posy + this.img.height - 10,
        (this.xarr[i]["y"] - this.xarr[0]["y"]) * 50,
        this.posy + this.img.height + 10
      );
    }
    this.posx += (50 * this.speed) / 30;
    tint(255);
    image(this.img, this.posx - this.img.width / 2, this.posy);
  }
}

// upperGraphV-TをgraphChart1、ctx1、data1、option1とする
// upperGraphX-TをgraphChart2、ctx2、data2、option2とする
// lowerGraphV-TをgraphChart3、ctx3、data3、option3とする
// lowerGraphX-TをgraphChart4、ctx4、data4、option4とする

function graphDraw() {
  // upperGraph

  let upperData, upperText, upperYMax;
  if (upperGraphData) {
    upperData = yellowCar.xarr;
    upperText = "黄色い車のx-tグラフ";
    upperYMax = 30;
  } else {
    upperData = yellowCar.varr;
    upperText = "黄色い車のv-tグラフ";
    upperYMax = 10;
  }
  if (typeof graphChart1 !== "undefined" && graphChart1) {
    graphChart1.destroy();
  }
  let ctx1 = document.getElementById("upperGraph").getContext("2d");
  let data1 = {
    datasets: [
      {
        showLine: true,
        data: upperData,
        pointRadius: 0,
      },
    ],
  };
  let options1 = {
    plugins: {
      title: {
        display: true,
        text: upperText,
        font: {
          size: 25,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 10,
        ticks: {
          display: true,
          font: {
            size: 16,
          },
        },
        title: {
          display: true,
          text: "経過時間 t [s]",
          font: {
            size: 20,
          },
        },
      },
      y: {
        min: 0,
        max: upperYMax,
        ticks: {
          display: true,
          font: {
            size: 16,
          },
        },
        title: {
          display: true,
          text: "移動距離 x [cm]",
          font: {
            size: 20,
          },
        },
      },
    },
    animation: false,
    maintainAspectRatio: false,
  };
  graphChart1 = new Chart(ctx1, {
    type: "scatter",
    data: data1,
    options: options1,
  });

  // lowerGraph

  let lowerData, lowerText, lowerYMax;
  if (lowerGraphData) {
    lowerData = redCar.xarr;
    lowerText = "赤い車のx-tグラフ";
    lowerYMax = 30;
  } else {
    lowerData = redCar.varr;
    lowerText = "赤い車のv-tグラフ";
    lowerYMax = 10;
  }
  if (typeof graphChart3 !== "undefined" && graphChart3) {
    graphChart3.destroy();
  }
  let ctx3 = document.getElementById("lowerGraph").getContext("2d");
  let data3 = {
    datasets: [
      {
        data: lowerData,
        showLine: true,
        pointRadius: 0,
      },
    ],
  };
  let options3 = {
    plugins: {
      title: {
        display: true,
        text: lowerText,
        font: {
          size: 25,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 10,
        ticks: {
          display: true,
          font: {
            size: 16,
          },
        },
        title: {
          display: true,
          text: "経過時間 t [s]",
          font: {
            size: 20,
          },
        },
      },
      y: {
        min: 0,
        max: lowerYMax,
        ticks: {
          display: true,
          font: {
            size: 16,
          },
        },
        title: {
          display: true,
          text: "移動距離 x [cm]",
          font: {
            size: 20,
          },
        },
      },
    },
    animation: false,
    maintainAspectRatio: false,
  };
  graphChart3 = new Chart(ctx3, {
    type: "scatter",
    data: data3,
    options: options3,
  });
}
