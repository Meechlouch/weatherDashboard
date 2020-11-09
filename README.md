# weatherDashboard
### Deployed link: https://meechlouch.github.io/weatherDashboard/

### Gallery

#### Desktop:
![Desktop View](weatherDashboard/Remote-Repo/img/Screenshot(3).png "Desktop view")

#### Mobile:
![Mobile View](img/Screenshot(4).png)

# Project Discription

This is a Weather Application capable of receiving weather updates for multiple cities, states and countries using the Open Weather API.
Users will search for a city by name and on the click of the search button will be presented with The Current Date and The Current Weather Conditions: Temp, Humidity, Wind Speed, and UV Index which is color coordinated indicating the level of UV intensity. 
Additionally, the user is also presented with a Five Day Forecast below The Current Weather Conditions for that city showing The Date, Temp, and Humidity for that city.

Furthermore, the users searched cities will dynamically display in a card at the bottom of the search bar at every click of the search button. These dynamically created buttons 
are interactive and will allow the user to quickly look up the weather information for recently searched cities.

# Challenges, Improvement Opportunities

A lot of data information used to make this app necessary came from the Open Weather Map API, retrieving the data necessary to get various information such as: Temp, Humidity, Image Icon, etc. took a lot of manipulation and passing through various functions. Multiple ajax calls were necessary and data from those API calls was to be manipulated in order to pass on to another API call.
With further development in mind, I will be aiming to remove the initial search history card (which should be at the bottom of the list) from generated list after a certain number of cards have been generated then applying the newly searched history card to the top of listed cards.

## Tech and Features Used

* Bootstrap
* Javascript
* JQuery
* Open Weather API
* Postman
