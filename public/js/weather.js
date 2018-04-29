function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        // Do other things if rejected by user
    }
}

function showPosition(position) {
    console.log("Current position: " + position);
}

$(document).ready(function() {
    $('#weather').click(function() {
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
            $('.showTemp').text(`The temperature is ${temp}`);
        }
    });
});

const toFahrenheit = (kelvin) => { return kelvin * (9/5) - 459.67 }