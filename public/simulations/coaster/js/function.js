// function.jsはその他のメソッド管理専用のファイルです。

// メソッドの定義方法の例
// function exampleMethod() {
//   console.log("これは例です。");
// }

/////////////////////////// 以上の記述は不必要であれば削除してください。/////////////////////////////////

// 以下にその他のメソッドを定義してください。

setBackground = (slopeHeight, diameter) => {
  noStroke();

  // 地面の描画
  // 画面の幅は1000、画面の高さは(1000 * 9) / 16から位置を計算

  fill(0);
  rect(0, ground, 1000, 50);

  // 坂の描画
  triangle(50, ground, 400, ground, 50, ground - 50 * slopeHeight);

  // 曲線の描画
  fill(0);
  rect(700, ground - (diameter + 1) * 50, 300, (diameter + 1) * 50);
  fill(255);
  arc(700, ground - (diameter * 50) / 2, diameter * 50, diameter * 50, -PI / 2, PI / 2);
};

drawScale = () => {
  let ground = (1000 * 9) / 16 - 50;
  stroke(0);
  fill(255);
  rect(0, 0, 50, ground);
  fill(0);
  for (let i = 50; i < ground; i += 50) {
    line(25, ground - i, 50, ground - i);
    text(i / 50, 15, ground - i);
  }
};

test = () => {
  line(400, 0, 400, 1000);
  line(700, 0, 700, 1000);
};
