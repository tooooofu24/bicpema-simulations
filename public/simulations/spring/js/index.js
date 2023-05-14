let spring,
    ball;

let startButton,
    stopButton,
    resetButton,
    springExpla1,
    springExpla2,
    konstantExpla,
    konstantButton1,
    konstantButton2,
    combiExpla,
    combiButton1,
    combiButton2,
    weightExpla,
    weightButton1,
    weightButton2,
    amplitudeExpla,
    amplitudeButton1,
    amplitudeButton2,
    backgroundDiv;

let clickedCount,
    resetCount;

let fps,
    count;

let spring1,
    spring2;

let graph1,
    graph2,
    graph3,
    graphCanvas1,
    graphCanvas2,
    graphCanvas3,
    chart1,
    chart2,
    chart3;

let countData
let data1,
    data2;


function preload() {
    spring = loadImage("https://live.staticflickr.com/65535/51567567161_a3af5e269e_o.png");
    ball = loadImage("https://live.staticflickr.com/65535/51567551611_daec8ec816_o.png");
}

function buttonCreation() {
    startButton = createButton("スタート")
    stopButton = createButton("ストップ")
    resetButton = createButton("リセット")
    springExpla1 = createElement("label", "ばね１")
    springExpla2 = createElement("label", "ばね２")
    konstantExpla = createElement("label", "ばね定数[N/m]")
    konstantButton1 = createInput(1, "number");
    konstantButton2 = createInput(1, "number");
    combiExpla = createElement("label", "組み合わせ")
    combiButton1 = createInput(1, "number");
    combiButton2 = createInput(1, "number");
    weightExpla = createElement("label", "質量[kg]")
    weightButton1 = createInput(1.000, "number");
    weightButton2 = createInput(1.000, "number");
    amplitudeExpla = createElement("label", "振幅[cm]")
    amplitudeButton1 = createInput(height / 8, "number");
    amplitudeButton2 = createInput(height / 8, "number");
    backgroundDiv = createElement("div")
}

function buttonSettings() {
    backgroundDiv.size(width, 3 * windowHeight / 10).style("background-color", "white")
    startButton.mousePressed(moveButtonAction).size(windowWidth / 7, 3 * windowHeight / 10).position(0, height).addClass("btn btn-outline-primary").parent(backgroundDiv)
    stopButton.mousePressed(moveButtonAction).size(windowWidth / 7, 3 * windowHeight / 10).position(0, height).addClass("btn btn-outline-danger").hide().parent(backgroundDiv)
    resetButton.mousePressed(resetButtonAction).size(windowWidth / 7, 3 * windowHeight / 10).position(windowWidth / 7, height).addClass("btn btn-outline-secondary").parent(backgroundDiv)
    springExpla1.size(windowWidth / 7, windowHeight / 10).position(2 * windowWidth / 7, height + windowHeight / 10).addClass("btn btn-light").parent(backgroundDiv)
    springExpla2.size(windowWidth / 7, windowHeight / 10).position(2 * windowWidth / 7, height + 2 * windowHeight / 10).addClass("btn btn-light").parent(backgroundDiv)
    konstantExpla.size(windowWidth / 7, windowHeight / 10).position(3 * windowWidth / 7, height).addClass("btn btn-light").parent(backgroundDiv)
    konstantButton1.size(windowWidth / 7, windowHeight / 10).position(3 * windowWidth / 7, height + windowHeight / 10).addClass("btn btn-light").attribute("min", 1).parent(backgroundDiv)
    konstantButton2.size(windowWidth / 7, windowHeight / 10).position(3 * windowWidth / 7, height + 2 * windowHeight / 10).addClass("btn btn-light").attribute("min", 1).parent(backgroundDiv)
    combiExpla.size(windowWidth / 7, windowHeight / 10).position(4 * windowWidth / 7, height).addClass("btn btn-light").parent(backgroundDiv)
    combiButton1.size(windowWidth / 7, windowHeight / 10).position(4 * windowWidth / 7, height + windowHeight / 10).addClass("btn btn-light ").attribute("min", 1).attribute("max", 3).parent(backgroundDiv)
    combiButton2.size(windowWidth / 7, windowHeight / 10).position(4 * windowWidth / 7, height + 2 * windowHeight / 10).addClass("btn btn-light").attribute("min", 1).attribute("max", 3).parent(backgroundDiv)
    weightExpla.size(windowWidth / 7, windowHeight / 10).position(5 * windowWidth / 7, height).addClass("btn btn-light").parent(backgroundDiv)
    weightButton1.size(windowWidth / 7, windowHeight / 10).position(5 * windowWidth / 7, height + windowHeight / 10).addClass("btn btn-light").attribute("min", 1).attribute("step", 0.001).parent(backgroundDiv)
    weightButton2.size(windowWidth / 7, windowHeight / 10).position(5 * windowWidth / 7, height + 2 * windowHeight / 10).addClass("btn btn-light").attribute("min", 1).attribute("step", 0.001).parent(backgroundDiv)
    amplitudeExpla.size(windowWidth / 7, windowHeight / 10).position(6 * windowWidth / 7, height).addClass("btn btn-light").parent(backgroundDiv)
    amplitudeButton1.size(windowWidth / 7, windowHeight / 10).position(6 * windowWidth / 7, height + windowHeight / 10).addClass("btn btn-light").attribute("min", 1).parent(backgroundDiv)
    amplitudeButton2.size(windowWidth / 7, windowHeight / 10).position(6 * windowWidth / 7, height + 2 * windowHeight / 10).addClass("btn btn-light").attribute("min", 1).parent(backgroundDiv)
}


