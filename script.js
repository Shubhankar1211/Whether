document.addEventListener('DOMContentLoaded', () => {
    // Get all DOM elements correctly
    const cityInput = document.getElementById('city-input');
    const weatherButton = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameEl = document.getElementById('city-name');
    const temperatureEl = document.getElementById('temperature');
    const descriptionEl = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');
    
    const API_KEY = "76f26b490302419e4730ee9312c0f4a6"; // Ideally, use env variables
    
    weatherButton.addEventListener('click', async function () {
        const city = cityInput.value.trim();
        if (!city) return;
        
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });
    
    async function fetchWeatherData(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        
        const data = await response.json();
        return data;
    }
    
    function displayWeatherData(data) {
        // Show the weather info block and hide error
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        
        // Populate data
        cityNameEl.innerText = data.name;
        temperatureEl.innerText = `${Math.round(data.main.temp)}°C`;
        descriptionEl.innerText = data.weather[0].description;
    }
    
    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
});

// Things to remember when you call the database or someone's server:
// Server may throw you some error
// Server is always in another continent
// It takes some time or some seconds
// JS alone is not capable of making web requests; we need node env or window env to make this HTTP request