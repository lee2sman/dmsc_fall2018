# Week 3

# Review last class

* what is a callback? how to use it.
* working with a local server
* randomness and time!

# Classes and Objects - Javascript ES6

Examples of classes in objects can be found in The Coding Train [videos 5.4, 6.3, 6.4, 6.5.](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA)

# Objects and Arrays of Objects

There are two ways to define an object. The first way is to define an object is called a literal object.

## Literal Objects

Literal objects are blocks of code that contains a list of name-value pairs. A literal object can just be a list of variables, or it can also contain functions. The 'this' keyword refers to the variables within the object. Generally you won't use this way of writing an object much, but it is worth knowing what it is!

```
var bubble = {  
  //object literals are like lists  
  //they can contain data using this syntax:  
  x: 200,  
  y: 150,  

  //they can also contain functions declared with a similar syntax...  
  display: function(){
    stroke(255);  
    strokeWeight(2);  
    ellipse(this.x,this.y,20,20); //this.variable name is used
    }, // also notice that each thing in the list is separated with a comma

    //here is another function
    move: function(){
      this.x=this.x + random(-1,1); //this refers to the variables within our object
      this.y=this.y + random(-1,1);
    }
}
```

To refer to any of the values in the literal object, we use the dot operator.
```bubble.x;  //refers to the x value of the object```
```bubble.move();  //refers to the move() function of the object```

## Objects defined with a constructor function

The other way of writing objects is used much more often. This style makes our object into a template for creating more of these objects. Its structure also enables us to pass it arguments, so that each version of the object can have varying properties.
This way of creating an object uses a constructor function.

## What is a class?

In a programming language, a *class* is a defined code template that is used to create objects. Objects can have default *instance variables* and methods (functions). We say that classes *encapsulate* objects.

- They store functions and variables together
- A class is a template - a *cookie-cutter*
- They are used to *stamp out* individual Objects
- When we stamp out or create an object using the Class/cookie cutter we are said to be *instantiating* an object. Each object is an *instance* of the class.

```
//A CONSTRUCTOR function (just like a class in Processing)
    //By convention we name it with a capital letter.
    var Bubble = function(dx, dy){  //You can also put arguments in here to pass into the object
      //here we use the 'this' keyword to establish the object's variables.
      this.x= dx;
      this.y= dy;

      //the functions are written with a similar syntax to before, but with the 'this'...
      this.display =function(){
        stroke(255);
        strokeWeight(2);
        ellipse(this.x,this.y,20,20); //this.variable name is used...
      }

      //here is another function
      this.move=function(){
        this.x=this.x + random(-1,1);
        this.y=this.y + random(-1,1);
      }
}
```

Here is an entire example that shows how to declare and instantiate an object in your program.
```
var bubbles = [];

function setup() {
    createCanvas(480, 270);
    stroke(0);
    fill(0,0,255);  
    for(var i = 0; i<3; i++){ //fill our array with new Bubble objects
      bubbles[i]= new Bubble(random(width),random(height));
    }
}

function draw() {
    background(255,0,0);
    for(var i = 0; i<bubbles.length; i++){
      bubbles[i].display(); //call the function display from the bubble OBJECT
      bubbles[i].move(); // call the function move from the bubble object.
    }
}

var Bubble = function(dx, dy){  //You can also put arguments in here to pass into the object
  //here we use the 'this' keyword to establish the objects variables.
  this.x= dx;
  this.y= dy;

//the functions are written with a similar syntax to before, but with the 'this'...
  this.display =function(){
    stroke(255);
    strokeWeight(2);
    ellipse(this.x,this.y,20,20); //this.variable name is used...
  }

  //here is another function
  this.move=function(){
    this.x=this.x + random(-1,1);
    this.y=this.y + random(-1,1);
  }
}
```

## Javascript Classes in ES6

ECMAScript6 aka ES6 aka ECMAScript 2015 was a large change to Javascript's implementation across browsers, the first mass-adopted change since 2009. It provides new syntax for classes and objects, modules, variables, loops, functions and more.

There are many ways to create classes and objects in Javascript. Below is a good way to do so using ES6 features.

## Writing a class

- At the top of the class is a constructor function
- The constructor is kind of like an object's *setup* in that it provides the initial values for any passed variables and it creates new variables that may be used in class
- ```this``` is a special keyword in javascript.
- Each time you use the class to create a new object instance, it will have its own variables and functions assigned to it
- If I have a class *People* and a variable *name* it's important that my *Billy* object has the name *Billy* and if I also make a *Sally* object it has its name variable be *Sally* and not Billy. (Sorry for this metaphor)
- We use ```this``` in front of the variables because each stamped out object will need to reference its own version of that variable
- Note that functions inside of classes are called methods. You don't need to include the word ```function``` in front of them since they are understood as functions without it.
- ```new``` is the instruction to create an object
- it creates an object *instance*

## An Example Class

```
let wolfgang, clara;

class Person {
	constructor(name,x,y) {
		this.name = name; //takes the passed name and sets the local name variable
		this.x = x //takes the passed x value
		this.y = y //takes the passed y
		this.message = "Hi "+this.name;
	}

  drawName(){
	   text(this.message,this.x,this.y);
   }
}

function setup(){
	wolfgang = new Person("Wolfgang",100,200);
	clara = new Person("Clara",200,350);
}

function draw(){
	wolfgang.drawName;
	clara.drawName;
}
```

## Default arguments

* Default arguments are optional
* You can include default values for the variables connected to each object
* You can specify in the constructor like this: ```constructor(x = 100, y = 300)```

## Resources

* Tutorial [video](https://www.youtube.com/watch?v=T-HGdc8L-7w&index=5&t=773s&list=PLRqwX-V7Uu6YgpA3Oht-7B4NBQwFVe3pr) by Dan Shiffman
* Mozilla's Classes [reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) page
* Classes [example](https://googlechrome.github.io/samples/classes-es6/) by Google Chrome team.
  * [More](https://github.com/GoogleChrome/samples) Google Chrome ES6 examples

# Homework

* Finish project 1
  * upload to Moodle
* Watch the following The Coding Train videos on objects, revising the examples we did in class. 5.4, 6.3, 6.4, 6.5.
* Write an object using a constructor function that draws a creature of your imagining.
* Read through I.1-I.3 in the introduction of [Nature of Code](http://natureofcode.com/), but remembering that we will be writing our code in javascript and not Processing. This means that when you read the term 'class', think of way of writing objects with the constructor function. Contain the code that draws your creature within a function called display(). Work through exercise I.1, creating a random walker class in p5js by adding in a step function to your object code. Also do exercise I.2 and I.3. Note that the functions such as random, noise are the same in both processing and p5js. Create your own version of the random walker.
  * [The Nature of Code, Introduction](https://natureofcode.com/book/introduction/), online
  * You may want to watch The Nature of Code Introduction [videos](https://www.youtube.com/watch?v=6vX8wT1G798&index=1&list=PLRqwX-V7Uu6aFlwukCmDf0-1-uSR7mklK), the videos are on Processing, but are still helpful
* The book's example code has been [ported to p5js](https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js) and can be [downloaded](https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/archive/master.zip). You will have to run the code locally.
