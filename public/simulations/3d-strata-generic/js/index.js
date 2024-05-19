function preload() {
  font = loadFont("../../assets/fonts/ZenMaruGothic-Regular.ttf");
}
// setup関数
// シミュレーションを実行する際に１度だけ呼び出される。
function setup() {
  settingInit();
  canvasController.fullScreen();
  textFont(font);
  camera(800, -500, 800, 0, 0, 0, 0, 1, 0);
  elementSelectInit();
  elementPositionInit();
  valueInit();
}

let rotateTime = 0;
// draw関数
// シミュレーションを実行した後、繰り返し呼び出され続ける
function draw() {
  background(255);
  orbitControl();
  let coordinateData = calculateValue();
  let xMin = coordinateData.x.min;
  if (xMin == Infinity) xMin = 0;
  let xMax = coordinateData.x.max;
  if (xMax == -Infinity) xMax = 0;
  let xLen = xMax - xMin;
  let yMin = coordinateData.y.min;
  if (yMin == Infinity) yMin = 0;
  let yMax = coordinateData.y.max;
  if (yMax == -Infinity) yMax = 0;
  let yLen = yMax - yMin;
  let unitLen = max([xLen, yLen]);
  if (xLen <= yLen) {
    let addLenValue = (unitLen - xLen) / 2;
    xMin -= addLenValue;
    xMax += addLenValue;
  } else {
    let addLenValue = (unitLen - yLen) / 2;
    yMin = float(yMin);
    yMin -= addLenValue;
    yMax = float(yMax);
    yMax += addLenValue;
  }
  let zMin = coordinateData.z.min;
  if (zMin == Infinity) zMin = 0;
  // 緊急的な措置としての変数の代入
  // 今後軸ラベルの最小値と最大値をスライダーで変更できる仕様に変える必要がある
  zMin = -53;
  let zMax = coordinateData.z.max;
  if (zMax == -Infinity) zMax = 0;
  backgroundSetting(xMin, xMax, yMin, yMax, zMin, zMax);
  drawDirMark(-600, -600);

  // データ登録モーダルを開いている時にオービットコントロールを無効化
  let modalIs = $("#dataRegisterModal").is(":hidden");
  if (modalIs) {
    orbitControl(2);
  }

  rotateTime += 2;
  for (let key in dataInputArr) {
    drawStrata(key, rotateTime, xMin, xMax, yMin, yMax, zMin, zMax);
  }

  let trNum = document.getElementById("strataSelect").childElementCount;
  let p1Name = select("#firstPlaceSelect").value();
  let p2Name = select("#secondPlaceSelect").value();
  let p3Name = select("#thirdPlaceSelect").value();
  if (p1Name != "-" && p2Name != "-" && p3Name != "-") {
    let p1 = [0, 0];
    let p2 = [0, 0];
    let p3 = [0, 0];
    for (let key in dataInputArr) {
      if (dataInputArr[key].name.value() == p1Name) {
        p1[0] = dataInputArr[key].data.x.value();
        p1[0] = map(p1[0], xMin, xMax, -500, 500);
        p1[1] = dataInputArr[key].data.y.value();
        p1[1] = map(p1[1], yMin, yMax, 500, -500);
      } else if (dataInputArr[key].name.value() == p2Name) {
        p2[0] = dataInputArr[key].data.x.value();
        p2[0] = map(p2[0], xMin, xMax, -500, 500);
        p2[1] = dataInputArr[key].data.y.value();
        p2[1] = map(p2[1], yMin, yMax, 500, -500);
      } else if (dataInputArr[key].name.value() == p3Name) {
        p3[0] = dataInputArr[key].data.x.value();
        p3[0] = map(p3[0], xMin, xMax, -500, 500);
        p3[1] = dataInputArr[key].data.y.value();
        p3[1] = map(p3[1], yMin, yMax, 500, -500);
      }
    }
    for (let i = 0; i < trNum; i++) {
      let select1 = select("#select1-" + str(i + 1)).value();
      let select2 = select("#select2-" + str(i + 1)).value();
      let select3 = select("#select3-" + str(i + 1)).value();
      let select4 = select("#select4-" + str(i + 1)).value();
      if (select2 == "" || select3 == "" || select4 == "") {
        continue;
      }
      let p1Min = select2.substr(0, select2.indexOf("m-"));
      let p1Max = select2.substr(select2.indexOf("m-") + 2);
      p1Max = p1Max.substr(0, p1Max.indexOf("m"));
      let p2Min = select3.substr(0, select3.indexOf("m-"));
      let p2Max = select3.substr(select3.indexOf("m-") + 2);
      p2Max = p2Max.substr(0, p2Max.indexOf("m"));
      let p3Min = select4.substr(0, select4.indexOf("m-"));
      let p3Max = select4.substr(select4.indexOf("m-") + 2);
      p3Max = p3Max.substr(0, p3Max.indexOf("m"));

      p1Min = map(p1Min, zMin, zMax, 0, 500);
      p1Max = map(p1Max, zMin, zMax, 0, 500);
      p2Min = map(p2Min, zMin, zMax, 0, 500);
      p2Max = map(p2Max, zMin, zMax, 0, 500);
      p3Min = map(p3Min, zMin, zMax, 0, 500);
      p3Max = map(p3Max, zMin, zMax, 0, 500);

      if (select1 == "砂岩層") fill(215, 205, 166, 150);
      if (select1 == "泥岩層") fill(156, 154, 143, 150);
      if (select1 == "れき岩層") fill(252, 180, 172, 150);
      if (select1 == "石灰岩層") fill(120, 170, 170, 150);
      if (select1 == "凝灰岩層・火山灰層") fill(200, 200, 200, 150);
      if (select1 == "ローム層") fill(112, 58, 21, 150);
      if (select1 == "その他の層") fill(0, 150);
      createPlane1(p1[0], p1[1], p1Min, p2[0], p2[1], p2Min, p3[0], p3[1], p3Min);
      createPlane1(p1[0], p1[1], p1Max, p2[0], p2[1], p2Max, p3[0], p3[1], p3Max);
      createPlane2(p1[0], p1[1], p1Min, p2[0], p2[1], p2Min, p2[0], p2[1], p2Max, p1[0], p1[1], p1Max);
      createPlane2(p1[0], p1[1], p1Min, p3[0], p3[1], p3Min, p3[0], p3[1], p3Max, p1[0], p1[1], p1Max);
      createPlane2(p2[0], p2[1], p2Min, p3[0], p3[1], p3Min, p3[0], p3[1], p3Max, p2[0], p2[1], p2Max);
    }
  }
}

// windowResized関数
// シミュレーションを利用しているデバイスの画面サイズが変わった際に呼び出される。
function windowResized() {
  canvasController.resizeScreen();
  elementPositionInit();
}
