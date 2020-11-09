//Set Global Variables
let apiKey = "9ee1e37fcd420a11ca0592d62f5fa2ce";
let city = "";
//document function make sures document is loaded first
$(document).ready(function() {
    //grabs searched cities from local storage or an empty if there is no search history
    let history = JSON.parse(window.localStorage.getItem("history")) || [];
    //iterate through local storage history
    for (let i = 0; i < history.length; i++) {
        //passing the history data of local storage to a function named display History
        displayHistory(history[i]);
    }

    
      
    //event listener targets named Id on the click of a li element
    $("#searchHistory").on("click", "li", function() {
        $("#fiveDayForecast").empty();
        city = $(this).text();
        getTodayWeather(city);
        fiveDayForecast();
      });
    
    $("#searchCities").on("click", function() {
        $("#fiveDayForecast").empty();
        city = $("#city").val().trim();

        if(city != "") {
        
            getTodayWeather(city);

            if (history.indexOf(city) === -1) {
                history.push(city);
                window.localStorage.setItem("history", JSON.stringify(history));
          
                displayHistory(city);
              }

        } else {
          //  console.log("input empty");
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

    function  displayHistory(city) {
        let num = 9;
        let liEl = $("<li>");
        liEl.addClass("list-group-item genHistory");
        liEl.append(city);
        $("#searchHistory").prepend(liEl); 

        if(city > num) {
            $(".list-group-item").remove();
        }
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
            
            
                
                //divEl.setAttribute("style", "width: 10px;");
                for (let i = 1; i < 6; i++) {
                    let divEl = $("<div>");
                    let fiveTemp = response.daily[i].temp.day;
                    let fiveHumid = response.daily[i].humidity;
                    let unixDate = response.daily[i].dt;
                    let date = moment.unix(unixDate).format('LL');

                    //let momentJS = moment().format(fiveDate);
                    let fiveTempPara = $("<p>").text("Temp: " + fiveTemp.toFixed(1));
                    let fiveHumidPara = $("<p>").text("Humidity: " + fiveHumid);
                    let fiveDatePara = $("<p>").text(date);
                    let icon = $("<img>");
                    let weatherCode = response.daily[i].weather[0].icon;
                    let apiWeatherIcon = "https://openweathermap.org/img/w/" + weatherCode + ".png";

                    divEl.addClass("card genCards");
                    icon.attr("src", apiWeatherIcon);
                    divEl.append(fiveDatePara);
                    divEl.append(icon);
                    divEl.append(fiveTempPara);
                    divEl.append(fiveHumidPara);
                    //console.log(response.daily[i].temp.day);
                   // console.log("full object");
                    $("#fiveDayForecast").append(divEl);
                }
        });
    }
});
    


//let fiveDate = moment.unix(response.daily[i].dt).format('l');