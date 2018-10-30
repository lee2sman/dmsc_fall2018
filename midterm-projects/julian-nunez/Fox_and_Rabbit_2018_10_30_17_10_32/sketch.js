/*

----Understanding Of Rules----

Rabbit:
1. Small Gray Circle.
2. Randomly Move Around the Map
3. If Crossing Border of Screen Reverse Movement
4. If distance between fox and rabbit it close move away from fox.
5. If being chased by fox and border of screen is crossed teleport to other end of screen.
6. If 3 collisions against carrots occur and carrot age is maxed, spawn new rabbit.
7. If collission of rabbit occurs with fox and there is more than one rabbit, delete this rabbit.
8. If collission of rabbit occurs with fox and there is less than one rabbit, respawn this rabbit.
9. If moving through water, movement slowed and move away from center of water.
10. Spawns top right.

Fox:
1. Bigger White Circle.
2. Randomly Move Around the Map.
3. If Crossing Border of Screen Reverse Movement
4. If Distance Between Fox and rabbit is close move towards rabbit.
5. If 3 Rabbits are collided with, spawn new fox.
6. If number of foxes is greater then number of rabbits, remove this fox.
7. If Moving through water, movement slowed and move away from center of water.
8.Spawns Bottom Right.

Carrot:
1. Spawn Randomly
2. Grow to maximum age.
3. If Rabbit collides with this carrot and age is maxed, respawn in a random position.

Water:
1.Biggest Blue Circle.
2.Slow Movement of passing fox and rabbit and repel from center.

----End of Rules----

*/

////Variables Below

//Creates Fox Array
let fox = [1];

//Creates Carrot Array
let carrot = [];

//Creates Rabbit Array
let rabbit = [1];

//Used to calculate distance between vectors
let distance;

//Currently used to track carrots eaten
let breedPoint;

//Used to create a potential force in the center of the map
let water;

//currently used to track rabbits eaten
let rabbitEaten;

//currently used to track rabbits eaten
let carrotEaten;

//Tracks when to add a new fox
let foxBreed;

//Creates Bushes around the border of the screen
let bushBot = 0;
let bushTop = 0;
let bushLeft = 0;
let bushRight = 0;

////Preloading
function preload() {
  foxImage = loadImage('foxImage.png');
  foxImageFlipped = loadImage('foxImageFlipped.png');
  rabbitImage = loadImage('rabbitImage.png');
  rabbitImageFlipped = loadImage('rabbitImageFlipped.png');
  treeImage = loadImage('treeImage.png');
  dirtImage = loadImage('dirtImage.jpg');
  carrotImage = loadImage('carrotImage.png');
  lakeImage = loadImage('lakeImage.png');
  soundFormats('wav');
  carrotChew = loadSound('carrotChew.wav');
  rabbitChew = loadSound('rabbitChew.wav');
  nature = loadSound('nature.wav');
}

////Main Setup
function setup() {

  //Creates Window for Program
  createCanvas(windowWidth, windowHeight);

  //Creates Fox Instance
  for (let i = 0; i < fox.length; i++) {
    fox[i] = new Fox();
  }

  //Creates Multiple Rabits
  for (let i = 0; i < rabbit.length; i++) {
    rabbit[i] = new Rabbit();
  }

  //Creates Multiple Instances of Carrot
  for (let i = 0; i < 25; i++) {
    carrot[i] = new Carrot();
  }

  //Starts Rabbit breed points at 0
  breedPoint = 0;

  //Starts the breed points for foxes at 0
  foxBreed = 0;

  //Currently Sets Rabbits Eaten at 0
  rabbitEaten = 0;

  //Currently Starts Carrots Eaten at 0
  carrotEaten = 0;

  //Creates an Object in the Center of the Map to act as another force
  water = new Water();
  nature.loop();
}


