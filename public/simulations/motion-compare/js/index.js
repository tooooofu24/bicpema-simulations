let remort_controller;
let grid_button1;
let grid_button2;
let panel_button1;
let panel_button2;
let start_button;
let stop_button;
let reset_button;
let timer;
let clicked_count;
let grid_count;
let panel_count;
let reset_count;
let count = 0;
let fps = 0;
let radi = 0;
let pg;
let b1;
let b2;
function preload() {
    remort_controller = loadImage("https://live.staticflickr.com/65535/51700454420_5c467158de_o.png");
    grid_button1 = loadImage("https://live.staticflickr.com/65535/51685319741_3fdcf2eb27_o.png");
    grid_button2 = loadImage("https://live.staticflickr.com/65535/51686220835_3dd44a922d_o.png");
    panel_button1 = loadImage("https://live.staticflickr.com/65535/51564193876_f9b9bcea03_o.png");
    panel_button2 = loadImage("https://live.staticflickr.com/65535/51564881204_9a92af5b7b_o.png");
    start_button = loadImage("https://live.staticflickr.com/65535/51673047512_5eeef070b7_o.png");
    stop_button = loadImage("https://live.staticflickr.com/65535/51674520944_fec8f44a10_o.png");
    reset_button = loadImage("https://live.staticflickr.com/65535/51674724605_d816b9c9f2_o.png");
    timer = loadImage("https://live.staticflickr.com/65535/51778694369_6d6783e009_o.png");
}

function setup() {
    fullScreen();
    remort_controller.resize(width / 6, 0);
    grid_button1.resize(width / 9, 0);
    grid_button2.resize(width / 9, 0);
    panel_button1.resize(width / 9, 0);
    panel_button2.resize(width / 9, 0);
    start_button.resize(5 * width / 72, 0);
    stop_button.resize(5 * width / 72, 0);
    reset_button.resize(5 * width / 72, 0);
    timer.resize(width / 6, 0);
    clicked_count = false;
    grid_count = true;
    panel_count = true;
    reset_count = true;
    count = 0;
    fps = 60;
    radi = width / 50;
    pg = createGraphics(width, height);
    b1 = new Ball(radi, height / 2 - height / 25 - radi, 10, 0);
    b2 = new Ball(radi, height - height / 25 - radi, 10, 0);
    frameRate(fps);
    textSize(width / 100);
    textAlign(CENTER, CENTER);
}

function draw() {
    back_ground_1();
    calculate();
    b1.calculate();
    b2.calculate();
    b1.display();
    b2.display();
    back_ground_2();
    remocon();
}

function mousePressed() {
    if (width - panel_button1.width - grid_button1.width < mouseX && mouseX < width - panel_button1.width && 0 < mouseY && mouseY < grid_button1.height) {
        if (grid_count == false) {
            grid_count = true;
        } else {
            grid_count = false;
        }
    }
    if (width - panel_button1.width < mouseX && mouseX < width && 0 < mouseY && mouseY < panel_button1.height) {
        if (panel_count == false) {
            panel_count = true;
        } else {
            panel_count = false;
        }
    }
    if (width - 3 * width / (24 * 6) - reset_button.width - start_button.width < mouseX && mouseX < width - 3 * width / (24 * 6) - reset_button.width && height - start_button.height - width / (24 * 6) < mouseY && mouseY < height - start_button.height - width / (24 * 6) + start_button.height) {
        if (clicked_count == false) {
            clicked_count = true;
            reset_count = false;
        } else {
            clicked_count = false;
        }
    }
    if (width - reset_button.width - width / (24 * 6) < mouseX && mouseX < width - reset_button.width - width / (24 * 6) + reset_button.width && height - reset_button.height - width / (24 * 6) < mouseY && mouseY < height - width / (24 * 6)) {
        clicked_count = false;
        count = 0;
        reset_count = true;
        b1 = new Ball(radi, height / 2 - height / 25 - radi, 10, 0);
        b2 = new Ball(radi, height - height / 25 - radi, 10, 0);
    }
    if (panel_count == true) {
        for (let i = 0; i < 4; i++) {
            if (dist(width - remort_controller.width / 10, remort_controller.width / 10 + panel_button1.height + remort_controller.height / 4 * i, mouseX, mouseY) < remort_controller.width / 20) {
                if (i == 0) {
                    b1.velocity0++;
                } else if (i == 1) {
                    b1.acceleration++;
                } else if (i == 2) {
                    b2.velocity0++;
                } else {
                    b2.acceleration++;
                }
            }
            if (dist(width - remort_controller.width / 10, panel_button1.height + remort_controller.height / 4 - remort_controller.width / 10 + remort_controller.height / 4 * i, mouseX, mouseY) < remort_controller.width / 20) {
                if (i == 0) {
                    b1.velocity0--;
                } else if (i == 1) {
                    b1.acceleration--;
                } else if (i == 2) {
                    b2.velocity0--;
                } else {
                    b2.acceleration--;
                }
            }
        }
    }
}

