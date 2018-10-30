let jellyfishes = [];
let algaes = [];
let sharks = [];
let totaljelly = 20;
let totalAlgae = 100;
let totalShark = 1;
var timer = 5000;
var showIt = true;
var currentTime;
let whichState = 0;


function setup() {
  createCanvas(925, 800);
  for (let i = 0; i < totaljelly; i++) {
    jellyfishes[i] = new Jellyfish();

    for (let i = 0; i < totalAlgae; i++) {
      algaes[i] = new Algae();
    }
  }
}

function draw() {
  background(255);
  fill(0, 175, 250);
  rect(0, 0, 925, 700);
  fill(194, 178, 128);
  rect(0, 700, 925, 600);



  for (let i = 0; i < totaljelly; i++) {
    jellyfishes[i].update();
    jellyfishes[i].display();
    for (let j = 0; j < totaljelly; j++) {
      if (i != i && jellyfishes[i].intersects(algaes[i])) {
        totaljelly.push(new Jellyfish());
      }

    }


    for (let i = 0; i < totalAlgae; i++) {
      algaes[i].update();
      algaes[i].display();
      for (let j = 0; j < totaljelly; j++) {
        if (i != i && jellyfishes[i].intersects(algaes[i])) {
          totalAlgae.splice(new Algae());
        }
      }
    }
    }
	for (let i = 0; i < totalShark; i++) {
  // sharks[i].update();
//  sharks[i].display();
    
    if (dist(Jellyfish.x, Jellyfish.y, Algae.x, Algae.y) < Jellyfish.w / 2); {}
  }


  changeState();
  if (whichState === 2){

  }
  if (whichState === 3){
  }
//runTheState();

}
class Jellyfish {
  constructor() {
    this.position = new createVector(random(100, 900), random(100));
    this.velocity = new createVector(random(1, 3), random(1, 3));
  }

  update() {
    // Add the current speed to the position.
    this.position.add(this.velocity);

    if ((this.position.x > width) || (this.position.x < 0)) {
      this.velocity.x = this.velocity.x * -1;
    }
    if ((this.position.y > height) || (this.position.y < 0)) {
      this.velocity.y = this.velocity.y * -1;
    }
    //if(this.position.dist(Algae[ii].position)<this.radius)
    // totalAlgae.splice(new Algae());
  }
  display() {
    // Display circle at x position
    stroke(0);
    fill(255, 175, 245);
    ellipse(this.position.x, this.position.y, 50, 50);
    ellipse(this.position.x + 10, this.position.y + 45, 13, 50);
    ellipse(this.position.x + 5, this.position.y + 45, 13, 50);
    ellipse(this.position.x, this.position.y + 45, 13, 50);
    ellipse(this.position.x - 7, this.position.y + 45, 13, 50);
    ellipse(this.position.x - 11, this.position.y + 45, 13, 50);
  }
}

//function draw() {

class Algae {

  constructor() {
    this.position = new createVector(random(0, 900), random(0, 900));
    this.velocity = new createVector(random(0, 0.0051), random(0, 0.051));

  }

  update() {
    // Add the current speed to the position.
    this.position.add(this.velocity);

    if ((this.position.x > width) || (this.position.x < 0)) {
      this.velocity.x = this.velocity.x * -1;
    }
    if ((this.position.y > height) || (this.position.y < 0)) {
      this.velocity.y = this.velocity.y * -1;
    }
  }
  display() {
    //Display circle at x position
    stroke(0);
    fill(0, 255, 245);
    ellipse(this.position.x, this.position.y, 10, 10);
  }
}
class Shark{
  
  constructor() {
    this.position = new createVector(random(0, 900), random(0, 900));
    this.velocity = new createVector(random(5, 5),random(5,5));
  }
  update() {
    this.position.add(this.velocity);
    
    if ((this.position.x > width) || (this.position.x < 0)) {
      this.velocity.x = this.velocity.x * -5;
    }
    if ((this.position.y > height) || (this.position.y < 0)) {
      this.velocity.y = this.velocity.y * -5;
    }
  }
 display() {
    //Display circle at x position
  stroke(0);
  fill(192, 192, 192);
  ellipse(200, 200, 200, 200);
  triangle(120, 150, 119, 40, 240, 150);
  fill(255,0,0);
  ellipse (275, 190, 20, 20);
  }
}
function changeState() {
  currentTime = millis();
  //print(currentTime);

  if (currentTime > timer) {
    timer = timer + random(5000, 10000);
    print("it's been " + floor(timer / 1000) + " seconds.");
    
    whichState = floor(random(1, 5));
    print("state is: " + whichState);

  }
runTheState();
  function runTheState() {
    if (whichState === 1) {
      regular();
      print("Everything is peaceful in the ocean")
    } else if (whichState === 2) {
      regular();
      print("Everything is peaceful in the ocean")
    } else if (whichState === 3) {
      sharkattack();
        
    print("A shark has appeared!")
      // totaljelly = totaljelly - 1;
    } else if (whichState === 4) {
      reproduce();
      print("The jellyfish are reproducing")
      
    }

    }
  
}
function regular() {
  print("Everything is peaceful in the ocean")
}
function sharkattack() {
  print("A shark has appeared!")

}
function reproduce() {
 this.intersects;
 var distance = dist(this.x, this.y, algaes.x, algaes.y);
 if (distance < this.r + algaes.r);
//totaljelly = totaljelly +1;
}

// function die() {
//  totalJelly - 1;
// }