//to simulate the spread of disease and how sells operate in a unified but irractic way
//when the queen is touched, it turns a cell red to show it is infected, spreading the virus / whatver
//it may be


const queens = [];
const cells = [];
let canvas = null;


var infect = false;

function setup() {
  canvas = createCanvas(800, 800);

  for (var i = 0; i < 2; i++) {
     w = random(width);
    const h = random(height);
    const size = random(20, 50);
    queens.push(new Queen(w, h, size, 'red'));
  }

  for (var j = 0; j < 70; j++) {
    const w = random(width);
    const h = random(height);
    const size = random(5, 20);
    cells.push(new Cell(w, h, size, 'red'));
  }
}

function draw() {
  background(220);
  cells.forEach(cell => {
    cell.show();
    cell.move();
  });
  


  for (var i = 0; i < queens.length; i++) {
    for (var j = 0; j < cells.length; j++) {
      const hit = queens[i].hit(cells[j]);
      if (hit) {
        cells[j].color = 'red';
        i + 1 
        

        infect == true;
        
        if (infect == true){
          i++
          
          
        }
        
        break;
      } else cells[j].color = 'green'

      j + 1;
    }
  }

  queens.forEach(queen => queen.show());
  
}

class Element {
  constructor(x, y, size, color) {
    this.position = new createVector(random(100), random(100));
    this.velocity = new createVector(random(1,4), random(1,5));
    this.acceleration = new createVector(-0.01,0.1);
    this.topspeed = 5;
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.position = new p5.Vector(this.x, this.y);
    
    
     this.x += this.xa;
    this.y += this.ya;
    if (this.x > width - this.width || this.x < 0) {
      this.xa *= -1;
      if (this.x > width / 2) {
        this.x = width - this.width;
      } else {
        this.x = 0;
      }
                      
    }
    
    
  }

  show() {
    const c = color(this.color);
    c.setAlpha(150);
    fill(c);
    rectMode(CENTER)
    ellipse(this.position.x, this.position.y, this.size, this.size)
  }
}

class Cell extends Element {
  move() {
    this.position.add(p5.Vector.random2D())
  }
}
class Queen extends Element {
  hit(player) {
    if (Math.abs(this.position.x - player.position.x) < this.size / 2 + player.size / 2 && Math.abs(this.position.y - player.position.y) < this.size / 2 + player.size / 2) return true;
  }
}