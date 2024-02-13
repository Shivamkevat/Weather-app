const apiKey =`5ba505ab900252afe9d28359c9b44f5d`;
// const city = "Delhi";
async function fetchWeatherData(city) {
    try{const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if(!response.ok){
        throw new Error("Unable to fetch Weather Data")
    }
    const data = await response.json();
    console.log(data);
    updateWeatherUI(data);
}
    catch(error){
        console.error(error);
    }
    
}
const cityName = document.querySelector(".city ");
const temp = document.querySelector( ".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date")
const descriptionIcon = document.querySelector(".description i")

// fetchWeatherData(); 

function updateWeatherUI(data){
    cityName.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility/1000} km`;
    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionText.textContent = data.weather[0].description;
    description.innerHTML = `<i class="material-icons">${weatherIconName}</i>`

}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input")

formElement.addEventListener("submit",function(e){
    e.preventDefault(); 
    const city =  inputElement.value;
    if (city !==""){
        fetchWeatherData(city);
        inputElement.value="";
    }
});

function getWeatherIconName(weatherCondition){
    const iconMap={
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain:"umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Mist: "cloud",
        Snow: "ac_unit",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",

    }
    return iconMap[weatherCondition] || "help"
}