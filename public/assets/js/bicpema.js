// BicpemaCanvasControllerクラス
// Bicpemaの動的なキャンバスサイズをコントロールするオブジェクト
// インスタンス名 = new BicpemaCanvasController();
class BicpemaCanvasController {
  constructor(f = true, i = false) {
    this.fixed = f;
    this.is3D = i;
  }
  fullScreen() {
    const P5_CANVAS = select("#p5Canvas");
    const NAV_BAR = select("#navBar");
    let canvas, w, h;
    if (this.fixed) {
      const RATIO = 9 / 16;
      w = windowWidth;
      h = w * RATIO;
      if (h > windowHeight - NAV_BAR.height) {
        h = windowHeight - NAV_BAR.height;
        w = h / RATIO;
      }
    } else {
      w = windowWidth;
      h = windowHeight - NAV_BAR.height;
    }
    if (this.is3D) {
      canvas = createCanvas(w, h, WEBGL);
    } else {
      canvas = createCanvas(w, h);
    }
    canvas.parent(P5_CANVAS).class("rounded border border-1");
  }
  resizeScreen() {
    const NAV_BAR = select("#navBar");
    let w = 0;
    let h = 0;
    if (this.fixed) {
      const RATIO = 9 / 16;
      w = windowWidth;
      h = w * RATIO;
      if (h > windowHeight - NAV_BAR.height) {
        h = windowHeight - NAV_BAR.height;
        w = h / RATIO;
      }
    } else {
      w = windowWidth;
      h = windowHeight - NAV_BAR.height;
    }
    resizeCanvas(w, h);
  }
}

// BicpemaDeviceJudgeクラス
// Bicpemaを利用しているデバイスを判定するオブジェクト
// インスタンス名 = new BicpemaDeviceJudge();
class BicpemaDeviceJudge {
  constructor() {
    this.r = 0;
    this.smartPhone;
    this.deviceIs = false;
  }
  judge() {
    const U_A = navigator.userAgent;
    if (
      U_A.indexOf("iPhone") > 0 ||
      U_A.indexOf("iPad") > 0 ||
      U_A.indexOf("Android") > 0 ||
      U_A.indexOf("Mobile") > 0
    ) {
      this.smartPhone = loadImage("/assets/img/smartPhone.png");
      this.deviceIs = true;
    } else {
      $(function () {
        let timer = false;
        let prewidth = $(window).width();
        $(window).resize(function () {
          if (timer !== false) {
            clearTimeout(timer);
          }
          timer = setTimeout(function () {
            let nowWidth = $(window).width();
            if (prewidth !== nowWidth) {
              location.reload();
            }
            prewidth = nowWidth;
          }, 200);
        });
      });
      this.deviceIs = false;
    }
  }
  rotateInstruction(direction = "vertical") {
    function smartPhoneDisplay(r, img) {
      let m = 1.4 * map(r, 0, 90, 0, 1);
      let t = 255 - 255 * abs(0.5 - m);
      push();
      translate(500, 562.5 / 2);
      rotate((r * PI) / 180);
      tint(255, t);
      image(img, -img.width / 2, -img.height / 2);
      pop();
    }
    if (this.deviceIs) {
      switch (direction) {
        case "vertical":
          if (windowWidth > windowHeight) {
            this.r += 1.5;
            if (this.r >= 90) this.r = 0;
            smartPhoneDisplay(this.r, this.smartPhone);
          }
          break;
        case "horizontal":
          if (windowWidth < windowHeight) {
            this.r -= 1.5;
            if (this.r < 0) this.r = 90;
            smartPhoneDisplay(this.r, this.smartPhone);
          }
          break;
      }
    }
  }
}

// BicpemaCarクラス
// インスタンス名 = new BicpemaCar(x座標, y座標, x方向の速度, y方向の速度, 車の色, 車の幅, x方向の加速度, y方向の加速度);
// デフォルトの車の色はred("r")であり、他にはyellow("y")が用意されている。
// 車の原則として高さとの相対値で決定する。
class BicpemaCar {
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