function moveButtonAction() {
    if (clickedCount == false) {
        clickedCount = true;
        resetCount = false;
        startButton.hide()
        stopButton.show()
    } else {
        clickedCount = false;
        startButton.show()
        stopButton.hide()
    }
}

function resetButtonAction() {
    initSettings()
    clickedCount = false;
    resetCount = true;
    startButton.show()
    stopButton.hide()
    countData = new Array();
    countData.push(0)
    data1 = new Array();
    data2 = new Array();
}

function initSettings() {
    spring.resize(width / 20, height / 4);
    ball.resize(height / 15, 0);
    clickedCount = false;
    resetCount = true;
    fps = 60;
    count = 0;
    frameRate(fps);
    textAlign(CENTER, CENTER);
    textSize(width / 100);
    spring1 = new Spring(konstantButton1.value(), weightButton1.value(), combiButton1.value(), amplitudeButton1.value(), 1);
    spring2 = new Spring(konstantButton2.value(), weightButton2.value(), combiButton2.value(), amplitudeButton2.value(), 2);
}

function setup() {
    fullScreen();
    buttonCreation()
    initSettings()
    buttonSettings()
    graphCreation()
    graphSettings()
    countData = new Array();
    countData.push(0)
    data1 = new Array();
    data2 = new Array();
}

function draw() {
    background(255)
    spring1 = new Spring(konstantButton1.value(), weightButton1.value(), combiButton1.value(), amplitudeButton1.value(), 1);
    spring2 = new Spring(konstantButton2.value(), weightButton2.value(), combiButton2.value(), amplitudeButton2.value(), 2);
    spring1._draw();
    spring2._draw();
    if (clickedCount == true) {
        count++;
        if (count % 6 == 0) {
            countData.push(count / 60)
            data1.push(height / 4 - spring1.posy)
            data2.push(height / 4 - spring2.posy)
        }
    }
    graphDraw()
}

function graphCreation() {
    graph1 = createElement("div")
    graph2 = createElement("div")
    graph3 = createElement("div")
    graphCanvas1 = createElement("canvas")
    graphCanvas2 = createElement("canvas")
    graphCanvas3 = createElement("canvas")
    graphCanvas1.parent(graph1)
    graphCanvas2.parent(graph2)
    graphCanvas3.parent(graph3)
}

function graphSettings() {
    graph1.size(width / 2, height / 3).position(width / 2, 0)
    graphCanvas1.size(0, 0).id("chart1")
    graph2.size(width / 2, height / 3).position(width / 2, height / 3)
    graphCanvas2.size(0, 0).id("chart2")
    graph3.size(width / 2, height / 3).position(width / 2, 2 * height / 3)
    graphCanvas3.size(0, 0).id("chart3")
}

function graphDraw() {
    if (typeof chart1 !== 'undefined' && chart1) {
        chart1.destroy();
    }
    if (typeof chart2 !== 'undefined' && chart2) {
        chart2.destroy();
    }
    if (typeof chart3 !== 'undefined' && chart3) {
        chart3.destroy();
    }
    var ctx1 = document.getElementById('chart1').getContext('2d');
    chart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: countData,
            datasets: [{
                label: "ばね１の位置の時間変化",
                data: data1,
                backgroundColor: "rgb(255,0,0)",
                borderColor: "rgb(255,0,0)",
            }]
        },
        options: {
            animation: false
        }
    });
    var ctx2 = document.getElementById('chart2').getContext('2d');
    chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: countData,
            datasets: [{
                label: "ばね２の位置の時間変化",
                data: data2,
                backgroundColor: "rgb(0,0,255)",
                borderColor: "rgb(0,0,255)",
            }]
        },
        options: {
            animation: false
        }
    });
    var ctx3 = document.getElementById('chart3').getContext('2d');
    chart3 = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: countData,
            datasets: [{
                label: "ばね２の位置の時間変化",
                data: data2,
                backgroundColor: "rgb(0,0,255)",
                borderColor: "rgb(0,0,255)",
            }, {
                label: "ばね１の位置の時間変化",
                data: data1,
                backgroundColor: "rgb(255,0,0)",
                borderColor: "rgb(255,0,0)",
            }
            ]
        },
        options: {
            animation: false
        }
    });
}

