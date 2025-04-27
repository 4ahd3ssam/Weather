var apiKey = "27a418334b9a4fa1893112400252704";
var searchInput = document.getElementById("searchInput");
var searchValue;
fetchWeatherAPI("cairo");
searchInput.addEventListener("input", function () {
    searchValue = searchInput.value;
    fetchWeatherAPI(searchValue);
})

async function fetchWeatherAPI(searchValue) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchValue}&days=3`, {
        Method: "POST",
    })
    var result = await response.json();
    console.log(result);

    document.getElementById("country").innerText = result.location.name;
    displayCurrentDay(result.current)
    displayNextDays(result.forecast.forecastday);
}

function displayCurrentDay(info) {
    var date = new Date(info.last_updated.replace(" ", "T"));
    var weekDay = date.toLocaleDateString(undefined, { weekday: 'long' });
    var dayMonth = date.toLocaleDateString(undefined, { day: 'numeric', month: 'long' });
    document.querySelector("#currDay .head").innerHTML = `
        <h6 class="fs-14px">${weekDay}</h6>
        <h6 class="fs-14px">${dayMonth}</h6>
    `
    document.getElementById("currDayDegree").innerText = info.temp_c;
    document.getElementById("currDayIcon").src = info.condition.icon;
    document.getElementById("currDayStatus").innerText = info.condition.text;
    document.getElementById("humidity").innerText = info.humidity + '%';
    document.getElementById("wind").innerText = info.wind_kph;
    document.getElementById("dir").innerText = info.wind_dir;

}

function displayNextDays(info) {
    for (var i = 1; i < info.length; i++) {
        var date = new Date(info[i].date.replace(" ", "T"));
        var weekDay = date.toLocaleDateString(undefined, { weekday: 'long' });
        var dayMonth = date.toLocaleDateString(undefined, { day: 'numeric', month: 'long' });
        document.querySelectorAll(".nextDay .head")[i - 1].innerHTML = `
            <h6 class="fs-14px text-center">${weekDay}</h6>
        `
        document.querySelectorAll(".nextDay .nextDayIcon")[i - 1].src = info[i].day.condition.icon;
        document.querySelectorAll(".nextDay .nextDayMax")[i - 1].innerText = info[i].day.maxtemp_c;
        document.querySelectorAll(".nextDay .nextDayMin")[i - 1].innerText = info[i].day.mintemp_c;
        document.querySelectorAll(".nextDay .nextDayStatus")[i - 1].innerText = info[i].day.condition.text;

    }
}
