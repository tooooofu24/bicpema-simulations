let radi = 0;
let clicked_count;
let grid_count;
let gravity = 0;
let count = 0;
let ball;
let remort_controller;
let panel_button1;
let panel_button2;
let start_button;
let stop_button;
let reset_button;
let grid_button1;
let grid_button2;
let b1;
let b2;
function preload() {
    ball = loadImage("https://live.staticflickr.com/65535/51671503863_cb9cfd611d_o.png");
    remort_controller = loadImage("https://live.staticflickr.com/65535/51671943434_b5b8f73f3b_o.png");
    panel_button1 = loadImage("https://live.staticflickr.com/65535/51564193876_f9b9bcea03_o.png");
    panel_button2 = loadImage("https://live.staticflickr.com/65535/51564881204_9a92af5b7b_o.png");
    start_button = loadImage("https://live.staticflickr.com/65535/51673047512_5eeef070b7_o.png");
    stop_button = loadImage("https://live.staticflickr.com/65535/51674520944_fec8f44a10_o.png");
    reset_button = loadImage("https://live.staticflickr.com/65535/51674724605_d816b9c9f2_o.png");
    grid_button1 = loadImage("https://live.staticflickr.com/65535/51685319741_3fdcf2eb27_o.png");
    grid_button2 = loadImage("https://live.staticflickr.com/65535/51686220835_3dd44a922d_o.png");
}

function setup() {
    fullScreen();
    radi = width / 50;
    clicked_count = false;
    grid_count = false;
    gravity = 9.8;
    count = 0;
    ball.resize(width / 18, 0);
    remort_controller.resize(width / 6, 0);
    panel_button1.resize(width / 9, 0);
    panel_button2.resize(width / 9, 0);
    start_button.resize(5 * width / 72, 0);
    stop_button.resize(5 * width / 72, 0);
    reset_button.resize(5 * width / 72, 0);
    grid_button1.resize(width / 9, 0);
    grid_button2.resize(width / 9, 0);
    b1 = new Ball(500, 8);
    b2 = new Ball(500, 12);
    b1.theta = radians(b1.theta0) * cos(sqrt(gravity / (b1.string_length / float(50 * 100))) * count / 60);
    b2.theta = radians(b2.theta0) * cos(sqrt(gravity / (b2.string_length / float(50 * 100))) * count / 60);
    textAlign(CENTER, CENTER);
    textSize(width / 100);
}

function draw() {
    background(100);
    if (clicked_count == true) {
        count++;
    }
    background_setting();
    b1.controller(0);
    b2.controller(width / 3);
    b1.calculate(0);
    b2.calculate(width / 3);
    b1.display(0);
    b2.display(width / 3);
    b1.calculate(2 * width / 3);
    b2.calculate(2 * width / 3);
    tint(255, 150);
    stroke(0, 150);
    b1.display(2 * width / 3);
    b2.display(2 * width / 3);
    tint(255);
    stroke(0);
    button();
}

