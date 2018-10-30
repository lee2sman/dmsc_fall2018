let myFireflies = [];
let myBugs = [];

let howMany;
let howManyBugs;

let pianoClips = [];
let bassClips = [];

let spacing;

let osc ,env, decTime;

let oscTimer, oscTimerMax;

let size;

let bugSpawnClip;

function preload() {

  pianoClips.push(loadSound("shortPianoC.mp3"));
  pianoClips.push(loadSound("shortPianoG.mp3"));
  pianoClips.push(loadSound("shortPianoE.mp3"));
  pianoClips.push(loadSound("shortPianoB.mp3"));
    
  bassClips.push(loadSound("C.wav"));
  bassClips.push(loadSound("G.wav"));
  bassClips.push(loadSound("B.wav"));
  bassClips.push(loadSound("C8va.wav"));
    
  bugSpawnClip = loadSound("respawnNoise.mp3");
    
//    
//  for(let i=0; i < bassClips.length; i++)
//      {
//          bassClips[i].loop();
//      }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
    
  smooth(.5);
  colorMode(HSB);


  
  
  
  spacing = 40;
  howMany = 10;

  for (let i = 0; i < howMany; i++) {
    myFireflies.push(new Firefly(random(1, 10), random(width), random(height)));
  }
    
  for (let i=0; i<3; i++){
    myBugs.push(new Bug(random(10, 30), random(width), random(height)))
  }


  noStroke();

  background(10);
  
  //toggleNormalize(1);

}

function keyPressed() {
  myFireflies.push(new Firefly(random(1, 10), 0, 0));
  

}


function draw() {
  howMany = myFireflies.length;

  //background(250);
  background(20);

    
     if(myFireflies.length > 20)
          {
              myFireflies.splice(0,1);
          }
    
    if(myBugs.length > 20)
          {
              myBugs.splice(0,1);
          }
    
  for (let i = 0; i < myFireflies.length; i++) {
      
    myFireflies[i].update();
    myFireflies[i].display();
    myFireflies[i].playSound();
    myFireflies[i].multiply();
    myFireflies[i].die();
  }
    
    for (let i = 0; i < myBugs.length; i++) {
    myBugs[i].update();
    myBugs[i].display();
    //myBugs[i].applyForce(myBugs[i].forceVector);
  }


}

class Firefly {

  constructor(tmass, tx, ty) {
    this.mass = tmass;
    this.pos = createVector(tx, ty);
    this.vel = createVector(10, 10);
    this.acc = createVector(0, 0);
    this.mScale = 1;

    this.drag = createVector(0.5, 0.5);


   
    this.c = color(random(0, 255), 200, 200);

    //Movement

    this.timer = 0;
    this.timeMax = 100;
    this.speed = 10;
    this.myForce = createVector(random(-this.speed, this.speed), random(-this.speed, this.speed));
      
    this.forceVector = p5.Vector.random2D()
    this.forceVector = this.forceVector.mult(random(2,20));

    //Sound

    this.clip = pianoClips[round(random(0, 3))];


    this.env = new p5.Envelope();
    this.env.setADSR(0.005, 0.01, 0, 0.01);
    this.env.setRange(1, 0);

    this.osc = new p5.Oscillator();
    this.osc.setType('sine');
    this.osc.amp(this.env);

    //this.osc.start();
    this.osc.freq(800);

    this.oscTimer = 0;
    this.oscTimerMax = 0;

    this.freqLow = random(600, 800);
    this.freqHigh = random(900, 1000);

    //multiplication
    this.spawned = false;
    
    this.lifeTimer =0;
    this.jump();
      
    //LifeSpan
      
    this.lifeSpan = ceil(random(15,50));

  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.vel.add(f);
  }

  update() {
      
    

    //fill(255,20,40);
    fill(this.c);
    ellipse(mouseX, mouseY, spacing, spacing);


    this.vel.div(1.02);
    this.pos.add(this.vel);
    this.acc.mult(0);


    this.timer++;

    if (this.timer > this.timeMax) {
      this.jump();
    }


    //PACMANING
    if (this.pos.x < 0) {
      this.pos.x = width;
    }

    if (this.pos.x > width) {
      this.pos.x = 0;
    }

    if (this.pos.y < 0) {
      this.pos.y = height;
    }

    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    ///

  }
  
  jump()
  {
      
      this.lifeSpan--;
      
      
      
      this.timer = 0;

      this.speed = random(4, 20);
      this.myForce = createVector(random(-this.speed, this.speed), random(-this.speed, this.speed));

      this.vel = this.myForce;
      this.timeMax = ceil(random(80, 120));
      //this.clip.play();
  }

