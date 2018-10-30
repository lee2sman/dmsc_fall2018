let sky;
let comet = [];
let grass;
let orb;
let fly = [];
let mover;
let attractor;
let clouds = [];


var Y_AXIS = 1;
var c1, c2;

function setup() {
  createCanvas(600, 500);
  c1 = color(20, 150, 200, random(240, 255));
  c2 = color(204, 102, 0);

  sky = new Sky();
  
  for (let i = 0; i < 5; i++) { 
    comet[i] = new Comet(random(0.1,2.2), random(0, 100), random(0, 100));
  }
  
  grass = new Grass();
  orb = new Orb();

  for (let i = 0; i < 10; i++) { 
    fly[i] = new Fly();
  }

  mover = new Mover();
  attractor = new Attractor();

  for (let i = 0; i < 12; i++) { 
    clouds[i] = new Clouds(random(10, 35), random(0,600), random(0,200));
  }

}

function draw() {
  background(120, 200, 255);
  //
  let force = attractor.calculateAttraction(mover);
  mover.applyForce(force);
  mover.update();
  attractor.display();
  mover.display();
  //
  sky.body();
  //
for (let i = 0; i < clouds.length; i++) {
    let wind = createVector(random(0.001,0.01), 0);
    clouds[i].applyForce(wind);
    clouds[i].display();
    clouds[i].update();
    clouds[i].checkEdges();
  }
  //
  for (let i = 0; i < comet.length; i++) {
  comet[i].update();
  comet[i].checkEdges();
  comet[i].display();
  }
  //
  setGradient(0, 250, width, 280, c1, c2, Y_AXIS);
  //

  //
  orb.display();
  orb.move();
  for (var i = 0; i < fly.length; i++) {
    fly[i].move();
    fly[i].display();
    
  	if (fly[i].hits(orb)) {
    	console.log("WATERING");
   	}
  }

 
}
function mouseMoved() {
  attractor.handleHover(mouseX, mouseY);
}

function mousePressed() {
  attractor.handlePress(mouseX, mouseY);
}

function mouseDragged() {
  attractor.handleHover(mouseX, mouseY);
  attractor.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  attractor.stopDragging();
}


function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == Y_AXIS) { // Top to bottom gradient
    for (var i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 2);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}

class Fly {
  constructor() {
  this.position = createVector(random(width), random(height));
  this.velocity = createVector(random(0, 500), random(0, 500));
  this.acceleration = createVector(0, 0.01);
  this.r = 0.5;
  // this.topspeed = 5;
  }
  display() {
    strokeWeight(2);
    fill(0);
    stroke(0);
    ellipse(this.position.x, this.position.y, this.r*2, this.r*2);
  }
  move() {
    this.position.x = map(noise(this.velocity.x), 0, 1, 50, width);
    this.position.y = map(noise(this.velocity.y), 0, 1, 50, height);
    this.velocity.add(0.01, 0.01); //vector math.
  }
  
  hits(orbs) {
    var d = dist(this.position.x, this.position.y, orbs.position.x, orbs.position.y);
    if (d < this.r + orbs.r) {
      return true;
    } else {
      return false;
  } 
 }
}

class Orb {
  constructor() {
  this.position = createVector();
  this.r = 10;
  }
  display () {
    strokeWeight(random(0, 20));
    fill(random(200, 255), 220, 55);
    ellipse(this.x, this.y + 200, this.r*2, this.r*2);
  }
  move() {
    this.position.x = this.position.x + 0.005;
    this.position.y = this.position.y + 0.01;
    this.x = noise(this.position.x) * width;
    this.y = noise(this.position.y) * 140;
  }
	avoid(i) {
  	if (this.position.dist(fly[i].position) < 50) {
    	var b = p5.Vector.sub(fly[i].position, this.position);
    	b.limit(3);
    	b.y -= 1;
    	this.position.sub(b);
  	}
	}
}

class Grass {
  constructor() {

  }

  display() {
    fill(190, 200, 100);
    stroke(90, 205, 105);
    strokeWeight(20);
    rect(-50, 250, 700, 400);

    noStroke();
    fill(50, 150, 250);
    rect(-50, 450, 700, 400);
  }
}

class Comet {
  constructor(m, x, y) {
    this.position = createVector(random(width + x), random(height + y));
    this.velocity = createVector(random(1, 4), random(0, 4));
    this.acceleration = createVector(0, 0);
    this.mass = m;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  display() {
    noStroke(0);
    fill(random(20, 200), random(0, 100), random(10, 100));
    ellipse(this.position.x, this.position.y, this.mass + 8, this.mass + 8);
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}

class Sky {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.angle = 100;
    this.angleVel = 0.4;
    this.amplitude = 10;
  }

  body() {
    for (this.x = 0; this.x <= width; this.x += 24) {
      this.y = this.amplitude * sin(this.angle);
      noStroke();
      fill(20, 150, 200, random(240, 255));
      ellipse(this.x, this.y + height / 2, 48, 48);
      this.angle += this.angleVel;
    }
  }
}

class Clouds {
  constructor(m, x, y) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass); //derived from Newton's Second Law
    this.acceleration.add(f); //add all the forces together (wind, gravity, etc)
  }

  update() {
    this.velocity.add(this.acceleration); //acceleration is added to velocity
    this.position.add(this.velocity); //velocity is added to position to get the next position
    this.acceleration.mult(0); //we reset the force to 0 at end
  }

  display() {
    noStroke();
    fill(210, 210, 210);
    ellipse(this.position.x-7, this.position.y, this.mass-5);
    ellipse(this.position.x+7, this.position.y, this.mass-5);
    ellipse(this.position.x, this.position.y, this.mass);
  }
  
  checkEdges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}

class Mover {
  constructor() {
    this.position = createVector(400, 50);
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 1;
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
    stroke(80,100);
    strokeWeight(1);
    fill(115, 137, 170);
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

class Attractor {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.mass = 36;
    this.G = 8;
    this.dragOffset = createVector(0, 20);
    this.dragging = false;
    this.rollover = false;
  }
  calculateAttraction(m) {
    // Calculate direction of force
    let force = p5.Vector.sub(this.position, m.position);
    // Distance between objects
    let distance = force.mag();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = constrain(distance, 140, 150);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    force.normalize();
    // Calculate gravitional force magnitude
    let strength = (this.G * this.mass * m.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
  }

  // Method to display
  display() {
    ellipseMode(CENTER);
    strokeWeight(random(1,20));
    stroke(random(190,210));
    if (this.dragging) {
      fill(noise(100,250));
    } else if (this.rollover) {
      fill(noise(100,250));
    } else {
      fill(random(200,210),random(190,200),random(170,180));
    }
    ellipse(this.position.x, this.position.y, this.mass * 5, this.mass * 5);
  }

  // The methods below are for mouse interaction
  handlePress(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  }

  handleHover(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  handleDrag(mx, my) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
}