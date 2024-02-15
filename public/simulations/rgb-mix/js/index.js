let r_slider, g_slider, b_slider;

function setup() {
    createCanvas(200, 200);
    r_slider = createSlider(0, 255, 100, 1);
    r_slider.position(0, height - 70 + 100);
    g_slider = createSlider(0, 255, 100, 1);
    g_slider.position(0, height - 45 + 100);
    b_slider = createSlider(0, 255, 100, 1);
    b_slider.position(0, height - 20 + 100);
}

function draw() {
    background(255);
    let r = r_slider.value();
    let g = g_slider.value();
    let b = b_slider.value();
    noStroke();
    fill(r, g, b);
    rect(25, 20, 100, 100);
    fill(0);
    textStyle(NORMAL);
    text(r, 144, 144);
    text(g, 144, 169);
    text(b, 144, 194);
    textStyle(BOLD);
    fill(255, 0, 0);
    text("R", 132, 144);
    fill(0, 255, 0);
    text("G", 132, 169);
    fill(0, 0, 255);
    text("B", 132, 194);
}