// index.jsはメインのメソッドを呼び出すためのファイルです。

/////////////////////////// 以上の記述は不必要であれば削除してください。/////////////////////////////////

// preload関数
// setup関数よりも前に一度だけ呼び出される。
let img, let2; let images = []; let img3, img4, img5;
function preload() {
  font = loadFont("/assets/fonts/ZenMaruGothic-Regular.ttf");
  img = loadImage("/simulations/carbonate_mineral/炭酸塩鉱物.jpg")
  img2 = loadImage("/simulations/carbonate_mineral/初期構造 (2).png")
  img3 = loadImage("/simulations/carbonate_mineral/MgCO3.png")
  img4 = loadImage("/simulations/carbonate_mineral/CaCO3.png")
  img5 = loadImage("/simulations/carbonate_mineral/CaMg(CO3)2.png")

  images[0] = loadImage("/simulations/carbonate_mineral/MgCO3/1.1.gif") // 01,23,45,67      
  images[1] = loadImage("/simulations/carbonate_mineral/MgCO3/1.2.gif") // +8+16
  images[2] = loadImage("/simulations/carbonate_mineral/MgCO3/2.1.gif")
  images[3] = loadImage("/simulations/carbonate_mineral/MgCO3/2.2.gif")
  images[4] = loadImage("/simulations/carbonate_mineral/MgCO3/3.1.gif")
  images[5] = loadImage("/simulations/carbonate_mineral/MgCO3/3.2.gif")
  images[6] = loadImage("/simulations/carbonate_mineral/MgCO3/4.1.gif")
  images[7] = loadImage("/simulations/carbonate_mineral/MgCO3/4.2.gif")
  images[8] = loadImage("/simulations/carbonate_mineral/CaMgCO32/1.1.gif")
  images[9] = loadImage("/simulations/carbonate_mineral/CaMgCO32/1.2.gif")
  images[10] = loadImage("/simulations/carbonate_mineral/CaMgCO32/2.1.gif")
  images[11] = loadImage("/simulations/carbonate_mineral/CaMgCO32/2.2.gif")
  images[12] = loadImage("/simulations/carbonate_mineral/CaMgCO32/3.1.gif")
  images[13] = loadImage("/simulations/carbonate_mineral/CaMgCO32/3.2.gif")
  images[14] = loadImage("/simulations/carbonate_mineral/CaMgCO32/4.1.gif")
  images[15] = loadImage("/simulations/carbonate_mineral/CaMgCO32/4.2.gif")
  images[16] = loadImage("/simulations/carbonate_mineral/CaCO3/1.1.gif")
  images[17] = loadImage("/simulations/carbonate_mineral/CaCO3/1.2.gif")
  images[18] = loadImage("/simulations/carbonate_mineral/CaCO3/2.1.gif")
  images[19] = loadImage("/simulations/carbonate_mineral/CaCO3/2.2.gif")
  images[20] = loadImage("/simulations/carbonate_mineral/CaCO3/3.1.gif")
  images[21] = loadImage("/simulations/carbonate_mineral/CaCO3/3.2.gif")
  images[22] = loadImage("/simulations/carbonate_mineral/CaCO3/4.1.gif")
  images[23] = loadImage("/simulations/carbonate_mineral/CaCO3/4.2.gif")
}



// setup関数
// シミュレーションを実行する際に１度だけ呼び出される。
function setup() {
  settingInit();
  elementSelectInit();
  elementPositionInit();
  valueInit();
  image(img, 0, 0, width / 2.2, height / 2);
  image(img2, 0, height / 2, width / 2.2, height / 2);
}

