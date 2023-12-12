var x0, y0, x, y, xx, yy, xr, xr2, xr3, xr4, yr, yr2, yr3, yr4, r, v, vv, vx, vy, s, w, wv, ww, x1, y1, xk, yk, R, d;
var locate, way, start, reset;
function setup() {
    createCanvas(1500, 800);
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

    x0 = 300;                        //左側の円の中心x座標
    y0 = 300;                        //左側の円の中心y座標
    x = 300;                         //左側直進する球の初期x
    xx = 400;
    y = 550;                         //左側直進する球の初期y
    yy = 650;
    r = 250;                         //左側円の半径
    xr = x0;                         //左側回転する球の初期x
    yr = r + y0;                       //左側回転する球の初期y

    x1 = 900;                        //右側円の中心x
    y1 = 300;                        //右側円の中心y
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
    ellipse(300, 300, 2 * r, 2 * r);       //左側の円
    stroke(0);
    ellipse(900, 300, 2 * r, 2 * r);       //右側の円
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

    line(300 - r, 600, 300 + r, 600);     //サイズ感
    line(300 - r, 580, 300 - r, 620);
    line(300 + r, 580, 300 + r, 620);
    text("500m", 300, 630);
}

function display() {
    noStroke();
    fill(150);
    rect(0, 0, 600, 600);           //左側リセット
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

    ellipse(x, y, 20, 20);          //左側直進する球
    ellipse(xk, yk, 20, 20);        //右側コリオリによる球の働き

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


    x = x + vx;                                        //直進する球の動きの制御
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
        ellipse(x, y, 20, 20);
        locate = false;
        way = true;
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
        line((xx - x) * 40 / R + x, (yy - y) * 40 / R + y, x, y);
        translate((xx - x) * 20 / R + x, (yy - y) * 20 / R + y);
        rotate(atan2(yy - y, xx - x) + PI / 2);
        line(10, 0, 0, -20);
        line(-10, 0, 0, -20);
        stroke(0);
        strokeWeight(1);
        resetMatrix();
    }

    if (dist(mouseX, mouseY, 1250, 600) < 75) {//start判定
        start = true;
        reset = false;
    }
    if (dist(mouseX, mouseY, 1400, 600) < 75) {//reset判定
        reset = true;
        start = false;
    }
    if (dist(mouseX, mouseY, 1325, 750) < 65) {//一時停止判定
        start = false;
    }

    //球の速度変化
    if (dist(mouseX, mouseY, 1232, 210) < 25) {
        vv += -10;
        v = vv / 20;
        vx = (xx - x) * v / R;
        vy = (yy - y) * v / R;
        fill(230);
        rect(1275, 140, 100, 40);
        fill(0);
        textSize(20);
        text(vv, 1325, 160);
    }
    if (dist(mouseX, mouseY, 1294, 210) < 25) {
        vv += -1;
        v = vv / 20;
        vx = (xx - x) * v / R;
        vy = (yy - y) * v / R;
        fill(230);
        rect(1275, 140, 100, 40);
        fill(0);
        textSize(20);
        text(vv, 1325, 160);
    }
    if (dist(mouseX, mouseY, 1356, 210) < 25) {
        vv += +1;
        v = vv / 20;
        vx = (xx - x) * v / R;
        vy = (yy - y) * v / R;
        fill(230);
        rect(1275, 140, 100, 40);
        fill(0);
        textSize(20);
        text(vv, 1325, 160);
    }
    if (dist(mouseX, mouseY, 1418, 210) < 25) {
        vv += +10;
        v = vv / 20;
        vx = (xx - x) * v / R;
        vy = (yy - y) * v / R;
        fill(230);
        rect(1275, 140, 100, 40);
        fill(0);
        textSize(20);
        text(vv, 1325, 160);
    }

    //回転速度の変化
    if (dist(mouseX, mouseY, 1232, 370) < 25) {
        wv += -1;
        fill(230);
        rect(1275, 300, 100, 40);
        fill(0);
        textSize(20);
        text(wv, 1325, 320);
    }
    if (dist(mouseX, mouseY, 1294, 370) < 25) {
        wv += -0.1;
        fill(230);
        rect(1275, 300, 100, 40);
        fill(0);
        textSize(20);
        text(wv, 1325, 320);
    }
    if (dist(mouseX, mouseY, 1356, 370) < 25) {
        wv += +0.1;
        fill(230);
        rect(1275, 300, 100, 40);
        fill(0);
        textSize(20);
        text(wv, 1325, 320);
    }
    if (dist(mouseX, mouseY, 1418, 370) < 25) {
        wv += +1;
        fill(230);
        rect(1275, 300, 100, 40);
        fill(0);
        textSize(20);
        text(wv, 1325, 320);
    }

    //回転方向の決定
    if (1210 <= mouseX && mouseX <= 1310 && 445 <= mouseY && mouseY <= 495) {
        ww = -1;
        spinwaybottans();
        fill(0, 255, 0, 100);
        rect(1210, 445, 100, 50);
        fill(0);
        textSize(20);
        text("時計回り", 1260, 470);
    }
    if (1340 <= mouseX && mouseX <= 1440 && 445 <= mouseY && mouseY <= 495) {
        ww = 1;
        spinwaybottans();
        fill(0, 255, 0, 100);
        rect(1340, 445, 100, 50);
        fill(0);
        textSize(20);
        text("反時計回り", 1390, 470);
    }

}

