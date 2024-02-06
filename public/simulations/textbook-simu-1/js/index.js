function fullScreen() {
    createCanvas(2 * windowWidth / 3, 9 * windowHeight / 10)
}

function preload() {
    yellowCarImg = loadImage("/assets/img/yellowCar.png")
    redCarImg = loadImage("/assets/img/redCar.png")

}

function elCreate() {
}

function elInit() {
}

let canvasWidth,
    canvasHeight;

let yellowCar,
    redCar;
let time;
function initValue() {
    canvasWidth = 2 * windowWidth / 3;
    canvasHeight = 9 * windowHeight / 10;
    yellowCarImg.resize(150, 0)
    redCarImg.resize(150, 0)
    yellowCar = new CAR(0, canvasHeight / 2 - yellowCarImg.height - 50, yellowCarImg, 3, []);
    redCar = new CAR(0, canvasHeight - redCarImg.height - 50, redCarImg, 4, []);
    time = 0;
    textSize(15);
    textAlign(CENTER);
}

function setup() {
    fullScreen()
    elCreate()
    elInit()
    initValue()
}

function draw() {
    background(0);
    drawScale();
    redCar._draw();
    yellowCar._draw();

    if (time % 120 == 0) {
        yellowCar.arr.push(yellowCar.posx)
        redCar.arr.push(redCar.posx)
    }
    time += 1;
}

function windowResized() {
    fullScreen();
    elInit();
    initValue();
}

function drawScale() {
    fill(255);
    rect(0, canvasHeight / 2 - 50, canvasWidth, 50)
    rect(0, canvasHeight - 50, canvasWidth, 50)
    fill(0)
    for (let x = 0; x < canvasWidth; x += 5) {
        if (x % 50 == 0) {
            line(x, canvasHeight / 2 - 50, x, canvasHeight / 2 - 25);
            line(x, canvasHeight - 50, x, canvasHeight - 25);
            text(x / 50, x, canvasHeight / 2 - 10);
            text(x / 50, x, canvasHeight - 10);
        } else {
            line(x, canvasHeight / 2 - 50, x, canvasHeight / 2 - 35);
            line(x, canvasHeight - 50, x, canvasHeight - 35);
        }
    }
}

class CAR {
    constructor(x, y, i, v, a) {
        this.posx = x;
        this.posy = y;
        this.img = i;
        this.speed = v;
        this.arr = a;
    }
    _draw() {
        this.posx += this.speed;
        image(this.img, this.posx, this.posy);
        for (let i = 0; i < this.arr.length; i++) {
            image(this.img, this.arr[i], this.posy)
        }
    }
}