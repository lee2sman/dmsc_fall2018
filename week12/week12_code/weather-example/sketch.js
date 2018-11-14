let people;

function setup() {
  noCanvas();
  loadJSON("http://api.open-notify.org/astros.json", listAstronauts);
}

function listAstronauts(astros){
  print("there are currently " + astros.people.length + " people in space.")
  print("their names are: ")
  for (let i = 0; i < astros.people.length; i++){
    console.log(astros.people[i].name);
  }
}
