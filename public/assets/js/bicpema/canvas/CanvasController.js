import { ObjectByIdNotFoundError } from "../error/ObjectByIdNotFoundError.js";
/**
 * BicpemaCanvasControllerクラス
 *
 * Bicpemaの動的なキャンバスサイズをコントロールする。
 */
export class CanvasController {
  /**
   * @constructor
   * @param {p5instance} p p5.jsのインスタンス
   * @param {boolean} f 回転時に比率を固定化するか
   * @param {number} w_r 幅の比率（0.0~1.0）
   * @param {number} h_r 高さの比率（0.0~1.0）
   */
  constructor(p, f = true, w_r = 1.0, h_r = 1.0) {
    this.p = p;
    this.fixed = f;
    this.widthRatio = w_r;
    this.heightRatio = h_r;
    this.P5_CANVAS =
      p.select("#p5Canvas") ??
      (() => {
        throw new ObjectByIdNotFoundError("p5Canvas");
      })();
    this.NAV_BAR =
      p.select("#navBar") ??
      (() => {
        throw new ObjectByIdNotFoundError("navBar");
      })();
  }

  /**
   * 画面サイズに合わせたキャンバスのサイズを計算します。
   *
   * @returns 配列[キャンバス要素の幅、キャンバス要素の高さ]
   */
  calculateWindowSize() {
    let w, h;
    if (this.fixed) {
      const RATIO = 9 / 16;
      w = this.p.windowWidth;
      h = w * RATIO;
      if (h > this.p.windowHeight - this.NAV_BAR.height) {
        h = this.p.windowHeight - this.NAV_BAR.height;
        w = h / RATIO;
      }
    } else {
      w = this.p.windowWidth;
      h = this.p.windowHeight - this.NAV_BAR.height;
    }
    return [w, h];
  }

  /**
   * HTML要素で生成している#p5Canvasと#navBarを元にcanvasを生成します。
   */
  fullScreen() {
    const windowSize = this.calculateWindowSize();
    const w = windowSize[0];
    const h = windowSize[1];
    const canvas = this.p.createCanvas(w * this.widthRatio, h * this.heightRatio);
    canvas.parent(this.P5_CANVAS).class("rounded border border-1");
  }

  /**
   * HTML要素で生成している#p5Canvasと#navBarを元にcanvasをリサイズします。
   */
  resizeScreen() {
    const windowSize = this.calculateWindowSize();
    const w = windowSize[0];
    const h = windowSize[1];
    this.p.resizeCanvas(w * this.widthRatio, h * this.heightRatio);
  }
}
