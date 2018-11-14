// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z

let emojis;
let name = "lee";

function setup() {
  noCanvas();
  loadJSON('sea_emoji.json', gotEmoji);

  let button = select('#button');
  // Demonstrating anonymous function
  button.mousePressed(function() {
    let para = createP(random(emojis))
    // Demonstrating chaining
    para.style('font-size','64px').parent('emojis');
  });
}

function gotEmoji(data) {
  //console.log(data);
  emojis = data.seaEmoji;
}
