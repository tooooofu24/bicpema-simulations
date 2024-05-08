let fbWeightSlider, fbWeightSliderLabel;
let vbWeightSlider, vbWeightSliderLabel;
let ibWeightSlider, ibWeightSliderLabel;
let graph, graphCanvas;

function elCreate() {
  fbWeightSlider = select("#fbWeightSlider");
  fbWeightSliderLabel = select("#fbWeightSliderLabel");
  vbWeightSlider = select("#vbWeightSlider");
  vbWeightSliderLabel = select("#vbWeightSliderLabel");
  ibWeightSlider = select("#ibWeightSlider");
  ibWeightSliderLabel = select("#ibWeightSliderLabel");
  graph = select("#graph");
  graphCanvas = select("#graphCanvas");
}

let count;
let fps;
let freeBall, viscosityBall, inertiaBall;
let fbtrajectry, vbtrajectory, ibtrajectory;
let countArray;

function initValue() {
  count = 0;
  fps = 30;
  freeBall = new FallBall((1 * 333.333) / 2, fbWeightSlider.value(), "free");
  viscosityBall = new FallBall((3 * 333.333) / 2, vbWeightSlider.value(), "viscosity");
  inertiaBall = new FallBall((5 * 333.333) / 2, ibWeightSlider.value(), "inertia");
  fbtrajectry = [0];
  vbtrajectory = [0];
  ibtrajectory = [0];
  countArray = [0];
  frameRate(fps);
  textAlign(CENTER, CENTER);
  textSize(16);
}

function sliderInputFunc() {
  fbWeightSliderLabel.html("抵抗なし玉の質量:" + fbWeightSlider.value());
  vbWeightSliderLabel.html("粘性抵抗ありの玉の質量:" + vbWeightSlider.value());
  ibWeightSliderLabel.html("慣性抵抗ありの玉の質量:" + ibWeightSlider.value());
  initValue();
}

function elInit() {
  elArr = [
    fbWeightSliderLabel,
    fbWeightSlider,
    vbWeightSliderLabel,
    vbWeightSlider,
    ibWeightSliderLabel,
    ibWeightSlider,
  ];
  if (width < 992) {
    for (let i = 0; i < elArr.length; i++) {
      elArr[i].size(width, 25).position((windowWidth - width) / 2, 25 * i);
      if (i % 2 == 1) elArr[i].input(sliderInputFunc);
    }
    graph.size(width, width).position((windowWidth - width) / 2, 60 + height + 25 * 7);
  } else {
    for (let i = 0; i < elArr.length; i++) {
      elArr[i].size(width / 2, 25).position((windowWidth - width) / 2, 25 * i);
      if (i % 2 == 1) elArr[i].input(sliderInputFunc);
    }
    graph.size(width / 2, width / 2).position(windowWidth / 2, 60 + height);
  }
}

function setup() {
  fullScreen();
  deviceIs = deviceJudge();
  elCreate();
  initValue();
  elInit();
}

function draw() {
  scale(width / 1000);
  background(0);
  stroke(0);
  count++;
  freeBall.fallBallDraw();
  freeBall.trajectoryDraw();
  viscosityBall.fallBallDraw();
  viscosityBall.trajectoryDraw();
  inertiaBall.fallBallDraw();
  inertiaBall.trajectoryDraw();
  if (count % fps == 0) {
    fbtrajectry.push(freeBall.posY - 50);
    vbtrajectory.push(viscosityBall.posY - 50);
    ibtrajectory.push(inertiaBall.posY - 50);
    if (count % fps == 0) countArray.push(count / fps);
  }
  graphDraw();
  if (deviceIs) rotateInstruction();
}

function windowResized() {
  resizeFullScreen();
  deviceIs = deviceJudge();
  elInit();
  initValue();
}

class FallBall {
  constructor(x, m, t) {
    this.posX = x;
    this.posY = 50;
    this.velocity = 0;
    this.mass = m;
    this.type = t;
    this.gravity = 9.8;
    this.arr = [];
  }

  fallBallDraw() {
    fill(255);
    switch (this.type) {
      case "free":
        text("抵抗なし", this.posX, width / 50);
        this.velocity = (this.gravity * count) / fps;
        this.posY += this.velocity;
        fill(255, 0, 0);
        break;

      case "viscosity":
        text("粘性抵抗あり", this.posX, width / 50);
        this.velocity = (this.mass * this.gravity * (1 - exp(-count / this.mass))) / fps;
        this.posY += this.velocity;
        fill(0, 255, 0);
        break;

      case "inertia":
        text("慣性抵抗あり", this.posX, width / 50);
        this.velocity = (sqrt(this.mass * this.gravity) * Math.tanh(sqrt(this.gravity / this.mass) * count)) / fps;
        this.posY += this.velocity;
        fill(0, 0, 255);
        break;

      default:
        text("抵抗なし（無指定）", width / 12, width / 50);
        this.velocity = (this.gravity * count) / fps;
        this.posY = (1 / 2) * this.gravity * sq(count / fps);
        fill(255, 0, 0);
        break;
    }
    ellipse(this.posX, this.posY, 20, 20);
  }

  trajectoryDraw() {
    if (count % 5 == 0) {
      this.arr.push(this.posY);
    }
    for (let i = 0; i < this.arr.length; i++) {
      ellipse(this.posX, this.arr[i], 20, 20);
    }
  }
}

//グラフを描画する手続き
function graphDraw() {
  if (typeof graphChart !== "undefined" && graphChart) {
    graphChart.destroy();
  }
  let ctx = document.getElementById("graphCanvas").getContext("2d");
  let data = {
    labels: countArray,
    datasets: [
      {
        label: "抵抗なし",
        data: fbtrajectry,
        borderColor: "rgba(255, 0, 0)",
        lineTension: 0.3,
      },
      {
        label: "粘性抵抗あり",
        data: vbtrajectory,
        borderColor: "rgba(0, 255, 0)",
        lineTension: 0.3,
      },
      {
        label: "慣性抵抗あり",
        data: ibtrajectory,
        borderColor: "rgba(0, 0, 255)",
        lineTension: 0.3,
      },
    ],
  };
  let options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "経過時間[s]",
          font: {
            size: 14,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "位置[px]",
          font: {
            size: 14,
          },
        },

        min: 0,
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "x-tグラフ",
        font: {
          size: 16,
        },
      },
    },
    animation: false,
    maintainAspectRatio: false,
  };
  graphChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}
