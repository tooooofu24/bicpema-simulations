/**
 * HTML要素の位置の調整や、関数との紐付けを行う。
 */
const elInit = () => {
  /** グラフを描画するdiv要素 */
  const GRAPH = createDiv(
    `
        <canvas id="graphCanvas"></canvas>
      `
  )
    .id("graph")
    .parent(select("#p5Container"))
    .class("rounded border border-1");

  /** グラフ切り替えボタンの親div要素 */
  const GRAPH_BUTTON_PARENT = createDiv(
    `
        <button type="button" class="btn btn-secondary" id="graphButton">
          グラフの切り替え
        </button>
      `
  )
    .id("graphButtonParent")
    .parent(select("#p5Container"));

  /** グラフ切り替えボタンのbutton要素 */
  const GRAPH_BUTTON = select("#graphButton").mousePressed(graphButtonFunction);
  /** シミュレーション設定ボタンのbutton要素 */
  const MODAL_BUTTON = createButton("シミュレーション設定")
    .class("btn btn-primary")
    .id("modalButton")
    .parent(select("#p5Container"))
    .attribute("data-bs-toggle", "modal")
    .attribute("data-bs-target", "#modal");

  const modalWindow = createDiv(
    `
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-check" id="scaleCheckBoxParent">
                <input class="form-check-input" type="checkbox" id="scaleCheckBox" checked>
                <label class="form-check-label" for="scaleCheckBox">スケールの表示・非表示</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
            </div>
          </div>
        </div>
      `
  )
    .class("modal fade")
    .id("modal")
    .parent(select("#p5Container"))
    .attribute("tabindex", "-1")
    .attribute("aria-labelledby", "modalLabel")
    .attribute("aria-hidden", "true");
};

const elSetting = () => {
  const GRAPH = select("#graph");
  const GRAPH_BUTTON_PARENT = select("#graphButtonParent");
  // リサイズ処理
  if (width <= 992) {
    GRAPH.position((windowWidth - width) / 2, height + 125).size(width, width);
    GRAPH_BUTTON_PARENT.position((windowWidth - width) / 2, height + width + 140);
  } else {
    GRAPH.position(windowWidth / 2 - width / 4, height + 125).size(width / 2, width / 2);
    GRAPH_BUTTON_PARENT.position(windowWidth / 2 - width / 4, height + width / 2 + 140);
  }
  const MODAL_BUTTON = select("#modalButton");
  MODAL_BUTTON.position(windowWidth / 2 + width / 2 - MODAL_BUTTON.width, 60 + height + 10);
};

/**
 * 画像の初期化を行う。
 */
const imgInit = () => {
  YELLOW_CAR_IMG.resize(100, 0);
  RED_CAR_IMAGE.resize(100, 0);
};

let YELLOW_CAR;
let RED_CAR;
/**
 * 変数やオブジェクトの初期化を行う。
 */
const initValue = () => {
  YELLOW_CAR = new CAR(0, CANVAS_HEIGHT / 2 - YELLOW_CAR_IMG.height - 50, YELLOW_CAR_IMG, 3, [], []);
  RED_CAR = new CAR(0, CANVAS_HEIGHT - RED_CAR_IMAGE.height - 50, RED_CAR_IMAGE, 2, [], []);
  graphData = true;
  YELLOW_CAR.xarr = [];
  RED_CAR.xarr = [];
  YELLOW_CAR.varr = [];
  RED_CAR.varr = [];
  for (let i = 0; i <= 10; i++) {
    YELLOW_CAR.xarr.push({ x: i, y: YELLOW_CAR.speed * i });
    RED_CAR.xarr.push({ x: i, y: RED_CAR.speed * i });
    YELLOW_CAR.varr.push({ x: i, y: YELLOW_CAR.speed });
    RED_CAR.varr.push({ x: i, y: RED_CAR.speed });
  }
};
