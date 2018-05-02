function getLocation() {
    if(navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(showPosition, posError, {timeout: 10000});
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log('position: ', position.coords.latitude, position.coords.longitude);
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        }, showError, {timeout: 10000});
        return true;
    } else {
        // Do other things if rejected by user
        console.log('rejected!');
        return false;
    }
}

function showPosition(position) {
    console.log("Current position: " + position);
}

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
  }

$(document).ready(function() {
    const locPermission = getLocation();

    // getWeatherInfo(locPermission);

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
        const condition = response.weather[0];
        const windSpeed = response.wind.speed;
        const windCar = toCardinal(response.wind.deg);
        $('.weather').text(`${temp}°F ${windCar} ${windSpeed} mph`);
        // $('.weather p').text(`${windCar} ${windSpeed} mph`)
        // console.log('The current condition is ', condition);
        // console.log('The wind speed is ', windSpeed);
        // console.log('The cardinal direction is ', response.wind.deg, ' ', windCar);
    }
});

function getWeatherInfo(permission) {
    const key = '1ca070dac85dc040481cc24e1eecb4bb';
    const request = new XMLHttpRequest();

    if(permission) {
        const url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;

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
            const condition = response.weather[0];
            const windSpeed = response.wind.speed;
            const windCar = toCardinal(response.wind.deg);
            $('.weather').text(`${temp}°F ${windCar} ${windSpeed} mph`);
            // $('.weather p').text(`${windCar} ${windSpeed} mph`)
            // console.log('The current condition is ', condition);
            // console.log('The wind speed is ', windSpeed);
            // console.log('The cardinal direction is ', response.wind.deg, ' ', windCar);
        }        
    } else {
        const city = 'San%20Diego';
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
            const condition = response.weather[0];
            const windSpeed = response.wind.speed;
            const windCar = toCardinal(response.wind.deg);
            $('.weather').text(`${temp}°F ${windCar} ${windSpeed} mph`);
            // $('.weather p').text(`${windCar} ${windSpeed} mph`)
            // console.log('The current condition is ', condition);
            // console.log('The wind speed is ', windSpeed);
            // console.log('The cardinal direction is ', response.wind.deg, ' ', windCar);
        }
    }
}

const toFahrenheit = (kelvin) => { return kelvin * (9/5) - 459.67 }

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