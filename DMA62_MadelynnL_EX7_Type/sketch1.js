let font;




function preload(){
  font = loadFont("Jersey_10/Jersey10-Regular.ttf");
}
      
function setup() {
    createCanvas(400, 400);
  fill('red');
  textFont(font);
  textSize(70);
}

function draw() {
  background(225)
  text('hello there', 15, 100);
}