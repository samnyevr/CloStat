/*
 * Function Name: getLocAndShowTemp()
 * Description: Get the user's location and display the temperature. If user 
 * denied the permission, then use the user's default location.
 * Parameters: None
 * Error: Denied geolocation, geolocation not supported, geolocation timeout,
 * unknown error
 * return value: None 
 */
function getLocAndShowTemp() {
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

/*
 * Function Name: showError()
 * Description: Print the corresponding error in console, then use the user's
 * default location to get the weather information
 * Parameters: error - the error code of geolocation
 * Error: None
 * return value: None
 */
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
    const user = localStorage['loggedInUser'];
    database.ref(`users/${user}`).once('value', (snapshot) => {
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
    getLocAndShowTemp();

    $('.weather').click(() => {
        // $('.weather').innerHTML = '';
        if(localStorage['tempUnit'] == 'F') {
            const temp = fToC(Number(localStorage['temp']));
            // temperature = `${temp}°C`;
            localStorage['tempUnit'] = 'C';
            localStorage['temp'] = temp;
            $('.weather').text(`${temp}°C`);
        } else {
            const temp = cToF(Number(localStorage['temp']));
            // temperature = `${temp}°F`;
            localStorage['tempUnit'] = 'F';
            localStorage['temp'] = temp;
            $('.weather').text(`${temp}°F`);
        }
        $('.weather').append(displayWeather(localStorage['condition']));
    });

    $('#changeLocation').click(() => {
        console.log('Change location!');
        const database = firebase.database();
        const user = localStorage['loggedInUser'];
        database.ref(`users/${user}`).update({
            location: $('#locchangeinput').val()
        });
    });
});

/*
 * Function Name: getWeatherInfo()
 * Description: Get the weather information using url and request and display
 * it on the HTML.
 * Parameters: request - the XMLHTTPRequest
 *             url - the url to retrieve the data
 * Error: timeout 
 * return value: None
 */
function getWeatherInfo(request, url) {
    request.onreadystatechange = function() {
        // Wait until the request is good
        if(this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            // Call back function for when the request return the information
            // from the API server
            getElements(response);
        }
    }

    // Send the url request to get the information from the API
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
        // temperature = `${temp}°F`;
        // Save data to local storage (no expiration date)
        // window.localStorage.setItem("temp",temp);
        localStorage['temp'] = temp;
        localStorage['tempUnit'] = 'F';
        localStorage['condition'] = condition;
    }
}

/*
 * Function Name: displayWeather()
 * Description: Display the corresponding weather icon depending on the
 * weather condition.
 * Parameters: condition - the weather condition (cloudy, sunny, etc.)
 * Error: None
 * return value: the image source of the corresponding weather 
 */
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
const fToC = (fahrenheit) => { return ((fahrenheit-32)*(5/9)).toFixed(1) }
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
