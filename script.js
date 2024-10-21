const apiKey = 'API_KEY_HERE';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';

const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

async function getWeather(city) {
    try {
        weatherInfo.innerHTML = '<p>Loading...</p>';
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
        console.log(data);
        
        const temp = data.main.temp;
        const tempMax = data.main.temp_max;
        const tempMin = data.main.temp_min;
        const humidity = data.main.humidity;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        console.log(temp, description, iconUrl);

        weatherInfo.innerHTML = `
        <p>Temperature: ${temp} °F</p>
        <p>Max/Min Temp: ${tempMax} °F / ${tempMin} °F</p>
        <p>Current Humidity: ${humidity} %</p> 
        <p>Conditions: ${description}</p>
        <img src="${iconUrl}" alt="${description}">
        `;
    } catch(error) {
        console.log('Error fetching weather data: ', error);
    }
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    getWeather(city);
})