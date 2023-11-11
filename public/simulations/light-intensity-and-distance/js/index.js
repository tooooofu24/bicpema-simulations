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
    for (let i = 0; i < 150; i++) {
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
    strokeWeight(0.3)
    for (i = 0; i < 150; i++) {
        push()
        rotateX(radians(coordinateArr[i][0]))
        rotateY(radians(coordinateArr[i][1]))
        rotateZ(radians(coordinateArr[i][2]))
        line(-400, 0, 0, 400, 0, 0)
        pop()
    }

    strokeWeight(5)
    stroke(100, 100, 100,10)
    push()
    rotateY(PI/2)
    for (let x = -50; x <= 50; x += 1) {
        for (let y = -50; y <= 50; y += 1) {
            if (abs(sq(x) + sq(y)) <= 40000) {
                let z1 = sqrt(10000 - sq(x) - sq(y))
                point(x, y, z1)
                point(x, y, z1+75)
                point(x, y, z1+150)
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


class LineBreakTransformer {
    constructor() {
      this.chunks = "";
    }

    transform(chunk, controller) {
      this.chunks += chunk;
      const lines = this.chunks.split("\r\n");
      this.chunks = lines.pop();
      lines.forEach((line) => controller.enqueue(line));
    }

    flush(controller) {
      controller.enqueue(this.chunks);
    }
}

const ctx = document.getElementById("myChart").getContext("2d");

let chart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [
      {
        label: 'name',
        borderColor: 'rgb(200, 50, 50)',
        backgroundColor: 'rgba(200, 50, 50, 0.2)',
        data: [],
      }
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            delay: 500,
          },
        },
      ],
    },
  },
});

async function onStartButtonClick() {
  try {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });

    while (port.readable) {
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable
      .pipeThrough(new TransformStream(new LineBreakTransformer()))
      .getReader();

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            console.log("Canceled");
            break;
          }
          console.log(value);

          if(value.slice(0,1)==="name") {
            chart.data.datasets[1].data.push({
              x: Date.now(),
              y: value.slice(1),
            });
          }
          chart.update({
            preservation: true,
          });
        }
      } catch (error) {
        console.log("Error: Read");
        console.log(error);
      } finally {
        reader.releaseLock();
      }
    }
  } catch (error) {
    console.log("Error: Open");
    console.log(error);
  }
}