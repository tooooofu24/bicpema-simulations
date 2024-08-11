/**
 * BicpemaCanvasControllerクラス
 *
 * Bicpemaの動的なキャンバスサイズをコントロールする。
 */
class BicpemaCanvasController {
  /**
   * @constructor
   * @param {boolean} f 回転時に比率を固定化するか
   * @param {boolean} i 3Dかどうか
   * @param {number} w_r 幅の比率（0.0~1.0）
   * @param {number} h_r 高さの比率（0.0~1.0）
   */
  constructor(f = true, i = false, w_r = 1.0, h_r = 1.0) {
    this.fixed = f;
    this.is3D = i;
    this.widthRatio = w_r;
    this.heightRatio = h_r;
  }
  /**
   * HTML要素で生成している#p5Canvasと#navBarを元にcanvasを生成する。
   */
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

  /**
   * HTML要素で生成している#p5Canvasと#navBarを元にcanvasをリサイズする。
   */
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

/**
 * Bicpemaを使用しているデバイスを判定し、デバイスに応じて画面表示を切り替える。
 */
class BicpemaDeviceJudge {
  /**
   * @constructor
   */
  constructor() {
    this.r = 0;
    this.smartPhone;
    this.deviceIs = false;
  }
  /**
   * Bicpemaを使用しているデバイスを判定する。
   */
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

  /**
   * デバイスの回転を促す画像を表示する。
   *
   * @param {string} [direction="vertival"]
   */
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

/**
 * 3D座標系を描画するクラス
 */
class CoordinateSystem {
  /**
   * @constructor
   * @param {number} x x方向の長さ
   * @param {number} y y方向の長さ
   * @param {number} z z方向の長さ
   */
  constructor(x = 500, y = 500, z = 500) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * x,y,z軸を描画する。
   */
  line() {
    stroke(255, 0, 0);
    line(this.x, 0, 0, 0, 0, 0);
    stroke(0, 255, 0);
    line(0, this.y, 0, 0, 0, 0);
    stroke(0, 0, 255);
    line(0, 0, this.z, 0, 0, 0);
  }

  /**
   * x,y,z方向のスケールを描画するメソッド
   */
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

  /**
   * x,y,z方向の軸ラベルを描画するメソッド
   * @param {string} xLabel x方向のラベル
   * @param {string} yLabel y方向のラベル
   * @param {string} zLabel z方向のラベル
   * @param {number} size フォントサイズ
   */
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
