///全画面表示
function fullScreen() {
  let p5Canvas = select("#p5Canvas")
  let canvas = createCanvas(windowWidth / 2, 9 * windowHeight / 20, WEBGL)
  canvas.parent(p5Canvas)
}

// DOM要素の生成
function elCreate() {
}

// 初期値やシミュレーションの設定
function initValue() {
}

let coordinateArr = []
// setup関数
function setup() {
  fullScreen()
  elCreate()
  initValue()
  for (let i = 0; i < 200; i++) {
    coordinateArr.push([random(-180, 180), random(-180, 180), random(-180, 180)])
  }
}

// draw関数
function draw() {
  orbitControl(1)
  background(0);
  noStroke()
  fill(200, 200, 0)
  sphere(20)
  stroke(255)
  strokeWeight(0.5)
  for (i = 0; i < 200; i++) {
    push()
    rotateX(radians(coordinateArr[i][0]))
    rotateY(radians(coordinateArr[i][1]))
    rotateZ(radians(coordinateArr[i][2]))
    line(-400, 0, 0, 400, 0, 0)
    pop()
  }

  strokeWeight(7.5)
  stroke(100, 100, 100, 10)
  push()
  rotateY(PI / 2)
  for (let x = -50; x <= 50; x += 3) {
    for (let y = -50; y <= 50; y += 3) {
      if (abs(sq(x) + sq(y)) <= 40000) {
        let z1 = sqrt(10000 - sq(x) - sq(y))
        point(x, y, z1)
        point(x, y, z1 + 75)
        point(x, y, z1 + 150)
      }
    }
  }
  pop()
}

// windowがリサイズされたときの処理
function windowResized() {
  fullScreen()
  initValue()
}
