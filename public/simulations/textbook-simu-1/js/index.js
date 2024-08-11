/** canvasの幅 */
const CANVAS_WIDTH = 1000;

/** canvasの高さ */
const CANVAS_HEIGHT = (1000 * 9) / 16;

/** 黄色い車の画像 */
let YELLOW_CAR_IMG;

/** 赤い車の画像 */
let RED_CAR_IMAGE;

/**
 * 画像の読み込みを行う。
 */
function preload() {
  YELLOW_CAR_IMG = loadImage("/assets/img/yCar.png");
  RED_CAR_IMAGE = loadImage("/assets/img/rCar.png");
}

/**
 * グラフの切り替え変数
 *
 * true:X-Tグラフ / false:V-Tグラフ
 *
 * @type {boolean}
 */
let graphData;

/**
 * グラフの切り替えボタンを押した時に走る。
 * elInitメソッド内で、graphButtonと紐づけている。
 */
function graphButtonFunction() {
  if (graphData === true) {
    graphData = false;
  } else {
    graphData = true;
  }
}

/**
 * HTML要素の位置の調整や、関数との紐付けを行う。
 */
function elInit() {
  /** グラフを描画するdiv要素 */
  const GRAPH = select("#graph");
  /** グラフ切り替えボタンの親div要素 */
  const GRAPH_BUTTON_PARENT = select("#graphButtonParent");

  // リサイズ処理
  if (width <= 992) {
    GRAPH.position((windowWidth - width) / 2, height + 125).size(width, width);
    GRAPH_BUTTON_PARENT.position((windowWidth - width) / 2, height + width + 140);
  } else {
    GRAPH.position(windowWidth / 2 - width / 4, height + 125).size(width / 2, width / 2);
    GRAPH_BUTTON_PARENT.position(windowWidth / 2 - width / 4, height + width / 2 + 140);
  }
  /** グラフ切り替えボタンのbutton要素 */
  const GRAPH_BUTTON = select("#graphButton");
  GRAPH_BUTTON.mousePressed(graphButtonFunction);
  /** シミュレーション設定ボタンのbutton要素 */
  const MODAL_BUTTON = select("#modalButton");
  MODAL_BUTTON.position(windowWidth / 2 + width / 2 - MODAL_BUTTON.width, 60 + height + 10);
}

/**
 * 画像の初期化を行う。
 */
function imgInit() {
  YELLOW_CAR_IMG.resize(100, 0);
  RED_CAR_IMAGE.resize(100, 0);
}

/** 黄色い車オブジェクト */
let YELLOW_CAR;
/** 赤い車オブジェクト */
let RED_CAR;
/**
 * 変数やオブジェクトの初期化を行う。
 */
function initValue() {
  YELLOW_CAR = new CAR(0, CANVAS_HEIGHT / 2 - YELLOW_CAR_IMG.height - 50, YELLOW_CAR_IMG, 3, [], []);
  RED_CAR = new CAR(0, CANVAS_HEIGHT - RED_CAR_IMAGE.height - 50, RED_CAR_IMAGE, 2, [], []);
  graphData = true;
}

let CANVAS_CONTROLLER;
function setup() {
  CANVAS_CONTROLLER = new BicpemaCanvasController();
  CANVAS_CONTROLLER.fullScreen();
  elInit();
  imgInit();
  initValue();
  textSize(14);
  textAlign(CENTER);
  frameRate(30);
  for (let i = 0; i <= 10; i++) {
    YELLOW_CAR.xarr.push({ x: i, y: YELLOW_CAR.speed * i });
    RED_CAR.xarr.push({ x: i, y: RED_CAR.speed * i });
    YELLOW_CAR.varr.push({ x: i, y: YELLOW_CAR.speed });
    RED_CAR.varr.push({ x: i, y: RED_CAR.speed });
  }
}

function draw() {
  // レスポンシブ処理
  scale(width / 1000);

  background(0);
  fill(30);
  noStroke();

  // 地面の描画
  rect(0, CANVAS_HEIGHT / 2 - 50, 1000, 25);
  rect(0, CANVAS_HEIGHT - 50, 1000, 25);

  /**
   * スケールを表示するかを切り返すcheckbox要素
   */
  const SCALE_CHECK_BOX = select("#scaleCheckBox");
  if (SCALE_CHECK_BOX.checked()) {
    drawScale();
  }
  RED_CAR._draw();
  YELLOW_CAR._draw();
  graphDraw();
}

/**
 * スケールの表示をする。
 */
function drawScale() {
  fill(255);
  rect(0, CANVAS_HEIGHT / 2 - 50, CANVAS_WIDTH, 50);
  rect(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH, 50);
  fill(0);
  stroke(0);
  strokeWeight(1);
  for (let x = 0; x <= CANVAS_WIDTH; x += 5) {
    if (x % 50 == 0) {
      line(x, CANVAS_HEIGHT / 2 - 50, x, CANVAS_HEIGHT / 2 - 30);
      text(x / 50, x, CANVAS_HEIGHT / 2 - 10);
      line(x, CANVAS_HEIGHT - 50, x, CANVAS_HEIGHT - 30);
      text(x / 50, x, CANVAS_HEIGHT - 10);
    } else {
      line(x, CANVAS_HEIGHT / 2 - 50, x, CANVAS_HEIGHT / 2 - 40);
      line(x, CANVAS_HEIGHT - 50, x, CANVAS_HEIGHT - 40);
    }
  }
}

function windowResized() {
  CANVAS_CONTROLLER.resizeScreen();
  elInit();
  initValue();
}

/**
 * 車オブジェクト
 */
class CAR {
  /**
   * @constructor
   * @param {number} x x方向の座標
   * @param {number} y y方向の座標
   * @param {img} i 車の画像
   * @param {number} v x方向の速度
   * @param {numberarr} xa 各時刻におけるx方向の座標配列
   * @param {numberarr} va 各時刻におけるy方向の座標配列
   */
  constructor(x, y, i, v, xa, va) {
    this.posx = x;
    this.posy = y;
    this.img = i;
    this.speed = v;
    this.xarr = xa;
    this.varr = va;
  }

  /**
   * 車の動きを更新し描画する。
   */
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

/**
 * グラフを描画する。
 */
function graphDraw() {
  let yCarData, rCarData;
  let title, verticalAxisLabel, yMax;
  if (graphData) {
    yCarData = YELLOW_CAR.xarr;
    rCarData = RED_CAR.xarr;
    title = "x-tグラフ";
    verticalAxisLabel = "移動距離 x [cm]";
    yMax = 30;
  } else {
    yCarData = YELLOW_CAR.varr;
    rCarData = RED_CAR.varr;
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
