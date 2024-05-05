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
    }, 100);
  });
});

function preload() {
  rCar = loadImage("/assets/img/rCar.png");
  yCar = loadImage("/assets/img/yCar.png");
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
  }
  carDraw() {
    this.speedX += this.acceX / frameRate();
    this.speedY += this.acceY / frameRate();
    this.posX += this.speedX / frameRate();
    this.posY += this.speedY / frameRate();
    let img = "";
    switch (this.kind) {
      case "r":
        img = rCar;
        this.carHeight = this.carWidth * (rCar.height / rCar.width);
        break;
      case "y":
        img = yCar;
        this.carHeight = this.carWidth * (yCar.height / yCar.width);
        break;
      default:
        img = rCar;
        this.carHeight = this.carWidth * (rCar.height / rCar.width);
    }
    image(img, this.posX - this.carWidth / 2, this.posY - this.carHeight / 2, this.carWidth, this.carHeight);
  }
}
