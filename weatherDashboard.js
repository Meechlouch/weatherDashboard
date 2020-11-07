let apiKey = "9ee1e37fcd420a11ca0592d62f5fa2ce";
let city = "";

$(document).ready(function() {
    let history = JSON.parse(window.localStorage.getItem("history")) || [];
    for (let i = 0; i < history.length; i++) {
        displayHistory(history[i]);
      }

    if (history.length > 8) {
        console.log(history.pop());
    }

      $("#searchHistory").on("click", "li", function() {
          city = $(this).text();
        getTodayWeather(city);
        fiveDayForecast();
      });
    
    $("#searchCities").on("click", function() {
    
        city = $("#city").val().trim();
       

        if(city != "") {
        
            getTodayWeather(city);

            if (history.indexOf(city) === -1) {
                history.push(city);
                window.localStorage.setItem("history", JSON.stringify(history));
          
                displayHistory(city);
              }

        } else {
            console.log("input empty");
        }

    });

    function getTodayWeather(city){
        let currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;
        $.ajax({
            url: currentWeather,
            type: "GET",
        }).then(function(response) {
            console.log(response);
            getUV(response.coord.lat, response.coord.lon, response)
  
        });
    }

    function getUV(lat, lon, weatherData){
        let uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`
        $.ajax({
            url: uvIndexUrl,
            type: "GET",
        }).then(function(uvResp) {
            console.log(uvResp);
            let displayContent = show(weatherData,uvResp.value);
            $("#currentForecast").html(displayContent);
            

            fiveDayForecast();
            
        });
    }



    function show(response, uvValue) {
        let momentJS = moment().subtract(10, 'days').calendar();
        let color = null;
        if(uvValue < 3){
            color = 'btn btn-success';

        } else if(uvValue < 7){
            color = 'btn btn-warning';
        } else {
            color = 'btn btn-danger';
        }
        return  `<h4><strong>${response.name}</strong></h4>${momentJS}<img src='http://openweathermap.org/img/wn/${response.weather[0].icon}.png'><br>Temperature: ${response.main.temp.toFixed(1)} &deg;F</br>Humidity: ${response.main.humidity}%<br>Wind Speed: ${response.wind.speed} MPH<br>UV Index: <span class='${color}'>${uvValue}</span> `
    }

    function fiveDayForecast() {
        
        let fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&exclude=daily" + "&appid=" + apiKey;

        $.ajax({
            url: fiveDay,
            type: "GET",
        }).then(function(data) {
            console.log(data);
            for(i = 0; i < data.list.length; i++) {
            $("#fiveDayForecast").html(data.list[0].main.temp[i]);
            }
        });
    }

    function  displayHistory(city) {
        let liEl = $("<li>");
        liEl.addClass("list-group-item");
        liEl.append(city);
        $("#searchHistory").prepend(liEl); 
    }
});
