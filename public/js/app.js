const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const searchButton = document.querySelector('#btn-search');
const useGeolocationButton = document.querySelector('#btn-geolocation');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

const getWeather = (location, lat, long) => {
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  messageThree.textContent = '';

  let queries;
  if (location) {
    queries = `address=${location}`;
  } else {
    queries = `lat=${lat}&lang=${long}`;
  }
  fetch('/weather?' + queries).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        const { address, location='Your Location', description, currentTemp, feelslike, wind_speed, humidity, localtime } = data;
        messageOne.textContent = location + ' | Time: ' + localtime;
        messageTwo.textContent = `${description}, Current temperature is ${currentTemp} and it feels like ${feelslike}`;
        messageThree.textContent = `Humidity is ${humidity}% and Wind speed is ${wind_speed}KM/H`;
      }
    });
  });
};

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const location = search.value;
  getWeather(location, undefined, undefined);
});

useGeolocationButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }
  useGeolocationButton.setAttribute('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition((position) => {
    getWeather(
      undefined,
      position.coords.latitude,
      position.coords.longitude
    );
    useGeolocationButton.removeAttribute('disabled');
  });
});
