var cityInputE1 = document.querySelector(".input");
var submitButton = document.querySelector("#search-btn");
var currentCityE1 = document.getElementById("current-city");
var currentDayIcon = document.getElementById("daily-icon");

var myAPIkey = "5bdd1522ff5ab373e8a9936f79a39b84";

var savedCities = [];

// icon appears with weather icon
// UV index background changes color based off of index level
// current selected city is stored in localstorage
// stored cities can be clicked on to run again

// runs when submit button is clicked
var submitButtonHandler = function(event) {
   event.preventDefault();
   //city from input
   // console.log(cityInputE1.value);
   var currentCity = cityInputE1.value.trim();
   //enter a city
   if (currentCity) {
      getWeather(currentCity);
      cityInputE1.value = "";
      addCity(currentCity);
   } else {
      alert("Please enter a city");
   }
}

var getWeather = function(currentCity) {
   currentCityE1.innerText = currentCity;
   var weatherAPIUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid="+myAPIkey;
   fetch(weatherAPIUrl).then(function(response){
      response.json().then(function(data) {
         var lat = data.coord.lat;
         var long = data.coord.lon;
         var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&units=imperial&appid="+myAPIkey;
         console.log("simple", data);

         fetch(apiUrl).then(function(response) {
            response.json().then(function(data) {
               console.log("detailed", data);

               var savedCityObject = JSON.parse(localStorage.getItem("savedCityObject"));

               if (!savedCityObject) { savedCityObject = [];}

               savedCityObject.push( currentCity );

               localStorage.setItem("savedCityObject", JSON.stringify(savedCityObject));
               
               var icon = data.current.weather[0].icon;
               var iconLink = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
               console.log(iconLink);
               currentDayIcon.src = iconLink;

               var currentTempE1 = document.getElementById("temp");
               currentTempE1.textContent = "Temperature: " + data.current.temp + "Degrees";

               var currentWindE1 = document.getElementById("wind");
               currentWindE1.textContent = "Wind: " + data.current.wind_speed + " MPH";

               var currentHumidityE1 = document.getElementById("humidity");
               currentHumidityE1.textContent = "Humidity: " + data.current.humidity + " %";

               var uviE1 = document.getElementById("uvi");
               uviE1.textContent = "UV Index: " + data.current.uvi 

               for (var day=1; day<=5;day++)
               {
                  var date = document.getElementById("day"+day+"date");
                  date.textContent = moment().add(day,'days').format('M/DD/YYYY');

                  var icon = document.getElementById("day"+day+"icon");
                  icon.src = "https://openweathermap.org/img/w/"+data.daily[day].weather[0].icon+".png";

                  var temp = document.getElementById("day"+day+"temp");
                  temp.innerHTML = "Temp: " + data.daily[day].temp.day + " &deg;F";

                  var wind = document.getElementById("day"+day+"wind");
                  wind.textContent = "Wind: " + data.daily[day].wind_speed + " MPH";

                  var humid = document.getElementById("day"+day+"humid");
                  humid.textContent = "Humidity: " + data.daily[day].humidity + "%";

                  var uvi = document.getElementById("day"+day+"uvi");
                  uvi.textContent = "UVI: "+ data.daily[day].uvi;
               }
            })
         })
      });
   });
}

var getSavedCities = function(savedCityObjects) {
   var savedCityObject = localStorage.getItem("savedCityObject");
   if (savedCityObject) {
      var savedCityObject = JSON.parse(savedCityObject);
      console.log(savedCityObject);
   }
   else{
      savedCityObject = [];
   }
}

getSavedCities();

function addCity(city){
   var elementCity = document.createElement("li")
   elementCity.className = "saved-city";
   var elementButton = document.createElement("button");
   elementButton.textContent = city;
   elementButton.className = "city-btn";
   elementCity.appendChild(elementButton);
   savedCityE1.appendChild(elementCity);
   elementButton.addEventListener("click", function(){getWeather(this.textContent);});
}

var savedCityE1 = document.querySelector("#city-list");

// Search Bar Submit button
submitButton.addEventListener("click", submitButtonHandler)

// Button History buttons
var savedCityObject = [...new Set(JSON.parse(localStorage.getItem("savedCityObject")))];
// the above trickery uses the Set object to remove duplicates and still return an array

for (i=0;i<savedCityObject.length;i++){
   //console.log(savedCityObject[i]);
   addCity(savedCityObject[i]);
}