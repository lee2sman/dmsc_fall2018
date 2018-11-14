let weather;

function setup() {
  noCanvas();
  loadJSON("http://api.openweathermap.org/data/2.5/weather?q=White%20Plains&APPID=YOURAPIKEYHERE", postWeather);
}

function postWeather(data){
  console.log("Today's weather is "+ data.weather[0].description + " in White Plains.");
  //print("Today's weather forecast: " + data.weather.description);
}
