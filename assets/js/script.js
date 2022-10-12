var form = document.querySelector("#form");
var input = document.querySelector("#input");
var city = document.getElementById('city');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var fiveDay = document.getElementById('fiveday');


form.addEventListener("submit", function (event) {
    event.preventDefault();
    var inputCity = input.value;
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
            getForecast(lat, long);
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
            var currentTemp = data.main.temp;
            var currentWind = data.wind.speed;
            var currentHumid = data.main.humidity;


            city.textContent = cityName + ' ' + moment().format("L");
            temp.textContent = "Temp: " + currentTemp + ' F';
            wind.textContent = "Wind: " + currentWind + 'mph';
            humidity.textContent = "Humidity: " + currentHumid + '%';
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
            //get 5 day forcast from weather at noon to use free API 2,10,18,26,34,
            //call the render function here
            renderForcast(data);


        });
}


//create another function called render html
function renderForcast(data) {
    var counter = 1;

    for (var i = 2; i < 35; i += 8) {
        var forcastDate = data.list[i].dt_txt
        var forcastTemp = data.list[i].main.temp;
        var forcastWind = data.list[i].wind.speed;
        var forcastHumid = data.list[i].main.humidity;
        var string = counter.toString()
        var doc = document.getElementById(string);
        console.log(counter);
        console.log(string);
        var header = document.createElement("h3");
        var pOne = document.createElement("p");
        var pTwo = document.createElement("p");
        var pThree = document.createElement("p");
        header.textContent = forcastDate;
        pOne.textContent = "Temp: " + forcastTemp +'F';
        pTwo.textContent = "Wind: " + forcastWind + 'mph';
        pThree.textContent = "Humidity: " + forcastHumid + "%";
        doc.appendChild(header);
        doc.appendChild(pOne);
        doc.appendChild(pTwo);
        doc.appendChild(pThree);
        counter++;
    }
}
