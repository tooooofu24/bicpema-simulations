var x0, y0, x, y, xx, yy, xr, xr2, xr3, xr4, yr, yr2, yr3, yr4, r, v, vv, vx, vy, s, w, wv, ww, x1, y1, xk, yk, R, d;
var locate, way, start, reset;
function setup() {
    createCanvas(750, 400);
    background(150);
    initialvalue();
    bottans();
    spinwaybottans();
    spinspeedbottans();
    speedbottans();
    firstdisplay();
}

function draw() {
    if (start == true) {
        if (d <= r) {
            move();
            display();
        }
    }
    resetbottan();
}

function initialvalue() {

    x0 = 150;                        //左側の円の中心x座標
    y0 = 150;                        //左側の円の中心y座標
    x = 150;                         //左側直進する球の初期x
    xx = 200;
    y = 275;                         //左側直進する球の初期y
    yy = 325;
    r = 125;                         //左側円の半径
    xr = x0;                         //左側回転する球の初期x
    yr = r + y0;                       //左側回転する球の初期y

    x1 = 450;                        //右側円の中心x
    y1 = 150;                        //右側円の中心y
    xk = x1;                         //右側コリオリ球の初期x
    yk = r + y1;                       //右側コリオリ球の初期y

    vv = 0;                          //表示する速さ
    v = vv / 20;                       //直進する球の速さ
    s = 0;                           //回転角
    wv = 0;                          //表示する回転の速さ
    ww = -1;
    w = ww * wv / 20;                     //回転の速さ
    d = dist(x, y, x0, y0);


    frameRate(20);

    locate = true;
    way = false;
    start = false;
    reset = false;
}

function firstdisplay() {
    fill(255);
    noStroke();
    ellipse(150, 150, 2 * r, 2 * r);       //左側の円
    stroke(0);
    ellipse(450, 150, 2 * r, 2 * r);       //右側の円
    stroke(255, 0, 0);
    xr = r * sin(0) + x0;                                //台の回転
    yr = r * cos(0) + y0;
    xr2 = r * sin(PI / 2) + x0;
    yr2 = r * cos(PI / 2) + y0;
    xr3 = r * sin(PI) + x0;
    yr3 = r * cos(PI) + y0;
    xr4 = r * sin(3 * PI / 2) + x0;
    yr4 = r * cos(3 * PI / 2) + y0;
    line(xr, yr, x0, y0);              //左側十字
    stroke(0, 0, 255);
    line(xr2, yr2, x0, y0);
    stroke(0, 255, 0);
    line(xr3, yr3, x0, y0);
    stroke(0);
    line(xr4, yr4, x0, y0);
    stroke(0, 0, 255);
    line(x1, y1, x1 + r, y1);           //右側十字
    stroke(0, 255, 0);
    line(x1, y1, x1, y1 - r);
    stroke(0);
    line(x1, y1, x1 - r, y1);
    stroke(255, 0, 0);
    line(x1, y1, x1, y1 + r);
    stroke(0);

    line(150 - r, 300, 150 + r, 300);     //サイズ感
    line(150 - r, 290, 150 - r, 310);
    line(150 + r, 290, 150 + r, 310);
    text("500m", 150, 315);
}

function display() {
    noStroke();
    fill(150);
    rect(0, 0, 300, 300);           //左側リセット
    fill(255);
    ellipse(x0, y0, 2 * r, 2 * r);     //新規左円

    stroke(255, 0, 0);
    line(xr, yr, x0, y0);              //左側十字
    stroke(0, 0, 255);
    line(xr2, yr2, x0, y0);
    stroke(0, 255, 0);
    line(xr3, yr3, x0, y0);
    stroke(0);
    line(xr4, yr4, x0, y0);

    ellipse(x, y, 10, 10);          //左側直進する球
    ellipse(xk, yk, 10, 10);        //右側コリオリによる球の働き

}

