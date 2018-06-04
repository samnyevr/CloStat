/*
 * weather.js lets the user to allow the app to track user's location or 
 * manually enter the city, which the OpenWeatherMap API use to make a 
 * requests to get the latest weather information. After getting the weather 
 * information, the temperature is converted from Kelvin to Celsius, and the 
 * weather information is stored in local storage for other js files to use. 
 * The corresponding weather information (temperature and weather condition) 
 * is then displayed on the web page.
 */

 /*
  * Get the geolocation if user gives permission, then display the temperature
  * and corresponding weather condition on the web page. If no permission is 
  * given, use the default user location from when user signed up.
  */
 function getLocAndShowTemp() {
    const key = '1ca070dac85dc040481cc24e1eecb4bb';
    const request = new XMLHttpRequest();
    const database = firebase.database();
    const user = localStorage['loggedInUser'];

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
 * Print the corresponding error in console, then use the user's default 
 * location to get the weather information and display the weather information
 * on the web page.
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

    // Change the displayed temperature between Celsius and Fahrenheit
    $('.weather').click(() => {
        if(localStorage['tempUnit'] == 'F') {
            const temp = fToC(Number(localStorage['temp']));
            localStorage['tempUnit'] = 'C';
            localStorage['temp'] = temp;
            $('.weather').text(`${temp}°C`);
        } else {
            const temp = cToF(Number(localStorage['temp']));
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
 * Wait for the URL request to finish before using a callback function to
 * extract the temperature information from the API and make clothing 
 * suggestions based on the temperature.
 */
function getWeatherInfo(request, url) {
    const database = firebase.database();
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
        $('.weather').text(`${temp}°F`);
        $('.weather').append(displayWeather(condition));
        // Save data to local storage (no expiration date)
        localStorage['temp'] = temp;
        localStorage['tempUnit'] = 'F';
        localStorage['condition'] = condition;
        const COLD = 65;
        const HOT = 80;
        const user = localStorage['loggedInUser'];


        //Send the weather information for the recomendation feature
        database.ref(`users/${user}`).once('value', (snapshot) => {
            const data = snapshot.val();

            try {
                const top = data.Clothes.Top;
                const bottom = data.Clothes.Bottom;
                const arrayT = Object.values(top);
                const arrayB = Object.values(bottom);

                let tempName;
                if(temp<COLD){
                    tempName = 'cold';

                }else if(temp>= COLD && temp <= HOT){
                    tempName = 'warm';
                    
                }else if (temp > HOT){
                    tempName = 'hot';
                    
                }else{
                    tempName = 'default';
                    
                }

                if(tempName == 'default'){

                }else{
                    const suggestionT = new Array();
                    const suggestionB = new Array();
                    let maxT = 0;
                    let maxB = 0;
                    for(const item of arrayT){
                        if(item.temp == tempName && item.clean){
                            suggestionT.push(item);
                            maxT++;

                        }
                    }
                    for(const item of arrayB){
                        if(item.temp == tempName && item.clean){
                            suggestionB.push(item);
                            maxB++;
                        }
                    }
                    //sends the weather data for the backend
                    $.ajax({
                        url: 'suggestion',
                        type: 'POST',
                        data: {top: suggestionT,
                                maxTop: maxT,
                                bottom: suggestionB,
                                maxBottom: maxB,
                                temp: tempName},
                        success: (data) =>{
                            //gets the random suggestion for the index page
                            $.ajax({
                                url: 'suggestion',
                                type: 'GET',
                                dataType: 'JSON',
                                success: (arrayImg)=>{
                                    $('.top img').attr('src',arrayImg.top);
                                    $('.bottom img').attr('src',arrayImg.bottom);
                                }
                            })
                        }
                    });
                }
            } catch(err) {
                console.log(err);
                return;
            }
        });
        
    }

}

/*
 * Display the corresponding weather picture depending on the weather condition.
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
