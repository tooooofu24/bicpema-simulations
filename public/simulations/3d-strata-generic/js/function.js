// 以下にその他のメソッドを定義してください。
// html要素が全て読み込まれた後に読み込む
window.onload = function () {
  // screenshotButtonの設定
  document.getElementById("screenshotButton").addEventListener("click", () => {
    html2canvas(document.body).then((canvas) => {
      downloadImage(canvas.toDataURL());
    });
  });
  function downloadImage(dataUrl) {
    const name = "screenshot.png";
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = name;
    a.click();
  }
};

// 地点データが入力された時に動く関数
function placeNameInputFunction() {
  // 地点データの数
  let placeNum = Object.keys(dataInputArr).length;
  // データを編集するボタンのhtml要素を書き換える繰り返し
  for (let i = 0; i < placeNum; i++) {
    let place = "地点" + str(i + 1);
    let placeName = dataInputArr[place].name.value();
    if (placeName == "") {
      placeName = place;
      dataInputArr[place].edit.html("地点" + str(i + 1) + "のデータを編集");
    } else {
      dataInputArr[place].edit.html(placeName + "のデータを編集");
    }
    document.getElementById("placeDataInput" + str(i + 1)).onclick = function () {
      let win = window.open(
        "/simulations/3d-strata-generic/childWindow.html?" + placeName,
        "window_name",
        "width=1000,height=500"
      );
    };
  }
  // 平面データの設定を常に更新
  placeRefreshFunction();
  firstPlaceSelectFunction();
  secondPlaceSelectFunction();
  thirdPlaceSelectFunction();
}

// 平面を構成する１つ目の地点のデータに関連する処理
function firstPlaceSelectFunction() {
  let firstPlaceSelect = select("#firstPlaceSelect");
  let firstPlaceName = document.getElementById("firstPlaceName");
  firstPlaceName.innerHTML = firstPlaceSelect.value();
  let placeName = firstPlaceName.innerHTML;
  for (let key in dataInputArr) {
    if (dataInputArr[key].name.value() == placeName) {
      placeName = key;
    }
  }
  let trNum = document.getElementById("strataSelect").childElementCount;
  if (Object.keys(dataInputArr).length != 0 && placeName != "-") {
    let strataArr = dataInputArr[placeName].layer;
    for (let i = 0; i < trNum; i++) {
      let strataSelect = document.getElementById("select2-" + str(i + 1));
      while (strataSelect.childElementCount > 0) {
        strataSelect.remove(0);
      }
      let strataKind = select("#select1-" + str(i + 1)).value();
      let element = select("#select2-" + str(i + 1));
      for (let j = 0; j < strataArr.length; j++) {
        if (strataKind == strataArr[j][2]) {
          element.option(strataArr[j][0] + "m-" + strataArr[j][1] + "m");
        }
      }
    }
  } else {
    for (let i = 0; i < trNum; i++) {
      let strataSelect = document.getElementById("select2-" + str(i + 1));
      while (strataSelect.childElementCount > 0) {
        strataSelect.remove(0);
      }
    }
  }
}

// 平面を構成する２つ目の地点のデータに関連する処理
function secondPlaceSelectFunction() {
  let secondPlaceSelect = select("#secondPlaceSelect");
  let secondPlaceName = document.getElementById("secondPlaceName");
  secondPlaceName.innerHTML = secondPlaceSelect.value();
  let placeName = secondPlaceName.innerHTML;
  for (let key in dataInputArr) {
    if (dataInputArr[key].name.value() == placeName) {
      placeName = key;
    }
  }
  let trNum = document.getElementById("strataSelect").childElementCount;
  if (Object.keys(dataInputArr).length != 0 && placeName != "-") {
    let strataArr = dataInputArr[placeName].layer;
    for (let i = 0; i < trNum; i++) {
      let strataSelect = document.getElementById("select3-" + str(i + 1));
      while (strataSelect.childElementCount > 0) {
        strataSelect.remove(0);
      }
      let strataKind = select("#select1-" + str(i + 1)).value();
      let element = select("#select3-" + str(i + 1));
      for (let j = 0; j < strataArr.length; j++) {
        if (strataKind == strataArr[j][2]) {
          element.option(strataArr[j][0] + "m-" + strataArr[j][1] + "m");
        }
      }
    }
  } else {
    for (let i = 0; i < trNum; i++) {
      let strataSelect = document.getElementById("select3-" + str(i + 1));
      while (strataSelect.childElementCount > 0) {
        strataSelect.remove(0);
      }
    }
  }
}

