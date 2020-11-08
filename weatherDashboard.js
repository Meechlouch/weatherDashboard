let apiKey = "9ee1e37fcd420a11ca0592d62f5fa2ce";
let city = "";

$(document).ready(function() {
    let history = JSON.parse(window.localStorage.getItem("history")) || [];
    for (let i = 0; i < history.length; i++) {
        displayHistory(history[i]);
        if (history.length > 9) {
            //console.log(history.shift());
            history.shift();
        }
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
            //console.log(response);
           // console.log("This apiCall gives current weather for city input value");
            getUV(response.coord.lat, response.coord.lon, response)
            
        });
    }

    function getUV(lat, lon, weatherData){
        let uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`
        $.ajax({
            url: uvIndexUrl,
            type: "GET",
        }).then(function(uvResp) {
            //console.log(uvResp);
            //console.log("this apiCall gives lat and lon");
            let displayContent = show(weatherData,uvResp.value);
            $("#currentForecast").html(displayContent);
            fiveDayForecast(uvResp.lat, uvResp.lon); 
        });
    }

    function show(response, uvValue) {
        let momentJS = moment().format("MMM Do YY");
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

    function fiveDayForecast(lat, lon) {
        
        let fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey;
        //console.log(fiveDay);
        $.ajax({
            url: fiveDay,
            type: "GET",
        }).then(function(response) {
           console.log(response);
           // console.log("apiCall five Day");
            //let dt = data.list[0].dt;
            //(moment.unix(dt));
            
                //let momentJS = moment().format("MMM Do YY");
                
                //divEl.setAttribute("style", "width: 10px;");
                for (let i = 0; i < 5; i++) {
                    let divEl = $("<div>");
                    let fiveTemp = response.daily[i].temp.day;
                    let fiveHumid = response.daily[i].humidity;

                    let fiveTempPara = $("<p>").text("Temp: " + fiveTemp.toFixed(1));
                    let fiveHumidPara = $("<p>").text("Humidity: " + fiveHumid);


                    divEl.addClass("card");
                    divEl.append(fiveTempPara);
                    divEl.append(fiveHumidPara);
                    console.log(response.daily[i].temp.day);
                    console.log("full object");
                    $("#fiveDayForecast").append(divEl);
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