function move() {                                       //球の動きの制御
    xr = r * sin(s) + x0;                                //台の回転
    yr = r * cos(s) + y0;
    xr2 = r * sin(s + PI / 2) + x0;
    yr2 = r * cos(s + PI / 2) + y0;
    xr3 = r * sin(s + PI) + x0;
    yr3 = r * cos(s + PI) + y0;
    xr4 = r * sin(s + 3 * PI / 2) + x0;
    yr4 = r * cos(s + 3 * PI / 2) + y0;

    xk = (x - x0) * cos(s) - (y - y0) * sin(s) + x1;              //コリオリの力による球の動きの制御
    yk = (x - x0) * sin(s) + (y - y0) * cos(s) + y1;


    x = x + vx;
    y = y + vy;

    w = ww * wv / 20;
    s = s + w;                                         //回転速度の制御

    d = dist(x, y, x0, y0);
}

function resetbottan() {                            //リセット動作
    if (reset == true) {
        background(150);
        initialvalue();
        bottans();
        spinwaybottans();
        spinspeedbottans();
        speedbottans();
        move();
        firstdisplay();
    }
}

function mousePressed() {                           //マウスクリック判定
    if (locate == true && dist(mouseX, mouseY, x0, y0) <= r) {        //直進する玉スタート地点決定
        x = mouseX;
        y = mouseY;

        fill(255);
        ellipse(x, y, 10, 10);
        locate = false;
        way = true;
        d = dist(x, y, x0, y0);
    }
    else if (way == true && dist(mouseX, mouseY, x0, y0) <= r) {     //直進する玉の方向性決定
        xx = mouseX;
        yy = mouseY;
        R = dist(xx, yy, x, y);
        v = vv / 20;
        vx = (xx - x) * v / R;
        vy = (yy - y) * v / R;
        stroke(255, 0, 0);
        strokeWeight(5);
        line((xx - x) * 20 / R + x, (yy - y) * 20 / R + y, x, y);
        translate((xx - x) * 10 / R + x, (yy - y) * 10 / R + y);
        rotate(atan2(yy - y, xx - x) + PI / 2);
        line(5, 0, 0, -10);
        line(-5, 0, 0, -10);
        stroke(0);
        strokeWeight(1);
        resetMatrix();
        way = false;
    }

    if (dist(mouseX, mouseY, 625, 300) < 37) {//start判定
        start = true;
        reset = false;
    }
    if (dist(mouseX, mouseY, 700, 300) < 37) {//reset判定
        reset = true;
        start = false;
    }
    if (dist(mouseX, mouseY, 662, 375) < 32) {//一時停止判定
        start = false;
    }

    //球の速度変化
    if (dist(mouseX, mouseY, 616, 105) < 12) {
        vv += -10;
        v = vv / 20;
        vx = (xx - x) * v / R;
        vy = (yy - y) * v / R;
        fill(230);
        rect(637, 70, 50, 20);
        fill(0);
        textSize(10);
        text(vv, 662, 80);
    }
    if (dist(mouseX, mouseY, 647, 105) < 12) {
        vv += -1;
        v = vv / 20;
        vx = (xx - x) * v / R;
        vy = (yy - y) * v / R;
        fill(230);
        rect(637, 70, 50, 20);
        fill(0);
        textSize(10);
        text(vv, 662, 80);
    }
    if (dist(mouseX, mouseY, 678, 105) < 12) {
        vv += +1;
        v = vv / 20;
        vx = (xx - x) * v / R;
        vy = (yy - y) * v / R;
        fill(230);
        rect(637, 70, 50, 20);
        fill(0);
        textSize(10);
        text(vv, 662, 80);
    }
    if (dist(mouseX, mouseY, 709, 105) < 12) {
        vv += +10;
        v = vv / 20;
        vx = (xx - x) * v / R;
        vy = (yy - y) * v / R;
        fill(230);
        rect(637, 70, 50, 20);
        fill(0);
        textSize(10);
        text(vv, 662, 80);
    }

    //回転速度の変化
    if (dist(mouseX, mouseY, 616, 185) < 12) {
        wv += -1;
        fill(230);
        rect(637, 150, 50, 20);
        fill(0);
        textSize(10);
        text(wv, 662, 160);
    }
    if (dist(mouseX, mouseY, 647, 185) < 12) {
        wv += -0.1;
        wv *= 10;
        wv = Math.round(wv);
        wv /= 10;
        fill(230);
        rect(637, 150, 50, 20);
        fill(0);
        textSize(10);
        text(wv, 662, 160);
    }
    if (dist(mouseX, mouseY, 678, 185) < 12) {
        wv += +0.1;
        wv *= 10;
        wv = Math.round(wv);
        wv /= 10;
        fill(230);
        fill(230);
        rect(637, 150, 50, 20);
        fill(0);
        textSize(10);
        text(wv, 662, 160);
    }
    if (dist(mouseX, mouseY, 709, 185) < 12) {
        wv += +1;
        fill(230);
        rect(637, 150, 50, 20);
        fill(0);
        textSize(10);
        text(wv, 662, 160);
    }

    //回転方向の決定
    if (605 <= mouseX && mouseX <= 655 && 222 <= mouseY && mouseY <= 247) {
        ww = -1;
        spinwaybottans();
        fill(0, 255, 0, 100);
        rect(605, 222, 50, 25);
        fill(0);
        textSize(10);
        text("時計回り", 630, 235);
    }
    if (670 <= mouseX && mouseX <= 720 && 222 <= mouseY && mouseY <= 247) {
        ww = 1;
        spinwaybottans();
        fill(0, 255, 0, 100);
        rect(670, 222, 50, 25);
        fill(0);
        textSize(10);
        text("反時計回り", 695, 235);
    }

}

