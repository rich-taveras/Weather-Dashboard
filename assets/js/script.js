// script.js

$(document).ready(function () {
    const apiKey = 'f4c48b2431b2e1f893e3a6845dcf023c' ;
  
    // Function to fetch weather data from the API
    function fetchWeatherData(city) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
      $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          // Update the weather information in the dashboard
          updateWeatherData(data);
        },
        error: function (error) {
          console.log('Error fetching weather data:', error);
        }
      });
    }
  
    // Function to update weather information in the dashboard
    function updateWeatherData(data) {
      $('#name_of_city').text(data.name);
      $('#today_temp').text(`Temperature: ${data.main.temp} °C`);
      $('#today_humidity').text(`Humidity: ${data.main.humidity}%`);
      $('#today_wind_speed').text(`Wind Speed: ${data.wind.speed} m/s`);
      $('#today_icon_div').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    }
  
    // Function to fetch five-day forecast data from the API
    function fetchFiveDayForecast(city) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  
      $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          // Update the five-day forecast information in the dashboard
          updateFiveDayForecast(data);
        },
        error: function (error) {
          console.log('Error fetching five-day forecast data:', error);
        }
      });
    }
  
    // Function to update five-day forecast information in the dashboard
    function updateFiveDayForecast(data) {
      for (let i = 0; i < 5; i++) {
        const date = new Date(data.list[i].dt_txt).toDateString();
        $(`#${i}date`).text(date);
        $(`#day${i}five_day_temp`).text(`Temperature: ${data.list[i].main.temp} °C`);
        $(`#day${i}five_day_humidity`).text(`Humidity: ${data.list[i].main.humidity}%`);
        $(`#day${i}five_day_icon`).attr('src', `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`);
      }
    }
  
    // Event handler for the search button
    $('#searchbtn').on('click', function (event) {
      event.preventDefault();
      const city = $('#search_bar').val().trim();
  
      // Fetch current weather data and five-day forecast for the city
      fetchWeatherData(city);
      fetchFiveDayForecast(city);
    });
  });

  $(document).ready(function () {
    // Arreglo para almacenar las ciudades agregadas
    const addedCities = [];
  
    // Evento click para el botón de agregar ciudades
    $('#add_city_btn').on('click', function () {
      // Obtiene el nombre de la ciudad ingresado por el usuario
      const city = $('#search_bar').val().trim();
      
      // Verifica si la ciudad ya ha sido agregada
      if (city && !addedCities.includes(city)) {
        addedCities.push(city);
        // Crea y agrega el botón para la nueva ciudad
        const newCityBtn = $('<button class="btn btn-outline-light my-2 my-sm-0 city-btn"></button>').text(city);
        $('.buttons_div').append(newCityBtn);
      }
  
      // Limpia el campo del search bar
      $('#search_bar').val('');
    });
  
    // Evento click para los botones de las ciudades agregadas
    $(document).on('click', '.city-btn', function () {
      const city = $(this).text();
      // Fetch current weather data and five-day forecast for the city
      fetchWeatherData(city);
      fetchFiveDayForecast(city);
    });
  });
  
  