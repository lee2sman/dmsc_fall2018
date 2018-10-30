function getRandomSize() {
  
  let r = pow(random(0.1, 1), 5);
  return constrain(r * 20, 2, 20);  
  
  
  
}

class Snowflake {
  
 constructor() {
    let x = random(100,700);
    let y = random(-100,-10);
   
   this.pos = createVector(x,y);
   this.vel = createVector(0, 0);
   this.acc = createVector();
   this.r = getRandomSize();
   
 } 
 
  
  applyForce(force){
    let f = force.copy();
    f.mult (this.r);
    
    
    //let f = force.copy();
    //f.div(this.mass);
   this.acc.add(f); 
    
  }
  
  
  randomize() {
     let x = random(100,700);
    let y = random(-10,10);
   
   this.pos = createVector(x,y);
   this.vel = createVector(0, 0);
   this.acc = createVector();
   this.r = getRandomSize();
   
  }
  
  
  
  
  update(){
   
  this.vel.add(this.acc); 
  this.vel.limit(this.r * 0.2);
    
  if( this.vel.mag() < 1) {
      this.vel.normalize();
      
    }
    
  this.pos.add(this.vel); 
  this.acc.mult(0); 
    
    //if (this.pos.y > 280 + this.r) {
    if (this.offScreen()) {
        this.randomize();
  }
     
  }
  
  render() {
    stroke(255);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
    
  } 
  
  offScreen() {
    return (this.pos.y > 280 + this.r ||
           this.pos.x < -this.r||
           this.pos.x > 700 + this.r);
  }
  
  
  
}