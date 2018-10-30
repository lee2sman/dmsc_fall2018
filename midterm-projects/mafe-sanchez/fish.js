class Fish {
   
  constructor() {
    let x = random(0,500);
    let y = random(200,50);
   
   this.pos = createVector(this.x,y);
   this.vel = createVector(20);
   this.acc = createVector(.1);
    } 
  
  render() {
    image(fishImg, 300, 400)
    
  }
  
  //  display() {
  //   image(fishImg, 300, 400 )
  // }
  
  
   update(){
   
  this.vel.add(this.acc); 
  this.vel.limit(0.2);
    
  if( this.vel.mag() < 1) {
      this.vel.normalize();
      
    }
    
  this.pos.add(this.vel); 
     //this.pos.add(this.pos.x + this.vel);
  this.acc.mult(0); 
     
   }
  
  checkEdges() {

    if (this.position.x > width) {
      this.position.x = 0;
    }
    else if (this.position.x < 0) {
      this.position.x = width;
    }
       if (this.position.y > height) {
      this.position.y = 0;
    }
    else if (this.position.y < 0) {
      this.position.y = height;
     }
  }
  
  
  
    
  
  
}