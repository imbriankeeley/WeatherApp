const conditionIcon = document.getElementById('condition-icon');
const fToCButton = document.getElementById('f-c');

const fToCSpan = document.querySelectorAll('.f-c-span');

const locationValue = document.getElementById('location');
const conditionsValue = document.getElementById('conditions');
const temperatureValue = document.getElementById('temperature');
const humidityValue = document.getElementById('humidity');
const windspeedValue = document.getElementById('wind-speed');
const realTemp = document.getElementById('real-temp');

const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');

const pickCity = document.getElementById('pick-city');
const weatherInfo = document.getElementById('weather-info');

const loader = document.getElementById('loader');

function celsToFar(num) {
    const cels = Number(num);
    const result = Math.round((9/5) * cels + 32);
    return result.toString();
}

function farToCels(num) {
    const far = Number(num) - 32;
    const result = Math.round(far * (5/9));
    return result.toString();
}

fToCButton.addEventListener('click', () => {
    const text = fToCButton.innerText;
    if (text == 'Change to Fahrenheit') {
        fToCButton.innerText = 'Change to Celsius';
        for (const span of fToCSpan) {
            span.innerText = '°F'
        }

        realTemp.innerText = celsToFar(realTemp.innerText);

    }

    if (text == 'Change to Celsius') {
        fToCButton.innerText = 'Change to Fahrenheit';
        for (const span of fToCSpan) {
            span.innerText = '°C'
        }

        realTemp.innerText = farToCels(realTemp.innerText);

    }
});


async function getWeather(city) {
    if (city) {
        loader.classList.remove('hidden');
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=E7EJGZH6DBLK6X57E9TVEJ8QG`, {mode: 'cors'});
        loader.classList.add('hidden');
        const location = await response.json();
        
        const address = await location.address;
        const conditions = await location.currentConditions.conditions;
        const temp = JSON.stringify(location.currentConditions.temp);
        const humidity = JSON.stringify(location.currentConditions.humidity);
        const windspeed = JSON.stringify(location.currentConditions.windspeed);

        console.log(location);

        return objectifyWeather(address, conditions, temp, humidity, windspeed);        

}}
    
function objectifyWeather(address, conditions, temp, humidity, windspeed) {
    const weather = {
        address: address,
        condition: conditions,
        temp: temp,
        humidity: humidity,
        windspeed: windspeed
    }

    return weather;
}

function populateWeatherApp(address, condition, realTemperature, humidity, windspeed) {
    if (!pickCity.classList.contains('hidden')) {
        pickCity.classList.add('hidden');
    }

    if (weatherInfo.classList.contains('hidden')) {
        weatherInfo.classList.remove('hidden');
    }

    const text = fToCButton.innerText;

    if (text == 'Change to Fahrenheit') {
        realTemp.innerText = farToCels(realTemperature);
    } else {
        realTemp.innerText = realTemperature;
    }

    locationValue.innerText = address;
    conditionsValue.innerText = condition;
    humidityValue.innerText = humidity;
    windspeedValue.innerText = windspeed

}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();

    const weather = await getWeather(city);

    let location = weather.address.toLowerCase();
    const nameArray = location.split(' ');
    let address = '';
    nameArray.forEach(element => {
        address += element.charAt(0).toUpperCase() + element.slice(1) + ' ';
    });

    let conditions = weather.condition.toLowerCase();
    const conditionArray = conditions.split(' ');
    let condition = '';
    conditionArray.forEach(element => {
        condition += element.charAt(0).toUpperCase() + element.slice(1) + ' ';
    })
    

    populateWeatherApp(address.trim(), condition.trim(), weather.temp, weather.humidity, weather.windspeed)

    console.log(weather);

});