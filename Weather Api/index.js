const inp = document.querySelector('#cityInput');
const search = document.querySelector('#searchBtn');
const loc = document.querySelector('#locBtn');

const city = document.querySelector('.one');
const country = document.querySelector('.one1');
const icon = document.querySelector('#weatherIcon');
const temp = document.querySelector('.temp');
const text = document.querySelector('.text');
const time = document.querySelector('.time');
const humi = document.querySelector('.humi');
const preci = document.querySelector('.preci');
const wind = document.querySelector('.wind');
const high = document.querySelector('.high');
const low = document.querySelector('.low');

function api() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=7738c00bb98d49b79cc51344250912&q=${inp.value}&aqi=no`)
        .then(res => res.json())
        .then(data => dataLoad(data))
        .catch(() => city.textContent = "City Not Found❌");
}

function dataLoad(data) {
    city.textContent = data.location.name;
    country.textContent = data.location.country;
    temp.textContent = `${data.current.temp_c}°C`;
    text.textContent = data.current.condition.text;
    time.textContent = `Local Time: ${data.location.localtime}`;
    humi.textContent = `Humidity: ${data.current.humidity}%`;
    preci.textContent = `Precipitation: ${data.current.precip_mm} mm`;
    wind.textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
    high.textContent = `Cloud: ${data.current.cloud}%`;
    low.textContent = `Visibility: ${data.current.vis_km} km`;

    icon.src = `https:${data.current.condition.icon}`;
}

search.addEventListener('click', api);



loc.addEventListener('click', () => {
    city.textContent = "Detecting your location...";
    
    navigator.geolocation.getCurrentPosition(success, error);
});
function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Fetch weather using lat & lon
    fetch(`https://api.weatherapi.com/v1/current.json?key=7738c00bb98d49b79cc51344250912&q=${lat},${lon}&aqi=no`)
        .then(res => res.json())
        .then(dataLoad)
        .catch(() => city.textContent = "Error fetching location weather!");
}

function error() {
    city.textContent = "Location access denied ❌";
}
