var apiKey = "f4c48b2431b2e1f893e3a6845dcf023c";
var titleEl = document.getElementById("title");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var searchBtn = document.getElementById("search-btn");
var cityInput = document.getElementById("city-input");
var fivedayForcastEl = document.getElementById("fiveday-forecast");

function searchCity() {
  var cityName = cityInput.value;

  displayWeather(cityName);
}
// function for main forecast
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
      titleEl.innerHTML =
        currentData.name + dayjs.unix(currentData.dt).format(" (MM/DD/YYYY)");
      "<img src='https://openweathermap.org/img/wn/" +
        currentData.weather[0].icon +
        "@2x.png'>";
        tempEl.innerHTML=currentData.temp
    
    });
//function for 5 days forecast
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
      var forecastArr = forecastData.list;

      for (let i = 3, j = 1; i < forecastArr.length; i = i + 8, j++) {
        console.log(forecastArr[i]);
        var cardTitle = document.getElementById("card-title" + j);
        console.log("card-title" + j);
        cardTitle.textContent = dayjs
          .unix(forecastArr[i].dt)
          .format(" (MM/DD/YYYY)");

        var temp = document.getElementById("temp" + j);
        console.log("temp" + j);
        temp.textContent = dayjs.unix(forecastArr[i].dt);

        temp.textContent = forecastArr[i].main.temp;
      }
    });
}

searchBtn.addEventListener("click", searchCity);

// buttons with city names
var listgroupEl = document.querySelector(".list-group");

document.querySelector(".list-group").addEventListener("click", searchCity);
console.log();
