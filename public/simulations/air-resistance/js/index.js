function fullScreen() {
    createCanvas(2 * windowWidth / 3, 9 * windowHeight / 10)
}

let parentDiv,
    fbWeightSlider,
    fbWeightSliderLabel,
    vbWeightSlider,
    vbWeightSliderLabel,
    ibWeightSlider,
    ibWeightSliderLabel,
    graph,
    graphCanvas,
    graphChart;
function elCreate() {
    parentDiv = createDiv().id("parentDiv")
    fbWeightSlider = createSlider(1, 100, 50, 1).class("form-range")
    fbWeightSliderLabel = createElement("label", "抵抗なし玉の質量:" + fbWeightSlider.value())
    vbWeightSlider = createSlider(1, 100, 50, 1).class("form-range")
    vbWeightSliderLabel = createElement("label", "粘性抵抗ありの玉の質量:" + vbWeightSlider.value())
    ibWeightSlider = createSlider(1, 100, 50, 1).class("form-range")
    ibWeightSliderLabel = createElement("label", "慣性抵抗ありの玉の質量:" + ibWeightSlider.value())
    graph = createDiv().id("graph");
    graphCanvas = createElement("canvas").id("graphChart")
}

function htmlRewrite() {
    fbWeightSliderLabel.html("抵抗なし玉の質量:" + fbWeightSlider.value())
    vbWeightSliderLabel.html("粘性抵抗ありの玉の質量:" + vbWeightSlider.value())
    ibWeightSliderLabel.html("慣性抵抗ありの玉の質量:" + ibWeightSlider.value())
}

function sliderInputFunc() {
    htmlRewrite()
    initValue()
}

function elInit() {
    parentDiv.size(windowWidth / 3, height / 4).position(2 * windowWidth / 3, windowHeight / 10)
    elArr = [fbWeightSliderLabel, fbWeightSlider, vbWeightSliderLabel, vbWeightSlider, ibWeightSliderLabel, ibWeightSlider]
    for (let i = 0; i < elArr.length; i++) {
        elArr[i].size(windowWidth / 3, height / 24).parent(parentDiv)
        if (i % 2 == 1) elArr[i].input(sliderInputFunc)
    }
    graph.size(windowWidth / 3, 3*height / 4).position(2 * windowWidth / 3, windowHeight - 3* height / 4);
    graphCanvas.size(0, 0).position(0, 0).parent(graph);
}

let count;
let gravity;
let fps;
let freeBall,
    viscosityBall,
    inertiaBall;
let fbtrajectry,
    vbtrajectory,
    ibtrajectory;
let countArray;
function initValue() {
    gravity = 9.8;
    count = 0;
    fps = 30;
    freeBall = new freeBallClass(width / 6 - width / 100, 0, 0, fbWeightSlider.value(), width / 100);
    viscosityBall = new viscosityBallClass(3 * width / 6 - width / 100, 0, 0, vbWeightSlider.value(), width / 100);
    inertiaBall = new inertiaBallClass(5 * width / 6 - width / 100, 0, 0, ibWeightSlider.value(), width / 100);
    fbtrajectry = [];
    vbtrajectory = [];
    ibtrajectory = [];
    countArray = [];
    frameRate(fps);
    textAlign(CENTER, CENTER)
    textSize(width / 50)
}

function setup() {
    fullScreen()
    elCreate()
    elInit()
    initValue()
}

