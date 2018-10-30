class Anemone {
    constructor() {
        this.loc = createVector(random(width - 200, width - 50), height);
        this.oscillation = createVector(0, 0);
        this.mass = random(150, 300); //height of seaweed
        this.angleStart = 0
        this.angle;
        this.angleVel = 0.1;
        this.amplitude = random(10, 65);
        this.red = random(0, 160)
        this.blue = random(100, 210);


    }

    update() {

        this.angleStart += 0.025;
        this.angle = this.angleStart;
    }

    render() {
        this.update()
        for (i = 0; i < this.mass; i += 5) {
            this.oscillation.x = map(cos(this.angle), -1, 1, 0, this.amplitude);

            stroke(220, 0, 200, 100);
            fill(this.red + i, 0, this.blue + i, 100);
            ellipse(this.loc.x + this.oscillation.x, height - i, 10, 10);
            this.angle += this.angleVel;

        }
    }


}