////Main Draw Loop
function draw() {

  //Draws Background
  //background(210, 180, 140);
  image(dirtImage, width / 2, height / 2, width, height);

  //Displays Water Class
  water.display();

  //Loop that Controls Foxes
  for (let i = 0; i < fox.length; i++) {
    fox[i].update();
    fox[i].checkEdges();
    fox[i].breed();
    fox[i].starve();
    fox[i].display();
    print("There is " + fox.length + " foxes");
  }

  //Loop that Controls Rabbits
  for (let i = 0; i < rabbit.length; i++) {
    rabbit[i].update();
    rabbit[i].checkEdges();
    rabbit[i].display();
    rabbit[i].breed();
    rabbit[i].eaten();
    //rabbit[i].breed();
    print("There is " + rabbit.length + " rabbits");
  }

  //Loop that Controls Carrots
  for (i = 0; i < 25; i++) {
    carrot[i].display();
    carrot[i].update();
    carrot[i].eaten();
  }

  //Loop for bottom bushes
  bushBot = 0;
  for (i = 0; i < 17; i++) {
    fill(100, 255, 50);
    image(treeImage, bushBot, height, 200, 200);
    bushBot += 150;
  }

  //Loop for top bushes
  bushTop = 0;
  for (i = 0; i < 17; i++) {
    fill(100, 255, 50);
    image(treeImage, bushTop, 0, 200, 200);
    bushTop += 150;
  }

  //Loop for left bushes
  bushLeft = 0;
  for (i = 0; i < 17; i++) {
    fill(100, 255, 50);
    image(treeImage, 0, bushLeft, 200, 200);
    bushLeft += 150;
  }

  //Loop for right bushes
  bushRight = 0;
  for (i = 0; i < 17; i++) {
    fill(100, 255, 50);
    image(treeImage, width, bushRight, 200, 200);
    bushRight += 150;
  }

  //Creates Ground
  fill(0, 0, 0, 125);
  rect(width - 200, height - 200, 150, 150);

  //Scoring Box
  fill(0);
  textSize(18);
  text("Carrots Eaten:" + carrotEaten, width - 190, height - 150);
  text("Rabbits Eaten:" + rabbitEaten, width - 190, height - 100);
}

////Main Fox Class
class Fox {
  constructor() {
    this.position = new createVector(width - 1, height - 1);
    this.velocity = new createVector();
    this.acceleration = createVector();
    this.topspeed = 5;
    this.slow = 2;
    this.life = 255;
  }
  display() {
    fill(255, this.life);
    imageMode(CENTER);
    if (this.velocity.x < 0) {
      image(foxImage, this.position.x, this.position.y, 100, 100);
    }
    if (this.velocity.x > 0) {
      image(foxImageFlipped, this.position.x, this.position.y, 100, 100);
    }
  }
  update() {
    for (let i = 0; i < rabbit.length; i++) {
      if (this.position.dist(rabbit[i].position) < 300) {
        this.position.x = lerp(this.position.x, rabbit[i].position.x, 0.06);
        this.position.y = lerp(this.position.y, rabbit[i].position.y, 0.06);
      }
    }
    if (this.position.dist(water.position) < 50) {
      this.position.x = lerp(this.position.x, water.position.x, -0.06);
      this.position.y = lerp(this.position.y, water.position.y, -0.06);
    } else {
      this.acceleration = p5.Vector.random2D();
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topspeed);
      if (this.position.dist(water.position) < 100) {
        this.velocity.sub(this.slow);
      }
      this.position.add(this.velocity);
      if (fox.length > rabbit.length) {

      }
    }
  }
  checkEdges() {
    this.position.add(this.velocity);
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
    }
    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -1;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
    }
  }
  breed() {
    for (let i = 0; i < fox.length; i++) {
      if (foxBreed > 2) {
        fox.push(new Fox());
        foxBreed = 0;
      }


    }
  }
  starve() {
    for (let i = 0; i < fox.length; i++) {
      if (fox.length > rabbit.length) {
        this.life -= 5;
        if (this.life < 0) {
          fox.splice(i, 1);
        }
      }
    }
  }
}

