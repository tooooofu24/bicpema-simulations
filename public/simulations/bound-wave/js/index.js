let fps = 60;
let radi = 0;
let hm = 101;
let gravity = 980;
let count = 0;
let balls;
function setup() {
    fullScreen();
    balls = new Array(hm);
    frameRate(fps);
    radi = width / (2 * hm);
    for (let i = 0; i < hm; i++) {
        balls[i] = new Ball((width / hm) * i + radi, radi, 0.01 * i);
    }
    textAlign(CENTER, CENTER);
    textSize(width / 100);
}

function draw() {
    background(0);
    stroke(255);
    for (let i = 0; i < 11; i++) {
        line(0, radi + i * (height - 2 * radi) / 10, width, radi + i * (height - 2 * radi) / 10);
    }
    fill(0);
    rect(width / 2 - 1 * width / 10 - width / 100, height / 2 - (radi + (height - 2 * radi) / 10) / 2, width / 10, radi + (height - 2 * radi) / 10);
    rect(width / 2 + width / 100, height / 2 - (radi + (height - 2 * radi) / 10) / 2, width / 10, radi + (height - 2 * radi) / 10);
    fill(255);
    text("ALIGNMENT", width / 2 - 1 * width / 10 - width / 100, height / 2 - (radi + (height - 2 * radi) / 10) / 2, width / 10, radi + (height - 2 * radi) / 10);
    text("RANDOM", width / 2 + width / 100, height / 2 - (radi + (height - 2 * radi) / 10) / 2, width / 10, radi + (height - 2 * radi) / 10);
    for (let i = 0; i < hm; i++) {
        balls[i].calculation();
        balls[i].display();
    }
}

function mouseClicked() {
    if (width / 2 - 1 * width / 10 - width / 100 < mouseX && mouseX < width / 2 - 1 * width / 10 - width / 100 + width / 10 && height / 2 - (radi + (height - 2 * radi) / 10) / 2 < mouseY && mouseY < height / 2 - (radi + (height - 2 * radi) / 10) / 2 + radi + (height - 2 * radi) / 10) {
        for (let i = 0; i < hm; i++) {
            balls[i] = new Ball((width / hm) * i + radi, radi, 0.01 * i);
        }
    }
    if (width / 2 + width / 100 < mouseX && mouseX < width / 2 + width / 100 + width / 10 && height / 2 - (radi + (height - 2 * radi) / 10) / 2 < mouseY && mouseY < height / 2 - (radi + (height - 2 * radi) / 10) / 2 + radi + (height - 2 * radi) / 10) {
        for (let i = 0; i < hm; i++) {
            balls[i] = new Ball(random(radi, width - radi), radi, 0.01 * i);
        }
    }
}

class Ball {
    constructor(x, y, r) {
        this.speed = 0;
        this.boundCount = 0;
        this.count = 0;
        this.posx = x;
        this.posy = y;
        this.repulsion = r;
    }

    calculation() {
        this.count++;
        if (this.boundCount == 0) {
            this.posy = 0.5 * gravity * sq(this.count / fps) + radi;
        }
        else {
            this.posy = -this.speed * this.count / fps + 0.5 * gravity * sq(this.count / fps) + height - radi;
        }
        if (this.posy + radi > height) {
            this.boundCount++;
            this.count = 0;
            this.speed = pow(this.repulsion, this.boundCount) * sqrt(2 * gravity * (height - 2 * radi));
        }
    }

    display() {
        fill(255);
        ellipse(this.posx, this.posy, radi * 2, radi * 2);
    }

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function fullScreen() {
    createCanvas(windowWidth, windowHeight);
}