// 平面を構成する３つ目の地点のデータに関連する処理
function thirdPlaceSelectFunction() {
  let thirdPlaceSelect = select("#thirdPlaceSelect");
  let thirdPlaceName = document.getElementById("thirdPlaceName");
  thirdPlaceName.innerHTML = thirdPlaceSelect.value();
  let placeName = thirdPlaceName.innerHTML;
  for (let key in dataInputArr) {
    if (dataInputArr[key].name.value() == placeName) {
      placeName = key;
    }
  }
  let trNum = document.getElementById("strataSelect").childElementCount;
  if (Object.keys(dataInputArr).length != 0 && placeName != "-") {
    let strataArr = dataInputArr[placeName].layer;
    for (let i = 0; i < trNum; i++) {
      let strataSelect = document.getElementById("select4-" + str(i + 1));
      while (strataSelect.childElementCount > 0) {
        strataSelect.remove(0);
      }
      let strataKind = select("#select1-" + str(i + 1)).value();
      let element = select("#select4-" + str(i + 1));
      for (let j = 0; j < strataArr.length; j++) {
        if (strataKind == strataArr[j][2]) {
          element.option(strataArr[j][0] + "m-" + strataArr[j][1] + "m");
        }
      }
    }
  } else {
    for (let i = 0; i < trNum; i++) {
      let strataSelect = document.getElementById("select4-" + str(i + 1));
      while (strataSelect.childElementCount > 0) {
        strataSelect.remove(0);
      }
    }
  }
}

// 平面を構成する地層の種類が変わったときの処理
function strataSelectFunction() {
  firstPlaceSelectFunction();
  secondPlaceSelectFunction();
  thirdPlaceSelectFunction();
}

// 平面を構成する地点を更新する処理
function placeRefreshFunction() {
  let firstPlaceSelect = select("#firstPlaceSelect");
  let secondPlaceSelect = select("#secondPlaceSelect");
  let thirdPlaceSelect = select("#thirdPlaceSelect");

  let firstPlaceSelectDoc = document.getElementById("firstPlaceSelect");
  let secondPlaceSelectDoc = document.getElementById("secondPlaceSelect");
  let thirdPlaceSelectDoc = document.getElementById("thirdPlaceSelect");

  while (firstPlaceSelectDoc.childElementCount > 0) {
    firstPlaceSelectDoc.remove(0);
  }
  while (secondPlaceSelectDoc.childElementCount > 0) {
    secondPlaceSelectDoc.remove(0);
  }
  while (thirdPlaceSelectDoc.childElementCount > 0) {
    thirdPlaceSelectDoc.remove(0);
  }
  firstPlaceSelect.option("-");
  secondPlaceSelect.option("-");
  thirdPlaceSelect.option("-");
  // 地点データの数
  let placeNum = Object.keys(dataInputArr).length;
  // データを編集するボタンのhtml要素を書き換える繰り返し
  for (let i = 0; i < placeNum; i++) {
    let place = "地点" + str(i + 1);
    let placeName = dataInputArr[place].name.value();
    if (placeName == "") {
      placeName = place;
    }
    firstPlaceSelect.option(placeName);
    secondPlaceSelect.option(placeName);
    thirdPlaceSelect.option(placeName);
  }
  firstPlaceSelectDoc.addEventListener("change", firstPlaceSelectFunction);
  secondPlaceSelectDoc.addEventListener("change", secondPlaceSelectFunction);
  thirdPlaceSelectDoc.addEventListener("change", thirdPlaceSelectFunction);
}

