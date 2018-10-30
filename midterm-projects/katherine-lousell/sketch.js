var img;
let onland;
let inspace = [];
let n;

function setup() {

  createCanvas(500, 600);
  img = loadImage("stars.gif");
  ship = loadImage("alienship.png");
  alien = loadImage("aflt.png");
  onland = new Thing();
  n = new newThing();

  for (let i = 0; i < 20; i++) {
    inspace[i] = new Alien();
  }
}


function draw() {

  let gravity = createVector(0, -0.09);

  image(img, 0, 0, 500, 600);

  fill(60);
  ellipse(250, 20, 300, 300);

  onland.walk();
  onland.display();

  n.nmove();
  n.ndisplay();

  for (let i = 0; i < 20; i++) {

    inspace[i].display();
    inspace[i].move();
    inspace[i].lforce(gravity);
    for (var j = 0; j < 10; j++) {
      if (i != j && inspace[i].intersects(inspace[j])) {
        inspace[i].loc.x = inspace[i].loc.x + 5;
        inspace[j].loc.x = inspace[j].loc.x - 5;
      }
    }
  }


}

class Thing {
  constructor() {
    this.position = createVector(-10, height / 2);
    this.noff = createVector(random(1, 5), random(1, 5));
  }

  display() {
    noStroke();
    fill(100);
    ellipse(this.position.x, this.position.y, 20, 20);
  }

  walk() {
    this.position.x = map(noise(this.noff.x), -1, 1, 1, 350);
    this.position.y = map(noise(this.noff.y), 0, 1, 1, 180);
    this.noff.add(0.005, 0.005);
  }
}

class Alien {
  constructor() {
    this.loc = createVector(random(10, 300), random(170, 580));
    this.mass = 1;
    this.vel = createVector(random(-0.05, 0.05), random(0.1));
    this.acc = createVector(random(-0.2, 0.4), random(-0.02, 0));
    this.wh = 13;
  }

  lforce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  move() {
    this.loc.add(this.vel);
    this.loc.x += random(-1, 1);
    //this.loc.y += random(-1,1);

    if ((this.loc.x > width) || (this.loc.x < 0)) {
      this.vel.x = this.vel.x * -1;
    }
    if ((this.loc.y > height) || (this.loc.y < 0)) {
      this.vel.y = this.vel.y * -1;
    }

    if (this.loc.y < 250) {
      this.vel.y = this.vel.y * -1;
    }
  }

  display() {
    fill(255);
    image(alien, this.loc.x, this.loc.y, this.wh, this.wh);
  }

  intersects(other) {
    var d = dist(this.loc.x, this.loc.y, other.loc.x, other.loc.y);
    if (d < this.wh + other.wh) {
      return true;
    } else {
      return false;
    }
  }
}

class newThing {
  constructor() {
    this.nloc = createVector(250, 300);
    this.noff = createVector(random(1, 7), random(1, 7));
    this.w2 = 65;
    this.h2 = 65;
  }

  nmove() {

    this.nloc.x = map(noise(this.noff.x), -1, 1, 1, 500);
    this.nloc.y = map(noise(this.noff.y), 0, 1, 100, 600);
    this.noff.add(0.01, 0.01);
  }

  ndisplay() {
    //fill(255, 100, 0);
    image(ship, this.nloc.x, this.nloc.y, this.w2, this.h2);
  }
}