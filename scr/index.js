// Show currenttime/date
function formatDate(date){      
      let hours = date.getHours();
      if (hours <10){
          hours =`0${hours}`;
      } 
      let minutes = date.getMinutes();
         if (minutes <10){
          minutes =`0${minutes}`;
      } 
      let days = [
          "Sunday", 
          "Monday", 
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"];

      let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`
       }
        let currentTime = document.querySelector("h1");
        let currentDate = new Date();
        currentTime.innerHTML = formatDate(currentDate)
   ;

   //Forecast day name to real day name
function formatDay(timestamp){
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = [
          "Sun", 
          "Mon", 
          "Tue",
          "Wed",
          "Thur",
          "Fri",
          "Sat"];

  return days[day];
}

//Displays forecast information
function displayForecast(response){
  let forcast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML=`<div class="row">`;
  
  forcast.forEach(function(forecastDay, index) {
    if (index < 6){

  forecastHTML= 
        forecastHTML + 
        `<div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
          <img
                  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt=""
                  width="42"
                />
          <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}°C</span>
            <span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°C</span> 
          </div>
      </div>`;
  }
})
  forecastHTML= forecastHTML+` </div>`
  forecastElement.innerHTML=forecastHTML;
 }

//Forecast daily information from API
 function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "f4e2e7d1dd4f9ad7bc54617b19362453";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
  }

//Show realtime data
function showWeatherdata(response) {
    document.querySelector("#city-name").innerHTML = response.data.name;
    document.querySelector("#temperatureFirst").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
    document.querySelector("#windSpeed").innerHTML=Math.round(response.data.wind.speed);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );    
    ctemperature =  response.data.main.temp;     

     getForecast(response.data.coord); 
}
 
//Search data from API
function search (city){
    let apiKey = "f4e2e7d1dd4f9ad7bc54617b19362453";
    let units = "metric";
    let apiurlBasic = `https://api.openweathermap.org/data/2.5/weather?`;
    let apiUrl = `${apiurlBasic}q=${city}&appid=${apiKey}&units=${units}`;  
    console.log(apiUrl);
    axios.get(apiUrl).then(showWeatherdata)  
    }

//Handeling user submitted city name          
function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-text-input").value;    
    search(city);
    }
     
    let form = document.querySelector("#search-form");
    form.addEventListener("submit", handleSubmit);

//Show current position temperature
function showPosition(position) {
        let latitude = position.coords.latitude;
        console.log(position.coords.latitude);
        let longitude = position.coords.longitude;
        console.log(position.coords.longitude);
        let apiKey = "f4e2e7d1dd4f9ad7bc54617b19362453";
        let units = "metric";
        let apiurlBasic = `https://api.openweathermap.org/data/2.5/weather?`;
        let apiUrl = `${apiurlBasic}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
        console.log(apiUrl);
        axios.get(apiUrl).then(showWeatherdata);
      }

function getCurrentPosition() {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
      let button = document.querySelector("#current-location");
      button.addEventListener("click", getCurrentPosition);

//Convert Celsiuse and Fahrenheit
function changeFahrenheit(event) {
      event.preventDefault();
      let temperatureElement = document.querySelector("#temperatureFirst");
      celsiusClick.classList.remove("active");
      fahrenheitClick.classList.add("active");
      let ftemperature= (ctemperature * 9)/5+32;
      temperatureElement.innerHTML = Math.round(ftemperature);
  }
function changeCelsiuse(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperatureFirst");
    celsiusClick.classList.add("active");
    fahrenheitClick.classList.remove("active");
    temperatureElement.innerHTML=Math.round(ctemperature);
          
    }
    let ctemperature = null;
    
    let celsiusClick= document.querySelector("#c-link");
    celsiusClick.addEventListener("click", changeCelsiuse);

    let fahrenheitClick= document.querySelector("#f-link");
    fahrenheitClick.addEventListener("click", changeFahrenheit);

    //Show default city information
    
search("Tokyo");
   