// 緯度経度、深さの最小値と最大値を計算する関数
function calculateValue() {
  let latitudeArr = [];
  let longitudeArr = [];
  let depthArr = [];
  for (let key in dataInputArr) {
    let value = dataInputArr[key];
    let data = value.data;
    let latitude = data.y.value();
    let longitude = data.x.value();
    if (latitude != "") {
      latitudeArr.push(latitude);
    } else {
      latitudeArr.push(0);
    }
    if (longitude != "") {
      longitudeArr.push(longitude);
    } else {
      longitudeArr.push(0);
    }
    let layer = value.layer;
    for (let i = 0; i < layer.length; i++) {
      depthArr.push(layer[i][0], layer[i][1]);
    }
  }
  return {
    x: {
      min: min(longitudeArr),
      max: max(longitudeArr),
    },
    y: {
      min: min(latitudeArr),
      max: max(latitudeArr),
    },
    z: {
      min: min(depthArr),
      max: max(depthArr),
    },
  };
}

//背景を設定する関数
function backgroundSetting(xMin, xMax, yMin, yMax, zMin, zMax) {
  background(240);
  strokeWeight(3);
  // x軸
  stroke(255, 0, 0);
  line(-500, 0, -500, 500, 0, -500);
  // z軸
  stroke(0, 255, 0);
  line(-500, 0, -500, -500, 500, -500);
  // y軸
  stroke(0, 0, 255);
  line(-500, 0, -500, -500, 0, 500);
  // 格子線
  smooth();
  strokeWeight(1);
  stroke(170, 150);
  fill(0);
  for (let x = 0; x <= 1000; x += 50) {
    line(x - 500, 0, -500, x - 500, 500, -500);
    line(x - 500, 0, -500, x - 500, 0, 500);
    line(x - 500, 0, 500, x - 500, 500, 500);
    if (x % 100 == 0) {
      push();
      translate(-500, 0, 500);
      let xMap = map(x, 0, 1000, float(xMin), float(xMax));
      if (xMin == xMax) xMap = x / 100;
      text(nf(xMap, 1, 4), x, -10);
      pop();
    }
  }
  push();
  translate(0, 0, 500);
  text("経度", 0, -50);
  pop();

  for (let z = 0; z <= 500; z += 50) {
    line(-500, z, -500, 500, z, -500);
    line(-500, z, -500, -500, z, 500);
    line(-500, z, 500, 500, z, 500);
    line(500, z, -500, 500, z, 500);
    if (z % 100 == 0) {
      push();
      translate(0, 0, -500);
      let zMap = map(z, 0, 500, zMin, zMax);
      if (zMin == zMax) zMap = z;
      text(nf(zMap, 1, 4), -500, z);
      pop();
    }
  }
  push();
  translate(0, 0, -500);
  text("深さ", -550, 250, 0);
  pop();
  for (let y = 0; y <= 1000; y += 50) {
    line(-500, 0, y - 500, 500, 0, y - 500);
    line(-500, 0, y - 500, -500, 500, y - 500);
    line(500, 0, y - 500, 500, 500, y - 500);
    if (y % 100 == 0) {
      push();
      let yMap = map(y, 1000, 0, yMin, yMax);
      if (yMin == yMax) yMap = (1000 - y) / 100;
      rotateY(PI / 2);
      translate(-y + 500, 0, 500);
      text(nf(yMap, 1, 4), 0, -10);
      pop();
    }
  }
  push();
  rotateY(PI / 2);
  translate(0, -50, 500);
  text("緯度", 0, -10);
  pop();
}

// ３点を結び平面を生成する関数
function createPlane1(x1, z1, y1, x2, z2, y2, x3, z3, y3) {
  beginShape();
  vertex(x1, y1, z1);
  vertex(x2, y2, z2);
  vertex(x3, y3, z3);
  endShape(CLOSE);
}

