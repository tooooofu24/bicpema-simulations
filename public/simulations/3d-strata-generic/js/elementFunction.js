// 地点データの追加ボタンを押した時に動く関数
function placeAddButtonFunction() {
  // 地点データの数
  let placeNum = Object.keys(dataInputArr).length;
  // 新しく生成する地点データの番号
  let newPlaceNum = placeNum + 1;
  // 新しく生成する地点データ入力オブジェクト
  let newDom = new DOM(newPlaceNum);
  // 新しく生成する地点名
  let placeName = "地点" + str(newPlaceNum);
  // 生成したオブジェクトを連想配列に登録
  dataInputArr[placeName] = { name: newDom.placeNameInput, data: { x: "", y: "" }, edit: "", layer: "" };
  dataInputArr[placeName]["data"]["x"] = newDom.xInput;
  dataInputArr[placeName]["data"]["y"] = newDom.yInput;
  dataInputArr[placeName]["edit"] = newDom.placeDataInput;
  // サブウィンドウを開く機構の付与
  document.getElementById("placeDataInput" + str(newPlaceNum)).onclick = function () {
    let win = window.open(
      "/simulations/3d-strata-generic/childWindow.html?" + placeName,
      "window_name",
      "width=1000,height=500"
    );
  };
  placeRefreshFunction();
}

// 地点データの削除ボタンを押した時に動く関数
function placeRemoveButtonFunction() {
  // 地点データの個数を取得
  let placeNum = Object.keys(dataInputArr).length;
  if (placeNum > 0) {
    select("#placeNameInput" + str(placeNum)).remove();
    select("#placeDataInput" + str(placeNum)).remove();
    delete dataInputArr["地点" + placeNum];
  }
  placeRefreshFunction();
}

// 平面を構成する地層の組を追加するボタンを押した時の処理
function strataAddButtonFunction() {
  let NextTrNum = document.getElementById("strataSelect").childElementCount + 1;
  let tr = createElement("tr")
    .parent("strataSelect")
    .id("tr-" + NextTrNum);
  let th = createElement("th", NextTrNum + "組目")
    .parent("tr-" + NextTrNum)
    .id("th-" + NextTrNum);
  let td1 = createElement("td")
    .parent("tr-" + NextTrNum)
    .id("td1-" + NextTrNum);
  let select1 = createSelect()
    .parent("td1-" + NextTrNum)
    .class("form-select")
    .id("select1-" + NextTrNum);
  let select1doc = document.getElementById("select1-" + NextTrNum);
  select1doc.addEventListener("change", strataSelectFunction);
  let strataArr = ["砂岩層", "泥岩層", "れき岩層", "石灰岩層", "凝灰岩層・火山灰層", "ローム層", "その他の層"];
  for (let i = 0; i < strataArr.length; i++) select1.option(strataArr[i]);
  let td2 = createElement("td")
    .parent("tr-" + NextTrNum)
    .id("td2-" + NextTrNum);
  let select2 = createSelect()
    .parent("td2-" + NextTrNum)
    .class("form-select")
    .id("select2-" + NextTrNum);
  let td3 = createElement("td")
    .parent("tr-" + NextTrNum)
    .id("td3-" + NextTrNum);
  let select3 = createSelect()
    .parent("td3-" + NextTrNum)
    .class("form-select")
    .id("select3-" + NextTrNum);
  let td4 = createElement("td")
    .parent("tr-" + NextTrNum)
    .id("td4-" + NextTrNum);
  let select4 = createSelect()
    .parent("td4-" + NextTrNum)
    .class("form-select")
    .id("select4-" + NextTrNum);
  firstPlaceSelectFunction();
  secondPlaceSelectFunction();
  thirdPlaceSelectFunction();
}

// 平面を構成する地層の組を削除するボタンを押した時の処理
function strataRemoveButtonFunction() {
  let strataSelect = document.getElementById("strataSelect");
  if (strataSelect.childElementCount > 0) strataSelect.removeChild(strataSelect.lastChild);
}
