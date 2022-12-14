var form = document.querySelector("#form");
var input = document.querySelector("#input");
var city = document.getElementById('city');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var fiveDay = document.getElementById('fiveday');
var buttons = document.getElementById('extra-buttons');

var arr = [];

//event listener for city button
form.addEventListener("submit", function (event) {
    event.preventDefault(event);
    document.getElementById('1').innerHTML = '';
    document.getElementById('2').innerHTML = '';
    document.getElementById('3').innerHTML = '';
    document.getElementById('4').innerHTML = '';
    document.getElementById('5').innerHTML = '';
    var inputCity = input.value;
    getLatLong(inputCity);
    //
    createButton(inputCity,false);


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
            var obj = {};
            var cityName = data.name;
            var currentTemp = data.main.temp;
            var currentWind = data.wind.speed;
            var currentHumid = data.main.humidity;


            city.textContent = cityName + ' ' + moment().format("L");
            temp.textContent = "Temp: " + currentTemp + ' F';
            wind.textContent = "Wind: " + currentWind + 'mph';
            humidity.textContent = "Humidity: " + currentHumid + '%';
            //call the render function here

            obj.City = cityName;
            obj.Temp = currentTemp;
            obj.Wind = currentWind;
            obj.Humidity = currentHumid;

            arr.push(obj);




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
    var obj = {};


    //loop to pull data in 24 hour increments, data is in 3s so index is at 8
    for (var i = 0; i < data.list.length; i += 8) {
        //add header to the forcast section
        fiveDay.textContent = "5 Day Forecast: ";
        //assigned variables for data required
        var forcastDate = data.list[i].dt_txt
        var forcastTemp = data.list[i].main.temp;
        var forcastWind = data.list[i].wind.speed;
        var forcastHumid = data.list[i].main.humidity;
        //created a string from the counter to push data to each element sequentially
        var string = counter.toString()
        var doc = document.getElementById(string);
        //created the necessary elements
        var header = document.createElement("h3");
        var pOne = document.createElement("p");
        var pTwo = document.createElement("p");
        var pThree = document.createElement("p");
        //print data to page
        header.textContent = forcastDate;
        pOne.textContent = "Temp: " + forcastTemp + 'F';
        pTwo.textContent = "Wind: " + forcastWind + 'mph';
        pThree.textContent = "Humidity: " + forcastHumid + "%";
        //append the element to the parent doc
        doc.appendChild(header);
        doc.appendChild(pOne);
        doc.appendChild(pTwo);
        doc.appendChild(pThree);
        //add data to the object
        obj.Day = forcastDate;
        obj.Temp = forcastTemp;
        obj.Wind = forcastWind;
        obj.Humidity = forcastHumid;
        counter++;
        //push data to the array
        arr.push(obj);
    }
    console.log(arr);
}


function saveLocation(cityName) {
    //initialize or pull json object in local storage
    var savedCities = JSON.parse(localStorage.getItem("City")) || [];
    //boolean value to see if something is present
    var alreadyExists = false;
    for (var i = 0; i < savedCities.length; i++) {
        //searches the array for all values of name
        if (savedCities[i] == cityName) {
            //if it exists we change the value to true
            alreadyExists = true;
        }
    }
    if (alreadyExists) {
        console.log('exists');
    } else {
        //adding to existing object the location and name
        
        savedCities.push(cityName.toLowerCase());
        //saves it to storage and converts back to a string for JSON 
        localStorage.setItem("City", JSON.stringify(savedCities));
    }


}

//creates a new button for everything clicked on
function createButton(inputCity, init) {
    var arrCity = JSON.parse(localStorage.getItem("City")) || [];
    if(init){
        arrCity = [];
    }
    if(arrCity.includes(inputCity.toLowerCase())){
        console.log("city already exists");
    }else{
        var newButton = document.createElement('button');
        newButton.innerHTML = inputCity;
        newButton.style.textTransform = 'capitalize';
        buttons.appendChild(newButton);
        newButton.addEventListener('click', function (event) {
            event.preventDefault(event);
            document.getElementById('1').innerHTML = '';
            document.getElementById('2').innerHTML = '';
            document.getElementById('3').innerHTML = '';
            document.getElementById('4').innerHTML = '';
            document.getElementById('5').innerHTML = '';
            getLatLong(inputCity);
        });
    }
    saveLocation(inputCity);
}

//on page loadup check the data in local storage and create a new button
var arrCity = JSON.parse(localStorage.getItem("City")) || [];

for(var i = 0; i< arrCity.length;i++){
    createButton(arrCity[i],true);
}
