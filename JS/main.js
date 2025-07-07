let searchInput = document.getElementById("searchInput");
let btnFind = document.querySelector(".btn-find");
let typingTimer;

btnFind.addEventListener("click", function () {
  let city = searchInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

searchInput.addEventListener("input", function () {
  clearTimeout(typingTimer);

  typingTimer = setTimeout(function () {
    let city = searchInput.value.trim();
    if (city !== "") {
      getWeather(city);
    }
  }, 400);
});

async function getWeather(city) {
  try {
    let response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=670a4128074f49489b2130705250707&q=${city}&days=3`
    );
    let data = await response.json();

    if (data.error) {
      console.log(data.error.message);
      return;
    }

    displayWeather(data);
  } catch (err) {
    console.log(err);
  }
}

function displayWeather(data) {
  let cards = Array.from(document.querySelectorAll(".inner"));

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];

    let dayData = data.forecast.forecastday[i];
    
    let date = new Date(dayData.date);
    let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    // console.log(dayName)
    let monthDay =
      date.getDate() +
      " " +
      date.toLocaleDateString("en-US", { month: "long" });

    let spans = card.querySelectorAll(".card-header span");
    spans[0].textContent = dayName;
    spans[1].textContent = monthDay;

    // let cityName = card.querySelector('.card .p-3 span, .card .d-flex.flex-column span');
    let cityName = card.querySelector(".p-3 > span, .flex-column > span");
    if (cityName) cityName.textContent = data.location.name;

    let temp = card.querySelector(".h1-style, .card h1");
    if (temp) temp.innerHTML = `${dayData.day.maxtemp_c}<sup>o</sup>C`;

    let img = card.querySelector(".sun-icon img");
    if (img) img.src = "https:" + dayData.day.condition.icon;

    let desc = img?.parentElement?.nextElementSibling;
    if (desc) desc.textContent = dayData.day.condition.text;

    let details = card.querySelectorAll(".d-flex.p-2 span");
    if (details.length === 3) {
      details[0].innerHTML = `<img src="images/icon-umberella.png" alt=""> ${dayData.day.daily_chance_of_rain}%`;
      details[1].innerHTML = `<img src="images/icon-wind.png" alt=""> ${dayData.day.maxwind_kph}km/h`;
      details[2].innerHTML = `<img src="images/icon-compass.png" alt=""> ${dayData.day.condition.text}`;
    }
  }
}

getWeather("Cairo");
// getWeather("Cairo");
