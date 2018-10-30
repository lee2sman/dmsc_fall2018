let targets = []
let swimmers = []
let t = 5
let s = 0
let rnd = 1
let evo = 0
//let h = [];


function setup() {
  createCanvas(800, 800);

  //INITIALIZE SWIMMER PARTICLE SYSTEM
  swimmers = new SwimmerPS(createVector(width / 2, 50));
  //ADD INITIAL AMOUNT OF SWIMMERS
  for (var i = 0; i < 2; i++) {
    swimmers.addParticle(random(0, width), random(0, height))
  }

  //INITIALIZE TARGET PARTICLE SYSTEM
  targets = new TargetPS(createVector(width / 2, 50));
  //ADD INITIAL AMOUNT OF TARGETS
  for (var j = 0; j < t; j++) {
    targets.addParticle(random(0, width), random(0, height))
  }



}

function draw() {
  background(40, 40, 60);
 // print(targets.particles.length);
  
  swimmers.run()
  targets.run()
  
  if(targets.particles.length<=0){
    rnd+=1
    t+=5
    s+=1
     for (var j = 0; j < t; j++) {
    targets.addParticle(random(0, width), random(0, height))
  }
    
      for (var i = 0; i < s; i++) {
    swimmers.addParticle(random(0, width), random(0, height))
  }

  }

  
  //TEXT TEXT TEXT
  noStroke()
  fill(255,255,255,90)
  textSize(35)
  text("ROUND: " + rnd, 310,770)
  textSize(15)
  text("CREATURES EVOLVED: " + evo, 310,730)
  
  textStyle(BOLD);
    noStroke()
  fill(255,255,255,90)
  textSize(45)
  text("SPLORE", 285,70)
}


        

class Swimmer {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-4, 4), random(-4, 4));
    this.accel = createVector(0, 0);
    this.mass = 1;
    this.maxforce = random(0.05, 0.1)
    this.maxspeed = random(4,6)
    this.time = random(1500, 2000);
    this.size = 20
    this.evolved = false

  }

  run() {
    this.display()
    this.update()
    this.wrap()
    //this.turn()
    	
    for (var j = 0; j < targets.particles.length; j++) {
      this.seek(targets.particles[j].position)
      this.arrive(targets.particles[j].position)
    }
    //DEFEND IF SIZE IS GREATER THAN OTHER SWIMMERS
     for (var i = 0; i < swimmers.particles.length; i++) {
       if(this.size>=40&&swimmers.particles[i].size<40){
        // this.arrive(swimmers.particles[i].position)
       this.defend(swimmers.particles[i].position)
       }
     }
    
  }

  display() {
    if(this.size<40){
  strokeWeight(2)
    stroke(255)
    fill(255, 80, 80);
    ellipse(this.position.x, this.position.y, this.size);
       fill(255);
    ellipse(this.position.x, this.position.y, this.size/2.5);
       fill(50);
    ellipse(this.position.x, this.position.y, this.size/3.0);
    }
    
    if(this.size>=40){
  
  strokeWeight(2)
    stroke(255)
    fill(255, 155, 253);
    ellipse(this.position.x, this.position.y, this.size);
        fill(255);
    ellipse(this.position.x, this.position.y, this.size/2.5);
       fill(50);
    ellipse(this.position.x, this.position.y, this.size/3.0);
    }
    
     if(this.size>=60){
       if(this.evolved===false){
        this.evolved = true
         evo += 1
       }
  this.size=60;
       this.maxspeed=1
  strokeWeight(2)
    stroke(255)
    fill(100);
    ellipse(this.position.x, this.position.y, this.size);
        fill(255,100,100);
    ellipse(this.position.x, this.position.y, this.size/2.5);
       fill(225,20,20);
    ellipse(this.position.x, this.position.y, this.size/3.0);
    }
  
  
  }




  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.accel.add(f);
  }



  update() {

    this.velocity.add(this.accel);
    this.position.add(this.velocity);
    this.accel.mult(0);
    //this.velocity.limit(this.maxspeed);
    //this.accel = p5.Vector.random2D();
  }


  arrive(target) {
    //CREATES DESIRED VECTOR
    var desired = p5.Vector.sub(target, this.position)
    var d = this.position.dist(target)
    
    if (d < 50) {
      var m = map(d,100,0,0,this.maxspeed);
      this.velocity.setMag(m); 
    } else {
      this.velocity.setMag(this.maxspeed);
    }

  }

  seek(target) {
    //CREATES DESIRED VECTOR
    var desired = p5.Vector.sub(target, this.position)
    var d = this.position.dist(target)
    
    if(d<350){
    desired.setMag((this.maxspeed))
    var steer = p5.Vector.sub(desired, this.velocity)
    steer.limit(this.maxforce);
    this.applyForce(steer);
    }
  }
  
   defend(target) {
    //CREATES DESIRED VECTOR
    var desired = p5.Vector.sub(target, this.position)
    var d = this.position.dist(target)
    
    if(d<300){
    desired.setMag(this.maxspeed)
    var steer = p5.Vector.sub(desired, this.velocity)
    steer.limit(this.maxforce);
    this.applyForce(steer);
    }
  }


  turn() {
    if (millis() > this.time) {
      this.time += random(1000, 1500);
      print("turn");
      let jolt = createVector(random(-2, 2), random(-2, 2))
      this.applyForce(jolt)
      //this.velocity.add (p5.Vector.random2D())

    }
  }

  wrap() {

    if (this.position.x > width) {
      this.position.x = 0;
    }

    if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    }

    if (this.position.y < 0) {
      this.position.y = height;
    }

  }
  
    isDead() {
     
      for (var i = 0; i < swimmers.particles.length; i++) {
    if (this.position.dist(swimmers.particles[i].position)<(swimmers.particles[i].size/2)
        &&this.size<(swimmers.particles[i].size)&&swimmers.particles[i].size>=40
        &&swimmers.particles[i].size<60) {
      swimmers.particles[i].size+=1
      return true;
    }
 	 	} 
   }
  


}

