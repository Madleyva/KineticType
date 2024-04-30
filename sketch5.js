let font, points=[];
let r=30;
let angle = 0;



function preload(){
  font = loadFont("Jersey_10/Jersey10-Regular.ttf");
}
      
function setup() {
    frameRate(34);
    createCanvas(800, 400);
  fill('red');
  points = font.textToPoints("ML", 300, 200, 300);
  print(points);
}

function draw() {
  background(225)
  //text('hello Giselle', 15, 100);
  for(let i = 0; i < points.length; i++){ // this allows you to use the points you created and draw out the word you typed in the setup function with them
    ellipse(points[i].x + r * sin(angle + i*25),
    points[i].y, 10, 10,) 
  }
  angle +=10;
}