//ばねのクラス
class Spring {
    constructor(k, w, c, a, n) {
        this.posx = 0;
        this.posy = 0;
        this.konstant = k;
        this.weight = w;
        this.combination = c;
        this.amplitude = a;
        this.number = n;
    }
    _draw() {
        let s_konstant;
        if (this.combination == 1) {
            s_konstant = this.konstant;
        }
        else if (this.combination == 2) {
            s_konstant = 2 * this.konstant;
        }
        else {
            s_konstant = sq(this.konstant) / (2 * this.konstant);
        }
        this.posx = this.amplitude * -cos(sqrt(s_konstant / this.weight) * (count / fps) + PI / 2);
        this.posy = this.amplitude * sin(sqrt(s_konstant / this.weight) * (count / fps) + PI / 2) + height / 4;
        let d;
        if (this.number == 1) {
            d = 0;
        }
        else {
            d = height / 2;
        }
        if (this.combination == 1) {
            line(((width / 4)) / 2, d, ((width / 4)) / 2, 10 + d);
            image(spring, ((width / 4)) / 2 - spring.width / 2, 10 + d, spring.width, this.posy - 20 - ball.height / 2);
            line(((width / 4)) / 2, this.posy - 10 - ball.height / 2 + d, ((width / 4)) / 2, this.posy - ball.height / 2 + d);
        }
        if (this.combination == 2) {
            line(((width / 4)) / 2, d, ((width / 4)) / 2, 10 + d);
            line(((width / 4)) / 4, 10 + d, 3 * ((width / 4)) / 4, 10 + d);
            line(((width / 4)) / 4, 10 + d, ((width / 4)) / 4, 15 + d);
            line(3 * ((width / 4)) / 4, 10 + d, 3 * ((width / 4)) / 4, 15 + d);
            image(spring, ((width / 4)) / 4 - spring.width / 2, 15 + d, spring.width, this.posy - 30 - ball.height / 2);
            image(spring, 3 * ((width / 4)) / 4 - spring.width / 2, 15 + d, spring.width, this.posy - 30 - ball.height / 2);
            line(((width / 4)) / 4, this.posy - 15 - ball.height / 2 + d, ((width / 4)) / 4, this.posy - 10 - ball.height / 2 + d);
            line(3 * ((width / 4)) / 4, this.posy - 15 - ball.height / 2 + d, 3 * ((width / 4)) / 4, this.posy - 10 - ball.height / 2 + d);
            line(((width / 4)) / 4, this.posy - 10 - ball.height / 2 + d, 3 * ((width / 4)) / 4, this.posy - 10 - ball.height / 2 + d);
            line(((width / 4)) / 2, this.posy - 10 - ball.height / 2 + d, ((width / 4)) / 2, this.posy - ball.height / 2 + d);
        }
        if (this.combination == 3) {
            line(((width / 4)) / 2, d, ((width / 4)) / 2, 10 + d);
            image(spring, ((width / 4)) / 2 - spring.width / 2, 10 + d, spring.width, (this.posy - 30 - ball.height / 2) / 2);
            line(((width / 4)) / 2, (this.posy - 30 - ball.height / 2) / 2 + 10 + d, ((width / 4)) / 2, (this.posy - 30 - ball.height / 2) / 2 + 20 + d);
            image(spring, ((width / 4)) / 2 - spring.width / 2, (this.posy - 30 - ball.height / 2) / 2 + 20 + d, spring.width, (this.posy - 30 - ball.height / 2) / 2);
            line(((width / 4)) / 2, this.posy - 10 - ball.height / 2 + d, ((width / 4)) / 2, this.posy - ball.height / 2 + d);
        }
        image(ball, ((width / 4)) / 2 - ball.width / 2, this.posy - ball.height / 2 + d);
        noFill();
        ellipse((width / 4) + ((width / 4)) / 2, height / 4 + d, this.amplitude * 2, this.amplitude * 2);
        line((width / 4) + ((width / 4)) / 2, height / 4 + d, (width / 4) + ((width / 4)) / 2 + this.posx, this.posy + d);
        image(ball, (width / 4) + ((width / 4)) / 2 - ball.width / 2 + this.posx, this.posy - ball.height / 2 + d);
        stroke(0, 100);
    }
}

function windowResized() {
    fullScreen();
    initSettings()
    buttonSettings()
    graphSettings()
    clickedCount = false;
    resetCount = true;
    startButton.show()
    stopButton.hide()
}

function fullScreen() {
    createCanvas(windowWidth, 7 * windowHeight / 10);
}