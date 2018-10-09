# Week 7

* Working with Arrays
* Collision Forces
* Uploading to Glitch and GitHub pages

#### Notes on Arrays

You are already familiar with ```array.length```. There are other useful array methods as well.

```array.push()```

```
let array = [22, 10, 8, 4, 9];
array.push(300);
  
console.log("last element in the array: " + array[array.length-1]);
```

This adds a new element to the end of the array.

```indexOf(element)```

example

```
print(array.indexOf(8)); //returns 2 because it's the second index in the array set above
```

Returns the index of given element, or returns -1 if its not found.

```
var array = [2, 5, 9];   
var index = array.indexOf(2); // 0   
index = array.indexOf(7); // -1   
```

```splice()```

Remove one element from an array. In a for loop, start at the end so that array.length doesn't get confused.

```
//code from Tega Brain
for (var i = particles.length-1; i >= 0; i--) { //go backwards   
    var p = particles[i]; //put particle into p   
    p.run();    
    if (p.isDead()) {   
      //remove the particle   
      particles.splice(i, 1); //remove particle at i   
    }  
  }
```

#### Collisions

See the 3 robot examples

# Homework

* Review Chapter 4 in Nature of Code on Particle Systems.
* P5js examples are in [here.](https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp04_systems)
* Daniel Shiffman [tutorials](https://www.youtube.com/watch?v=vdgiqMkFygc&list=PLRqwX-V7Uu6Z9hI4mSgx2FlE5w8zvjmEy)
* Work on Midterm
* Read [How To Simple Programs Behave](http://www.wolframscience.com/nks/p23--how-do-simple-programs-behave/) by Steven Wolfram
