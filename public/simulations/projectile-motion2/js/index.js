function fullScreen() {
    createCanvas(4 * windowWidth / 5, windowHeight)
}

let redBallImg,
    blueBallImg,
    yellowBallImg;
function preload() {
    redBallImg = loadImage("../../assets/img/redBallImg.png")
    blueBallImg = loadImage("../../assets/img/blueBallImg.png")
    yellowBallImg = loadImage("../../assets/img/yellowBallImg.png")
}

let speedExpla,
    speedSlider;
let thetaExpla,
    thetaSlider;
function buttonCreation() {
    speedExpla = createElement('label', "速度[m/s]")
    speedSlider = createInput(18, "number", 1)
    thetaExpla = createElement('label', "角度[°]")
    thetaSlider = createInput(30, "number", 1)
}

function buttonSettings() {
    speedExpla.size(windowWidth / 5, height / 10).position(width, 0).addClass('h1').style('text-align','center').style('line-height',height/10+'px')
    speedSlider.size(windowWidth / 5, height / 10).position(width, height / 10).input(initValue).addClass('h1').style('text-align','center')
    thetaExpla.size(windowWidth / 5, height / 10).position(width, 2 * height / 10).addClass('h1').style('text-align','center').style('line-height',height/10+'px')
    thetaSlider.size(windowWidth / 5, height / 10).position(width, 3 * height / 10).input(initValue).addClass('h1').style('text-align','center')
}

let redBall,
    blueBall,
    yellowBall;
let ballRadi,
    ballSpeed,
    ballTheta;
let gravity = 9.8,
    time;
function initValue() {
    ballRadi = 25
    ballSpeed = speedSlider.value()
    ballTheta = thetaSlider.value()
    redBallImg.resize(ballRadi * 2, ballRadi * 2)
    redBall = new Ball(ballRadi, height - ballRadi * 2, ballSpeed, ballSpeed, radians(ballTheta), redBallImg)
    redBall.speedx0 = ballSpeed * cos(redBall.theta)
    redBall.speedy0 = ballSpeed * sin(redBall.theta)
    blueBallImg.resize(ballRadi * 2, ballRadi * 2)
    blueBall = new Ball(ballRadi, height - ballRadi * 2, ballSpeed, ballSpeed, radians(ballTheta), blueBallImg)
    blueBall.speedx0 = 0
    blueBall.speedy0 = ballSpeed * sin(blueBall.theta)
    yellowBallImg.resize(ballRadi * 2, ballRadi * 2)
    yellowBall = new Ball(ballRadi, height - ballRadi * 2, ballSpeed, ballSpeed, radians(ballTheta), yellowBallImg)
    yellowBall.speedx0 = ballSpeed * cos(yellowBall.theta)
    yellowBall.speedy0 = 0
    time = 0
    frameRate(60)
    stroke(255, 100)
}

function setup() {
    fullScreen()
    buttonCreation()
    buttonSettings()
    initValue()
}

function draw() {
    background(0)
    redBall.move()
    blueBall.move()
    yellowBall.move()
    time++
}

class Ball {
    constructor(x, y, sx0, sy0, t, i) {
        this.posx = x
        this.posy = y
        this.speedx0 = sx0
        this.speedy0 = sy0
        this.speedy = sy0
        this.theta = t
        this.img = i
        this.arrx = [x]
        this.arry = [y]
    }
    move() {
        // 本体の動きの設定
        if (this.speedy0 == 0) {
            this.speedy = 0
        } else {
            this.speedy = this.speedy0 - gravity * time / 60
        }
        this.posx += this.speedx0
        this.posy -= this.speedy
        image(this.img, this.posx, this.posy)
        if (time % 10 == 0 && time > 0) {
            this.arrx.push(this.posx)
            this.arry.push(this.posy)
        }
        for (let i = 0; i < this.arrx.length; i++) {
            tint(255, 177)
            image(this.img, this.arrx[i], this.arry[i])
            line(0, this.arry[i] + ballRadi, width, this.arry[i] + ballRadi)
            line(this.arrx[i] + ballRadi, 0, this.arrx[i] + ballRadi, height)
        }
    }
}

function windowResized() {
    fullScreen()
    buttonSettings()
    initValue()
}