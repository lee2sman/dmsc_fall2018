function Particle() {
    this.loc = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;

    this.prevPos = this.loc.copy();


    this.update = function () {
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(this.maxSpeed)
    }

    this.follow = function (vectors) {
        let x = floor(this.loc.x / scl);
        let y = floor(this.loc.y / scl);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force)


    }
    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.edges = function () {
        if (this.loc.x > width) {
            this.loc.x = 0
            this.updatePrev();
        }
        if (this.loc.x < 0) {
            this.loc.x = width;
            this.updatePrev();

        }
        if (this.loc.y > height) {
            this.loc.y = 0
            this.updatePrev();

        }
        if (this.loc.y < 0) {
            this.loc.y = height;
            this.updatePrev();

        }

    }

    this.render = function (r, g, b, a) {
        stroke(r, g, b, a);
        strokeWeight(2);
        line(this.loc.x, this.loc.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }

    this.updatePrev = function () {
        this.prevPos.x = this.loc.x;
        this.prevPos.y = this.loc.y;


    }
}
