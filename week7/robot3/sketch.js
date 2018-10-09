var jeff;
var b1 = [];
var index = 0;
var obstacle = [];

function setup() {
	createCanvas(600, 400);
  jeff = new Robot(width/2, height/2);
  for (var i = 0; i < 5; i++) {
    b1[i]=new Box(50, 20+i*30);
  }
  for(var i = 0;i < 10; i++){
    obstacle[i] = new Obstacle(random(width), random(height));
  }
  rectMode(CENTER);
}

function draw() {
  background(255, 50);
	for(var i = b1.length-1; i > -1; i--){
		if(b1[i].delivered==0){
			index=i;
		}
	}
    jeff.display();
    for (var i = 0; i < obstacle.length; i++) {
      obstacle[i].display();
      jeff.avoid(i);
  }
    for(var i = 0; i < b1.length; i++){
      b1[i].display();
  }
    if(jeff.holding==0){
      jeff.move(b1[index].position.x,b1[index].position.y);
  } else{
      jeff.deliver();
      b1[index].moving();
  }
    if((p5.Vector.dist(b1[index].position,jeff.position)==0) && (b1[index].position.x<500)){
      jeff.holding=1;
      b1[index].held=1;
  }
    if(b1[index].position.x==500){
        jeff.holding=0;
        b1[index].held=0;
        b1[index].delivered=1;
  }

    //console.log(b1[index].delivered);

}

function Robot(x,y){
    this.position = createVector(x,y);
    this.holding= 0;
    this.w=20;
    this.h=33;
    this.display=function(){
      fill(50,67,225);
      rect(this.position.x,this.position.y,this.w,this.h);
    }
    this.move = function(bx,by){
      var p1 = createVector(bx,by);
      var a = p5.Vector.sub(p1,this.position);
      a.limit(2);
      this.position.add(a);
    }
    this.deliver = function(){
      this.move(500,height/2);
    }
    this.avoid = function(ii){
      if(this.position.dist(obstacle[ii].position)<50){
          var b = p5.Vector.sub(obstacle[ii].position,this.position);
          b.limit(3);
          //b.y-=1;
          this.position.sub(b);
      }
    }
}

function Box(x,y){
    this.delivered=0;
    this.position = createVector(x,y);
    this.held=0;
    this.moving = function(){
      this.position=jeff.position.copy();
    }
    this.display = function(){
      fill(255,0,0);
      rect(this.position.x,this.position.y,5,5)
    }
}

function Obstacle(x,y){
    this.position = createVector(x,y);
		this.direction = createVector(random(3), random(3));
    this.w=30;
    this.h=30;
    this.display = function(){
      fill(0);
      ellipse(this.position.x,this.position.y,this.w,this.h);
			this.position.x += this.direction.x;
			this.position.y += this.direction.y;
			if(this.position.x > width || this.position.x < 0) {
				this.direction.x *= -1;
			}
			if(this.position.y > height || this.position.y < 0) {
				this.direction.y *= -1;
			}
    }

}