function back_ground_1() {
    background(255);
    // beginDraw() and endDraw() is not supportet in p5.js, and or often not needed;
    if (count % fps == 0) {
        pg.ellipse(b1.posx, b1.posy, radi * 2, radi * 2);
        pg.ellipse(b2.posx, b2.posy, radi * 2, radi * 2);
    }
    if (reset_count == true) {
        pg.fill(255);
        pg.rect(0, 0, width, height);
    }
    // beginDraw() and endDraw() is not supportet in p5.js, and or often not needed;
    image(pg, 0, 0);
    if (grid_count == true) {
        for (let i = radi; i < width; i += 10) {
            if ((i - radi) % 50 == 0) {
                strokeWeight(1.5);
            }
            else {
                strokeWeight(0.5);
            }
            line(i, 0, i, height);
        }
    }
}

function back_ground_2() {
    fill(255);
    stroke(255);
    for (let i = 0; i < width; i += 50) {
        line(radi + i, b1.posy + radi, radi + i, b1.posy + radi + height / 100);
        line(radi + i, b2.posy + radi, radi + i, b2.posy + radi + height / 100);
        text(i / 50, radi + i, b1.posy + radi + height / 50);
        text(i / 50, radi + i, b2.posy + radi + height / 50);
    }
    stroke(0);
}

function remocon() {
    if (panel_count == false) {
        image(panel_button1, width - panel_button1.width, 0);
    }
    else {
        image(panel_button2, width - panel_button2.width, 0);
        image(remort_controller, width - remort_controller.width, panel_button1.height);
        fill(0);
        for (let i = 0; i < 4; i++) {
            if (i == 0) {
                text(int(b1.velocity0) + "cm/s", width - 2 * remort_controller.width / 5, panel_button1.height + remort_controller.height / 8 + remort_controller.height / 4 * i);
            }
            else if (i == 1) {
                text(int(b1.acceleration) + "cm/ss", width - 2 * remort_controller.width / 5, panel_button1.height + remort_controller.height / 8 + remort_controller.height / 4 * i);
            }
            else if (i == 2) {
                text(int(b2.velocity0) + "cm/s", width - 2 * remort_controller.width / 5, panel_button1.height + remort_controller.height / 8 + remort_controller.height / 4 * i);
            }
            else {
                text(int(b2.acceleration) + "cm/ss", width - 2 * remort_controller.width / 5, panel_button1.height + remort_controller.height / 8 + remort_controller.height / 4 * i);
            }
        }
        fill(255);
    }
    if (grid_count == false) {
        image(grid_button1, width - panel_button1.width - grid_button1.width, 0);
    }
    else {
        image(grid_button2, width - panel_button2.width - grid_button2.width, 0);
    }
    if (clicked_count == false) {
        image(start_button, width - 3 * width / (24 * 6) - reset_button.width - start_button.width, height - start_button.height - width / (24 * 6));
    }
    else {
        image(stop_button, width - 3 * width / (24 * 6) - reset_button.width - stop_button.width, height - stop_button.height - width / (24 * 6));
    }
    image(reset_button, width - reset_button.width - width / (24 * 6), height - reset_button.height - width / (24 * 6));
    image(timer, 0, 0);
    text(nf(count / fps, 1, 2) + "s", 3 * timer.width / 5, timer.height / 2);
}

function calculate() {
    if (clicked_count == true) {
        count++;
    }
}

class Ball {
    constructor(x, y, v_0, a) {
        this.posx = x;
        this.posy = y;
        this.velocity0 = v_0;
        this.acceleration = a;
    }

    calculate() {
        if (clicked_count == true) {
            this.posx = this.velocity0 * 50 * (count / fps) + (1.0 / 2.0) * 50 * this.acceleration * (sq(count / fps)) + radi;
        }
    }

    display() {
        strokeWeight(3);
        ellipse(this.posx, this.posy, radi * 2, radi * 2);
        point(this.posx, this.posy);
        strokeWeight(1);
        fill(100);
        rect(0, this.posy + radi, width, height / 25);
        fill(255);
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function fullScreen() {
    createCanvas(windowWidth, windowHeight);
}