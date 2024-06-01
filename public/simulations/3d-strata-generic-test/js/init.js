// settingInit関数
// シミュレーションそのものの設定を行う関数
const FPS = 60;
let canvasController;
settingInit = () => {
  canvasController = new BicpemaCanvasController(false, true);
  canvasController.fullScreen();
  frameRate(FPS);
  textAlign(CENTER, CENTER);
  textSize(20);
  textFont(font);
  camera(800, -500, 800, 0, 0, 0, 0, 1, 0);
};

// elementSelectInit関数
// 仮想DOMを読み込むための関数
let buttonParent;
let screenshotButton;
// 地点を追加、削除するボタン
let placeAddButton, placeRemoveButton;
// 平面を構成する地層の組を追加、削除するボタン
let strataAddButton, strataRemoveButton;
elementSelectInit = () => {
  buttonParent = select("#buttonParent");
  screenshotButton = select("#screenshotButton");
  placeAddButton = select("#placeAddButton");
  placeRemoveButton = select("#placeRemoveButton");
  strataAddButton = select("#strataAddButton");
  strataRemoveButton = select("#strataRemoveButton");

  const setRadioParent = select("#setRadioParent");
  setRadioButton = createRadio().parent(setRadioParent);
  setRadioButton.option("自動", "auto");
  setRadioButton.option("手動", "manual");
  setRadioButton.value("auto");
  setRadioButton.changed(setRadioButtonFunction);
};

// elementPositionInit関数
// 仮想DOMの場所や実行関数を設定するための関数
elementPositionInit = () => {
  buttonParent.position(5, 65);
  placeAddButton.mousePressed(placeAddButtonFunction);
  placeRemoveButton.mousePressed(placeRemoveButtonFunction);
  strataAddButton.mousePressed(strataAddButtonFunction);
  strataRemoveButton.mousePressed(strataRemoveButtonFunction);
};

// 地点のデータを入力するインプットの連想配列
let dataInputArr = {};
// データ構造
// dataInputArr = {
//   地点+地点番号:{
//     name: 地点の名前,
//     data:{
//       x: 経度,
//       y: 緯度
//     },
//     edit: データを編集するボタン,
//     layer:[
//       [
//         1層目の浅い方の深さ,
//         1層目の深い方の深さ,
//         岩層の種類,
//       ],
//       [
//         2層目の浅い方の深さ,
//         2層目の深い方の深さ,
//         岩層の種類,
//       ]
//     ]
//   }
// }

// valueInit関数
// 初期値を設定するための関数
let rotateTime;
valueInit = () => {
  rotateTime = 0;
};
