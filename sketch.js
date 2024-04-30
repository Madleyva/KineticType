let font, points=[];
let r=10;
let angle = 0;


/*
let color_picker = document.getElementById("color-picker-wrapper");
let color_picker_wrapper = document.getElementById("color-picker-wrapper");

color_picker.onchange = function(){
  color_picker_wrapper.style.backgroundColor = 
  color_picker.value;
};*/
document.getElementById("color-picker").addEventListener("change")

function preload(){
  font = loadFont("Jersey_10/Jersey10-Regular.ttf");
}
      
function setup() {
  noCursor();
  frameRate(9);
  createCanvas(800, 400);
  points = font.textToPoints("Maddy", 100, 200, 200, 300);
}


function draw() {
  background('black');
  
  //color change animation
  let hue = map(sin(angle * 0.1), -1, 1, 0, 255);
  fill(hue, 255, 255);


  for(let i = 0; i < points.length; i++){ // this allows you to use the points you created and draw out the word you typed in the setup function with them
    let size = map(sin(angle * 0.05), -1, 1, 5, 15);
    rect(points[i].x + r * sin(angle + i*25),
    points[i].y, 3,3);
  }
  angle +=6;
  //mouse cursor
  fill('white');
  ellipse(mouseX, mouseY, 20 ,20);
}