import { useState, useEffect } from 'react';
import Gearlogo from "./assets/cog.svg"
import './App.css'

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cityInput, setCityInput] = useState('');


  const cities = ['Washington', 'New York', 'Los Angeles', 'Toronto', 'Mexico City', 'London', 'Paris', 'Madrid', 'Rome, IT', 'Berlin', 'Moscow', 'Rio de Janeiro', 'Sao Paulo', 'Tokyo', 'Beijing', 'Seoul', 'Dehli'];


  async function getData(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4ac58ea560a4d5f7c1bffa9834a17203`);
      const data = await response.json();
      setWeatherData(data);
      updateBackgroundColor(data?.weather[0].icon);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('City not found');
    }
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function handleSubmit() {
    if (cityInput) {
      await getData(cityInput);
      closeModal();
    }
  }


  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSubmit();
    } else if (event.key === 'Escape') {
      closeModal();
    }
  }


  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let city = urlParams.get('city');
    if (city === null) {
      city = cities[Math.floor(Math.random() * cities.length)];
    }
    getData(city);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  function updateBackgroundColor(icon) {
    const isNight = icon.includes('n');
    document.body.classList.toggle('night', isNight);
  }


  return (
    <>
      <header>
        <h2 id="cityName">{weatherData?.name}</h2>
        <div onClick={openModal} id='changeCity'>
          <span>Change city</span>
          <img src={Gearlogo} alt="" />
        </div>
      </header>
      <main id="background" >
        <div id='weatherInfo'>
          <div id='weatherImage'>
            <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`}
              alt={weatherData?.weather[0].description}
              id="weatherIcon" />
          </div>
          <p id="temperature">{weatherData?.main.temp}º</p>
          <p id="weather">{weatherData?.weather[0].main}</p>
        </div>
        <div id="otherWeather">
          <p>
            <span className='measurement'>Feels Like</span>
            <span>{weatherData?.main.feels_like}</span>
          </p>
          <p>
            <span className='measurement'>Minimum Temperature</span>
            <span>{weatherData?.main.temp_min}</span>
          </p>
          <p>
            <span className='measurement'>Maximum Temperature</span>
            <span>{weatherData?.main.temp_max}</span>
          </p>
          <p>
            <span className='measurement'>Humidity</span>
            <span>{weatherData?.main.humidity}</span>
          </p>
        </div>
      </main>
      {modalOpen && (
        <div className="modal" onClick={closeModal} >
          <div className="modal-content" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
            <span className="close" onClick={closeModal}>
              X
            </span>
            <h2>Enter City Name</h2>
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Enter city name"
            />
            <div className="modal-buttons">
              <button onClick={handleSubmit}>Change city</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default App
