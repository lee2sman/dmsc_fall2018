class Jelly {
    constructor(x, y, m) {
        this.loc = createVector(x, y);
        this.vel = createVector(-random(), -random());
        this.acc = createVector(0, 0);
        this.mass = floor(m);

        this.maxSpeed = 2;
        this.rotation = 0;

    }


    update() {
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(this.maxSpeed);
        this.rotation = this.vel.heading();

    };

    render() {
        rotate();
        fill(70);
        image(jelly, this.loc.x, this.loc.y, this.mass * 1.5, this.mass);


    };

    rotate() {
        push()
        translate(this.loc.x, this.loc.y)
        rotate(this.rotation);


    }

    checkEdges() {

        if (this.loc.x > width) {
            this.loc.x = 0;

        } else if (this.loc.x < 0) {
            //this.vel.x *= -1;
            this.loc.x = width;


        }
        if (this.loc.y > height - 80) {
            this.loc.y = height - 80;
            this.vel.y *= -1;
        } else if (this.loc.y < 0) {
            this.vel.y *= -1;
            this.loc.y = 0;


        }
    }

    applyForce(force) {

        let f = p5.Vector.div(force, this.mass);
        console.log(f)
        this.acc.add(force);
    }



}
