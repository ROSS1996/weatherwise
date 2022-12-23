import './style.css'

const { countryCodeEmoji } = require('country-code-emoji');


const cities = ['Washington', 'New York', 'Los Angeles', 'Toronto', 'Mexico City', 'London', 'Paris', 'Madrid', 'Rome', 'Berlin', 'Moscow', 'Rio de Janeiro', 'Sao Paulo', 'Tokyo', 'Beijing', 'Seoul', 'Dehli'];

// FUNCTIONS //

async function getData(city) {
    let weatherInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4ac58ea560a4d5f7c1bffa9834a17203`);
    if (!weatherInfo.ok) {
        alert('City not found')
    } else {
        const weatherObject = await weatherInfo.json()
        changeCity(weatherObject)
    }
}

// EVENTS //

window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let city = urlParams.get('city')
    if (city === null) {
        city = cities[Math.floor(Math.random() * cities.length)];
    }
    getData(city)
};

const searchSubmit = document.getElementById('searchNewCity')
searchSubmit.addEventListener('submit', function (event) {
    event.preventDefault()
    let input = new FormData(event.target);
    let cityName = Object.fromEntries(input).city
    getData(cityName)
})

// PAGE ELEMENTS //

function changeCity(city) {
    // City
    const cityNameDOM = document.getElementById('cityName')
    cityNameDOM.innerText = `${city.name} ${countryCodeEmoji(city.sys.country)}`
    //Weather
    const currentWeather = document.getElementById('currentWeather')
    currentWeather.classList.add('row')
    const weatherTitle = document.createElement('h3')
    weatherTitle.innerText = 'Weather'
    const weather = document.createElement('p')
    weather.id = 'weather'
    weather.innerText = `${city.weather[0].main}`
    const weatherIcon = document.createElement('img')
    weatherIcon.src = 'https://openweathermap.org/img/wn/' + `${city.weather[0].icon}` + '.png'
    currentWeather.appendChild(weatherTitle)
    currentWeather.appendChild(weather)
    currentWeather.appendChild(weatherIcon)
    //Temperature
    const temperatureDOM = document.getElementById('temperature')
    temperatureDOM.innerText = `${city.main.temp}º`
    // Feels like
    const feelsLikeDOM = document.getElementById('feelsLike')
    feelsLikeDOM.innerText = `${city.main.feels_like}º`
    // Minimum Temperature
    const tempMinDOM = document.getElementById('tempMin')
    tempMinDOM.innerText = `${city.main.temp_min}º`
    // Maximum Temperature
    const tempMaxDOM = document.getElementById('tempMax')
    tempMaxDOM.innerText = `${city.main.temp_max}º`
    // Humidity
    const humidityDOM = document.getElementById('humidity')
    humidityDOM.innerText = city.main.humidity
    // Reset search field
    const searchCityField = document.getElementById('searchCity')
    searchCityField.value = ''
}

