const apiKey = "b73a47df5b1915c8ab16c3cfd4447bcd";

// begin: query selectors
// begin: query selectors
const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const weatherInfoSection = document.querySelector(".weather-info");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");
const countryTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const currentDateTxt = document.querySelector(".current-date-txt");

// end: query selectors
// end: query selectors

// begin: when search-icon clicked
// begin: when search-icon clicked
searchBtn.addEventListener("click", (e) => {
	if (cityInput.value.trim() != "") {
		updateWeatherInfo(cityInput.value);
		cityInput.value = "";
	}
});
// end: when search-icon clicked
// end: when search-icon clicked

// begin: when enter pressed
// begin: when enter pressed
cityInput.addEventListener("keydown", (e) => {
	if (e.key == "Enter" && cityInput.value.trim() != "") {
		updateWeatherInfo(cityInput.value);
		cityInput.value = "";
	}
});
// end: when enter pressed
// end: when enter pressed

// begin: get data api
// begin: get data api
const getFetchData = async (endPoint, city) => {
	const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&units=metric&appid=${apiKey}`;
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
// end: get data api
// end: get data api

// begin: render weather icon
// begin: render weather icon
const getWeatherIcon = () => {
	// Not needed. The weatherAPI being used provides us with the icons.
	// We will directly fetch the corresponding weather icon
	// along with the weather info from the api.
};
// end: render weather icon
// end: render weather icon

const getCurrentDate = () => {
	const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const currentDateObj = new Date();
	const currentDay = weekdays[currentDateObj.getDay()];
	const currentDate = currentDateObj.getDate();
	const currentMonth = months[currentDateObj.getMonth()];

	const date_time_string = ` ${currentDay}, ${currentDate} ${currentMonth}`;
	console.log(date_time_string);
	return date_time_string;
};

// begin: process data
// begin: process data
const updateWeatherInfo = async (city) => {
	const weatherData = await getFetchData("weather", city);
	// if city not found
	if (weatherData.cod !== 200) {
		console.log("Location not found in server");
		showDisplaySection(notFoundSection);
		return;
	}
	console.log("Weather Data: ", weatherData);
	// if city found

	// variables that will store the important information
	const country = weatherData.name;
	const temp = weatherData.main.temp;
	const humidity = weatherData.main.humidity;
	const weatherCode = weatherData.weather[0].id;
	const weatherIconCode = weatherData.weather[0].icon;
	const main = weatherData.weather[0].main;
	const wind = weatherData.wind.speed;

	countryTxt.textContent = country;
	tempTxt.textContent = Math.round(temp) + "°C";
	conditionTxt.textContent = main;
	humidityValueTxt.textContent = humidity + "%";
	windValueTxt.textContent = wind + " M/s";
	let weatherImgUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
	weatherSummaryImg.src = weatherImgUrl;
	currentDateTxt.textContent = getCurrentDate();

	await updateForecastInfo(city);

	showDisplaySection(weatherInfoSection);
};
// end: process data
// end: process data

// begin: process forecast data
// begin: process forecast data
const updateForecastInfo = async (city) => {
	const forecastDatas = await getFetchData("forecast", city);
	const timeTaken = "12:00:00";
	// console.log("iso date: ", new Date().toISOString());
	// output: iso date:  2025-07-23T04:05:54.617Z
	const todayDate = new Date().toISOString().split("T")[0];

	let forecastDataList = [];

	forecastDatas.list.forEach((forecastData) => {
		// console.log(forecastData);
		if (forecastData.dt_txt.split(" ")[1] === timeTaken) {
			forecastDataList.push(forecastData);
		}
	});
	console.log("filtered forecastDataList: ", forecastDataList);
};
// end: process forecast data
// end: process forecast data

// begin: conditional rendering of sections
// begin: conditional rendering of sections
const showDisplaySection = (section) => {
	[weatherInfoSection, notFoundSection, searchCitySection].forEach(
		(section) => {
			section.style.display = "none";
		}
	);

	section.style.display = "flex";
};
// end: conditional rendering of sections
// end: conditional rendering of sections
