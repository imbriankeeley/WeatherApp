


async function getWeather(city) {
    if (city) {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=E7EJGZH6DBLK6X57E9TVEJ8QG`, {mode: 'cors'});
        const location = await response.json();
        
        const address = location.address;
        const conditions = location.currentConditions.conditions;
        const temp = JSON.stringify(location.currentConditions.temp);
        const humidity = JSON.stringify(location.currentConditions.humidity);
        const feelslike = JSON.stringify(location.currentConditions.feelslike);
        const windspeed = JSON.stringify(location.currentConditions.windspeed);

        return objectifyWeather(address, conditions, temp, humidity, feelslike, windspeed);        

}}
    
function objectifyWeather(address, conditions, temp, humidity, feelslike, windspeed) {
    const weather = {
        address: address,
        condition: conditions,
        temp: temp,
        humidity: humidity,
        feelslike: feelslike,
        windspeed: windspeed
    }

    return weather;
}