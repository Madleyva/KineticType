let font, points = [];
let r = 4;
let angle = 0;
let hueOffset = 0; // Base hue value
let hueIncrement = 0.05; // Rate of change of hue
let inverted = false;
let buttonPressed = false;

let colorInvertBtn;

let colors = []; // Array to store precomputed colors

let timerInterval;
const timerDuration = 3000;
let timerValue = timerDuration / 1000; // Convert milliseconds to seconds

// Preload function to load font
function preload() {
  font = loadFont("Jersey_10/Jersey10-Regular.ttf");
}

// Setup function to initialize canvas and other settings
function setup() {
  frameRate(10);
  createCanvas(800, 400);
  points = font.textToPoints("Maddy", 50, 250, 300, 400); // 50=x, 250=y, 300=width, 400=height
  angleMode(DEGREES);
  
  //accessing the global dom element 
  colorInvertBtn = document.getElementById("color-invert-btn");
  colorInvertBtn.addEventListener("click", function() {
    toggleInvert();
    buttonPressed = true;
  });

  timerInterval = setInterval(updateTimer, 1000); // Update timer every second
  
  // Initialize colors array
  for (let i = 0; i < points.length; i++) {
    colors.push(color(255)); // Initialize with default color
  }
}

function mousePressed() {
  const buttonRect = colorInvertBtn.getBoundingClientRect();
  // Check if the mouse press occurred on the invert button
  if (
    mouseX >= buttonRect.left &&
    mouseX <= buttonRect.right &&
    mouseY >= buttonRect.top &&
    mouseY <= buttonRect.bottom
  ) {
    clearInterval(timerInterval); // Clear the timer interval
  }
}


function draw() {
  if (timerValue > 0) {
    background(inverted ? colors[0] : 255); //Inverted background

    hueOffset += 10; // Speed of changing the colors

    // Loop through each point
    for (let i = 0; i < points.length; i++) {
      let hue = (hueOffset + i * hueIncrement) % 360; // Ensure hue is within the range 0-360
      colors[i] = colorFromHSV(hue, 255, 255); // Update color for each point using HSV color space
      fill(colors[i]); //color array
      noStroke();
      rect(points[i].x + r * sin(angle + i * 5), points[i].y, 6, 8); 
    }

    angle += 10; // Increment angle for animation

    //timer
    fill(inverted ? 255 : 0); //timer changes from white to black
    textSize(20);
    textAlign(RIGHT);
    text("Timer: " + timerValue, width - 20, 30);
  } else {
    gameOver(); //When the timer reaches zero game over pops up
  }

}

// Function to toggle color inversion
function toggleInvert() {
  inverted = !inverted;
}

// Function to update timer value
function updateTimer() {
  if (!buttonPressed && timerValue > 0) {
    timerValue--; // Decrement timerValue every second until it reaches 0
  } else if (!buttonPressed && timerValue === 0) {
    gameOver(); // Call gameOver function when timer reaches zero
  }
}

// Function to handle game over
function gameOver() {
  if (!buttonPressed) {
    colorInvertBtn.style.backgroundColor = 'red';
    
    clear();
    textSize(45);
    textAlign(CENTER, CENTER);
    fill('black');
    text("Game Over! Button not pressed.", width/2, height/2);
    clearInterval(timerInterval); 
  }
}

function colorFromHSV(h, s, v) {
  let c = v * s; //represents the distance between the color from the neutral gray of the same brightness
  let x = c * (1 - Math.abs((h / 60) % 2 - 1)); //Represents the second largest component of the color in RGB space
  let m = v - c; //Represents the lightness or darkness of the color. 
  let r, g, b;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  // Ensuring that the RGB values are within the valid range (0 to 255)
  r = Math.min(Math.max(r + m, 0), 255);
  g = Math.min(Math.max(g + m, 0), 255);
  b = Math.min(Math.max(b + m, 0), 255);

  return color(r, g, b); // Return blended color in RGB format
}

//Reset Canvas
function keyPressed() {
  console.log("Key pressed:", key);
  if (key === 'r' || key === 'R') {
    console.log("Resetting canvas");
    refreshCanvas(); 
  }
}

function refreshCanvas() {
  points = font.textToPoints("Maddy", 50, 250, 300, 400); 
  timerValue = timerDuration / 1000; 
  updateTimer(); 
  buttonPressed = false; // Allows the timer to continue to count

  for (let i = 0; i < points.length; i++) {  // Redraw the name "Maddy"
    fill(25);
    noStroke();
    rect(points[i].x, points[i].y, 6, 8);
  }
}

