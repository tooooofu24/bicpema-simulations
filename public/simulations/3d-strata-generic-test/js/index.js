function preload() {
  font = loadFont("../../assets/fonts/ZenMaruGothic-Regular.ttf");
}

function setup() {
  settingInit();
  elementSelectInit();
  elementPositionInit();
  valueInit();
  loadTestDataButtonFunction();
}

let coordinateData;
function draw() {
  background(255);

  // データ登録モーダルを開いている時にオービットコントロールを無効化
  let dataRegisterModalIs = $("#dataRegisterModal").is(":hidden");
  if (dataRegisterModalIs) {
    orbitControl();
  }
  // 緯度や経度、深さに応じてスケールを計算する
  if (setRadioButton.value() === "auto") {
    coordinateData = calculateValue();
    coordinateData.x.min = 0;
    coordinateData.x.max = (int(coordinateData.x.max / 10) + 1) * 10;
    coordinateData.y.min = 0;
    coordinateData.y.max = (int(coordinateData.y.max / 10) + 1) * 10;
  } else {
    let ele1 = select("#widthDirectionInput");
    let ele2 = select("#depthDirectionMaxInput");
    let ele3 = select("#depthDirectionMinInput");
    coordinateData.x.min = 0;
    coordinateData.x.max = ele1.value();
    coordinateData.y.min = 0;
    coordinateData.y.max = ele1.value();
    coordinateData.z.max = int(ele2.value());
    coordinateData.z.min = int(ele3.value());
  }
  // 計算したスケールを実際に適応
  backgroundSetting(coordinateData);

  // 方位の描画
  drawDirMark(-600, -600);

  // 地点名の回転
  rotateTime += 3;

  // それぞれの地点のボーリングデータの描画
  for (let key in dataInputArr) {
    drawStrata(key, rotateTime, coordinateData);
  }

  // それぞれの地層をつなぐ
  connectStrata();
}

function windowResized() {
  canvasController.resizeScreen();
  elementPositionInit();
}
