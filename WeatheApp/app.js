// const fetchDataBtn = document.querySelector("#fetchdata");
// const result = document.querySelector("#result");

// // gets data from API and sets the content of #result div
// const getData = function () {
//   result.innerText = "Loading....";
//   fetch("http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json")
//     .then((res) => res.text())
//     .then((data) => {
//       result.innerText = JSON.stringify(data, null, 2);
//     })
//     .catch((error) => console.log(error));
// };

// // add event listener for #fetchdata button
// fetchDataBtn.addEventListener("click", getData);
let weather = {
    apiKey: "7321607fa3bda488b3920d51b92555e2",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
       
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
       document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather();