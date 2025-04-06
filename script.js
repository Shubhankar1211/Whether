// Wait until the entire HTML document is loaded before running this script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the elements from the HTML by their ID
    const cityInput = document.getElementById('city-input'); // Input field where user types the city name
    const weatherButton = document.getElementById('get-whether-btn'); // Button to get weather info
    const weatherInfo = document.getElementById('Whether-info'); // Div to display weather results
    const cityNameDisplay = document.getElementById('city-name'); // Heading to display the city name
    const temperature = document.getElementById('temperature'); // Paragraph to show temperature
    const description = document.getElementById('description'); // Paragraph to show weather description
    const errorMessage = document.getElementById('error-message'); // Error message if city not found

    // Your API key for OpenWeatherMap API (always keep this safe in production)
    const API_KEY = "76f26b490302419e4730ee9312c0f4a6";

    // When the user clicks the button
    weatherButton.addEventListener('click', async function () {
        const city = cityInput.value.trim(); // Get the trimmed city name entered by the user

        // If no city name is entered, do nothing
        if (!city) {
            return;
        }

        try {
            // Call async function to fetch weather data
            const weatherData = await fetchWeatherData(city);
            // Display weather data if fetch is successful
            displayWeatherData(weatherData);
        } catch (error) {
            // If an error happens (like city not found), show error message
            showError();
        }
    });

    // Function to fetch weather data from OpenWeatherMap API
    async function fetchWeatherData(city) {
        // Construct the URL with city name, API key and units set to metric (Celsius)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        // Fetch data from the API
        const response = await fetch(url);

        // If the response is not okay (city not found, etc.), throw error
        if (!response.ok) {
            throw new Error("City not found");
        }

        // Convert the response to JSON format
        const data = await response.json();
        return data; // Return the fetched weather data
    }

    // Function to display the weather data on the screen
    function displayWeatherData(weatherData) {
        // Set the city name, temperature and description in the HTML
        cityNameDisplay.textContent = weatherData.name;
        temperature.textContent = `${weatherData.main.temp}°C`;
        description.textContent = weatherData.weather[0].description;

        // Show the weather info div and hide the error message
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    // Function to display an error message if city not found
    function showError() {
        // Hide the weather info and show the error message
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
});
