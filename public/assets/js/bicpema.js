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
    }, 500);
  });
});

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
