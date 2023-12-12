var x, y, vx, vy, g, w, d, wa, ga, gb, r, wb, cha, ko, fps;
var x2, x3, x4, x5, y2, y3, y4, y5;
var i, n = 100;                     //ボールの個数
var start, reset, change, locus, radr;
let balls = [];

function setup() {
    createCanvas(1500, 800);
    background(200);
    translate(500, 350);
    noStroke();
    fill(162, 231, 255, 230);
    ellipse(0, 0, 600, 600);
    for (i = 0; i < n; i++) {
        balls[i] = new Ball(i);
    }
    initialvalue();
    normalvalue();
    bottans();
    korioribottans();
    kiatubottans();
    numberbottans();
    locusbottans();
    framespeed();
    frameRate(fps);
}

function draw() {
    translate(500, 350);
    if (start == true && locus == false) {
        noStroke();
        fill(162, 231, 255, 230);
        ellipse(0, 0, 600, 600);

    }

    if (wa == ko) {                                             //コリオリの力あり
        move();
        allspin();
    } else if (wa == 0) {                                           //コリオリの力なし
        notcori();
    }

    for (i = 0; i < n; i++) {

        balls[i].spin();                        //複数のボールを回転させて配置
        balls[i].display();                     //ボールの描写
        balls[i].resetbottan();                 //リセット機能
    }
}

class Ball {
    constructor(radr) {
        this.r = radr;
    }



    spin() {
        rotate(-this.r * 2 * PI / n);
    }

    display() {
        if (start == true) {
            fill(255);
            noStroke();
            ellipse(x, y, 10, 10);
            if (locus == false) {
                ellipse(x2, y2, 10, 10);
                ellipse(x3, y3, 10, 10);
                ellipse(x4, y4, 10, 10);
                ellipse(x5, y5, 10, 10);
            }
            stroke(0);
            rotate(this.r * 2 * PI / n);
        }
    }

    resetbottan() {      //リセット動作
        if (reset == true) {
            initialvalue();
            normalvalue();
            noStroke();
            fill(162, 231, 255, 255);
            ellipse(0, 0, 600, 600);
            fill(162, 231, 255, 230);
            ellipse(0, 0, 600, 600);
            kiatubottans();
            korioribottans();
            numberbottans();
            locusbottans();
            framespeed();
        }
    }
}



function move() {
    if (start == true) {
        x5 = x4 - (y5 - y4) * cos(w * PI / 180);
        y5 = y4;
        x4 = x3 - (y4 - y3) * cos(w * PI / 180);
        y4 = y3;
        x3 = x2 - (y3 - y2) * cos(w * PI / 180);
        y3 = y2;
        x2 = x - (y2 - y) * cos(w * PI / 180);
        y2 = y;

        if (x > 1 || y > 1 && vy > 0 && change == true) {                   //初期コリオリ y速度の減少と回転角度の増加


            w += wb;
            wb = wb + 0.3;
            d = dist(x, y, 0, 0);
            g = ga / d;
            vy = vy - g;
            y = y - vy;
            if (vy < 2) {
                change = false;
            }
        } else if (x > 30 || y > 30) {                             //渦巻状に変化後の動作
            w += wb;
            d = dist(x, y, 0, 0);
            g = gb / d;
            vy = vy + g;
            y = y - vy;
        }
        else if (x <= 30 && y <= 30 && locus == false) {
            noStroke();
            fill(162, 231, 255, 230);
            ellipse(0, 0, 600, 600);
            fill(162, 231, 255, 230);
            ellipse(0, 0, 600, 600);
            normalvalue();
            start = true;
        }
    }
}


function allspin() {
    rotate(-w * PI / 180);
}

function notcori() {
    if (start == true) {
        if (x > 30 || y > 30) {
            d = dist(x, y, 0, 0);
            g = gb / d;
            vy = vy + g;
            y = y - (vy / 2);
        }
    }
}

function initialvalue() {  //初期値設定
    n = 16;
    fps = 20;
    ga = 80;//気圧傾度力
    gb = 80;
    ko = 5;
    wa = ko;//コリオリの力
}

function normalvalue() {
    x = 0;
    y = 250;
    vx = 0;
    vy = 10;
    w = 0;
    d = 0;
    g = 0;
    wb = 0;
    start = false;
    reset = false;
    change = true;
    locus = true;
    x2 = 10000;
    x3 = 10000;
    x4 = 10000;
    x5 = 10000;
    y2 = 10000;
    y3 = 10000;
    y4 = 10000;
    y5 = 10000;
}





