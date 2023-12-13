var x, y, vx, vy, g, w, d, wa, ga, gb, r, wb, cha, ko, fps;
var x2, x3, x4, x5, y2, y3, y4, y5;
var i, n = 100;                     //ボールの個数
var start, reset, change, locus, radr;
let balls = [];

function setup() {
    createCanvas(750, 400);
    background(200);
    translate(250, 175);
    noStroke();
    fill(162, 231, 255, 230);
    ellipse(0, 0, 300, 300);
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
    translate(250, 175);
    if (start == true && locus == false) {
        noStroke();
        fill(162, 231, 255, 230);
        ellipse(0, 0, 300, 300);

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
            ellipse(x, y, 5, 5);
            if (locus == false) {
                ellipse(x2, y2, 5, 5);
                ellipse(x3, y3, 5, 5);
                ellipse(x4, y4, 5, 5);
                ellipse(x5, y5, 5, 5);
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
            ellipse(0, 0, 300, 300);
            fill(162, 231, 255, 230);
            ellipse(0, 0, 300, 300);
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
        } else if (x > 15 || y > 15) {                             //渦巻状に変化後の動作
            w += wb;
            d = dist(x, y, 0, 0);
            g = gb / d;
            vy = vy + g;
            y = y - vy;
        }
        else if (x <= 15 && y <= 15 && locus == false) {
            noStroke();
            fill(162, 231, 255, 230);
            ellipse(0, 0, 300, 300);
            fill(162, 231, 255, 230);
            ellipse(0, 0, 300, 300);
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
        if (x > 15 || y > 15) {
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
    ga = 20;//気圧傾度力
    gb = 20;
    ko = 5;
    wa = ko;//コリオリの力
}

function normalvalue() {
    x = 0;
    y = 125;
    vx = 0;
    vy = 5;
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
    textSize(17);
    textAlign(CENTER, CENTER);//文字の中央ぞろえ
    resetMatrix();
    stroke(0);
    fill(0, 0, 255);
    ellipse(612, 330, 55, 55);//startボタン
    fill(255);
    text("Start", 612, 330);
    fill(255, 0, 0);
    ellipse(687, 330, 55, 55);//resetボタン
    fill(255);
    text("Reset", 687, 330);
    fill(0, 255, 0);
    ellipse(650, 370, 50, 50);//一時停止ボタン
    fill(0);
    textSize(10);
    text("一時停止", 650, 370);
}

function korioribottans() {
    resetMatrix();
    textSize(10);
    stroke(0);
    fill(255);
    rect(575, 250, 150, 45);//コリオリの力ボックス
    fill(0);
    text("コリオリの力", 650, 260);


    fill(230);
    ellipse(600, 275, 30, 30);//コリオリの力あり
    fill(0);
    text("あり", 600, 275);

    fill(230);
    ellipse(700, 275, 30, 30);//コリオリの力なし
    fill(0);
    text("なし", 700, 275);
}

function kiatubottans() {
    resetMatrix();
    textSize(10);
    stroke(0);
    fill(255);
    rect(575, 180, 150, 60);//気圧傾度力ボックス
    fill(0);
    text("気圧傾度力", 650, 190);

    textSize(25);
    fill(230);
    ellipse(600, 217, 40, 40);//気圧傾度力小
    fill(0);
    text("小", 600, 217);

    fill(230);
    ellipse(650, 217, 40, 40);//気圧傾度力中
    fill(0);
    text("中", 650, 217);

    fill(230);
    ellipse(700, 217, 40, 40);//気圧傾度力大
    fill(0);
    text("大", 700, 217);
}

function numberbottans() { //雲の数
    resetMatrix();
    textSize(10);
    stroke(0);
    fill(255);
    rect(575, 105, 150, 70); //フレーム
    fill(230);
    rect(612, 125, 75, 20);  //表示ウィンドウ
    fill(255, 0, 0, 100);
    ellipse(597, 160, 25, 25);
    ellipse(632, 160, 25, 25);
    fill(0, 0, 255, 100);
    ellipse(667, 160, 25, 25);
    ellipse(702, 160, 25, 25);

    fill(0);
    textSize(10);
    text("雲の数", 650, 115);
    text(n, 650, 135);
    text("組", 700, 135);
    text("-10", 597, 160);
    text("-1", 632, 160);
    text("+1", 667, 160);
    text("+10", 702, 160);
}

function locusbottans() {
    resetMatrix();
    textSize(10);
    stroke(0);
    fill(255);
    rect(575, 55, 150, 45);//軌跡ボックス
    fill(0);
    text("雲の軌跡", 650, 65);


    fill(230);
    ellipse(600, 80, 30, 30);//軌跡あり
    fill(0);
    text("あり", 600, 80);

    fill(230);
    ellipse(700, 80, 30, 30);//軌跡なし
    fill(0);
    text("なし", 700, 80);
}

function framespeed() {
    resetMatrix();
    textSize(10);
    stroke(0);
    fill(255);
    rect(575, 5, 150, 45); //フレーム
    fill(230);
    rect(625, 10, 75, 15);  //表示ウィンドウ
    fill(255, 0, 0, 100);
    ellipse(597, 37, 20, 20);
    ellipse(632, 37, 20, 20);
    fill(0, 0, 255, 100);
    ellipse(667, 37, 20, 20);
    ellipse(702, 37, 20, 20);

    fill(0);
    textSize(8);
    text("描画速度", 600, 17);
    text(fps, 662, 17);
    text("fps", 712, 17);
    text("-10", 597, 37);
    text("-1", 632, 37);
    text("+1", 667, 37);
    text("+10", 702, 37);

}



function mousePressed() {    //マウスリック判定
    if (dist(mouseX, mouseY, 612, 330) < 27) {//start判定
        start = true;
        reset = false;
    }
    if (dist(mouseX, mouseY, 687, 330) < 27) {//reset判定
        reset = true;
        start = false;
    }
    if (dist(mouseX, mouseY, 650, 370) < 25) {//一時停止判定
        start = false;
    }

    if (dist(mouseX, mouseY, 600, 275) < 15) {//コリオリの力あり判定
        ko = 5;
        korioribottans();
        fill(0, 200, 100, 200);
        ellipse(600, 275, 30, 30);//コリオリの力あり
        fill(0);
        textSize(10);
        text("あり", 600, 275);
    }
    if (dist(mouseX, mouseY, 700, 275) < 15) {//コリオリの力なし判定
        wa = 0;
        korioribottans();
        fill(0, 200, 100, 200);
        ellipse(700, 275, 30, 30);//コリオリの力なし
        fill(0);
        textSize(10);
        text("なし", 700, 275);
    }
    if (dist(mouseX, mouseY, 600, 217) < 20) {//気圧傾度力小
        ga = 25;
        gb = 1;

        kiatubottans();
        fill(220, 255, 0, 200);
        ellipse(600, 217, 40, 40);//気圧傾度力小
        fill(0);
        textSize(25);
        text("小", 600, 217);
    }
    if (dist(mouseX, mouseY, 650, 217) < 20) {//気圧傾度力中
        ga = 20;
        gb = 20;

        kiatubottans();
        fill(220, 255, 0, 200);
        ellipse(650, 217, 40, 40);//気圧傾度力中
        fill(0);
        textSize(25);
        text("中", 650, 217);
    }
    if (dist(mouseX, mouseY, 700, 217) < 20) {//気圧傾度力大
        ga = 5;
        gb = 30;

        kiatubottans();
        fill(220, 255, 0, 200);
        ellipse(700, 217, 40, 40);//気圧傾度力大
        fill(0);
        textSize(25);
        text("大", 700, 217);
    }

    if (dist(mouseX, mouseY, 597, 160) < 12 && n >= 10) {//雲の数変更
        n += -10;
        resetMatrix();
        stroke(0);
        fill(230);
        rect(612, 125, 75, 20);
        fill(0);
        textSize(10);
        text(n, 650, 135);
        for (i = 0; i < n; i++) {
            balls[i] = new Ball(i);
        }

    }
    if (dist(mouseX, mouseY, 632, 160) < 12 && n >= 1) {
        n += -1;
        resetMatrix();
        stroke(0);
        fill(230);
        rect(612, 125, 75, 20);
        fill(0);
        textSize(10);
        text(n, 650, 135);
        for (i = 0; i < n; i++) {
            balls[i] = new Ball(i);
        }

    }
    if (dist(mouseX, mouseY, 667, 160) < 12 && n <= 99) {
        n += 1;
        resetMatrix();
        stroke(0);
        fill(230);
        rect(612, 125, 75, 20);
        fill(0);
        textSize(10);
        text(n, 650, 135);
        for (i = 0; i < n; i++) {
            balls[i] = new Ball(i);
        }

    }
    if (dist(mouseX, mouseY, 702, 160) < 12 && n <= 90) {
        n += 10;
        resetMatrix();
        stroke(0);
        fill(230);
        rect(612, 125, 75, 20);
        fill(0);
        textSize(10);
        text(n, 650, 135);
        for (i = 0; i < n; i++) {
            balls[i] = new Ball(i);
        }

    }

    if (dist(mouseX, mouseY, 600, 80) < 15) {//軌跡あり判定
        locus = true;
        locusbottans();
        fill(0, 200, 100, 200);
        ellipse(600, 80, 30, 30);//軌跡あり
        fill(0);
        textSize(10);
        text("あり", 600, 80);
    }
    if (dist(mouseX, mouseY, 700, 80) < 15) {//軌跡なし判定
        locus = false;
        locusbottans();
        fill(0, 200, 100, 200);
        ellipse(700, 80, 30, 30);//軌跡なし
        fill(0);
        textSize(10);
        text("なし", 700, 80);
    }

    if (dist(mouseX, mouseY, 597, 37) < 10 && n >= 10) {//描画速度増減
        fps += -10;
        frameRate(fps);
        resetMatrix();
        stroke(0);
        fill(230);
        rect(625, 10, 75, 15);
        fill(0);
        textSize(8);
        text(fps, 662, 17);
    }
    if (dist(mouseX, mouseY, 632, 37) < 10 && n >= 1) {
        fps += -1;
        frameRate(fps);
        resetMatrix();
        stroke(0);
        fill(230);
        rect(625, 10, 75, 15);
        fill(0);
        textSize(8);
        text(fps, 662, 17);
    }
    if (dist(mouseX, mouseY, 667, 37) < 10) {
        fps += 1;
        frameRate(fps);
        resetMatrix();
        stroke(0);
        fill(230);
        rect(625, 10, 75, 15);
        fill(0);
        textSize(8);
        text(fps, 662, 17);
    }
    if (dist(mouseX, mouseY, 702, 37) < 10) {
        fps += 10;
        frameRate(fps);
        resetMatrix();
        stroke(0);
        fill(230);
        rect(625, 10, 75, 15);
        fill(0);
        textSize(8);
        text(fps, 662, 17);
    }
}