class Target {
  constructor() {
    this.position = createVector(random(0, width), random(0, height))

    //this.velocity = createVector( random(-4, 4), random(-4, 4));
    this.velocity = createVector(0, 0);
    this.accel = createVector(0, 0);
    this.mass = 1;
    this.maxforce = random(0.025,1)
    this.maxspeed = random(2, 6);
    this.noff = createVector(random(1000), random(1000));
    this.size = 20
  }




  run() {
    this.display()
    this.update()
    this.wrap()
     this.move()
    
  }


  display() {
    strokeWeight(2)
    stroke(255)
    fill(170,190,225)
    ellipse(this.position.x, this.position.y, this.size)
      fill(255);
    ellipse(this.position.x, this.position.y, this.size/2.5);
       fill(50);
    ellipse(this.position.x, this.position.y, this.size/3.0);
  }


  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.accel.add(f);
  }



  update() {

    this.velocity.add(this.accel);
    this.position.add(this.velocity);
    this.accel.mult(0);
    this.velocity.limit(this.maxspeed);
    //this.accel = p5.Vector.random2D();
  }

  
  move() {

    //this.position.x = map(noise(this.noff.x), 0, 1, 0, width);
    //this.position.y = map(noise(this.noff.y), 0, 1, 0, height);
    //this.noff.add(0.009, 0.007);
    this.velocity.add(random(-1,1),random(-1,1))
  }

  wrap() {

    if (this.position.x > width) {
      this.position.x = 0;
    }

    if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    }

    if (this.position.y < 0) {
      this.position.y = height;
    }

  }

   isDead() {
     
      for (var i = 0; i < swimmers.particles.length; i++) {
    if (this.position.dist(swimmers.particles[i].position)<(swimmers.particles[i].size/2)&&swimmers.particles[i].size<=60) {
      swimmers.particles[i].size+=2
      return true;
    } 
 	 	}
   }
}

class SwimmerPS {

  constructor(x, y) {

    this.particles = [];
    this.origin = createVector(x, y);
  }

  addParticle(x, y) {
    if (x !== undefined && y !== undefined) {
      this.particles.push(new Swimmer(x, y));
    } else {
      this.particles.push(new Swimmer(this.origin.x, this.origin.y));
    }
  }

  run() {
    for (let Swimmer of this.particles) {
      Swimmer.run();
    }
    
      this.particles = this.particles.filter(Swimmer => !Swimmer.isDead());
    
  }

}

class TargetPS {

  constructor(x, y) {

    this.particles = [];
    this.origin = createVector(x, y);
  }

  addParticle(x, y) {
    if (x !== undefined && y !== undefined) {
      this.particles.push(new Target(x, y));
    } else {
      this.particles.push(new Target(this.origin.x, this.origin.y));
    }
  }

  run() {
    //RUN PARTICLES
    for (let Target of this.particles) {
      Target.run();
    }

  
  this.particles = this.particles.filter(Target => !Target.isDead());
}

}