let font, points = [];
let r = 4;
let angle = 0;
let inverted = false;

function preload() {
  font = loadFont("Jersey_10/Jersey10-Regular.ttf");
}

function setup() {
  noCursor();
  frameRate(9);
  createCanvas(800, 400);
  points = font.textToPoints("Maddy", 50, 250, 300, 400);
  angleMode(DEGREES);

  // Add event listener to the color invert button
  const colorInvertBtn = document.getElementById("color-invert-btn");
  colorInvertBtn.addEventListener("click", toggleInvert);
}

function draw() {
  background(inverted ? 255 : 25); // Invert background color if 'inverted' flag is true

  for (let i = 0; i < points.length; i++) {
    // Calculate hue based on position in the loop
    let hue = map(i, 0, points.length, 0, 255);
    // Set color mode to HSB
    colorMode(HSB, 255);
    fill(inverted ? 255 - hue : hue, 255, 255); // Invert fill color if 'inverted' flag is true

    // Modify the size of each rectangle dynamically
    let size = map(sin(angle * 0.05), -1, 1, 5, 15);

    // Draw the rainbow-colored text
    rect(points[i].x + r * sin(angle + i * 5), points[i].y, 3, 6);
  }

  angle += 9;

  // Draw the mouse cursor
  fill('white');
  ellipse(mouseX, mouseY, 20, 20);
}

function toggleInvert() {
  inverted = !inverted; // Toggle the 'inverted' flag
}
