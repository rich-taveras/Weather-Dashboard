var apiKey = "f4c48b2431b2e1f893e3a6845dcf023c";
var titleEl = document.getElementById("title");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var searchBtn = document.getElementById("search-btn");
var cityInput = document.getElementById("city-input");
var fivedayForecastEl=document.getElementById("fiveda-forecast")

function searchCity() {
  var cityName = cityInput.value;

  displayWeather(cityName);
}

function displayWeather(cityName) {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (currentData) {
      console.log(currentData);
      titleEl.innerHTML = currentData.name + dayjs.unix(currentData.dt).format(" (MM/DD/YYYY)") + "<img src='https://openweathermap.org/img/wn/" + currentData.weather[0].icon + "@2x.png'>"
      
      //+ dayjs.unix(currentData.dt).format(" (MM/DD/YYYY)") +
    });
    
    

  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastData) {
      console.log(forecastData);

      //grab every 12pm for each day for 5 days
      var forecastArray = forecastData.list;
     
      for (let i = 0; i < forecastArray.length; i = i + 8,j++) {
        console.log(forecastArray[i]);
        var cardTitle=document.getElementById("card-title"+j)
        console.log("card-title"+j)
        cardTitle.textContent=dayjs.unix(forecastArray[i].dt).format(" (MM/DD/YYYY)")
     
           }
    });
}

searchBtn.addEventListener("click", searchCity);

