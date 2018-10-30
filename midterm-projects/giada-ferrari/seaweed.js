class Seaweed {

    constructor() {

        this.loc = createVector(random(0, 800), height);
        this.oscillation = createVector(0, 0);
        this.mass = random(100, 200); //height of seaweed
        this.angleStart = 0
        this.angle;
        this.angleVel = 0.1;
        this.amplitude = random(10, 65);
        this.green = random(100, 180)


    }

    update() {

        this.angleStart += 0.015;
        this.angle = this.angleStart;

    }

    render() {
        this.update()
        for (i = 0; i < this.mass; i += 8) {
            this.oscillation.x = map(cos(this.angle), -1, 1, 0, this.amplitude);

            stroke(0, 180, 0, 20);
            fill(0, this.green + i + 10, 0, 100);
            ellipse(this.loc.x + this.oscillation.x, height - i, this.mass / 10, this.mass / 5);
            this.angle += this.angleVel


        }
    }


    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);

        this.loc.add(f)
    }



}
