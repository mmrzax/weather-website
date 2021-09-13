const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const location = search.value;
  
  messageOne.textContent = 'Loading . . .';
  messageTwo.textContent = '';
  messageThree.textContent = '';
  
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        const { address, location, description, currentTemp, feelslike, wind_speed, humidity, localtime } = data;
        messageOne.textContent = location + ' | LocalTime: ' + localtime;
        messageTwo.textContent = `${description}, Current temperature is ${currentTemp} and it feels like ${feelslike}`;
        messageThree.textContent = `Humidity is ${humidity}% and Wind speed is ${wind_speed}KM/H`;
      }
    });
  });

});

