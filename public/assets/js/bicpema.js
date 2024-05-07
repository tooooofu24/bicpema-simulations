// Reload function when the screen is rotated.
$(function () {
  var timer = false;
  var prewidth = $(window).width();
  $(window).resize(function () {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      var nowWidth = $(window).width();
      if (prewidth !== nowWidth) {
        location.reload();
      }
      prewidth = nowWidth;
    }, 200);
  });
});

// Responsive full screen function
function fullScreen() {
  let p5Canvas = select("#p5Canvas");
  let navBar = select("#navBar");
  let canvas = "";
  let ratio = 9 / 16;
  let w = windowWidth;
  let h = w * ratio;
  if (h > windowHeight - navBar.height) {
    h = windowHeight - navBar.height;
    w = h / ratio;
  }
  canvas = createCanvas(w, h);
  canvas.parent(p5Canvas).class("rounded border border-1");
}

function resizeFullScreen() {
  let navBar = select("#navBar");
  let ratio = 9 / 16;
  let w = windowWidth;
  let h = w * ratio;
  if (h > windowHeight - navBar.height) {
    h = windowHeight - navBar.height;
    w = h / ratio;
  }
  resizeCanvas(w, h);
}

let smartPhone;
function deviceJudge() {
  let ua = navigator.userAgent;
  if (ua.indexOf("iPhone") > 0 || ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0 || ua.indexOf("Mobile") > 0) {
    smartPhone = loadImage("/assets/img/smartPhone.png");
    return true;
  } else {
    return false;
  }
}

let r = 0;
function rotateInstruction() {
  if (windowWidth > windowHeight) {
    r += 1.5;
    if (r >= 90) r = 0;
    let m = 1.4 * map(r, 0, 90, 0, 1);
    t = 255 - 255 * abs(0.5 - m);
    push();
    translate(500, 562.5 / 2);
    rotate((r * PI) / 180);
    tint(255, t);
    image(smartPhone, -smartPhone.width / 2, -smartPhone.height / 2);
    pop();
  }
}

// class for car images
// instance name = new Car(x-coordinate, y-coordinate, x-speed, y-speed, car-color, car-width, x-acceleration, y-acceleration);
// Default color of the car is red("r"), others are yellow("y").
// The height of the car is automatically calculated according to its width.
class Car {
  constructor(x = 0, y = 0, vx = 0, vy = 0, k = "r", w = 100, ax = 0, ay = 0) {
    this.posX = x;
    this.posY = y;
    this.speedX = vx;
    this.speedY = vy;
    this.kind = k;
    this.acceX = ax;
    this.acceY = ay;
    this.carWidth = w;
    this.carHeight;
    this.rCar = loadImage("/assets/img/rCar.png");
    this.yCar = loadImage("/assets/img/yCar.png");
  }
  carDraw() {
    this.speedX += this.acceX / frameRate();
    this.speedY += this.acceY / frameRate();
    this.posX += this.speedX / frameRate();
    this.posY += this.speedY / frameRate();
    let img = "";
    switch (this.kind) {
      case "r":
        img = this.rCar;
        this.carHeight = this.carWidth * (this.rCar.height / this.rCar.width);
        break;
      case "y":
        img = this.yCar;
        this.carHeight = this.carWidth * (this.yCar.height / this.yCar.width);
        break;
      default:
        img = this.rCar;
        this.carHeight = this.carWidth * (this.rCar.height / this.rCar.width);
    }
    image(img, this.posX - this.carWidth / 2, this.posY - this.carHeight / 2, this.carWidth, this.carHeight);
  }
}
