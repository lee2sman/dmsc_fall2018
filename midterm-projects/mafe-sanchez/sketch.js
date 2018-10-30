let snow = [];
let penguins = [];
let fishes = [];
let fishImg;
let gravity; 
let wind;
let zOff = 0;


function preload() {
 fishImg = loadImage('fish.png'); 
  
}



function setup() {
  createCanvas(500, 500);
  gravity = createVector(0,0.01);
  for (let i = 0; i < 300; i++) {
   let x = random (width);
    let y = random (-10, 300);
    snow.push(new Snowflake (x, y ));
  }
  
  for (let i = 0; i < 10; i++){
  //fishes.push(new Fish (x,y));
    fishes[i] = new Fish();
  
  }

}

function draw() {
  background(230);
  fill(152, 189, 249);
  noStroke();
  rect(width*0, height*0.6, width * 0.9999, height * 0.015);
  
   fill(192, 247, 247);
  noStroke();
  rect(width*0, height*0.615, width * 0.9999, height * 0.39);
  
  
  
  zOff += 0.05;
  
  for(flake of snow) {
    
    let xOff = flake.pos.x / width;
    let yOff = flake.pos.y / height;
    let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
    let wind = p5.Vector.fromAngle(wAngle);
    wind.mult(0.01);
      
    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
    
  }
  
for(fish of fishes) {
  let xOff = fish.pos.x / width;
    let yOff = fish.pos.y / height;
   
  fish.render();
  fish.update();
 // fish.display();
  
    
    
  }
  

}