// ４点を結び平面を生成する関数
function createPlane2(x1, z1, y1, x2, z2, y2, x3, z3, y3, x4, z4, y4) {
  beginShape();
  vertex(x1, y1, z1);
  vertex(x2, y2, z2);
  vertex(x3, y3, z3);
  vertex(x4, y4, z4);
  endShape(CLOSE);
}

// 子ウィンドウからデータを取得するための関数
function submit(arr) {
  let name = arr[0];
  let dataArr = arr[1];
  for (let key in dataInputArr) {
    let placeName = dataInputArr[key].name.value();
    if (placeName == "") placeName = key;
    if (placeName == name) {
      dataInputArr[key].layer = dataArr;
    }
  }
}

// input済みの地層データを引き継ぐ関数
function loadLayers(placeName) {
  let arrKey = placeName;
  for (let key in dataInputArr) {
    let a = dataInputArr[key].name.value();
    if (a == arrKey) {
      arrKey = key;
    }
  }
  let value = dataInputArr[arrKey];
  let layers = value.layer;
  return layers;
}

// 方角を描画する関数
function drawDirMark(x, y) {
  push();
  rotateX(PI / 2);
  strokeWeight(1);
  stroke(0);
  line(x + 50, y, x - 50, y);
  line(x + 20, y - 50, x - 20, y - 50);
  line(x, y - 100, x, +y + 100);
  line(x, y - 100, x - 20, y - 50);
  text("東", x + 70, y + 8);
  text("西", x - 70, y + 8);
  text("南", x, y + 70 + 60);
  text("北", x, y - 70 - 40);
  pop();
}

// 地層の平面を描画する処理
function drawStrata(key, rotateTime, xMin, xMax, yMin, yMax, zMin, zMax) {
  let name = dataInputArr[key].name.value();
  if (name == "") name = key;
  let data = dataInputArr[key].data;
  let x = data.x.value();
  if (x == "") x = 0;
  x = map(x, xMin, xMax, -500, 500);
  let y = data.y.value();
  if (y == "") y = 0;
  y = map(y, yMin, yMax, 500, -500);
  let layer = dataInputArr[key].layer;
  noStroke();
  let zArr = [];
  for (let i = 0; i < layer.length; i++) {
    let z = layer[i][0];
    zArr.push(z);
    let zLength = layer[i][1] - layer[i][0];
    let kind = layer[i][2];
    if (kind == "砂岩層") fill(215, 205, 166, 200);
    if (kind == "泥岩層") fill(156, 154, 143, 200);
    if (kind == "れき岩層") fill(252, 180, 172, 200);
    if (kind == "石灰岩層") fill(120, 170, 170, 200);
    if (kind == "凝灰岩層・火山灰層") fill(200, 200, 200, 200);
    if (kind == "ローム層") fill(112, 58, 21, 200);
    if (kind == "その他の層") fill(0, 200);
    push();
    translate(x, map(z, zMin, zMax, 0, 500) + map(zLength, 0, zMax - zMin, 0, 500) / 2, y);
    box(50, map(zLength, 0, zMax - zMin, 0, 500), 50);
    translate(100, 10, 0);
    fill(0);
    text(kind, 0, 0);
    pop();
    fill(0);
    push();
    translate();
    text(kind, x, map(z, zMin, zMax, 0, 500) + map(zLength, 0, zMax - zMin, 0, 500) / 2);
    pop();
  }
  fill(0);
  push();
  translate(x, 0, y);
  rotateY(radians(rotateTime));
  if (min(zArr) < 0) {
    translate(0, map(min(zArr), zMin, zMax, 0, 500) - 25, 0);
  } else {
    translate(0, -25, 0);
  }
  text(name, 0, -55);
  fill(255, 0, 0);
  cone(10, 50, 10, 3, true);
  pop();
}
