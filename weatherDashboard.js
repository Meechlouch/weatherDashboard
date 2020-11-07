$(document).ready(function() {
    
    //Declare Global variables
    let city = $("#city").val();
    let apiKey = "9ee1e37fcd420a11ca0592d62f5fa2ce";
    //let currentTemp = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
    
    $("#searchCities").on("click", function() {
    
        city = $("#city").val();
        let currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;

        if(city != "") {
        
            $.ajax({
                url: currentWeather,
                type: "GET",
            }).then(function(response) {
                console.log(response);
                let displayContent = show(response);
                $("#currentForecast").html(displayContent);
                //fiveDayForecast();
                displayHistory();
            });
        } else {
            console.log("error");
        }
    });

    function show(response) {
        let momentJS = moment().subtract(10, 'days').calendar();
        let UVindex = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=lat&lon=lon";

        return  `<h4><strong>${response.name}</strong></h4>${momentJS}<img src='http://openweathermap.org/img/wn/${response.weather[0].icon}.png'><br>Temperature: ${response.main.temp.toFixed(1)} &deg;F</br>Humidity: ${response.main.humidity}%<br>Wind Speed: ${response.wind.speed} MPH<br>UV Index: ${response.coord.lon}`
    }

    function fiveDayForecast() {
        city = $("#city").val();
        let fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&exclude=daily" + "&appid=" + apiKey;

        $.ajax({
            url: fiveDay,
            type: "GET",
        }).then(function(data) {
            console.log(data.list.dt);
            $("#fiveDayForecast").html(data);
        });
    }

    function  displayHistory() {
        
        let liEl = $("<li>");
        liEl.addClass("list-group-item");
        city = $("#city").val();
        liEl.append(city);
        $("#searchHistory").prepend(liEl);
        
        //inputEl.html(city);
        //inputEl.html(city);
        console.log(city);
        //$("#searchHistory").prepend(liEl);
    }

 
    /*

    let fiveDayApiCall = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    $.ajax({
        url: fiveDayApiCall,
        type: "GET",
    }).then(function(response) {
        console.log(response);

    });
    */
});