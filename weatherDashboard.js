$(document).ready(function() {

let city = $("#city").val();
let apiKey = "9ee1e37fcd420a11ca0592d62f5fa2ce";

$("#searchCities").on("click", function() {
    city = $("#city").val();
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    if(city != "") {
        $.ajax({
            url: queryUrl,
            type: "GET",
        }).then(function(response) {
            console.log(response);
        });
    } else {
        console.log("error");
    }
});

});