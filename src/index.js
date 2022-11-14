import './style.css'

const cityNameDOM = document.getElementById('cityName')
const weatherDOM = document.getElementById('weather')
const temperatureDOM = document.getElementById('temperature')
const feelsLikeDOM = document.getElementById('feelsLike')
const tempMinDOM = document.getElementById('tempMin')
const tempMaxDOM = document.getElementById('tempMax')
const humidityDOM = document.getElementById('humidity')


async function getData (city) {
    try {
        const weatherInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4ac58ea560a4d5f7c1bffa9834a17203`)
        const weatherObject = weatherInfo.json()
        return weatherObject
    } catch (err) {
        alert(err)
    }

}

let teste = getData('Rio de Janeiro');

teste.then( function (x) {
    console.log(x)
    cityNameDOM.innerText = `${x.name}, ${x.sys.country}`,
    weatherDOM.innerText = `${x.weather[0].main}`,
    temperatureDOM.innerText = `${x.main.temp}º`,
    feelsLikeDOM.innerText = `${x.main.feels_like}º`,
    tempMinDOM.innerText = `${x.main.temp_min}º`,
    tempMaxDOM.innerText = `${x.main.temp_max}º`,
    humidityDOM.innerText = x.main.humidity
    }
)