# Week 4

Review Classes and Objects
* in ES6
* constructor, methods, default arguments

Critique Assignment 1 "Tamagotchi Project"

Intro to Nature of Code


### A Random Walker

Let's use the basics of classes and objects that we learned last week to build a random walker. We'll define our creature as being a point. For its properties, it has a position at x,y. We'll give it two behaviors: the ability to step (walk), and the ability to be seen (displayed on screen).

Our creature has a 25% chance of going up, down, right or left each time it moves. It runs this once per draw loop.

We can start this by creating a Walker class, creating a constructor to assign it x, y position, and then specify the step and display methods.

We will declare our new Walker by declaring it globally and then assigning it in our setup.

```
let walker;

function setup(){
  createCanvas(200,200);
  walker = new Walker();
}

function draw(){
  walker.step();
  walker.display();
}  
```

[example code](https://editor.p5js.org/2sman/sketches/Hy7QlnCOm)

### Random walker with more walking choices

We can rework our code to allow more walking options. We have the 8 orthogonal and diagonal directions plus *not moving*, so 9 possible movements.

To determine direction, we could expand our previous code and pick a random number between 0 to 8. Another option is to pick 1 of 3 random x steps (-1, 0, 1) and 1 of 3 random y steps (-1, 0, 1). This would give us a 11.1% chance of any particular direction being selected.

### Choosing random numbers with non-uniform distribution

Having an equal chance of moving any direction may not be the best way to simulate nature.

[example code](https://editor.p5js.org/2sman/sketches/SkTQVn0u7) showing a variation for a walker with a 40% chance of moving to the right.

### "Normal distribution" of randomness

Let's consider randomness in the real world. We are familiar with the concept of average, and most likely with bell curves. In such a distribution, most values will tend to cluster in the center, with outlying values decreasing as they move higher or lower, and tapering off at the extreme ends.

This is what as known as a "normal distribution" of randomness. It also has the more unique name "Gaussian distribution," named for the mathematician Carl Gauss.

![bell curve](../images/bell_curve.jpg)

We call the average the **mean**. Standard deviation tells us the amount of variation from the mean. A lower standard deviation means our values are clustered around the mean, and a higher standard deviation tells us we have much more variance of values from the mean. FYI standard deviation is calculated by: for each value in our set, calculate the difference between that value and the mean (average). Then square the result (multiply it by itself). Find the average (mean) of all these results, then take the square root of that mean. This number is the standard deviation.

#### Gaussian function

To get more natural results in the form of a bell curve-like set of values, we can use a Gaussian function.

In p5js, we use the ```randomGaussian()``` function which returns random numbers with a mean of zero (the values cluster around zero) and a standard deviation of one.

We can adjust the value to our parameters by multiplying it by the standard deviation and adding the mean.

[example code](https://editor.p5js.org/2sman/sketches/BkrrPhROX)

#### Perlin Noise

In p5js we have several ways to generate random numbers. We've covered random and gaussian. Another option we have is Perlin noise, called with ```noise()``` as a way to get more natural random numbers. It was created by Ken Perlin in the 80s for the movie Tron to generate landscape textures.

[Tron terrain example](https://youtu.be/8ruRruqKf5M?t=452) - on YouTube

The noise() function gives us Perlin noise values. Perlin noise gives us smoothed out random numbers. It does this by picking numbers related to the previous selected values.

noise() will output a value between 0 and 1. To get a broader range of output, we can use the map() function to specify a new minimum and maximum. [Here](https://editor.p5js.org/2sman/sketches/HySRfXkFQ) is an example of using the map function very simply. Remember that with map you specify your variable, its current minimum and max, and what you want the min and max to be.

noise() takes an argument of time to output a random perlin noise value. The larger the time input, the higher the variability of perlin noise random output values.

example

```
var xoffset = 0;

function draw() {
  background(204);
  xoffset = xoffset + 0.01;
  var n = noise(xoffset) * width;
  line(n, 0, n, height);
}
```

[code in web editor](https://editor.p5js.org/2sman/sketches/-jGaStopt)

Try changing how fast time increments.


In this example, a variation on our Walker class, we use Perlin noise to change our x, y coordinates of our walker.  

We define two vectors, a structure that denotes containing magnitude and direction. Essentially, it is a structure we are using to hold two values. Our walker will have a x and y position at ```this.position.x``` and ```this.position.y```, part of the ```this.position``` vector. We create a ```noff``` vector for creating two random initial values for our perlin noise space-time. Recall that perlin noise creates random output based on a time axis. This is really a one-dimensional space, not actually time. We need two distinct values so that we don't get the same perlin noise output simultaneously (which would cause our walker to move only along a diagonal).

Inside walk() we are setting ```this.position.x``` to a perlin noise random output, but it is mapped from its normal 0 to 1 to instead produce results from 0 to width. We do the same with the y position. Afterwards, we increment the x and y in this vector by 0.01 to our initial values. This allows us to receive different perlin noise outputs over time, otherwise it would produce the same output over and over again and our walker would not move.

```
class Walker{
  constructor(){
    this.position = createVector(width/2,height/2);
    this.noff = createVector(random(1000),random(1000));
  }

 display() {
    strokeWeight(2);
    fill(51);
    stroke(0);
    ellipse(this.position.x, this.position.y, 48, 48);
  }

  walk() {
    this.position.x = map(noise(this.noff.x),0,1,0,width);
    this.position.y = map(noise(this.noff.y),0,1,0,height);
    this.noff.add(0.01,0.01); //vector math.
  }
}
```

[example code](https://editor.p5js.org/2sman/sketches/rJHOG60dm)

The Coding Train [video](https://www.youtube.com/watch?v=Qf4dIN99e2w) about Perlin noise.

# Homework

## Watch/read
- Watch The Coding Train [video](https://www.youtube.com/watch?v=Qf4dIN99e2w) about Perlin noise
- Read Chapter 1 on Vectors from The Nature of Code.
**Try out exercises 1.1 and 1.2 [from the book](https://natureofcode.com/book/chapter-1-vectors/) in p5js (you can do 1.3 if you are excited and familiar with 3D), 1.4 and 1.5.*

## Devlog homework

* Find 2 or 3 examples of programs that involve artificial intelligence and/or artificial life and research how these elements are handled in the programs. Examples can be things like life simulations, flocking algorithms, robot simulations, etc. Since the assignment involves researching the programmer's methods, ideal projects would be one's where you are able to view the actual code. So, either open source software projects or web-based javascript projects would be ideal.

After reading Chapter 1, start work on... 

### The Ecosystem Project

> As mentioned in the preface, one way to use this book is to build a single project over the course of reading it, incorporating elements from each chapter one step at a time. We’ll follow the development of an example project throughout this book—a simulation of an ecosystem. Imagine a population of computational creatures swimming around a digital pond, interacting with each other according to various rules.

Step 1 Exercise:

> Develop a set of rules for simulating the real-world behavior of a creature, such as a nervous fly, swimming fish, hopping bunny, slithering snake, etc. Can you control the object’s motion by only manipulating the acceleration? Try to give the creature a personality through its behavior (rather than through its visual design).
