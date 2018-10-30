//VARIABLE
//objects
let shrimp;
let clownFishes = [];
let seaWeeds = [];
let barr = true;
let barracuda;
let anemones = [];
let jellys = [];

let nemoPos = [];

//images
let water, shrimpRender, shrimpRenderR, nemo, nemoL, barracu, barracuL, jelly;
let bckOffset = 0;
let moveR = true;

//number of creature
let nemoNumber = 5;
let seaWeedNumber = 14;
let anemN = 25;
let jellyNumber = 5;

//forces
let current;
let survivalInstinct;
let xoff = 0.08;

function setup() {

    background("#a8feed");
    water = loadImage("assets/background.jpg")
    shrimpRender = loadImage("assets/shrimp.png");
    shrimpRenderR = loadImage("assets/shrimpR.png");
    nemo = loadImage("assets/nemo.png")
    nemoL = loadImage("assets/nemoL.png")
    barracu = loadImage("assets/barracuda.png")
    barracuL = loadImage("assets/barracudaL.png")
    jelly = loadImage("assets/jelly.png")


    createCanvas(window.innerWidth, window.innerHeight);

    //shrimp
    shrimp = new Shrimp();
    barracuda = new Barracuda();
    //seaweed
    for (i = 0; i < seaWeedNumber; i++) {
        seaWeeds[i] = new Seaweed();
    }
    //anemone
    for (i = 0; i < anemN; i++) {
        anemones[i] = new Anemone();
    }
    //nemos
    for (i = 0; i < nemoNumber; i++) {
        clownFishes[i] = new Nemo(random(width - 500, width - 100), random(height - 500, height - 100), random(15, 30), i);

    }

    //jellys

    for (i = 0; i < jellyNumber; i++) {
        jellys[i] = new Jelly(random(width / 2), random(height / 2), random(55, 60));
        console.log("we have " + i)
    }


}

function moveBck() {
    if (moveR == true) {
        bckOffset++

    } else {
        bckOffset--
    }
}

function draw() {
    imageMode(CORNER)

    background("#a8feed");

    if (bckOffset == 0) {
        moveR = true;
    } else if (bckOffset > 200) {
        moveR = false;
    }

    moveBck();

    image(water, 0 - bckOffset, 0, width + 200, height)
    fill('#ffffff')

    xoff = xoff + 0.5

    //forces

    let cx = map(noise(random(1000), 0, 1, width - 400, width))
    let cy = map(noise(random(100), 0, 1, height - 400, height))

    current = createVector(cx, cy)

    //seaweed

    for (it = 0; it < seaWeedNumber / 2; it++) {

        seaWeeds[it].render();

    }

    //shrimp
    shrimp.render();
    shrimp.update();

    //jelly

    for (i = 0; i < jellys.length; i++) {
        jellys[i].update();
        jellys[i].checkEdges();
        jellys[i].render();

        console.log("exist")

    }

    //seaweed

    for (it = seaWeedNumber / 2; it < seaWeedNumber; it++) {

        seaWeeds[it].render();

    }

    //barracuda

    barracuda.render();
    barracuda.update();
    barracuda.checkEdge();
    barracuda.applyForce(current);
    if (barracuda.ate == 0) {
        for (i = 0; i < clownFishes.length; i++) {
            barracuda.hunt(clownFishes[i].loc, i);
        }
    }


    //clownfishes


    for (i = 0; i < clownFishes.length; i++) {


        survivalInstinct = createVector(2, 1.5)
        clownFishes[i].update();

        if (barracuda.loc.x < width / 2 + 100 || barracuda.loc.x > width + 50) {
            if (clownFishes[i].hidden) {
                clownFishes[i].vel.set(random(-1, 1), random(-1, 1));

                clownFishes[i].hidden = false;
            }

            clownFishes[i].checkEdges(width - 30, width - 400, height - 50, height - 400);
            clownFishes[i].applyForce(current);
        } else {
            clownFishes[i].applyForce(survivalInstinct);
            clownFishes[i].checkEdges(width, width - 400, height, height - 400);

        }
        clownFishes[i].render();


        clownFishes[i].aging();


    }
    if (clownFishes.length > 8) {
        kill(clownFishes, floor(random(0, 7)))
    }
    imageMode(CORNER);


    //anemone

    for (it = 0; it < anemN; it++) {
        anemones[it].render();
    }

}

function kill(arrayN, i) {
    arrayN.shift(i)
}

function breed() {
    console.log("I ve been breeding")
    clownFishes.push(new Nemo(random(width - 500, width - 100), random(height - 500, height - 100), random(10, 15), clownFishes.length - 1));
}

function keyPressed() {

    rise = createVector(-0.3, -2);
    for (i = 0; i < jellys.length; i++) {
        jellys[i].applyForce(rise);
    }


}
