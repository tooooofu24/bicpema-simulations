function preload() {
  yCarImg = loadImage("/assets/img/yCar.png");
  rCarImg = loadImage("/assets/img/rCar.png");
}

let graph, graphCanvas;
let graphButton;
let graphButtonX_T, graphButtonV_T;
function elCreate() {
  graph = select("#graph");
  graphCanvas = select("#graphCanvas");
  graphButton = select("#graphButton");
  graphButtonX_T = select("#graphButtonX_T");
  graphButtonV_T = select("#graphButtonV_T");
}

function graphButtonX_TFunction() {
  graphData = true;
}

function graphButtonV_TFunction() {
  graphData = false;
}

function elInit() {
  if (width <= 992) {
    graph.position((windowWidth - width) / 2, height + 125).size(width, width);
    graphButton.position((windowWidth - width) / 2, height + 75);
  } else {
    graph.position(windowWidth / 2 - width / 4, height + 125).size(width / 2, width / 2);
    graphButton.position(windowWidth / 2 - width / 4, height + 75);
  }
  graphButtonX_T.mousePressed(graphButtonX_TFunction);
  graphButtonV_T.mousePressed(graphButtonV_TFunction);
}

const canvasWidth = 1000;
const canvasHeight = 562.5;
let yCar, rCar;
let time;
let scaleImg;
let graphData;
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
  for (let x = 0; x <= canvasWidth; x += 5) {
    if (x % 50 == 0) {
      scaleImg.line(x, 0, x, 25);
      scaleImg.text(x / 50, x, 40);
    } else {
      scaleImg.line(x, 0, x, 15);
    }
  }
  // graphのデータはtrueのときにはX-T、falseの時にはV-T
  graphData = true;
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
  deviceIs = deviceJudge();
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

function graphDraw() {
  let yCarData, rCarData;
  let title, verticalAxisLabel, yMax;
  if (graphData) {
    yCarData = yCar.xarr;
    rCarData = rCar.xarr;
    title = "x-tグラフ";
    verticalAxisLabel = "移動距離 x [cm]";
    yMax = 30;
  } else {
    yCarData = yCar.varr;
    rCarData = rCar.varr;
    title = "v-tグラフ";
    verticalAxisLabel = "速度 v [cm/s]";
    yMax = 10;
  }

  if (typeof graphChart !== "undefined" && graphChart) {
    graphChart.destroy();
  }
  let ctx = document.getElementById("graphCanvas").getContext("2d");
  let data = {
    datasets: [
      {
        label: "黄色い車のデータ",
        showLine: true,
        data: yCarData,
        pointRadius: 0,
        fill: true,
        borderColor: "rgb(200, 200, 50)",
      },
      {
        label: "赤い車のデータ",
        data: rCarData,
        showLine: true,
        pointRadius: 0,
        fill: true,
        borderColor: "rgb(255, 0, 0)",
      },
    ],
  };
  let options = {
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
        },
      },
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
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
        max: yMax,
        ticks: {
          display: true,
          font: {
            size: 14,
          },
        },
        title: {
          display: true,
          text: verticalAxisLabel,
          font: {
            size: 16,
          },
        },
      },
    },
    animation: false,
    maintainAspectRatio: false,
  };
  graphChart = new Chart(ctx, {
    type: "scatter",
    data: data,
    options: options,
  });
}