function mousePressed() {
    if (width / 3 - panel_button1.width < mouseX && mouseX < width / 3 && 0 < mouseY && mouseY < panel_button1.height) {
        b1.panelCount++;
        if (b1.panelCount == 2) {
            b1.panelCount = 0;
        }
    }
    if (2 * width / 3 - panel_button1.width < mouseX && mouseX < 2 * width / 3 && 0 < mouseY && mouseY < panel_button1.height) {
        b2.panelCount++;
        if (b2.panelCount == 2) {
            b2.panelCount = 0;
        }
    }
    if (width - 3 * width / (24 * 6) - reset_button.width - start_button.width < mouseX && mouseX < width - 3 * width / (24 * 6) - reset_button.width && height - start_button.height - width / (24 * 6) < mouseY && mouseY < height - start_button.height - width / (24 * 6) + start_button.height) {
        if (clicked_count == true) {
            clicked_count = false;
        } else {
            clicked_count = true;
        }
    }
    if (width - reset_button.width - width / (24 * 6) < mouseX && mouseX < width - reset_button.width - width / (24 * 6) + reset_button.width && height - reset_button.height - width / (24 * 6) < mouseY && mouseY < height - width / (24 * 6)) {
        clicked_count = false;
        count = 0;
        b1 = new Ball(500, 8);
        b2 = new Ball(500, 12);
        b1.theta = radians(b1.theta0) * cos(sqrt(gravity / (b1.string_length / float(50 * 100))) * count / 60);
        b2.theta = radians(b2.theta0) * cos(sqrt(gravity / (b2.string_length / float(50 * 100))) * count / 60);
    }
    if (clicked_count == false) {
        for (let n = 0; n < 2; n++) {
            for (let i = 0; i < 3; i++) {
                if (dist(n * width / 3 + remort_controller.width - remort_controller.width / 10, i * remort_controller.height / 2 + remort_controller.width / 10, mouseX, mouseY) < remort_controller.width / 20) {
                    if (n == 0) {
                        if (i == 0 && b1.theta0 < 15) {
                            b1.theta0++;
                        } else if (i == 1 && b1.string_length < height - 100) {
                            b1.string_length += 50;
                        }
                    }
                    if (n == 1) {
                        if (i == 0 && b2.theta0 < 15) {
                            b2.theta0++;
                        } else if (i == 1 && b2.string_length < height - 100) {
                            b2.string_length += 50;
                        }
                    }
                }
                if (dist(n * width / 3 + remort_controller.width - remort_controller.width / 10, (i + 1) * remort_controller.height / 2 - remort_controller.width / 10, mouseX, mouseY) < remort_controller.width / 20) {
                    if (n == 0) {
                        if (i == 0 && b1.theta0 > 0) {
                            b1.theta0--;
                        } else if (i == 1 && b1.string_length > 50) {
                            b1.string_length -= 50;
                        }
                    }
                    if (n == 1) {
                        if (i == 0 && b2.theta0 > 0) {
                            b2.theta0--;
                        } else if (i == 1 && b2.string_length > 50) {
                            b2.string_length -= 50;
                        }
                    }
                }
            }
        }
    }
    if (width - grid_button1.width < mouseX && mouseX < width && 0 < mouseY && mouseY < grid_button1.height) {
        if (grid_count == true) {
            grid_count = false;
        } else {
            grid_count = true;
        }
    }
}

function background_setting() {
    for (let i = 0; i < 3; i++) {
        stroke(0, 100);
        if (grid_count == true) {
            for (let f = -width / 6; f < width / 6; f += 10) {
                if (f % 50 == 0) {
                    strokeWeight(3);
                }
                else {
                    strokeWeight(1);
                }
                line(f + width / 3 * i + width / 6, 0, f + width / 3 * i + width / 6, height);
            }
            for (let f = 0; f < height; f += 10) {
                if (f % 50 == 0) {
                    strokeWeight(3);
                }
                else {
                    strokeWeight(1);
                }
                line(width / 3 * i, f, width / 3 * i + width / 3, f);
            }
        }
        noFill();
        stroke(0);
        strokeWeight(5);
        rect(width / 3 * i, 0, width / 3, height);
    }
}

function button() {
    if (grid_count == false) {
        image(grid_button1, width - grid_button1.width, 0);
    }
    else {
        image(grid_button2, width - grid_button2.width, 0);
    }
    if (clicked_count == false) {
        image(start_button, width - 3 * width / (24 * 6) - reset_button.width - start_button.width, height - start_button.height - width / (24 * 6));
    }
    else {
        image(stop_button, width - 3 * width / (24 * 6) - reset_button.width - stop_button.width, height - stop_button.height - width / (24 * 6));
    }
    image(reset_button, width - reset_button.width - width / (24 * 6), height - reset_button.height - width / (24 * 6));
}

class Ball {
    constructor(s_l, t_0) {
        this.posx = 0;
        this.posy = 0;
        this.theta = 0;
        this.material = 0;
        this.panelCount = 0;
        this.string_length = s_l;
        this.theta0 = t_0;
    }

    controller(n) {
        strokeWeight(1);
        if (this.panelCount == 1) {
            image(panel_button2, n - panel_button2.width + width / 3, 0);
            image(remort_controller, n, 0);
            text(this.theta0 + "°", n + 5 * remort_controller.width / 12, 0, remort_controller.width / 3, remort_controller.height / 2);
            text(nf(this.string_length / 50, 1, 0) + "cm", n + 5 * remort_controller.width / 12, remort_controller.height / 2, remort_controller.width / 3, remort_controller.height / 2);
        }
        else {
            image(panel_button1, n - panel_button1.width + width / 3, 0);
        }
        strokeWeight(5);
    }

    calculate(n) {
        this.posx = n + width / 6 + this.string_length * sin(this.theta);
        this.posy = 100 + this.string_length * cos(this.theta);
        this.theta = radians(this.theta0) * cos(sqrt(gravity / (this.string_length / float(50 * 100))) * count / 60);
    }

    display(n) {
        line(this.posx, this.posy, n + width / 6, 100);
        image(ball, this.posx - radi, this.posy - radi, radi * 2, radi * 2);
    }

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function fullScreen() {
    createCanvas(windowWidth, 9 * windowHeight / 10);
}