function bottans() {              //ボタンの生成
    textFont("Meiryo");
    textSize(40);
    textAlign(CENTER, CENTER);//文字の中央ぞろえ
    fill(0, 0, 255);
    ellipse(1250, 600, 150, 150);//startボタン
    fill(255);
    text("Start", 1250, 600);
    fill(255, 0, 0);
    ellipse(1400, 600, 150, 150);//resetボタン
    fill(255);
    text("Reset", 1400, 600);
    fill(0, 255, 0);
    ellipse(1325, 720, 130, 130);//一時停止ボタン
    textSize(30);
    fill(255);
    text("一時停止", 1325, 720);
    fill(0);
    text("静止系から見た球の動き", x0, y0 + 400);
    text("回転系から見た球の軌跡", x1, y1 + 400);

}

function spinwaybottans() {                     //回転方向のボタン
    fill(255);
    rect(1200, 410, 250, 90);
    fill(230);
    rect(1210, 445, 100, 50);
    rect(1340, 445, 100, 50);
    fill(0);
    textSize(20);
    text("回転方向", 1325, 425);
    text("時計回り", 1260, 470);
    text("反時計回り", 1390, 470);
}

function spinspeedbottans() {                 //回転速度のボタン
    fill(255);
    rect(1200, 260, 250, 140);
    fill(230);
    rect(1275, 300, 100, 40);
    fill(255, 0, 0, 100);
    ellipse(1232, 370, 50, 50);
    ellipse(1294, 370, 50, 50);
    fill(0, 0, 255, 100);
    ellipse(1356, 370, 50, 50);
    ellipse(1418, 370, 50, 50);
    fill(0);
    textSize(20);
    text("回転速度", 1325, 280);
    text(wv, 1325, 320);
    text("rad/s", 1410, 320);
    text("-1", 1232, 370);
    text("-0,1", 1294, 370);
    text("+0,1", 1356, 370);
    text("+1", 1418, 370);
}

function speedbottans() {                       //球の速度
    fill(255);
    rect(1200, 100, 250, 140);
    fill(230);
    rect(1275, 140, 100, 40);
    fill(255, 0, 0, 100);
    ellipse(1232, 210, 50, 50);
    ellipse(1294, 210, 50, 50);
    fill(0, 0, 255, 100);
    ellipse(1356, 210, 50, 50);
    ellipse(1418, 210, 50, 50);
    fill(0);
    textSize(20);
    text("球の速度", 1325, 120);
    text(vv, 1325, 160);
    text("m/s", 1410, 160);
    text("-10", 1232, 210);
    text("-1", 1294, 210);
    text("+1", 1356, 210);
    text("+10", 1418, 210);
}