  display() {
    //fill(240,200,0);
    fill(this.c);
    this.size = map(this.vel.mag(), 0, 15, 60, 20)
    this.size = constrain(this.size, 5, 60);
    

    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
  playSound() {

    this.oscTimerMax = map(this.vel.mag(), 0, 10, 30, 17);

    //original frequency range is 900 to 1600
    this.osc.freq(map(this.vel.mag(), 0, 10, this.freqLow, this.freqHigh));

    this.mappedMaxVol = map(this.size,1,20,0.1,0.4); 
    this.clip.setVolume(map(this.vel.mag(), 0, 10, 0.1, this.mappedMaxVol));

    this.oscTimer++;

    if (this.oscTimer > this.oscTimerMax) {

      this.clip.play();
      this.clip.pan(map(this.pos.x, 0, width, -1.0, 1.0));


      this.osc.pan(map(this.pos.x, 0, width, -1.0, 1.0));
      this.env.play();
      this.oscTimer = 0;
      fill(100);
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

  }

  multiply() {
      
     
      
    this.lifeTimer++;
    //print(this.lifeTimer);
    let fx = 0;
    let fy = 0;
    for (let i = 0; i < myFireflies.length; i++) {

      fx = myFireflies[i].pos.x;
      fy = myFireflies[i].pos.y;

      if ((this.lifeTimer > 100 )&& this.pos.dist(myFireflies[i].pos) < 15 && (i != myFireflies.indexOf(this)))
      {
				myFireflies.push(new Firefly(random(1, 10), fx + random(spacing,spacing*2), fy + random(spacing,spacing*10)));
        myFireflies[myFireflies.length - 1].c = color(hue(this.c) + random(0, 10), 200, 200);
        
      }


    }
      
      

  }
    
    die()
    {
        if(this.lifeSpan == 0)
          {
              let fInd = myFireflies.indexOf(this);
              //myFireflies.splice(fInd);
          }
    }








}

class Bug {

  constructor(tmass, tx, ty) {
      
    this.mass = tmass;
    this.pos = createVector(tx, ty);
    this.vel = createVector(random(-10,10), random(-10,10));
    this.acc = createVector(0, 0);
    this.mScale = 1;

    this.drag = createVector(0.5, 0.5);


    //color 
    this.sat = 0;
    this.hue = random(0,255);
    this.brightness = random(150,250);
    
    this.c = color(this.hue, this.sat, this.brightness);
    
    //Movement

    this.timer = 0;
    this.timeMax = 100;
    this.speed = 10;
    this.myForce = createVector(random(-this.speed, this.speed), random(-this.speed, this.speed));
      
    this.size = random(60,300);

    //Sound

    this.osc = new p5.Oscillator();
    this.osc.setType('sine');
    this.osc.amp(this.env);

    //this.osc.start();
    
    this.fr = random(this.freqLow,this.freqHigh);
      
    this.osc.freq(this.fr);

    this.oscTimer = 0;
    this.oscTimerMax = 0;

    this.freqLow = random(600, 800);
    this.freqHigh = random(900, 1000);
      
    this.satMax = random(100,200);

    //multiplication
    this.spawned = false;
      
    //Sound clips
      
        this.randClipIndex = floor(random(0,bassClips.length-1));
        this.clip = bassClips[this.randClipIndex];
        this.clip.play();
        this.clip.rate(1);
        this.clip.loop();
      
        this.vol = 0;
        this.clip.setVolume(this.vol);
    

  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.vel.add(f);
  }
    
  bloom(){
      
    this.osc.freq(this.fr);
      
    
    
      
    this.vol = map(this.sat, 0, this.satMax, 0, .5);
    this.vol = constrain(this.vol,0,.5);
    this.clip.setVolume(this.vol);
    
      
    this.sat+=2;
    this.fr += 1;
      
    if(this.sat > this.satMax)
        {
            //push new bug
            this.sat = 0;
            this.fr = random(this.freqLow,this.freqHigh);
            
            this.vol =0;
            this.satMax = random(100,200);
            myBugs.push(new Bug(random(10, 30), this.pos.x,this.pos.y))
            bugSpawnClip.play();
            
        }
      
  }

  update() {
 
    for(let i=0; i<myFireflies.length; i++)
        {
            if(myFireflies[i].pos.x < this.pos.x + (this.size/2) && myFireflies[i].pos.x > this.pos.x - (this.size/2))
               {
                   
                   if(myFireflies[i].pos.y < this.pos.y + (this.size/2) && myFireflies[i].pos.y > this.pos.y - (this.size/2))
                    {
                        
                        //let ind = myFireflies.indexOf(myFireflies[i]);
                        //myFireflies.splice(ind);
                        
                        this.bloom();
                    }
               }
        }
    

    this.vel.div(1.02);
    this.pos.add(this.vel);
    this.acc.mult(0);


    this.timer++;
      
    this.c = color(this.hue, this.sat, this.brightness);

    //PACMANING
    if (this.pos.x < 0) {
      this.pos.x = width;
    }

    if (this.pos.x > width) {
      this.pos.x = 0;
    }

    if (this.pos.y < 0) {
      this.pos.y = height;
    }

    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    ///

  }
  
  display() {

    fill(this.c);

    rect(this.pos.x, this.pos.y, this.size, this.size);
  }


}