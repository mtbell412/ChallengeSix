var form = document.querySelector("#form");
var input = document.querySelector("#input");
var city = document.getElementById('city');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');


form.addEventListener("submit", function (event) {
    event.preventDefault();
    var inputCity = input.value;
    console.log(inputCity);
    getLatLong(inputCity);

});

function getLatLong(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=bd39c49ed84945757ccf3678c820d194`, {

        cache: 'reload',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var long = data[0].lon;
            getWeather(lat, long);
            getForecast(lat,long);
        });

}

function getWeather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=bd39c49ed84945757ccf3678c820d194&units=imperial`, {
        cache: 'reload',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cityName = data.name;
            var currentTemp  = data.main.temp;
            var currentWind = data.wind.speed;
            var currentHumid = data.main.humidity;


            city.textContent = cityName + ' ' + moment().format("L");
            temp.textContent = "Temp: " + currentTemp +' F' ;
            wind.textContent = "Wind: " + currentWind + 'mph';
            humidity.textContent ="Humidity: " + currentHumid + '%';
            //call the render function here




        });
}


function getForecast(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=bd39c49ed84945757ccf3678c820d194&units=imperial`, {
        cache: 'reload',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // var forcastTemp  = data.main.temp;
            // var forcastWind = data.wind.speed;
            // var forcastHumid = data.main.humidity;
            //call the render function here


        });
}


//create another function called render html
