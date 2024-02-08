// #upperGraphV-T,
// #upperGraphX-T,
// #lowerGraphV-T,
// #lowerGraphX-Tのリサイズ処理

function fullScreen() {
    let parent = document.getElementById("p5Canvas");
    let canvas = createCanvas(2 * windowWidth / 3, 9 * windowHeight / 10);
    canvas.parent(parent)
}

function preload() {
    yellowCarImg = loadImage("/assets/img/yellowCar.png");
    redCarImg = loadImage("/assets/img/redCar.png");
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
let scale;

function initValue() {
    canvasWidth = 2 * windowWidth / 3;
    canvasHeight = 9 * windowHeight / 10;
    yellowCarImg.resize(150, 0);
    redCarImg.resize(150, 0);
    yellowCar = new CAR(0, canvasHeight / 2 - yellowCarImg.height - 50, yellowCarImg, 3, []);
    redCar = new CAR(0, canvasHeight - redCarImg.height - 50, redCarImg, 2, []);
    time = 0;
    textSize(15);
    textAlign(CENTER);
    frameRate(30);
    scale = createGraphics(canvasWidth, 50);
    scale.background(255);
    scale.textAlign(CENTER);
    for (let x = 0; x < canvasWidth; x += 5) {
        if (x % 50 == 0) {
            scale.line(x, 0, x, 25);
            scale.text(x / 50, x, 40);
        }
        else {
            scale.line(x, 0, x, 15);
        }
    }
}

function setup() {
    fullScreen();
    elCreate();
    elInit();
    initValue();
}

function draw() {
    background(0);
    image(scale, 0, canvasHeight / 2 - 50);
    image(scale, 0, canvasHeight - 50);
    redCar._draw();
    yellowCar._draw();
    if (time % 30 == 0) {
        yellowCar.arr.push(yellowCar.posx);
        redCar.arr.push(redCar.posx);
    }
    time += 1;
}

function windowResized() {
    fullScreen();
    elInit();
    initValue();
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
        tint(255, 150);
        stroke(255,0,0);
        strokeWeight(3)
        for (let i = 0; i < this.arr.length; i++) {
            image(this.img, this.arr[i] - this.img.width / 2-this.arr[0], this.posy);
            line(this.arr[i]-this.arr[0], this.posy+this.img.height-10, this.arr[i]-this.arr[0], this.posy + this.img.height+10);
        }
        this.posx += 50 * this.speed / 30;
        tint(255);
        image(this.img, this.posx - this.img.width / 2, this.posy);
    }
}