function bottans() {              //ボタンの生成
    textFont("Meiryo");
    textSize(35);
    textAlign(CENTER, CENTER);//文字の中央ぞろえ
    resetMatrix();
    stroke(0);
    fill(0, 0, 255);
    ellipse(1225, 660, 110, 110);//startボタン
    fill(255);
    text("Start", 1225, 660);
    fill(255, 0, 0);
    ellipse(1375, 660, 110, 110);//resetボタン
    fill(255);
    text("Reset", 1375, 660);
    fill(0, 255, 0);
    ellipse(1300, 740, 100, 100);//一時停止ボタン
    fill(0);
    textSize(20);
    text("一時停止", 1300, 740);
}

function korioribottans() {
    resetMatrix();
    textSize(20);
    stroke(0);
    fill(255);
    rect(1150, 500, 300, 90);//コリオリの力ボックス
    fill(0);
    text("コリオリの力", 1300, 520);


    fill(230);
    ellipse(1200, 550, 60, 60);//コリオリの力あり
    fill(0);
    text("あり", 1200, 550);

    fill(230);
    ellipse(1400, 550, 60, 60);//コリオリの力なし
    fill(0);
    text("なし", 1400, 550);
}

function kiatubottans() {
    resetMatrix();
    textSize(20);
    stroke(0);
    fill(255);
    rect(1150, 360, 300, 120);//気圧傾度力ボックス
    fill(0);
    text("気圧傾度力", 1300, 380);

    textSize(50);
    fill(230);
    ellipse(1200, 435, 80, 80);//気圧傾度力小
    fill(0);
    text("小", 1200, 435);

    fill(230);
    ellipse(1300, 435, 80, 80);//気圧傾度力中
    fill(0);
    text("中", 1300, 435);

    fill(230);
    ellipse(1400, 435, 80, 80);//気圧傾度力大
    fill(0);
    text("大", 1400, 435);
}

function numberbottans() { //雲の数
    resetMatrix();
    textSize(20);
    stroke(0);
    fill(255);
    rect(1150, 210, 300, 140); //フレーム
    fill(230);
    rect(1225, 250, 150, 40);  //表示ウィンドウ
    fill(255, 0, 0, 100);
    ellipse(1195, 320, 50, 50);
    ellipse(1265, 320, 50, 50);
    fill(0, 0, 255, 100);
    ellipse(1335, 320, 50, 50);
    ellipse(1405, 320, 50, 50);

    fill(0);
    textSize(20);
    text("雲の数", 1300, 230);
    text(n, 1300, 270);
    text("組", 1400, 270);
    text("-10", 1195, 320);
    text("-1", 1265, 320);
    text("+1", 1335, 320);
    text("+10", 1405, 320);
}

function locusbottans() {
    resetMatrix();
    textSize(20);
    stroke(0);
    fill(255);
    rect(1150, 110, 300, 90);//軌跡ボックス
    fill(0);
    text("雲の軌跡", 1300, 130);


    fill(230);
    ellipse(1200, 160, 60, 60);//軌跡あり
    fill(0);
    text("あり", 1200, 160);

    fill(230);
    ellipse(1400, 160, 60, 60);//軌跡なし
    fill(0);
    text("なし", 1400, 160);
}

function framespeed() {
    resetMatrix();
    textSize(20);
    stroke(0);
    fill(255);
    rect(1150, 10, 300, 90); //フレーム
    fill(230);
    rect(1250, 20, 150, 30);  //表示ウィンドウ
    fill(255, 0, 0, 100);
    ellipse(1195, 75, 40, 40);
    ellipse(1265, 75, 40, 40);
    fill(0, 0, 255, 100);
    ellipse(1335, 75, 40, 40);
    ellipse(1405, 75, 40, 40);

    fill(0);
    textSize(20);
    text("描画速度", 1200, 35);
    text(fps, 1325, 35);
    text("fps", 1425, 35);
    text("-10", 1195, 75);
    text("-1", 1265, 75);
    text("+1", 1335, 75);
    text("+10", 1405, 75);

}



