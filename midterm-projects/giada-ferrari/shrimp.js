class Shrimp {
    constructor() {
        this.location = createVector(width / 2, height / 2);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.topSpeed = 4;



    }

    //have shrimp follow the mouse
    update() {
        let mouse = createVector(mouseX, mouseY);

        //store new coordinates in a new vector variable
        this.acceleration = p5.Vector.sub(mouse, this.location);
        this.acceleration.setMag(0.4);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.location.add(this.velocity);
        this.location.limit(width - 400)
    }

    render() {

        let mouse = createVector(mouseX, mouseY);

        if (mouse.x < this.location.x) {
            image(shrimpRender, this.location.x, height - 80, 100, 60);

        } else {

            image(shrimpRenderR, this.location.x, height - 80, 100, 60);
        }
    }
}
