import './style.css'
import './backgrounds.css'

const { countryCodeEmoji } = require('country-code-emoji');


const cities = ['Washington', 'New York', 'Los Angeles', 'Toronto', 'Mexico City', 'London', 'Paris', 'Madrid', 'Rome, IT', 'Berlin', 'Moscow', 'Rio de Janeiro', 'Sao Paulo', 'Tokyo', 'Beijing', 'Seoul', 'Dehli'];

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

function setBackground(weather) {
    const background = document.getElementById('background')
    switch (weather) {
        case '01d':
            background.className = "clearDay";
            break;
        case '01n':
            background.className = "clearNight";
            break;
        case '02d':
            background.className = "fewCloudsDay";
            break;
        case '02n':
            background.className = "fewCloudsDay";
            break;
        case '03n':
            background.className = "cloudyDay";
            break;
        case '03d':
            background.className = "cloudyNight";
            break;
        case '04d':
            background.className = "brokenDay";
            break;
        case '04n':
            background.className = "brokenNight";
            break;
        case '09d':
        case '10d':
            background.className = "rainyDay";
            break;
        case '09n':
        case '10n':
            background.className = "rainyNight";
            break;
        case '11d':
            background.className = "thunderDay";
            break;
        case '11n':
            background.className = "thunderNight";
            break;
        case '13d':
            background.className = "snowyDay";
            break;
        case '13n':
            background.className = "snowyNight";
            break;
        case '50d':
            background.className = "mistyDay";
            break;
        case '50n':
            background.className = "mistyNight";
            break;
        default:
            break;
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
    if (cityName.toLowerCase === 'rome' || cityName.toLowerCase === 'rome, italy') {
        cityName == 'Rome, IT'
    }
    getData(cityName)
})

// PAGE ELEMENTS //

function changeCity(city) {
    // City
    const cityNameDOM = document.getElementById('cityName')
    cityNameDOM.innerText = `${city.name} ${countryCodeEmoji(city.sys.country)}`
    //Weather
    const weatherDOM = document.getElementById('weather')
    weatherDOM.innerText = `${city.weather[0].main}`

    const weatherIcoDOM = document.getElementById('weatherIcon')
    weatherIcoDOM.alt = `${city.weather[0].description}`
    weatherIcoDOM.src = 'https://openweathermap.org/img/wn/' + `${city.weather[0].icon}` + '.png'
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
    // Set Background
    setBackground(city.weather[0].icon)
}