function draw() {
    count++;
    background(0);
    fill(255);
    freeBall._draw();
    viscosityBall._draw();
    inertiaBall._draw();
    if (count % 5 == 0) {
        if (freeBall.posy < height) fbtrajectry.push(freeBall.posy);
        if (viscosityBall.posy < height) vbtrajectory.push(viscosityBall.posy);
        if (inertiaBall.posy < height) ibtrajectory.push(inertiaBall.posy);
        if (freeBall.posy < height && viscosityBall.posy < height && inertiaBall.posy < height) countArray.push(count);
    }
    for (let i = 0; i < fbtrajectry.length; i++) {
        fill(255, 0, 0)
        stroke(0)
        ellipse(width / 6 - width / 100, fbtrajectry[i], width / 100 * 2, width / 100 * 2);
        // stroke(255, 0, 0, 100)
        // line(0, fbtrajectry[i], width, fbtrajectry[i])
    }
    for (let i = 0; i < vbtrajectory.length; i++) {
        fill(0, 255, 0)
        stroke(0)
        ellipse(3 * width / 6 - width / 100, vbtrajectory[i], width / 100 * 2, width / 100 * 2);
        // stroke(0, 255, 0, 100)
        // line(0, vbtrajectory[i], width, vbtrajectory[i])
    }
    for (let i = 0; i < ibtrajectory.length; i++) {
        fill(0, 0, 255)
        stroke(0)
        ellipse(5 * width / 6 - width / 100, ibtrajectory[i], width / 100 * 2, width / 100 * 2);
        // stroke(0, 0, 255, 100)
        // line(0, ibtrajectory[i], width, ibtrajectory[i])
    }
    graphDraw()
}

function windowResized() {
    fullScreen()
    elInit()
    initValue()
}

class freeBallClass {
    constructor(x, y, s, w, r) {
        this.posx = x;
        this.posy = y;
        this.speed = s;
        this.weight = w;
        this.radi = r;
    }
    _draw() {
        fill(255)
        text("抵抗なし", width / 12, width / 50)
        this.speed = gravity * count;
        this.posy += this.speed / fps;
        fill(255, 0, 0)
        ellipse(this.posx, this.posy, this.radi * 2, this.radi * 2);
    }
}

class viscosityBallClass {
    constructor(x, y, s, w, r) {
        this.posx = x;
        this.posy = y;
        this.speed = s;
        this.weight = w;
        this.radi = r;
    }

    _draw() {
        fill(255)
        text("粘性抵抗あり", 5 * width / 12, width / 50)
        this.speed = (this.weight * gravity) * (1 - exp(-count / this.weight));
        this.posy += this.speed / fps;
        fill(0, 255, 0)
        ellipse(this.posx, this.posy, this.radi * 2, this.radi * 2);
    }

}

class inertiaBallClass {
    constructor(x, y, s, w, r) {
        this.posx = x;
        this.posy = y;
        this.speed = s;
        this.weight = w;
        this.radi = r;
    }
    tanh(x) {
        let a = exp(x) - exp(-x);
        let b = exp(x) + exp(-x);
        return a / b;
    }
    _draw() {
        fill(255)
        text("慣性抵抗あり", 9 * width / 12, width / 50)
        this.speed = sqrt(this.weight * gravity) * Math.tanh(sqrt(gravity / this.weight) * count);
        this.posy += this.speed / fps;
        fill(0, 0, 255)
        ellipse(this.posx, this.posy, this.radi * 2, this.radi * 2);
    }
}
//グラフを描画する手続き
function graphDraw() {
    if (typeof graphChart !== 'undefined' && graphChart) {
        graphChart.destroy();
    }
    let ctx1 = document.getElementById('graphChart').getContext('2d');
    let data1 = {
        labels: countArray,
        datasets: [{
            label: "抵抗なし",
            data: fbtrajectry,
            borderColor: 'rgba(255, 0, 0)',
            // fill: true,
            // backgroundColor: 'rgba(255, 0, 0,0.5)',
            lineTension: 0.3,
        }
            , {
            label: "粘性抵抗あり",
            data: vbtrajectory,
            borderColor: 'rgba(0, 255, 0)',
            // fill: true,
            // backgroundColor: 'rgba(0, 255, 0,0.5)',
            lineTension: 0.3,
        },
        {
            label: "慣性抵抗あり",
            data: ibtrajectory,
            borderColor: 'rgba(0, 0, 255)',
            // fill: true,
            // backgroundColor: 'rgba(0, 0, 255,0.5)',
            lineTension: 0.3,
        }
        ]
    }
    let options1 = {
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: '経過フレーム数[frames]'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: '位置[px]'
                },
                min: 0
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'x-tグラフ'
            },
        },
        animation: false
    }
    graphChart = new Chart(ctx1, {
        type: 'line',
        data: data1,
        options: options1
    });
}