function bottans() {              //ボタンの生成
    textFont("Meiryo");
    textSize(20);
    textAlign(CENTER, CENTER);//文字の中央ぞろえ
    fill(0, 0, 255);
    ellipse(625, 300, 75, 75);//startボタン
    fill(255);
    text("Start", 625, 300);
    fill(255, 0, 0);
    ellipse(700, 300, 75, 75);//resetボタン
    fill(255);
    text("Reset", 700, 300);
    fill(0, 255, 0);
    ellipse(662, 360, 65, 65);//一時停止ボタン
    textSize(15);
    fill(255);
    text("一時停止", 662, 360);
    fill(0);
    text("静止系から見た球の動き", x0, y0 + 200);
    text("回転系から見た球の軌跡", x1, y1 + 200);

}

function spinwaybottans() {                     //回転方向のボタン
    fill(255);
    rect(600, 205, 125, 45);
    fill(230);
    rect(605, 222, 50, 25);
    rect(670, 222, 50, 25);
    fill(0);
    textSize(10);
    text("回転方向", 662, 212);
    text("時計回り", 630, 235);
    text("反時計回り", 695, 235);
}

function spinspeedbottans() {                 //回転速度のボタン
    fill(255);
    rect(600, 130, 125, 70);
    fill(230);
    rect(637, 150, 50, 20);
    fill(255, 0, 0, 100);
    ellipse(616, 185, 25, 25);
    ellipse(647, 185, 25, 25);
    fill(0, 0, 255, 100);
    ellipse(678, 185, 25, 25);
    ellipse(709, 185, 25, 25);
    fill(0);
    textSize(10);
    text("回転速度", 662, 140);
    text(wv, 662, 160);
    text("rad/s", 705, 160);
    text("-1", 616, 185);
    text("-0,1", 647, 185);
    text("+0,1", 678, 185);
    text("+1", 709, 185);
}

function speedbottans() {                       //球の速度
    fill(255);
    rect(600, 50, 125, 70);
    fill(230);
    rect(637, 70, 50, 20);
    fill(255, 0, 0, 100);
    ellipse(616, 105, 25, 25);
    ellipse(647, 105, 25, 25);
    fill(0, 0, 255, 100);
    ellipse(678, 105, 25, 25);
    ellipse(709, 105, 25, 25);
    fill(0);
    textSize(10);
    text("球の速度", 662, 60);
    text(vv, 662, 80);
    text("m/s", 705, 80);
    text("-10", 616, 105);
    text("-1", 647, 105);
    text("+1", 678, 105);
    text("+10", 709, 105);
}