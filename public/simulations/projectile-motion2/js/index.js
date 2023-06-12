// 全体表示のための関数
function fullScreen() {
    createCanvas(windowWidth, 9 * windowHeight / 10)
}

// 画像の読み込み
let redBallImg,
    blueBallImg,
    yellowBallImg;
function preload() {
    redBallImg = loadImage("../../assets/img/redBallImg.png")
    blueBallImg = loadImage("../../assets/img/blueBallImg.png")
    yellowBallImg = loadImage("../../assets/img/yellowBallImg.png")
}

// DOM要素の生成
let elementX,
    elementY;
let parentEl;
let speedExpla,
    speedInput;
let thetaExpla,
    thetaInput;
let scaleExpla,
    scaleInput;
function elCreate() {
    parentDiv = createDiv("").addClass("parentDiv")
    speedExpla = createElement('label', "速度[m/s]")
    speedInput = createInput(20, "number", 1)
    thetaExpla = createElement('label', "角度[°]")
    thetaInput = createInput(30, "number", 1)
    scaleExpla = createElement('label', "スケール[倍]")
    scaleInput = createInput(1, "number", 1)
}

// DOM要素の初期設定
function elInit() {
    elementX = 4 * width / 5
    elementY = windowHeight / 10
    parentDiv.position(elementX, elementY).style("background-color:rgba(255, 255, 255, 0.538); width:20vw; height:35vh;")
    elArr = [speedExpla, speedInput, thetaExpla, thetaInput, scaleExpla, scaleInput]
    for (let i = 0; i < elArr.length; i++) {
        elArr[i].parent(parentDiv).style("width: 80%;height: 5vh;text-align: center;line-height: 5vh;display: block;margin: 0 auto;")
        if (i % 2 == 1) elArr[i].input(initValue).attribute("min", 0)
        else elArr[i].style("font-weight: bold;font-size: large;")
    }
}

// 初期値の設定
let redBall,
    blueBall,
    yellowBall;
let ballRadi,
    ballSpeed,
    ballTheta;
let gravity = 9.8,
    time;
function initValue() {
    ballRadi = width / 50
    ballSpeed = speedInput.value()
    ballTheta = thetaInput.value()
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

// setup関数
function setup() {
    fullScreen()
    elCreate()
    elInit()
    initValue()
}

// draw関数
function draw() {
    background(0)
    redBall.move()
    blueBall.move()
    yellowBall.move()
    time++
    console.log(frameRate())
    if (mouseIsPressed && mouseButton == RIGHT) {
        elementX = mouseX
        elementY = mouseY + windowHeight / 10
        parentDiv.position(elementX, elementY)
    }
    for(let i = 0;i < blueBall.arrx.length;i++){
        line(0, blueBall.arry[i] + ballRadi, width, blueBall.arry[i] + ballRadi)
    }
    for(let i = 0;i < yellowBall.arrx.length;i++){
        line(yellowBall.arrx[i] + ballRadi, 0, yellowBall.arrx[i] + ballRadi, height)
    }
}

// Ballクラス
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
        if (-2*width < this.posx && this.posx < 2*width && -2*height < this.posy && this.posy < 2*height){
            this.posx += this.speedx0
            this.posy -= this.speedy
            image(this.img, this.posx, this.posy)
            if (time % 10 == 0 && time > 0) {
                this.arrx.push(this.posx)
                this.arry.push(this.posy)
            }
        }
        
        for (let i = 0; i < this.arrx.length; i++) {
            tint(255, 177)
            image(this.img, this.arrx[i], this.arry[i])
        }
    }
}

// リサイズされた時の処理
function windowResized() {
    fullScreen()
    elInit()
    initValue()
}