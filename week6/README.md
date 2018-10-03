# Week 6

* Vectors review
* Discuss Metacreation
  * emergence
  * a pivot between living things and technological systems
  *

> New media art self-consciously reworks technology into culture, and rereads technology as culture. What's more, it does so in a concrete, applied way; it manipulates the technology itself, with a nonindustrial latitude that admits misapplication and adaptation, rewiring and hacking, pseudofunctionality and accident. *p.5, Metacreation*

> A-life begins with a notion of life that is wholly materialistic, involving no soul, vital force, or essence. In the words of the convenor of the first artificial life workshop, Christopher Langton, 'Living organisms are nothing more that complex biochemical machines.' Langton contends that rather than being any special substance or force, life is 'a property of the organization of matter.' Further, this organization is not simply a complex structure  but a dynamic structure, a system active in real time: for a-life, life is most importantly manifest in behavior. *p.7, Metacreation*

Tenets of this approach:
  * no central organizer/intelligence
  * bottom-up structure
  * emergence produces lifelife systems
  * as opposed to the study of AI, A-life does not focus on intelligence but on behaviors and is not top-down, procedural

Systems:
  * genetic algorithms
    - separate beings (genotypes) with behaviors (phenotypes)
  * agent-based systems
    - models individuals in an artifical world
  * cellular automata
    - an array of individual cells computed with a set of simple rules governing a cell's future state, as affected by the current state of its neighbor cells

> We are no longer creating a work, we are creating creation...We are able to bring forth...results...which go beyond the intentions of their originators, and this in infinite number. -- Nicholas Schöffer *p.16, Metacreation*

Cybernetic art

Can we make a living cyborg art form?

## Resources / works of Genetics
adapted from [Tega Brain](https://github.com/tegacodes/Drawing-Seeing-Moving-with-Code/blob/gh-pages/docs/lectures/L-06-GeneticExamples.md)

### Cellular Automata
[Steven Hawkings on John Conway's Game of Life:]( https://www.youtube.com/watch?v=CgOcEZinQ2I&feature=share&list=FLwikA_t8e6TSJW-L-lAHkKw)

Conway's Game of Life - [Javascript implementation]( http://pmav.eu/stuff/javascript-game-of-life-v3.1.1/)

 ### Genetic Algorithms
[Karl Sims - Evolved Virtual Creatures](https://www.youtube.com/watch?v=JBgG_VSP7f8)

[Jer Thorp - Smart Rockets](http://www.blprnt.com/smartrockets/)

[Box Car 2D](http://boxcar2d.com/)

# Forces

Goal: Have a number of objects move independently and respond to environmental forces.

A force is a vector that causes an object with mass to accelerate.

### Newton's 3 Laws of Motion

1. 	An object at rest remains at rest or an object in motion stays in motion at a constant velocity (speed and direction), unless acted upon by a force.
2. Force equals mass times acceleration.
3. For every action there is an equal and opposite reaction. Forces occur in pairs, in equal strength, in opposite directions.

**Mass** - measure of matter in an object, (in kilograms)  
**Weight** - the force of gravity on an object (in newtons)  
**density** - mass per unit (such as grams per centimeter)  

In our sketches, **the acceleration of an object is its force**.

Pseudocode - concept

```
//this is Pseudocode to understand a concept!
class Mover {
  vector location;
  vector velocity;
  vector acceleration;
  }
}
// example methods
mover.applyForce(wind);
mover.applyForce(gravity);

function applyForce(vector force) {
  acceleration = force;
}
```

Note: the force really needs to reflect the total of all of the forces acting together: wind, gravity, and anything else. This could change from moment to moment, such as changing wind, so we need to recalculate every draw loop. We can do this by multiplying the acceleration by 0 at the end of a loop.

```
function update() {
    velocity.add(acceleration);
    location.add(velocity);
    acceleration.mult(0);
 }
 ```

Now, let's work in actual Javascript/P5JS.
Let's create a mover, and apply a force to it.

```
//modified from Daniel Shiffman's The Nature of Code

let m;

function setup() {
  createCanvas(640, 360);
  m = new Mover();
}

function draw() {
  background(50);

  let wind = createVector(0.01, 0); //change it's x value to move to the right
  m.applyForce(wind);

  m.update(); //change position
  m.display(); //draw to screen
  m.checkEdges(); //did we run off screen?
}
```


Now that we have the basic code mocked out, we need to build the actual Mover class.

```
class Mover {
  constructor() {
    this.mass = 1;
    this.position = createVector(30, 30);
    this.velocity = createVector(0, 0); //starts at 0 until applied
    this.acceleration = createVector(0, 0); //starts at 0 until applied
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass); //derived from Newton's Second Law
    this.acceleration.add(f); //add all the forces together (wind, gravity, etc)
  }

  update() {
    this.velocity.add(this.acceleration);  //acceleration is added to velocity
    this.position.add(this.velocity);  //velocity is added to position to get the next position
    this.acceleration.mult(0); //we reset the force to 0 at end
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    ellipse(this.position.x, this.position.y, 48, 48);
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }

}
```


Our full [code example](https://editor.p5js.org/2sman/sketches/SJ3EZE-9Q).

At this point, we have a single mover.
We can create an array of movers, each with their own starting position, and forces acting on them.

```
//modified from Dan Shiffman Nature of Code
let movers = [];

function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < 20; i++) { //initializing an array of 20 movers
    movers[i] = new Mover(random(0.1, 5), 0, 0);
  }
}

function draw() {
  background(255);

  for (let i = 0; i < movers.length; i++) { //this runs in a loop, so that it affects all movers individually
    let wind = createVector(0.01, 0);
    let gravity = createVector(0, 0.1);
    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}
```

Notice the smaller movers are faster. Acceleration is force divided by mass, so larger masses have smaller accelerations.

# Homework

* Read about Attraction Forces in Chapter 2 of Nature of Code
* Watch Dan Shiffman's [tutorials](https://www.youtube.com/watch?v=II1A3bBo6gM&list=PLRqwX-V7Uu6ZRrqLcQ5BkBKmBLiGD8n4O) on forces.
* At this point, you should have the beginning of an ecosystem project that you can work on for several weeks, refining. Add forces into your creature project and submit a moving creature (or two) that experiences forces.
* Read Chapter 3, and test out some of the examples, add an attraction force and some sort of oscillation to your ecosystem project. [Chapter 3 p5js code](https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp03_oscillation)