function mousePressed() {    //マウスリック判定
    if (dist(mouseX, mouseY, 1225, 660) < 55) {//start判定
        start = true;
        reset = false;
    }
    if (dist(mouseX, mouseY, 1375, 660) < 55) {//reset判定
        reset = true;
        start = false;
    }
    if (dist(mouseX, mouseY, 1300, 740) < 50) {//一時停止判定
        start = false;
    }

    if (dist(mouseX, mouseY, 1200, 550) < 30) {//コリオリの力あり判定
        ko = 5;
        korioribottans();
        fill(0, 200, 100, 200);
        ellipse(1200, 550, 60, 60);//コリオリの力あり
        fill(0);
        textSize(20);
        text("あり", 1200, 550);
    }
    if (dist(mouseX, mouseY, 1400, 550) < 30) {//コリオリの力なし判定
        wa = 0;
        korioribottans();
        fill(0, 200, 100, 200);
        ellipse(1400, 550, 60, 60);//コリオリの力なし
        fill(0);
        textSize(20);
        text("なし", 1400, 550);
    }
    if (dist(mouseX, mouseY, 1200, 435) < 40) {//気圧傾度力小
        ga = 150;
        gb = 10;

        kiatubottans();
        fill(220, 255, 0, 200);
        ellipse(1200, 435, 80, 80);//気圧傾度力小
        fill(0);
        textSize(50);
        text("小", 1200, 435);
    }
    if (dist(mouseX, mouseY, 1300, 435) < 40) {//気圧傾度力中
        ga = 80;
        gb = 80;

        kiatubottans();
        fill(220, 255, 0, 200);
        ellipse(1300, 435, 80, 80);//気圧傾度力中
        fill(0);
        textSize(50);
        text("中", 1300, 435);
    }
    if (dist(mouseX, mouseY, 1400, 435) < 40) {//気圧傾度力大
        ga = 20;
        gb = 120;

        kiatubottans();
        fill(220, 255, 0, 200);
        ellipse(1400, 435, 80, 80);//気圧傾度力大
        fill(0);
        textSize(50);
        text("大", 1400, 435);
    }

    if (dist(mouseX, mouseY, 1195, 320) < 25 && n >= 10) {//雲の数変更
        n += -10;
        resetMatrix();
        stroke(0);
        fill(230);
        rect(1225, 250, 150, 40);
        fill(0);
        textSize(20);
        text(n, 1300, 270);
        for (i = 0; i < n; i++) {
            balls[i] = new Ball(i);
        }

    }
    if (dist(mouseX, mouseY, 1265, 320) < 25 && n >= 1) {
        n += -1;
        resetMatrix();
        stroke(0);
        fill(230);
        rect(1225, 250, 150, 40);
        fill(0);
        textSize(20);
        text(n, 1300, 270);
        for (i = 0; i < n; i++) {
            balls[i] = new Ball(i);
        }

    }
    if (dist(mouseX, mouseY, 1335, 320) < 25 && n <= 99) {
        n += 1;
        resetMatrix();
        stroke(0);
        fill(230);
        rect(1225, 250, 150, 40);
        fill(0);
        textSize(20);
        text(n, 1300, 270);
        for (i = 0; i < n; i++) {
            balls[i] = new Ball(i);
        }

    }
    if (dist(mouseX, mouseY, 1405, 320) < 25 && n <= 90) {
        n += 10;
        resetMatrix();
        stroke(0);
        fill(230);
        rect(1225, 250, 150, 40);
        fill(0);
        textSize(20);
        text(n, 1300, 270);
        for (i = 0; i < n; i++) {
            balls[i] = new Ball(i);
        }

    }

    if (dist(mouseX, mouseY, 1200, 160) < 30) {//軌跡あり判定
        locus = true;
        locusbottans();
        fill(0, 200, 100, 200);
        ellipse(1200, 160, 60, 60);//コリオリの力あり
        fill(0);
        textSize(20);
        text("あり", 1200, 160);
    }
    if (dist(mouseX, mouseY, 1400, 160) < 30) {//軌跡なし判定
        locus = false;
        locusbottans();
        fill(0, 200, 100, 200);
        ellipse(1400, 160, 60, 60);//コリオリの力なし
        fill(0);
        textSize(20);
        text("なし", 1400, 160);
    }

    if (dist(mouseX, mouseY, 1195, 75) < 20 && n >= 10) {//描画速度増減
        fps += -10;
        frameRate(fps);
        resetMatrix();
        stroke(0);
        fill(230);
        rect(1250, 20, 150, 30);
        fill(0);
        textSize(20);
        text(fps, 1325, 35);
    }
    if (dist(mouseX, mouseY, 1265, 75) < 20 && n >= 1) {
        fps += -1;
        frameRate(fps);
        resetMatrix();
        stroke(0);
        fill(230);
        rect(1250, 20, 150, 30);
        fill(0);
        textSize(20);
        text(fps, 1325, 35);
    }
    if (dist(mouseX, mouseY, 1335, 75) < 20) {
        fps += 1;
        frameRate(fps);
        resetMatrix();
        stroke(0);
        fill(230);
        rect(1250, 20, 150, 30);
        fill(0);
        textSize(20);
        text(fps, 1325, 35);
    }
    if (dist(mouseX, mouseY, 1405, 75) < 20) {
        fps += 10;
        frameRate(fps);
        resetMatrix();
        stroke(0);
        fill(230);
        rect(1250, 20, 150, 30);
        fill(0);
        textSize(20);
        text(fps, 1325, 35);
    }
}