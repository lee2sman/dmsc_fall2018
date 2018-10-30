let movers = [];

let attractor;

var circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < 50; i++) {
    movers[i] = new Mover(random(0.1, 2), random(width), random(height));
  }
  attractor = new Attractor();
}
  


function draw() {
  
    var overlapping = false;
  
  var protection = 0;
  
  while(circles.length < 50){
 
//  for (var b = 0; b < 50; b++){
    var circle = {
    x: random(width),
    y: random(height),
    r: 8 
    }
  
    
    overlapping = false;
    
    for (var j = 0; j < circles.length; j++){
      var other = circles[j]; 
      var d = dist(circle.x,circle.y, other.x, other.y);
      if (d < circle.r + other.r){ 
        overlapping = true; 
      }
    }
    
    if(!overlapping){
      circles.push(circle); 
    }
  
  protection++; 
  
  if(protection > 25){
    break;
  }
  
}
  


for (var c = 0; c < circles.length; c++){
  noStroke();
  fill(0,204,102);
  ellipse(circles[c].x+random(-1,1),circles[c].y+random(-1,1),circles[c].r*2,circles[c].r*2);
}


  
  background(55,50);

  attractor.display();

  for (let i = 0; i < movers.length; i++) {
    let force = attractor.calculateAttraction(movers[i]);
    movers[i].applyForce(force);

    movers[i].update();
    movers[i].display();
  }
}



class Attractor {

  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.mass = 20;
    this.G = 1;
    this.dragOffset = createVector(0, 0);
    this.dragging = false;
    this.rollover = false;
  }

  calculateAttraction(m) {
    // Calculate direction of force
    let force = p5.Vector.sub(this.position, m.position);
    // Distance between objects
    let distance = force.mag();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = constrain(distance, 5, 25);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    force.normalize();
   
    let strength = (this.G * this.mass * m.mass) / (distance * distance);
   
    force.mult(strength);
    return force;
  }


  display() {
    ellipseMode(CENTER);
    strokeWeight(4);
    stroke(0);
    if (this.dragging) {
      fill(255);
    } else if (this.rollover) {
      fill(175);
    } else {
      fill(101, 200);
    }
    ellipse(mouseX, mouseY, 0.1, 0.1);
  }


}

class Mover {
  constructor(mass, x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
    this.mass = mass;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(102, 175,255);
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }
}
