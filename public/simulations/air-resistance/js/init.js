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
      elArr[i].size(width, 25).position((windowWidth - width) / 2, 25 * i + 5);
      if (i % 2 == 1) elArr[i].input(sliderInputFunc);
    }
    graph.size(width, width).position((windowWidth - width) / 2, 60 + height + 25 * 7 + 5);
  } else {
    for (let i = 0; i < elArr.length; i++) {
      elArr[i].size(width / 2, 25).position((windowWidth - width) / 2, 25 * i + 5);
      if (i % 2 == 1) elArr[i].input(sliderInputFunc);
    }
    graph.size(width / 2, width / 2).position(windowWidth / 2, 60 + height + 5);
  }
}