// draw関数
// シミュレーションを実行した後、繰り返し呼び出され続ける
function draw() {
  scale(width / 1000);
  //background(0);
  // drawGraph();


  // ラジオボタンによる，ballのfillの制御
  push();
  if (radio.value() === "a.") {
    for (let i = 0; i < 2; i++) {
      if (i == 0) {
        image(images[i], 510 + 260 * i, 30, 1000 / 3.2, 1000 / 6.5)
        image(images[i + 8], 510 + 260 * i, 40 + 1000 / 6.5, 1000 / 3.2, 1000 / 6.5)
        image(images[i + 16], 510 + 260 * i, 50 + 1000 / 6.5 * 2, 1000 / 3.2, 1000 / 6.5)
        image(img5, 500, 30 + 1000 / 6.5, 1000 / 8, 1000 * 9 / 16 / 15);
        image(img3, 500, 10, 1000 / 10, 1000 * 10 / 16 / 15);
        image(img4, 500, 40 + 1000 / 6.5 * 2, 1000 / 10, 1000 * 10 / 16 / 15);

      } else {
        image(images[i], 1000 / 2 + 60 + 280 * i, 30, 1000 / 6.5, 1000 / 6.5)
        image(images[i + 8], 1000 / 2 + 60 + 280 * i, 40 + 1000 / 6.5, 1000 / 6.5, 1000 / 6.5)
        image(images[i + 16], 1000 / 2 + 60 + 280 * i, 50 + 1000 / 6.5 * 2, 1000 / 6.5, 1000 / 6.5)
      }
    }

  } else if (radio.value() === "b.") {
    for (let i = 0; i < 2; i++) {
      if (i == 0) {
        image(images[i + 2], 510 + 260 * i, 30, 1000 / 3.2, 1000 / 6.5)
        image(images[i + 2 + 8], 510 + 260 * i, 40 + 1000 / 6.5, 1000 / 3.2, 1000 / 6.5)
        image(images[i + 2 + 16], 510 + 260 * i, 50 + 1000 / 6.5 * 2, 1000 / 3.2, 1000 / 6.5)
        image(img5, 500, 30 + 1000 / 6.5, 1000 / 8, 1000 * 9 / 16 / 15);
        image(img3, 500, 10, 1000 / 10, 1000 * 10 / 16 / 15);
        image(img4, 500, 40 + 1000 / 6.5 * 2, 1000 / 10, 1000 * 10 / 16 / 15);
      } else {
        image(images[i + 2], 1000 / 2 + 60 + 280 * i, 30, 1000 / 6.5, 1000 / 6.5)
        image(images[i + 2 + 8], 1000 / 2 + 60 + 280 * i, 40 + 1000 / 6.5, 1000 / 6.5, 1000 / 6.5)
        image(images[i + 2 + 16], 1000 / 2 + 60 + 280 * i, 50 + 1000 / 6.5 * 2, 1000 / 6.5, 1000 / 6.5)
      }
    }
  } else if (radio.value() === "c.") {
    for (let i = 0; i < 2; i++) {
      if (i == 0) {
        image(images[i + 4], 510 + 260 * i, 30, 1000 / 3.2, 1000 / 6.5)
        image(images[i + 4 + 8], 510 + 260 * i, 40 + 1000 / 6.5, 1000 / 3.2, 1000 / 6.5)
        image(images[i + 4 + 16], 510 + 260 * i, 50 + 1000 / 6.5 * 2, 1000 / 3.2, 1000 / 6.5)
        image(img5, 500, 30 + 1000 / 6.5, 1000 / 8, 1000 * 9 / 16 / 15);
        image(img3, 500, 10, 1000 / 10, 1000 * 10 / 16 / 15);
        image(img4, 500, 40 + 1000 / 6.5 * 2, 1000 / 10, 1000 * 10 / 16 / 15);
      } else {
        image(images[i + 4], 1000 / 2 + 60 + 280 * i, 30, 1000 / 6.5, 1000 / 6.5)
        image(images[i + 4 + 8], 1000 / 2 + 60 + 280 * i, 40 + 1000 / 6.5, 1000 / 6.5, 1000 / 6.5)
        image(images[i + 4 + 16], 1000 / 2 + 60 + 280 * i, 50 + 1000 / 6.5 * 2, 1000 / 6.5, 1000 / 6.5)
      }
    }
  } else if (radio.value() === "d.") {
    for (let i = 0; i < 2; i++) {
      if (i == 0) {
        image(images[i + 6], 510 + 260 * i, 30, 1000 / 3.2, 1000 / 6.5)
        image(images[i + 6 + 8], 510 + 260 * i, 40 + 1000 / 6.5, 1000 / 3.2, 1000 / 6.5)
        image(images[i + 6 + 16], 510 + 260 * i, 50 + 1000 / 6.5 * 2, 1000 / 3.2, 1000 / 6.5)
        image(img5, 500, 30 + 1000 / 6.5, 1000 / 8, 1000 * 9 / 16 / 15);
        image(img3, 500, 10, 1000 / 10, 1000 * 10 / 16 / 15);
        image(img4, 500, 40 + 1000 / 6.5 * 2, 1000 / 10, 1000 * 10 / 16 / 15);
      } else {
        image(images[i + 6], 1000 / 2 + 60 + 280 * i, 30, 1000 / 6.5, 1000 / 6.5)
        image(images[i + 6 + 8], 1000 / 2 + 60 + 280 * i, 40 + 1000 / 6.5, 1000 / 6.5, 1000 / 6.5)
        image(images[i + 6 + 16], 1000 / 2 + 60 + 280 * i, 50 + 1000 / 6.5 * 2, 1000 / 6.5, 1000 / 6.5)
      }
    }
  } else { }

  pop();







  deviceJudge.rotateInstruction();
}

// windowResized関数
// シミュレーションを利用しているデバイスの画面サイズが変わった際に呼び出される。
function windowResized() {
  canvasController.resizeScreen();
  elementPositionInit();
}
