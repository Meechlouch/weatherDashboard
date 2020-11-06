$(document).ready(function() {

let city = $("#city").val();
let apiKey = "9ee1e37fcd420a11ca0592d62f5fa2ce";

$("#searchCities").on("click", function() {
    
    city = $("#city").val();
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;

    if(city != "") {
        
        $.ajax({
            url: queryUrl,
            type: "GET",
        }).then(function(response) {
            console.log(response);
            let displayContent = show(response);
            $("#currentForecast").html(displayContent);
        });
    } else {
        console.log("error");
    }
});

});

function show(response) {

    return  "<h4><strong>" + response.name + "</strong></h4>" + "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png'>" + "<br>" +
            "Temperature: " + response.main.temp.toFixed(1) + " &deg;F"  + "</br>" +
            "Humidity: " + response.main.humidity + "%" + "<br>" +
            "Wind Speed: " + response.wind.speed + " MPH" + "<br>" +
            "UV Index: "
}

function  displayHistory() {
    let liEl = $("<li>");
    let inputEl = $("<input>");
    city = $("#city").val();
        $("#searchHistory").append(liEl);
        liEl.append(inputEl);
        inputEl.html(city);
        console.log(city);
        //$("#searchHistory").prepend(liEl);
    
};