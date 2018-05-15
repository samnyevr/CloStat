let temperature = 0;

function getLocation() {
    const key = '1ca070dac85dc040481cc24e1eecb4bb';
    const request = new XMLHttpRequest();

    if(navigator.geolocation) {
        console.log('Got permission!');
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${key}`;

            console.log(`The url is ${url}`);
            getWeatherInfo(request, url);
        }, showError, {timeout: 10000});
    } else {
        console.log('Geolocation not supported');
        const city = 'San%20Diego';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`;

        getWeatherInfo(request, url);
    }
}

/* In the case that user deny geolocation or other errors, use default user signup location */
function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }

    const database = firebase.database();
    database.ref('users/Bob').once('value', (snapshot) => {
        const data = snapshot.val();
        const key = '1ca070dac85dc040481cc24e1eecb4bb';
        const request = new XMLHttpRequest();
        const city = data['location'];
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`;

        console.log(`The url is ${url}`);
        getWeatherInfo(request, url);
    });
  }

$(document).ready(() => {
    getLocation();

    $('.weather').click(() => {
        // $('.weather').innerHTML = '';
        if(temperature.includes('°F')) {
            console.log('Fahrenheit!');
            const temp = fToC(Number(temperature.substring(0, 2)));
            temperature = `${temp}°C`;
            $('.weather').text(`${temp}°C`);
            console.log("hello");
        } else {
            console.log('Celsius!');
            const temp = cToF(Number(temperature.substring(0, 2)));
            temperature = `${temp}°F`;
            $('.weather').text(`${temp}°F`);
            console.log("hello2");
        }
        console.log('The weather ', $('.weather').text);
    });
    //getWeatherInfo(locPermission);

    /*
    const city = 'San%20Diego';
    const key = '1ca070dac85dc040481cc24e1eecb4bb';

    const request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`;

    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            getElements(response);
        }
    }

    request.open("GET", url, true);
    request.send();

    getElements = function(response) {
        const temp = Math.round(toFahrenheit(response.main.temp));
        const condArr = response.weather[0];
        const windSpeed = response.wind.speed;
        const windCar = toCardinal(response.wind.deg);
        const condition = condArr.main;
        $('.weather').text(`${temp}°F`)
        //$('.weather').text(`${temp}°F ${windCar} ${windSpeed} mph`);
        // $('.weather p').text(`${windCar} ${windSpeed} mph`)
        console.log('The current condition is ', condition);
        $('.weather').append(displayWeather(condition));
        // console.log('The wind speed is ', windSpeed);
        // console.log('The cardinal direction is ', response.wind.deg, ' ', windCar);
    }*/
});

/* Get the weather information from the API through request */
function getWeatherInfo(request, url) {
    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            getElements(response);
        }
    }

    request.open("GET", url, true);
    request.send();

    // Get the specific information (temperature, weather condition, wind speed) from API
    getElements = function(response) {
        const temp = Math.round(toFahrenheit(response.main.temp));
        const condition = response.weather[0];
        const windSpeed = response.wind.speed;
        const windCard = toCardinal(response.wind.deg);
        $('.weather').text(`${temp}°F`);
        $('.weather').append(displayWeather(condition));
        temperature = `${temp}°F`;
    }
}

/* Display weather images depending on the weather condition */
function displayWeather(condition) {
    if(condition=="Rain") {
        return '<img src="images/rain.png">';
    } else if(condition=="Cloud") {
        return '<img src="images/clouds.png">';
    } else if(condition=="Snow") {
        return '<img src="images/snow.png">';
    } else {
        return '<img src="images/sun.png">';
    }
    return '<img src="images/sun.png">';
}

/* Functions used to convert temperature */
const toFahrenheit = (kelvin) => { return kelvin * (9/5) - 459.67 }
const toCalvin = (kelvin) => { return kelvin - 273.15 }
const fToC = (fahrenheit) => { return Math.round((fahrenheit-32)*(5/9)) }
const cToF = (celsius) => { return Math.round((celsius*(9/5))+32) }

/* Convert the degree to cardinal directions */
const toCardinal = (degree) => {
    if(degree > 360) degree -= 360;

    if((degree >= 348.75 && degree <= 360) ||(degree >= 0 && degree <= 11.25)) return 'N';
    else if(degree > 11.25 && degree <= 33.75) return 'NNE';
    else if(degree > 33.75 && degree <=56.25) return 'NE';
    else if(degree > 56.25 && degree <= 78.75) return 'ENE';
    else if(degree > 78.75 && degree <= 101.25) return 'E';
    else if(degree > 101.25 && degree <= 123.75) return 'ESE';
    else if(degree > 123.75 && degree <= 146.25) return 'SE';
    else if(degree > 146.25 && degree <= 168.75) return 'SSE';
    else if(degree > 168.75 && degree <= 191.25) return 'S';
    else if(degree > 191.25 && degree <= 213.75) return 'SSW';
    else if(degree > 213.75 && degree <= 236.25) return 'SW';
    else if(degree > 236.25 && degree <= 258.75) return 'WSW';
    else if(degree > 258.75 && degree <= 281.25) return 'W';
    else if(degree > 281.25 && degree <= 303.75) return 'WNW';
    else if(degree > 303.75 && degree <= 326.25) return 'NW';
    else return 'NNW';
}
