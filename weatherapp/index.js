const cityinput = document.querySelector("#citysearch");
const searchBtn = document.querySelector("#searchBtn");
const notFoundSection = document.querySelector("#notFound");
const searchCitySection = document.querySelector(".searchCity");
const weatherInfoSection = document.querySelector(".weatherInfoSection");
const countryTxt = document.querySelector(".Place");
const tempTxt = document.querySelector(".tempTxt");
const conditiionTxt = document.querySelector(".conditionTxt");
const humidityTxt = document.querySelector(".humidityTxt");
const widvalueTxt = document.querySelector(".windSpeed");
const weatherImg = document.querySelector(".weatherImg");
const currentDate = document.querySelector(".Date");

const forecastItemsContainer = document.querySelector(".forecastContainer");

const apiKey = "42caf8ce3752b3b41f1586c33caa2158";
searchBtn.addEventListener("click", () => {
  if (cityinput.value.trim() != "") {
    updateWeatherInfo(cityinput.value);
    cityinput.value = "";
    cityinput.blur();
  }
});
cityinput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && cityinput.value.trim() != "") {
    updateWeatherInfo(cityinput.value);
    cityinput.value = "";
    cityinput.blur();
  }
});
async function getFetchData(endPoint, city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch weather data");
    return response.json();
  } catch (error) {
    console.error(error);
    return { cod: "error" };
  }
}

function getWeatherIcon(id) {
  if (id <= 232) {
    return "storm.svg";
  }
  if (id <= 321) {
    return "drizzle.png";
  }
  if (id <= 531) {
    return "rain.svg";
  }
  if (id <= 622) {
    return "snow.svg";
  }
  if (id <= 781) {
    return "icon3.png";
  }
  if (id <= 800) {
    return "clear.svg";
  } else return "cloud.svg";
}
function getCurrentdate() {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  return currentDate.toLocaleDateString("en-GB", options);
}

async function updateWeatherInfo(city) {
  const weatherData = await getFetchData("weather", city);
  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection);

    return;
  }
  console.log(weatherData);
  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;

  countryTxt.textContent = country;
  tempTxt.textContent = Math.round(temp) + "°C";
  conditiionTxt.textContent = main;
  humidityTxt.textContent = humidity + "%";
  widvalueTxt.textContent = speed + "M/s";

  currentDate.textContent = getCurrentdate();

  weatherImg.src = `images/${getWeatherIcon(id)}`;
  await updateForecastInfo(city);
  showDisplaySection(weatherInfoSection);
}

async function updateForecastInfo(city) {
  const forecastData = await getFetchData("forecast", city);
  const timeTaken = "12:00:00";
  const todayDate = new Date().toISOString().split("T")[0];
  forecastItemsContainer.innerHTML = "";
  forecastData.list.forEach((forecastWeather) => {
    if (
      forecastWeather.dt_txt.includes(timeTaken) &&
      !forecastWeather.dt_txt.includes(todayDate)
    ) {
      updateForecastItems(forecastWeather);
    }
  });
}
function updateForecastItems(weatherData) {
  const {
    dt_txt: date,
    weather: [{ id }],
    main: { temp },
  } = weatherData;
  const dateTaken = new Date(date);
  const dateOption = {
    day: "2-digit",
    month: "short",
  };
  const dateResult = dateTaken.toLocaleDateString("en-US", dateOption);
  const forecastItem = `
    <div
          id="card1"
          class="card p-1 min-w-16 bg-gradient-to-b from-violet-500 to-violet-400 h-fit w-fit border-white flex flex-col justify-center items-center rounded-md m-5"
        >
          <div class="date">${dateResult}</div>
          <img class="size-10" src="images/${getWeatherIcon(id)}" alt="" />
          <div id="temperature">${Math.round(temp)}°C</div>
    </div>
    `;
  forecastItemsContainer.insertAdjacentHTML("beforeend", forecastItem);
}
function showDisplaySection(section) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(
    (section) => {
      section.classList.add("hidden");
    }
  );
  section.classList.remove("hidden");
}
