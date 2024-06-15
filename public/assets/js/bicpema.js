// BicpemaCanvasControllerクラス
// Bicpemaの動的なキャンバスサイズをコントロールするオブジェクト
// インスタンス名 = new BicpemaCanvasController();
class BicpemaCanvasController {
  constructor(f = true, i = false, w_r = 1.0, h_r = 1.0) {
    this.fixed = f;
    this.is3D = i;
    this.widthRatio = w_r;
    this.heightRatio = h_r;
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
      canvas = createCanvas(w * this.widthRatio, h * this.heightRatio, WEBGL);
    } else {
      canvas = createCanvas(w * this.widthRatio, h * this.heightRatio);
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
    resizeCanvas(w * this.widthRatio, h * this.heightRatio);
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

// 3Dの座標系クラス
class CoordinateSystem {
  constructor(x = 500, y = 500, z = 500) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // x,y,z軸を描画するメソッド
  line() {
    stroke(255, 0, 0);
    line(this.x, 0, 0, 0, 0, 0);
    stroke(0, 255, 0);
    line(0, this.y, 0, 0, 0, 0);
    stroke(0, 0, 255);
    line(0, 0, this.z, 0, 0, 0);
  }

  // x,y,z方向のスケールを描画するメソッド
  scale() {
    stroke(100, 100);
    for (let x = 50; x <= this.x; x += 50) {
      line(x, 0, 0, x, this.y, 0);
      line(x, 0, 0, x, 0, this.z);
    }
    for (let y = 50; y <= this.y; y += 50) {
      line(0, y, 0, this.x, y, 0);
      line(0, y, 0, 0, y, this.z);
    }
    for (let z = 50; z <= this.z; z += 50) {
      line(0, 0, z, this.x, 0, z);
      line(0, 0, z, 0, this.y, z);
    }
  }

  // x,y,z方向の軸ラベルを描画するメソッド
  axisLabel(xLabel, yLabel, zLabel, size) {
    fill(0);
    textSize(size);

    push();
    translate(0, -size, 0);
    text(xLabel, this.x / 2, 0);
    pop();

    push();
    translate(-size, 0, 0);
    text(yLabel, 0, this.y / 2);
    pop();

    push();
    rotateY(PI / 2);
    translate(0, -size, 0);
    text(zLabel, -this.z / 2, 0);
    pop();
  }
}