////Main Rabbit Class
class Rabbit {
  constructor() {
    this.position = new createVector(1, 1);
    this.velocity = new createVector();
    this.acceleration = createVector();
    this.topspeed = 6;
  }
  display() {
    fill(150, 255);
    imageMode(CENTER);
    if (this.velocity.x < 0) {
      image(rabbitImage, this.position.x, this.position.y, 50, 50);
    }
    if (this.velocity.x > 0) {
      image(rabbitImageFlipped, this.position.x, this.position.y, 50, 50);
    }
  }

  update() {
    for (let i = 0; i < fox.length; i++) {
      if (this.position.dist(fox[i].position) < 200) {
        this.position.x = lerp(this.position.x, fox[i].position.x, -0.04);
        this.position.y = lerp(this.position.y, fox[i].position.y, -0.04);
      }
    }
    if (this.position.dist(water.position) < 50) {
      this.position.x = lerp(this.position.x, water.position.x, -0.06);
      this.position.y = lerp(this.position.y, water.position.y, -0.06);
    } else {
      this.acceleration = p5.Vector.random2D();
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topspeed);
      if (this.position.dist(water.position) < 100) {
        this.velocity.sub(this.slow);
      }
      this.position.add(this.velocity);
    }
  }
  checkEdges() {
    this.position.add(this.velocity);
    for (let i = 0; i < fox.length; i++) {
      if (this.position.dist(fox[i].position) < 200) {
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
      } else {
        if (this.position.x > width) {
          this.position.x = width;
          this.velocity.x *= -1;
        }
        if (this.position.x < 0) {
          this.position.x = 0;
          this.velocity.x *= -1;
        }
        if (this.position.y > height) {
          this.position.y = height;
          this.velocity.y *= -1;
        }
        if (this.position.y < 0) {
          this.position.y = 0;
          this.velocity.y *= -1;
        }
      }
    }

  }


  eaten() {
    for (let i = 0; i < rabbit.length; i++) {
      for (let i = 0; i < fox.length; i++) {
        distance = this.position.dist(fox[i].position);
        if (distance < 50) {
          this.position.y = random(height);
          this.position.x = random(width);
          rabbitEaten += 1;
          rabbitChew.setVolume(0.2);
          rabbitChew.play();
          if (rabbit.length > 1) {
            rabbit.splice(i, 1);
            foxBreed += 1;
          }
        }
      }
    }
  }


  breed() {
    for (let i = 0; i < rabbit.length; i++) {
      if (breedPoint > 2) {
        rabbit.push(new Rabbit());
        breedPoint = 0;
      }


    }
  }

}

////Main Carrot Class
class Carrot {
  constructor() {
    this.position = new createVector(random(width), random(height));
    this.growth = new createVector(0, 0);
    this.time = new createVector(0.1, 0.1);
    this.maxGrowth = 35;
  }
  display() {
    fill(255, 127, 80);
    noStroke();
    image(carrotImage, this.position.x, this.position.y, this.growth.x, this.growth.y);
    fill(0, 255, 0);
    noStroke();
    //ellipse(this.position.x, this.position.y, this.growth.x - 10, this.growth.y - 10);
  }
  update() {
    this.growth.add(this.time);
    this.growth.limit(this.maxGrowth);
  }
  eaten() {

    for (let i = 0; i < rabbit.length; i++) {
      distance = this.position.dist(rabbit[i].position);
      if (distance < 25 && this.growth.x > 16) {
        this.position.y = random(height);
        this.position.x = random(width);
        this.growth.x = 0.1;
        this.growth.y = 0.1;
        breedPoint += 1;
        carrotEaten += 1;
        carrotChew.setVolume(0.2);
        carrotChew.play();
      }


    }
  }
}

////Main Water Class
class Water {
  constructor() {
    this.position = new createVector(width / 2, height / 2);
    this.size = new createVector(500, 500);
  }
  display() {
    fill(0, 0, 255);
    imageMode(CENTER);
    image(lakeImage, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}