var s;
var scl = 20;
var food;
var score = 0;
var bannerHeight = 60;
var highscore = 0;
function setup() {
  createCanvas(600, 600);
  s = new snake();
  frameRate(5); //is usually 10
  pickLocation();
}

function pickLocation() {
  var cols = floor((width)/scl);
  var rows = floor((height)/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(51);
  
  fill(214, 216, 218);
  textSize(20);
  textFont('Monospace');
  textAlign(LEFT, CENTER);
  text('Score: ' + score, 20, floor(bannerHeight/2));
  textAlign(LEFT, CENTER);
  text('High Score: ' + highscore, 140, floor(bannerHeight/2));
  
  s.ai(food);
  s.update();
   s.death();
  s.show();
  s.death();
  
  if(s.eat(food)) {
    pickLocation();
    score++;
    console.clear();
    if(score > highscore) {
       highscore = score; 
    }
  }

  fill(255, 0, 0);
  rect(food.x, food.y, scl, scl);
}


function keyPressed() {
 if(keyCode == UP_ARROW) {
   s.dir(0, -1); 
 } else if(keyCode == DOWN_ARROW) {
   s.dir(0, 1); 
 } else if(keyCode == LEFT_ARROW) {
   s.dir(-1, 0); 
 } else if(keyCode == RIGHT_ARROW) {
   s.dir(1, 0); 
 }
}
