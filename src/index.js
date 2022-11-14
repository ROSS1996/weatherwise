import './style.css'


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let city = urlParams.get('city')

if (city === null) {
    city = 'Rio de Janeiro'
}

const searchDOM = document.getElementById('searchCity')

const cityNameDOM = document.getElementById('cityName')
const weatherDOM = document.getElementById('weather')
const temperatureDOM = document.getElementById('temperature')
const feelsLikeDOM = document.getElementById('feelsLike')
const tempMinDOM = document.getElementById('tempMin')
const tempMaxDOM = document.getElementById('tempMax')
const humidityDOM = document.getElementById('humidity')


async function getData (city) {
    let weatherInfo;
    try {
        weatherInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4ac58ea560a4d5f7c1bffa9834a17203`)
        if (!weatherInfo.ok) {
            alert('City not found')
        } else {
            const weatherObject = weatherInfo.json()
            return weatherObject
        }
    } catch (err) {
        alert(err)
    }

}

const info = getData(city)
info.then( function (x) {
    cityNameDOM.innerText = `${x.name}, ${x.sys.country}`,
    weatherDOM.innerText = `${x.weather[0].main}`,
    temperatureDOM.innerText = `${x.main.temp}º`,
    feelsLikeDOM.innerText = `${x.main.feels_like}º`,
    tempMinDOM.innerText = `${x.main.temp_min}º`,
    tempMaxDOM.innerText = `${x.main.temp_max}º`,
    humidityDOM.innerText = x.main.humidity
    }
)