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
        //five day forecast is emptied for every click of the list
        $("#fiveDayForecast").empty();
        //this function targets the value of any city clicked
        city = $(this).text();
        //the value of that clicked city is passed into a function
        getTodayWeather(city);
        //a function is then called to get the 5 day forecast for that city
        fiveDayForecast();
      });
    //event listener targets the user input value on every click
    $("#searchCities").on("click", function() {
        //five day forecast element is deleted after every click
        $("#fiveDayForecast").empty();
        //useer input is stored in a variable
        city = $("#city").val().trim();
        //conditional statement checks to be sure a val is entered
        if(city != "") {
            //if there is a value, we pass that value into a function that get the current weather
            getTodayWeather(city);
            //condition statement checks to see that value is in history
            if (history.indexOf(city) === -1) {
                //if not, we push that value to local storage
                history.push(city);
                window.localStorage.setItem("history", JSON.stringify(history));
                //the value is then passed to another function that dispays it to history section
                displayHistory(city);
            }
        }
    });
    
    function getTodayWeather(city){
        //Url saved in a variable
        let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;
        //plug variable in for ajax call
        $.ajax({
            url: currentWeatherUrl,
            type: "GET",
        }).then(function(response) {
            //we pass in values from ajax response to a function that will use that value to get UV index
            getUV(response.coord.lat, response.coord.lon, response);
        });
    }
    //value passed into parameters of function
    function getUV(lat, lon, weatherData){

        let uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`
        //ajax call
        $.ajax({
            url: uvIndexUrl,
            type: "GET",
        //we pass in UV from API response
        }).then(function(uvResp) {
            
            
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
        let liEl = $("<li>");
        liEl.addClass("list-group-item genHistory");
        liEl.append(city);
        $("#searchHistory").prepend(liEl); 
    }

    function fiveDayForecast(lat, lon) {
        let fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey;
        
        $.ajax({
            url: fiveDay,
            type: "GET",
        }).then(function(response) {
           console.log(response);
        
            for (let i = 1; i < 6; i++) {
                let divEl = $("<div>");
                let fiveTemp = response.daily[i].temp.day;
                let fiveHumid = response.daily[i].humidity;
                let unixDate = response.daily[i].dt;
                let date = moment.unix(unixDate).format('LL');
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
                $("#fiveDayForecast").append(divEl);
            }
        });
    }
});
    


