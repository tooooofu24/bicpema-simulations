let radi = 0;
let clickedCount;
let gridIs;
let gravity = 0;
let count = 0;
let ball;
let remort_controller;
let start_button;
let stop_button;
let reset_button;
let b1;
let b2;

function fullScreen() {
    createCanvas(windowWidth, 9 * windowHeight / 10);
}

function preload() {
    ball = loadImage("/assets/img/metalBallImg.png");
}


function startButtonFunction() {
    clickedCount = true
}

function stopButtonFunction() {
    clickedCount = false
}

function resetButtonFunction() {
    initValue()
}

function gridButtonFunction() {
    if (gridIs == true) {
        gridIs = false
    } else {
        gridIs = true
    }
}

let startButton,
    stopButton,
    resetButton,
    gridButton;
function elCreate() {
    startButton = select("#startButton")
    stopButton = select("#stopButton")
    resetButton = select("#resetButton")
    gridButton = select("#gridButton")
}

function elInit() {
    startButton.mousePressed(startButtonFunction)
    stopButton.mousePressed(stopButtonFunction)
    gridButton.mousePressed(gridButtonFunction)
    resetButton.mousePressed(resetButtonFunction)
}

function initValue() {
    radi = width / 50;
    clickedCount = false;
    gridIs = false;
    gravity = 9.8;
    count = 0;
    ball.resize(width / 18, 0);
    b1 = new Ball(500, 10);
    b2 = new Ball(500, 12);
    b1.theta = radians(b1.theta0) * cos(sqrt(gravity / (b1.string_length / float(50 * 100))) * count / 60);
    b2.theta = radians(b2.theta0) * cos(sqrt(gravity / (b2.string_length / float(50 * 100))) * count / 60);
}

function setup() {
    fullScreen();
    elCreate();
    elInit();
    initValue();
}

function draw() {
    background(255);
    if (clickedCount) count += 0.1;
    background_setting();
    b1.calculate(0);
    b2.calculate(width / 3);
    b1.display(0);
    b2.display(width / 3);
    b1.calculate(2 * width / 3);
    b2.calculate(2 * width / 3);
    tint(255, 150);
    stroke(0, 150);
    b1.display(2 * width / 3);
    b2.display(2 * width / 3);
    tint(255);
    console.log(gridIs)
}

function background_setting() {
    for (let i = 0; i < 3; i++) {
        stroke(0, 100);
        if (gridIs == true) {
            for (let f = -width / 6; f < width / 6; f += 10) {
                if (f % 50 == 0) {
                    strokeWeight(3);
                }
                else {
                    strokeWeight(1);
                }
                line(f + width / 3 * i + width / 6, 0, f + width / 3 * i + width / 6, height);
            }
            for (let f = 0; f < height; f += 10) {
                if (f % 50 == 0) {
                    strokeWeight(3);
                }
                else {
                    strokeWeight(1);
                }
                line(width / 3 * i, f, width / 3 * i + width / 3, f);
            }
        }
        noFill();
        stroke(0);
        strokeWeight(5);
        rect(width / 3 * i, 0, width / 3, height);
    }
}


class Ball {
    constructor(s_l, t_0) {
        this.posx = 0;
        this.posy = 0;
        this.theta = 0;
        this.material = 0;
        this.panelCount = 0;
        this.string_length = s_l;
        this.theta0 = t_0;
    }


    calculate(n) {
        this.posx = n + width / 6 + this.string_length * sin(this.theta);
        this.posy = 100 + this.string_length * cos(this.theta);
        this.theta = radians(this.theta0) * cos(sqrt(gravity / (this.string_length / float(50 * 100))) * count / 60);
    }

    display(n) {
        line(this.posx, this.posy, n + width / 6, 100);
        image(ball, this.posx - radi, this.posy - radi, radi * 2, radi * 2);
    }

}
function windowResized() {
    resizeCanvas(windowWidth, 9 * windowHeight / 10);
}
