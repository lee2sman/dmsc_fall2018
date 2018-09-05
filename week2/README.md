# Week 2

# Class Review foundations of JS and P5JS
  * How p5js works with HTML and CSS
  * variables, functions, arrays
  * local vs global variables
  * Load Images/Load Sounds using preload
    * might need to compress images/audio!

# In-class Jam - collage images - practice
  * Topic - Rejecting Nature
    * GIF vs JPEG vs PNG
    * Use at least one png image file (why?)

# Loading image with a callback

### Callback

 A callback is a function that is to be executed after another function has finished executing

```
function setup() {
  // We use a callback to display the image after loading
  loadImage('myImg.jpg', function(img) {
    image(img, 0, 0);
  });
}
```

#### PS
* [Link to Basic p5js example programs](../basicExamples.md).

# Running a local server

#### Simplest local server

In terminal, change to the folder holding your index.html file. One simple way to do this is to type ```cd ``` (make sure there is a space after) then drag and drop in the folder you want to change to. Then hit enter. Then type in: ```python -m SimpleHTTPServer``` and hit enter. This is case-sensitive! It starts up a local server you can access from any web browser on your own computer.

Open your browser and type in: ```localhost:8000``` into the address bar to see your index.html page load.

When you are finished viewing your site in the browser, you can press Control-C in the Terminal to end the server, or just close the Terminal window.

[Brackets](http://brackets.io) editor has a built-in server. Click on the lightning bolt in the top right.

Atom and Sublime editors both have server packages as free add-ons that let you turn on a local server.

Additional resources on running a local server at this p5js [tutorial](https://github.com/processing/p5.js/wiki/Local-server) page and a The Coding Train tutorial [video](https://www.youtube.com/watch?v=UCHzlUiDD10).

# Assignment 1 - in-class work
  * sketches
  * states
  * [pseudocode](https://www.wikihow.com/Write-Pseudocode)
  * resting state code

# Time and Randomness
  * working with time in P5JS and Javascript
    * [basic timer example code](https://editor.p5js.org/2sman/sketches/ryoksa0pZ)
    * [Wait random time example](https://editor.p5js.org/2sman/sketches/rk4pBj3v7)
    * [Change states randomly example](https://editor.p5js.org/2sman/sketches/rk5gwonP7)
  * states

# Classes in Javascript
  [Class notes](classes-and-objects-es6.md)

# Homework

* Upload your week 1 Discovery and Research Post to moodle.

* Discover and Research Post 2. Read [Harold Cohen and AARON: A 40 Year Collaboration](http://www.computerhistory.org/atchm/harold-cohen-and-aaron-a-40-year-collaboration/), 15 minutes
* Discovery and Research Post 2 - [Info](../assignments.md) on the requirements for a Discovery and Research post.

> “… perhaps AARON would be better described as an expert’s system than as an expert system: not simply because I have served as both knowledge engineer and as resident expert, but because the program serves as a research tool for the expansion of my own expert knowledge rather than to encapsulate that knowledge for the use of others,” Cohen wrote in 1988.

Harold Cohen resisted ascribing human-like characteristics or the appearance of sentience to AARON. In the statement above, he describes AARON as a tool for the expansion of his own expert knowledge. This is a software tool. Describe an example of a theoretical tool (for you) that you could use to make an artwork (or dance, theater piece, music, film, etc - depending on your interest and creative practice). What would the tool do? What kind of functions would it have? What might it be called? What limit might it have that would require you to step in and *collaborate* with your software-tool to finish the piece?

* Watch The Coding Train [Animated Sprites](https://www.youtube.com/watch?v=3noMeuufLZY), 20 minutes
* Keep working on Assignment 1. For next week, finish coding the being/character and finish coding resting state completely and have 2 other states coded, for a total of 3 states. Implement random switcher or random timer to turn on various states.
  * Upload to Moodle
