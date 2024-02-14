import { imgs } from './src/data/weatherImages';
import './style.css'
const weather$$ = document.querySelector("#weather");
const map = L.map('map').setView([40.3, -3.683], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="#">Jonatan Map</a>'
}).addTo(map);

const renderWeather = (data) => {
    weather$$.innerHTML = "";
    const divCard = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("h2");
    const temp = document.createElement("h3");
    const humedad = document.createElement("p");
    const salidaSol = document.createElement("p");
    const puestaSol = document.createElement("p");
    const viento = document.createElement("p");
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    name.textContent = data.name;
    temp.textContent = Math.round((data.main.temp - 273, 15)) + "Cº";
    humedad.textContent = data.main.humidity + "%";
    salidaSol.textContent = sunrise.getHours() + ":" + sunrise.getMinutes() + " Horas";
    puestaSol.textContent = sunset.getHours() + ":" + sunset.getMinutes() + " Horas";
    viento.textContent = data.wind.speed;
    divCard.append(name);
    divCard.append(temp);
    divCard.append(humedad);
    divCard.append(salidaSol);
    divCard.append(puestaSol);
    divCard.append(viento);
    divCard.append(img);
    weather$$.append(divCard);
    weather$$.style = `background-image: url(${imgs.find((img) => img.name === data.weather[0].main ).img})`;
    img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.body.appendChild(weather$$);
}

const realizarPetición = async(e) => {

    const { lat, lng } = e.latlng
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_API_KEY}`
    )
    const data = await response.json();
    renderWeather(data);
}

map.on('click', realizarPetición);