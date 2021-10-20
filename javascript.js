var cityInputE1 = document.querySelector(".input");
var submitButton = document.querySelector("#search-btn");
var currentCityE1 = document.getElementById("current-city");

var savedCities = [];

// icon appears with weather icon
// UV index background changes color based off of index level
// current selected city is stored in localstorage
// stored cities can be clicked on to run again

// runs when submit button is clicked
var submitButtonHandler = function(event) {
   event.preventDefault();
   //city from input
   var currentCity = cityInputE1.ariaValueMax.trim();
   //enter a city
   if (currentCity) {
      getWeather(currentCity);
      cityInputE1.value = "";
      currentCityE1.innerText = currentCity;
   } else {
      alert("Please enter a city");
   }
}

var getWeather = function(currentCity) {
   var weatherAPIUrl ="https://openweathermap.org/" + currentCity
   fetch(weatherAPIUrl).then(function(response){
      response.json().then(function(data) {
         var lat = data.coord.lat;
         var long = data.coord.long;
         var apiUrl = "https://openweathermap.org/";

         fetch(apiUrl).then(function(response) {
            response.json().then(function(data) {
               var savedCityObject = {
                  city: currentCity,
                  url: weatherAPIUrl
               }
               localStorage.setItem("savedCityObject", JSON.stringify(savedCityObject));
               
               var icon = data.current.weather[0].icon;
               variconLink = "https://openweahtermap.org/img/w/" + data.current.weather[0].icon + ".png";
               console.log(iconLink);

               var currentTempE1 = document.getElementById("temp");
               currentTempE1.textContent = "Temperature: " + data.current.temp + "Degrees";

               var currentWindE1 = document.getElementById("wind");
               currentWindE1.textContent = "Wind: " + data.current.wind_speed + " MPH";

               var currentHumidityE1 = document.getElementById("humidity");
               currentHumidityE1.textContent = "Humidity: " + data.current.humidity + " %";

               var uviE1 = document.getElementById("uvi");
               uviE1.textContent = "UV Index: " + data.current.uvi 

               var tempE1One = document.getElementById("temp");
               tempE1One.textContent = "Temperature: " + data.daily[0].temp.day + "Degrees";

               var windE1ONE = document.getElementById("wind");
               windE1One.textContent = "Wind: " + data.daily[0].wind_speed + " MPH";

               var humidityE1One = document.getElementById("humidity");
               humidityE1One.textContent = "Humidity: " + data.daily[0].humidity + " %";

               var tempE1Two = document.getElementById("temp");
               tempE1Two.textContent = "Temperature: " + data.daily[1].temp.day + "Degrees";

               var windE1Two = document.getElementById("wind");
               windE1Two.textContent = "Wind: " + data.daily[1].wind_speed + " MPH";

               var humidityE1Two = document.getElementById("humidity");
               humidityE1Two.textContent = "Humidity: " + data.daily[1].humidity + " %";

               var tempE1Three = document.getElementById("temp");
               tempE1Three.textContent = "Temperature: " + data.daily[2].temp.day + "Degrees";

               var windE1Three = document.getElementById("wind");
               windE1Three.textContent = "Wind: " + data.daily[2].wind_speed + " MPH";

               var humidityE1Three = document.getElementById("humidity");
               humidityE1Three.textContent = "Humidity: " + data.daily[2].humidity + " %";

               var tempE1Four = document.getElementById("temp");
               tempE1Four.textContent = "Temperature: " + data.daily[3].temp.day + "Degrees";

               var windE1Four = document.getElementById("wind");
               windE1Four.textContent = "Wind: " + data.daily[3].wind_speed + " MPH";

               var humidityE1Four = document.getElementById("humidity");
               humidityE1Four.textContent = "Humidity: " + data.daily[3].humidity + " %";

               var tempE1Five = document.getElementById("temp");
               tempE1Five.textContent = "Temperature: " + data.daily[4].temp.day + "Degrees";

               var windE1Five = document.getElementById("wind");
               windE1Five.textContent = "Wind: " + data.daily[4].wind_speed + " MPH";

               var humidityE1Five = document.getElementById("humidity");
               humidityE1Five.textContent = "Humidity: " + data.daily[4].humidity + " %";
            })
         })
      });
}

var getSavedCities = function(savedCityObjects) {
   var savedCityObject = localStorage.getItem("savedCityObject");
   if (savedCityObject) {
      var savedCity = JSON.parse(localStorage.getItem("savedCityObject"));
      console.log(City.city);
      console.log(savedCity.url);
   }
}

getSavedCities();

var savedCityE1 = document.querySelector("#city-list");
varcityListE1 = document.createElement("li");
cityListE1.className = "saved-city";
var savedCityButton = document.createElement("btn");
savedCityButton.textContent = "test two";
savedCityButton.className = "city-btn";
cityListE1.appendChild(savedCityButton);
savedCityE1.appendChild(cityListE1);
   
submitButton.addEventListener("click", submitButtonHandler)

btns = document.getElementsByClassName("city-btn");
for(var i = 0; i < btns.length; i++) {
   btns[i].addEventListener("click", function () {
      console.log("I was clicked");
   })
}