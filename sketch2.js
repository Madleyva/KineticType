let font, points=[];




function preload(){
  font = loadFont("Jersey_10/Jersey10-Regular.ttf");
}
      
function setup() {
    createCanvas(400, 400);
  fill('red');
  points = font.textToPoints("pcc", 50, 200, 300);
  print(points);
}

function draw() {
  background(225)
  text('hello Giselle', 15, 100);
}