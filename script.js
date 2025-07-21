const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const apiKey = "b73a47df5b1915c8ab16c3cfd4447bcd";

// for clicking search icon
searchBtn.addEventListener("click", (e) => {
	// console.log(e);
	if (cityInput.value.trim() != "") {
		// console.log(cityInput.value);
		updateWeatherInfo(cityInput.value);
		cityInput.value = "";
	}
});

// for pressing enter button
cityInput.addEventListener("keydown", (e) => {
	// console.log(e);
	if (e.key == "Enter" && cityInput.value.trim() != "") {
		// console.log(cityInput.value);
		updateWeatherInfo(cityInput.value);
		cityInput.value = "";
	}
});

const getFetchData = async (endPoint, city) => {
	const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&units=metric&appid=${apiKey}&units=metric `;
	const response = await fetch(apiUrl);
	return response.json();
	// response will be:
	//     {
	//     "coord": {
	//         "lon": 90.4074,
	//         "lat": 23.7104
	//     },
	//     "weather": [
	//         {
	//             "id": 721,
	//             "main": "Haze",
	//             "description": "haze",
	//             "icon": "50n"
	//         }
	//     ],
	//     "base": "stations",
	//     "main": {
	//         "temp": 29.99,
	//         "feels_like": 36.01,
	//         "temp_min": 29.99,
	//         "temp_max": 29.99,
	//         "pressure": 1001,
	//         "humidity": 74,
	//         "sea_level": 1001,
	//         "grnd_level": 1000
	//     },
	//     "visibility": 4000,
	//     "wind": {
	//         "speed": 0,
	//         "deg": 0
	//     },
	//     "clouds": {
	//         "all": 75
	//     },
	//     "dt": 1753112301,
	//     "sys": {
	//         "type": 1,
	//         "id": 9145,
	//         "country": "BD",
	//         "sunrise": 1753053773,
	//         "sunset": 1753101977
	//     },
	//     "timezone": 21600,
	//     "id": 1185241,
	//     "name": "Dhaka",
	//     "cod": 200
	// }
};

const updateWeatherInfo = async (city) => {
	const weatherData = await getFetchData("weather", city);
	console.log("Weather Data: ", weatherData);
};
