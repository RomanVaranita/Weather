// Функция для получения координат по IP адресу
function getCoordinates() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
      .then(response => response.json())
      .then(data => {
        const latitude = data.latitude;
        const longitude = data.longitude;
        getWeather(latitude, longitude);
      })
      .catch(error => {
        console.log('Ошибка при получении координат:', error);
      });
  }
  
  // Функция для получения прогноза погоды
  function getWeather(latitude, longitude) {
    const apiKey = 'YOUR_API_KEY'; // Замените YOUR_API_KEY на ваш ключ API
  
    fetch(`https://api.open-meteo.com/weather?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m_1h,weathercode`)
      .then(response => response.json())
      .then(data => {
        const temperature = data.hourly.temperature_2m_1h[0];
        const weatherCode = data.hourly.weathercode[0];
        const weatherIcon = `https://open-meteo.com/img/icons/${weatherCode}.svg`;
  
        document.getElementById('temperature').textContent = temperature;
        document.getElementById('weather-icon').src = weatherIcon;
        document.getElementById('weather-description').textContent = getWeatherDescription(weatherCode);
      })
      .catch(error => {
        console.log('Ошибка при получении погоды:', error);
      });
  }
  
  // Функция для расшифровки кода погоды
  function getWeatherDescription(weatherCode) {
    // Здесь вы можете создать соответствия между кодами погоды и их расшифровками
    // Например:
    const weatherDescriptions = {
      0: 'Ясно',
      1: 'Малооблачно',
      2: 'Облачно',
      // ...
    };
  
    return weatherDescriptions[weatherCode] || 'Нет данных';
  }
  
  // Вызываем функцию для получения координат и прогноза погоды
  getCoordinates();
  