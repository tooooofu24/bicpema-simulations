function preload() {
  yCarImg = loadImage("/assets/img/yCar.png");
  rCarImg = loadImage("/assets/img/rCar.png");
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
  if (width <= 992) {
    upperGraphParent.position((windowWidth - width) / 2, height + 125).size(width, width);
    lowerGraphParent.position((windowWidth - width) / 2, height + 190 + width).size(width, width);
    upperGraphButton.position((windowWidth - width) / 2, height + 75);
    lowerGraphButton.position((windowWidth - width) / 2, height + 140 + width);
  } else {
    upperGraphParent.position((windowWidth - width) / 2, height + 125).size(width / 2, width / 2);
    lowerGraphParent.position(windowWidth / 2, height + 125).size(width / 2, width / 2);
    upperGraphButton.position((windowWidth - width) / 2, height + 75);
    lowerGraphButton.position(windowWidth / 2, height + 75);
  }
  upperGraphButtonX_T.mousePressed(upperGraphButtonX_TFunction);
  upperGraphButtonV_T.mousePressed(upperGraphButtonV_TFunction);
  lowerGraphButtonX_T.mousePressed(lowerGraphButtonX_TFunction);
  lowerGraphButtonV_T.mousePressed(lowerGraphButtonV_TFunction);
}

const canvasWidth = 1000;
const canvasHeight = 562.5;
let yCar, rCar;
let time;
let scaleImg;
let upperGraphData, lowerGraphData;
let yCarCorrection, rCarCorrection;
function initValue() {
  yCarImg.resize(100, 0);
  rCarImg.resize(100, 0);
  yCar = new CAR(0, canvasHeight / 2 - yCarImg.height - 50, yCarImg, 3, [], []);
  rCar = new CAR(0, canvasHeight - rCarImg.height - 50, rCarImg, 2, [], []);
  time = 0;
  textSize(16);
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

let deviceIs;
function setup() {
  fullScreen();
  deviceIs = deviceJudge();
  elCreate();
  elInit();
  initValue();
}

function draw() {
  scale(width / 1000);
  background(0);
  image(scaleImg, 0, canvasHeight / 2 - 50);
  image(scaleImg, 0, canvasHeight - 50);
  rCar._draw();
  yCar._draw();

  // time <= 300により１０秒間の計測を実装

  if (time == 0) {
    yCarCorrection = yCar.posx;
    rCarCorrection = rCar.posx;
  }
  if (time % 30 == 0 && time <= 300) {
    yCar.xarr.push({ x: int(time / 30), y: (yCar.posx - yCarCorrection) / 50 });
    rCar.xarr.push({ x: int(time / 30), y: (rCar.posx - rCarCorrection) / 50 });
    yCar.varr.push({ x: int(time / 30), y: yCar.speed });
    rCar.varr.push({ x: int(time / 30), y: rCar.speed });
  }
  time += 1;
  graphDraw();
  if (deviceIs) rotateInstruction();
}

function windowResized() {
  resizeFullScreen();
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

  let upperData, upperText, upperLabel, upperYMax;
  if (upperGraphData) {
    upperData = yCar.xarr;
    upperText = "黄色い車のx-tグラフ";
    upperLabel = "移動距離 x [cm]";
    upperYMax = 30;
  } else {
    upperData = yCar.varr;
    upperText = "黄色い車のv-tグラフ";
    upperLabel = "速度 v [cm/s]";
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
        fill: true,
        borderColor: "rgb(200, 200, 50)",
      },
    ],
  };
  let options1 = {
    plugins: {
      title: {
        display: true,
        text: upperText,
        font: {
          size: 20,
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
            size: 14,
          },
        },
        title: {
          display: true,
          text: "経過時間 t [s]",
          font: {
            size: 16,
          },
        },
      },
      y: {
        min: 0,
        max: upperYMax,
        ticks: {
          display: true,
          font: {
            size: 14,
          },
        },
        title: {
          display: true,
          text: upperLabel,
          font: {
            size: 16,
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

  let lowerData, lowerText, lowerLabel, lowerYMax;
  if (lowerGraphData) {
    lowerData = rCar.xarr;
    lowerText = "赤い車のx-tグラフ";
    lowerLabel = "移動距離 x [cm]";
    lowerYMax = 30;
  } else {
    lowerData = rCar.varr;
    lowerText = "赤い車のv-tグラフ";
    lowerLabel = "速度 v [cm/s]";
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
        fill: true,
        borderColor: "rgb(255, 0, 0)",
      },
    ],
  };
  let options3 = {
    plugins: {
      title: {
        display: true,
        text: lowerText,
        font: {
          size: 20,
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
            size: 14,
          },
        },
        title: {
          display: true,
          text: "経過時間 t [s]",
          font: {
            size: 16,
          },
        },
      },
      y: {
        min: 0,
        max: lowerYMax,
        ticks: {
          display: true,
          font: {
            size: 14,
          },
        },
        title: {
          display: true,
          text: lowerLabel,
          font: {
            size: 16,
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
