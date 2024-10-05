// index.jsはメインのメソッドを呼び出すためのファイルです。

/////////////////////////// 以上の記述は不必要であれば削除してください。/////////////////////////////////

import p5 from "https://cdn.jsdelivr.net/npm/p5@1.11.0/+esm";
import { elementPositionInit, elementSelectInit, settingInit, valueInit } from "./init.js";
import { BicpemaCanvasController } from "../../../assets/js/bicpema/canvas/CanvasController.js";
const sketch = (p) => {
  let font;
  p.preload = function () {
    font = p.loadFont("/assets/fonts/ZenMaruGothic-Regular.ttf");
  };

  let canvasController;
  p.setup = function () {
    canvasController = new BicpemaCanvasController(p);
    canvasController.fullScreen();
    settingInit(p, font);
    elementSelectInit();
    elementPositionInit();
    valueInit();
  };

  p.draw = function () {
    p.scale(p.width / 1000);
    p.background(0);
    // drawGraph();
  };

  p.windowResized = function () {
    canvasController.resizeScreen();
    elementPositionInit();
  };
};

// スケッチのインスタンスを生成
new p5(sketch);
