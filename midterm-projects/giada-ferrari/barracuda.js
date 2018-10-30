class Barracuda {

    constructor() {
        //add inverting direction?
        this.loc = createVector(-100, height / 3);
        this.vel = createVector(0, 0);
        this.acc = createVector(random(20), 0);
        this.mass = random(240, 230)
        this.maxSpeed = 1.5;
        this.huntRadar = createVector();
        this.killShot = 200;
        this.prevPos = this.loc.copy();

        this.ate = 0;

    }

    update() {
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);
    }

    render() {
        imageMode(CENTER);

        if (this.prevPos.x > this.loc.x) {

            image(barracuL, this.loc.x, this.loc.y, this.mass, 150)
        } else {

            image(barracu, this.loc.x, this.loc.y, this.mass, 150)
        }

    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f)
    }


    checkEdge() {
        if (this.loc.x > width + 300 || this.loc.x < -300) {
            this.vel.mult(-1);
            this.updatePrev()

        }
        if (this.loc.y < height - 300) {
            this.loc.y = height - 400;
        }
    }

    updatePrev() {
        this.prevPos.x = this.loc.x;


    }

    hunt(nemoLoc, index) {
        this.huntDistance = p5.Vector.dist(nemoLoc, this.loc)
        // console.log(this.huntDistance)
        if (this.huntDistance < this.killShot && this.loc.x < width - 250 && this.loc.x > 100 && this.ate < 1 && nemoLoc.y > height - 300) {
            this.ate++;
            clownFishes[index].freeze();

            console.log("i ate nemo number" + index + " he's at" + nemoLoc)

            if (this.loc.dist(clownFishes[index].loc) > 50) {
                console.log("i m swimming to my food")
                this.acc = p5.Vector.sub(clownFishes[index].loc, this.loc);
            } else {
                console.log("i m swimming away")
            }

            this.loc = clownFishes[index].loc
            kill(clownFishes, index);
            setTimeout(() => {
                this.ate = 0
            }, 5000)
            this.acc.set(0.1, 0.5);
            this.mass += 10;
            //}

        }
    }


}
