// class.jsはクラス管理専用のファイルです。

// クラスの定義方法の例
// class ExampleClass{
//     constructor(p1,p2){
//         this.property1 =p1;
//         this.property2 =p2;
//     }
//     exampleMethod(){
//         this.property1 += this.property2
//     }
// }

/////////////////////////// 以上の記述は不必要であれば削除してください。/////////////////////////////////

// 以下にクラスを定義してください。

class Ball {
  constructor(x, y) {
    this.posX = x;
    this.posY = y;
    this.speedX = 0;
    this.speedY = 0;
  }
  update(slopeHeight) {
    const TAN = (slopeHeight * 50) / 350;
    const THETA = atan(TAN);
    // this.speedX += gravity * sin(THETA) * cos(THETA);
    // this.speedY += gravity * sin(THETA) * sin(THETA);
    // this.posX += this.speedX / FPS;
    // this.posY += this.speedY / FPS;
    console.log(this.posX, this.posY);
  }
  draw() {
    ellipse(this.posX, this.posY, 25, 25);
  }
}
