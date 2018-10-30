let ship;
let ship2;
let bigship;
let meteor = [];
let ml = 100;
let sl = 20;
let c1;
let c2;
let tar;
let img;

function preload(){
	img = loadImage('space.jpg');
}


function setup(){
  createCanvas(800, 750);
  // frameRate(3);
  for(let i = 0; i<ml; i+=3){
  	meteor[i] = new Meteor();
  }
  ship = new Ship(width/2, height-100);
  ship2 = new Ship(width/2, height-100);
  bigship = new BigShip();
}

function draw(){
  image(img, 0, 0, width, height);
  let velocity2 = new createVector(0.5, 0.3);
  let tar = new createVector(width-100, 100);
  let tar2 = new createVector(100, 100);
  let maxspeed2 = 0.5;
  
  tar.add(velocity2);
  
  if((tar.x >= width-20)||(tar.x <= 20)){
     velocity2.x = velocity2.x * -1;
  }
  if((tar.y >= height-20)||(tar.y <= 20)){
  	 velocity2.y = velocity2.y *- 1;
  }

  ship.seek(tar);
  ship.update();
  ship.shoot();
	ship.display();
  
  
  ship2.seek(tar2);
  ship2.update();
  ship2.shoot();
  ship2.display();
  
  bigship.seek(tar);
  bigship.display();
  bigship.update();
  bigship.fly();
  

  fill(255, 0, 153);
  ellipse(tar.x, tar.y, 20, 20);
  ellipse(tar2.x, tar2.y, 20, 20);

  
  for(let i = 0; i<meteor.length; i+=3){
  	meteor[i].display();
    meteor[i].update();
    meteor[i].checkEdges();
    ship.avoid(i);
    ship2.avoid(i);
    bigship.avoid(i);
  }
  
}

class circle{
	constructor(){
  	this.position = new createVector();
    this.velocity = new createVector(0.5, 0.3);
  }
  
  
  display(){
  	ellipse(this.position.x, this.position.y, 10, 10);
    if((ship.position >= this.position.x) && (ship.position >= this.position.y)){
       this.position = new createVector(random(100, width-100), random(100, height-100));
    }
  }
}

class Ship{
	constructor(x, y){
  	this.acceleration = new createVector(0,0);
    this.velocity = new createVector(0,-2);
    this.velocity2 = new createVector(0, -8);
    this.position = new createVector(x, y);
    this.r = 6;
    this.maxspeed = 2;
    this.maxspeed2 = this.velocity2.y;
    this.maxforce = 0.2;
    this.pos2 = new createVector(this.position.x, this.position.y);
  }
  
  update(){
 		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  applyForce(force){
  	this.acceleration.add(force);
  }
  
  seek(target){
  	var desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  avoid(ii){
  	if(this.position.dist(meteor[ii].position)<50){
      var b = p5.Vector.sub(meteor[ii].position, this.position);
      b.limit(3);
      b.y-=1;
      this.position.sub(b);
    }
  }
  
   shoot(){
    fill(255, 0, 153);
    noStroke();
    
  	ellipse(this.pos2.x, this.pos2.y+5, 3, 3);
    if(keyCode === UP_ARROW){
    this.pos2.add(this.velocity2);
    this.velocity2.limit(this.maxspeed2);
    }else if(this.pos2.y <= 0){
      
   		this.pos2.y = this.position.y+5;
      this.pos2.x = this.position.x;
    }else{
    	this.pos2.y = this.position.y+5;
      this.pos2.x = this.position.x;
    }
    
  }
  
  
  display(){
    var theta = this.velocity.heading() + PI/2;
    fill(255);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r*2);
    vertex(-this.r, this.r*2);
    vertex(this.r, this.r*2);
    endShape();
    pop();
  }
}

class Meteor{
	constructor(){
  	this.position = new createVector(random(50, 750), random(100, 600));
    this.velocity = new createVector(0, 0);
    this.mass = new createVector(random(30, 60), random(30, 60));
    this.mass2 = 1;
    this.acceleration = p5.Vector.random2D(0.01, 0.3);
    this.wind = new createVector(0.5, 0.3);
    this.topspeed = 0.5;
    
  }
  
  
  display(){
    noStroke();
    fill(252, 201, 100);
  	ellipse(this.position.x, this.position.y, this.mass.x, this.mass.y);
    ellipse(this.position.x-10, this.position.y+5, this.mass.x+10, this.mass.y+10);
    ellipse(this.position.x+10, this.position.y+7, this.mass.x+5, this.mass.y+5);
    ellipse(this.position.x, this.position.y+10, this.mass.x+5, this.mass.y+5);
    
  }
  
  update(){
  	this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    
  }
  
  checkEdges(){
  	if(this.position.x >= width+50){
    	this.acceleration.sub(this.wind);
      this.position.x = -50;
      // this.velocity.limit(this.topspeed);
    }else if(this.position.x<=-50){
    	 this.acceleration.add(this.wind);
       this.position.x = width+50;
      // this.velocity.limit(this.topspeed);
    }
    if(this.position.y>=height+50){
       this.position.y = -50;
       // this.velocity.limit(this.topspeed);
    }else if(this.position.y<=-50){
    	this.position.y = height+50; 
    }
    
  }

}

class BigShip{
	constructor(){
  	this.position = new createVector(width/2, height+100);
    this.position2 = new createVector(this.position.x, this.position.y-70);
    this.velocity = new createVector(0, -2);
    this.acceleration = new createVector(0, 0);
    this.acceleration2 = new createVector(0, 0);
    this.velocity2 = new createVector(0, -2);
    this.r = 6;
    this.maxspeed = 2;
    this.maxforce = 0.2;
  }

  update(){
    this.velocity.add(this.acceleration);
  	this.position.add(this.velocity);
    this.velocity2.add(this.acceleration2);
    this.position2.add(this.velocity2);
    this.acceleration.mult(0);
  }
  
  applyForce(force){
  	this.acceleration2.add(force);
  }
  
   seek(target){
  	var desired = p5.Vector.sub(target, this.position2);
    desired.setMag(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.velocity2);
    steer.limit(this.maxforce);
    this.applyForce(steer);
     
  }
  
   avoid(ii){
  	if(this.position2.dist(meteor[ii].position)<50){
      var b = p5.Vector.sub(meteor[ii].position, this.position2);
      b.limit(3);
      b.y-=1;
      this.position2.sub(b);
    }
   }
  
  miniships(){
  	var theta2 = this.velocity2.heading() + PI/2;
    fill(255, 0, 0);
    push();
    translate(this.position2.x, this.position2.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r*2);
    vertex(-this.r, this.r*2);
    vertex(this.r, this.r*2);
    endShape();
    pop();
  }
  
  fly(){
  	 if(this.position.y <= height/2){
       this.velocity.y = 0;
    }
  }
  
  display(){
    noStroke();
    fill(255, 0, 0);
  	triangle(this.position.x, this.position.y, this.position.x + 100, this.position.y+150, this.position.x - 100, this.position.y+150);
  }
}
