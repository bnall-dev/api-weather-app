/*
OBTAINS AND DISPLAYS DATA ON SEARCH
*/

let outputName = document.querySelector('#outputName');
let currentTemp = document.querySelector('#currentTemp');
let currentHilo = document.querySelector('#currentHilo');
let currentHumid = document.querySelector('#currentHumid');
let currentWind = document.querySelector('#currentWind');
let tempLine = document.querySelector('#tempLine');
let humidLine = document.querySelector('#humidLine');
let windLine = document.querySelector('#windLine');
let viewBoxes = document.querySelectorAll('.viewbox');
let outputDiv = document.querySelector('#outputDiv');
let searchForm = document.querySelector('#searchForm');
let weatherIcon = document.querySelector('#weatherIcon');
let searchNameField = document.querySelector('#searchNameField');
let inputButtonsDiv = document.querySelector('#inputButtonsDiv');
let guide = document.querySelector('#guide');

function clearField(event) {
  let { target } = event;
  target.value = '';
  target.style = 'color: black';
}

searchForm.addEventListener('submit', submitSearch);

/*
CHANGES SEARCH TYPE BASED ON SELECTION
*/
function addChangeSearchType() {
  let searchFields = document.querySelector('#searchFields');

  let searchNameButton = document.querySelector('#searchNameButton');
  searchNameButton.addEventListener('click', clickNameButton);
  function clickNameButton(event) {
    searchFields.innerHTML = `
    <input id = "searchNameField" class = "searchField" type = "text" value = "Search by City Name" style="color: grey">
  `;
    let searchNameField = document.querySelector('#searchNameField');
    searchNameField.addEventListener('click', clearField);
  }

  let searchZipButton = document.querySelector('#searchZipButton');
  searchZipButton.addEventListener('click', clickZipButton);
  function clickZipButton(event) {
    searchFields.innerHTML = `
    <input id = "searchZipField" class = "searchField" type = "text" value = "Search by Zip Code" style="color: grey">
  `;
    let searchZipField = document.querySelector('#searchZipField');
    searchZipField.addEventListener('click', clearField);
  }

  let searchLatlongButton = document.querySelector('#searchLatlongButton');
  searchLatlongButton.addEventListener('click', clickLatlongButton);
  function clickLatlongButton(event) {
    searchFields.innerHTML = `
    <div id = "latlongDiv">
      <input id = "searchLatField" class = "searchField" type = "text" value = "Search by Latitude" style="color: grey">
      <input id = "searchLongField" class = "searchField" type = "text" value = "and Longitude" style="color: grey">
    </div>
  `;
    let searchLatField = document.querySelector('#searchLatField');
    searchLatField.addEventListener('click', clearField);
    let searchLongField = document.querySelector('#searchLongField');
    searchLongField.addEventListener('click', clearField);
  }
}

addChangeSearchType();

async function submitSearch(event) {
  event.preventDefault();
  function renderData(data) {
    if (!data[0].name) {
      outputName.innerText = 'Location Unavailable';
    } else {
      outputName.innerText = data[0].name + ' (' + data[0].sys.country + ')';
    }

    currentTemp.innerText =
      Math.round(((data[0].main.temp - 273.15) * 9) / 5 + 32) + '°F';
    currentHilo.innerText =
      Math.round(((data[0].main.temp_max - 273.15) * 9) / 5 + 32) +
      '°F' +
      ' / ' +
      Math.round(((data[0].main.temp_min - 273.15) * 9) / 5 + 32) +
      '°F';
    currentHumid.innerText = data[0].main.humidity + '%';
    currentWind.innerText = data[0].wind.speed + 'mph';

    tempLine.setAttribute('points', '0,0 ');
    for (let i = 0; i < 24; i++) {
      let points = tempLine.getAttribute('points');
      points +=
        (i / 23) * 100 +
        ', ' +
        (100 -
          ((((data[1].list[i].main.temp - 273.15) * 9) / 5 + 32) / 110) * 100) +
        ' ';
      tempLine.setAttribute('points', points);
    }
    let tempPoints = tempLine.getAttribute('points');
    tempPoints += '100, 0';
    tempLine.setAttribute('points', tempPoints);

    humidLine.setAttribute('points', '0, 0 ');
    for (let i = 0; i < 24; i++) {
      let points = humidLine.getAttribute('points');
      points +=
        (i / 23) * 100 + ', ' + (100 - data[1].list[i].main.humidity) + ' ';
      humidLine.setAttribute('points', points);
    }
    let humidPoints = humidLine.getAttribute('points');
    humidPoints += '100, 0';
    humidLine.setAttribute('points', humidPoints);

    windLine.setAttribute('points', '0,0 ');
    for (let i = 0; i < 24; i++) {
      let points = windLine.getAttribute('points');
      points +=
        (i / 23) * 100 +
        ', ' +
        (100 - (data[1].list[i].wind.speed / 20) * 100) +
        ' ';
      windLine.setAttribute('points', points);
    }
    let windPoints = windLine.getAttribute('points');
    windPoints += '100, 0';
    windLine.setAttribute('points', windPoints);

    let currentWeatherDetails = document.querySelector("#currentWeatherDetails")
    currentWeatherDetails.innerText = data[0].weather[0].description


    let currentDate = new Date (data[0].dt * 1000)
    let currentWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let currentYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let currentDateDiv = document.querySelector("#currentDateDiv")
    currentDateDiv.innerHTML = ""
    let weekday = document.createElement("div")
    weekday.setAttribute("id", "weekday")
    weekday.innerText = currentWeek[currentDate.getDay()]
    currentDateDiv.append(weekday)
    let currentDateDetails = document.createElement("div")
    currentDateDetails.setAttribute("id", "currentDateDetails")
    currentDateDetails.innerText = currentYear[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear()
    currentDateDiv.append(currentDateDetails)
    let currentDateTime = document.createElement("div")
    currentDateTime.setAttribute("id", "currentDateTime")
    let currentMinutes = 0
    currentMinutes = currentDate.getMinutes()
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes
    }
    let currentHours = 0
    let currentAmPm = "AM"
    if (currentDate.getHours() > 12) {
      currentHours = currentDate.getHours() - 12
      currentAmPm = "PM"
    } else {currentHours = currentDate.getHours()};

    currentDateTime.innerText = currentHours + ":" + currentMinutes + currentAmPm
    currentDateDiv.append(currentDateTime)



    let dateLabel = document.createElement("div")
    dateLabel.innertext =

    weatherIcon.src =
      'http://openweathermap.org/img/wn/' + data[0].weather[0].icon + '@2x.png';
    if (data[0].dt < data[0].sys.sunrise || data[0].dt > data[0].sys.sunset) {
      weatherIcon.style.backgroundColor = 'rgb(11, 14, 37)';
    } else {
      weatherIcon.style.backgroundColor = 'rgb(136, 136, 247)';
    }

    setTimeout(function(){ mymap.invalidateSize()}, 100)
    mymap.setView([data[0].coord.lat, data[0].coord.lon], 12)



    let tempMap = L.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=4141cb60dd5584df8470037a5e7f4092')
    let precipMap = L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=4141cb60dd5584df8470037a5e7f4092')
    let cloudMap = L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=4141cb60dd5584df8470037a5e7f4092');

    let mapButtons = document.querySelector("#mapButtons")
    let mapSelector = document.querySelector("#mapSelector")

    let tempButton = document.querySelector("#tempButton")
    tempButton.addEventListener("click", clickTempButton)
    function clickTempButton (event) {
      mymap.removeLayer(precipMap)
      mymap.removeLayer(cloudMap)
      mymap.addLayer(tempMap)
      mapSelector.value = "temp"

    }
    let precipButton = document.querySelector("#precipButton")
    precipButton.addEventListener("click", clickPrecipButton)
    function clickPrecipButton (event) {
      mymap.removeLayer(tempMap)
      mymap.removeLayer(cloudMap)
      mymap.addLayer(precipMap)
      mapSelector.value = "precip"
    }
    let cloudButton = document.querySelector("#cloudButton")
    cloudButton.addEventListener("click", clickCloudButton)
    function clickCloudButton (event) {
      mymap.removeLayer(precipMap)
      mymap.removeLayer(tempMap)
      mymap.addLayer(cloudMap)
      mapSelector.value = "cloud"
    }
    let clearMapButton = document.querySelector("#clearMapButton")
    clearMapButton.addEventListener("click", clickClearMapButton)
    function clickClearMapButton (event) {
      mymap.removeLayer(precipMap)
      mymap.removeLayer(tempMap)
      mymap.removeLayer(cloudMap)
      mapSelector.value = "none"
    }

    mapSelector.addEventListener("change", mapSelection)
    function mapSelection(event) {
      let {target} = event
      if (target.value === "temp") {
      mymap.removeLayer(precipMap)
      mymap.removeLayer(cloudMap)
      mymap.addLayer(tempMap)
      mapButtons.elements[0].checked = true
      } else if (target.value === "precip") {
        mymap.removeLayer(tempMap)
      mymap.removeLayer(cloudMap)
      mymap.addLayer(precipMap)
        mapButtons.elements[1].checked = true
      } else if (target.value === "cloud") {
        mymap.removeLayer(tempMap)
      mymap.addLayer(cloudMap)
      mymap.removeLayer(precipMap)
        mapButtons.elements[2].checked = true
      }
    }

    let clearMap = document.querySelector("#clearMap")
    clearMap.addEventListener("click", clearMapSubmit)
    function clearMapSubmit (event) {
      mymap.removeLayer(tempMap)
      mymap.removeLayer(cloudMap)
      mymap.removeLayer(precipMap)
        mapButtons.elements[3].checked = true
    }




    let graphDates = document.querySelector("#graphDates")
     let graphTimes = document.querySelector("#graphTimes")

  let day = 0
  let graphsDiv = document.querySelector("#graphsDiv")
  let graphsDivWidth = graphsDiv.style.length
  graphDates.innerHTML = ""
  graphTimes.innerHTML = ""
for (let t = 0; t < 23; t++) {
  let dates = document.createElement("div")
  let date = new Date (data[1].list[t].dt * 1000)

  let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]



  dates.classList.add("timedate", "date")
  dates.setAttribute ("time", date.getHours())
  dates.setAttribute("day", date.getDate())
  dates.append (week[date.getDay()] + ", " + year[date.getMonth()] + " " + date.getDate())

  if (day === 0 || date.getDate() !== day) {
  graphDates.append(dates)
  day = date.getDate()
  }
}
for (let t = 0; t < 23; t++) {
  let hourlyTime = document.createElement("div")
  hourlyTime.classList.add("timedate", "time")
  let time = new Date (data[1].list[t].dt * 1000)
  let hour = time.getHours()
  let ampm = "AM"
  if (hour > 12) {
    ampm = "PM"
    hour -= 12
  }



  hourlyTime.append (hour + ampm)
  graphTimes.append(hourlyTime)
}

let dateLabels = document.querySelectorAll(".date")

dateLabels[0].style = "background-color: rgb(235, 235, 235)"
            dateLabels[1].style = "background-color: rgb(220, 220, 220)"
            dateLabels[2].style = "background-color: rgb(235, 235, 235)"
            if (dateLabels[3]) {
              dateLabels[3].style = "background-color: rgb(220, 220, 220)"
            }


if (dateLabels[0].attributes.time.value == 22) {
  dateLabels[0].style.width = "calc(100% / 23)"
  dateLabels[3].style.width = "calc(100% / 23 * 6)";
} else if (dateLabels[1].attributes.time.value == 1) {
  dateLabels[0].style.width = "calc(100% / 23 * 8)"
  dateLabels[2].style.width = "calc(100% / 23 * 7)"

  } else if (dateLabels[0].attributes.time.value == 4) {
  dateLabels[0].style.width = "calc(100% / 23 * 7)"
  dateLabels[3].remove();
  } else if (dateLabels[0].attributes.time.value == 7) {
    dateLabels[0].style.width = "calc(100% / 23 * 6)"
    dateLabels[3].style.width = "calc(100% / 23)";
    } else if (dateLabels[0].attributes.time.value == 10) {
      dateLabels[0].style.width = "calc(100% / 23 * 5)"
      dateLabels[3].style.width = "calc(100% / 23 * 2)";
      } else if (dateLabels[0].attributes.time.value == 13) {
        dateLabels[0].style.width = "calc(100% / 23 * 4)"
        dateLabels[3].style.width = "calc(100% / 23 * 3)";
        } else if (dateLabels[0].attributes.time.value == 16) {
          dateLabels[0].style.width = "calc(100% / 23 * 3)"
          dateLabels[3].style.width = "calc(100% / 23 * 4)";
          } else if (dateLabels[0].attributes.time.value == 19) {
            dateLabels[0].style.width = "calc(100% / 23 * 2)"
            dateLabels[3].style.width = "calc(100% / 23 * 5)";
            }

window.addEventListener("load", fixGraphText)
window.addEventListener("resize", fixGraphText)

  function fixGraphText (event) {
  if (window.innerWidth <= 450) {
    graphDates.innerHTML = ""

for (let t = 0; t < 23; t++) {
  let dates = document.createElement("div")
  let date = new Date (data[1].list[t].dt * 1000)

  let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]



  dates.classList.add("timedate", "date")
  dates.setAttribute("day", date.getDate())
  dates.append (week[date.getDay()] + " " + (date.getMonth() + 1) + "/" + date.getDate())

  if (day === 0 || date.getDate() !== day) {
  graphDates.append(dates)
  day = date.getDate()
  }


  }

  let dateLabels = document.querySelectorAll(".date")

dateLabels[0].style = "background-color: rgb(235, 235, 235)"
            dateLabels[1].style = "background-color: rgb(220, 220, 220)"
            dateLabels[2].style = "background-color: rgb(235, 235, 235)"
            if (dateLabels[3]) {
              dateLabels[3].style = "background-color: rgb(220, 220, 220)"
            }
} else {
  graphDates.innerHTML = ""
for (let t = 0; t < 23; t++) {
  let dates = document.createElement("div")
  let date = new Date (data[1].list[t].dt * 1000)

  let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]



  dates.classList.add("timedate", "date")
  dates.setAttribute ("time", date.getHours())
  dates.setAttribute("day", date.getDate())
  dates.append (week[date.getDay()] + ", " + year[date.getMonth()] + " " + date.getDate())

  if (day === 0 || date.getDate() !== day) {
  graphDates.append(dates)
  day = date.getDate()
  }


}
let dateLabels = document.querySelectorAll(".date")

dateLabels[0].style = "background-color: rgb(235, 235, 235)"
            dateLabels[1].style = "background-color: rgb(220, 220, 220)"
            dateLabels[2].style = "background-color: rgb(235, 235, 235)"
            if (dateLabels[3]) {
              dateLabels[3].style = "background-color: rgb(220, 220, 220)"
            }

}



  }

  }


  if (event.srcElement.elements.searchButton && searchForm.elements.searchButton.value) {
    if (event.srcElement.elements.searchButton.value === 'nameButton') {
      async function getNameData() {
        let nameCurrentPromise = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=' +
            document.getElementById('searchNameField').value +
            ',us&appid=4141cb60dd5584df8470037a5e7f4092'
        );
        let nameCurrentData = await nameCurrentPromise.json();

        let nameHourlyPromise = await fetch(
          'http://api.openweathermap.org/data/2.5/forecast?q=' +
            nameCurrentData.name +
            ',' +
            nameCurrentData.sys.country +
            ',&appid=4141cb60dd5584df8470037a5e7f4092'
        );
        let nameHourlyData = await nameHourlyPromise.json();
        return [nameCurrentData, nameHourlyData];
      }
      let nameData = await getNameData();
      renderData(nameData);
    } else if (event.srcElement.elements.searchButton.value === 'zipButton') {
      let searchZipField = document.querySelector('#searchZipField');

      async function getZipData() {

        let zipCurrentPromise = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?zip=' +
            searchZipField.value +
            ',&appid=4141cb60dd5584df8470037a5e7f4092')


        let zipCurrentData = await zipCurrentPromise.json();

        let zipHourlyPromise = await fetch(
          'http://api.openweathermap.org/data/2.5/forecast?zip=' +
            searchZipField.value +
            ',' +
            zipCurrentData.sys.country +
            '&appid=4141cb60dd5584df8470037a5e7f4092'
        );
        let zipHourlyData = await zipHourlyPromise.json();
        return [zipCurrentData, zipHourlyData];
      }
      let zipData = await getZipData();
      renderData(zipData);
    } else if (
      event.srcElement.elements.searchButton.value === 'latlongButton'
    ) {
      let searchLatField = document.querySelector('#searchLatField');
      let searchLongField = document.querySelector('#searchLongField');
      async function getLatlongData() {
        let latlongCurrentPromise = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?lat=' +
            searchLatField.value +
            '&lon=' +
            searchLongField.value +
            '&appid=4141cb60dd5584df8470037a5e7f4092'
        );
        let latlongCurrentData = await latlongCurrentPromise.json();

        let latlongHourlyPromise = await fetch(
          'http://api.openweathermap.org/data/2.5/forecast?lat=' +
            searchLatField.value +
            '&lon=' +
            searchLongField.value +
            '&appid=4141cb60dd5584df8470037a5e7f4092'
        );
        let latlongHourlyData = await latlongHourlyPromise.json();
        return [latlongCurrentData, latlongHourlyData];
      }
      let latlongData = await getLatlongData();
      renderData(latlongData);
    } else if (event.srcElement.elements.searchButton.value === 'none') {

    }

    guide.setAttribute('hidden', true);
    outputDiv.removeAttribute('hidden');

  } else if (searchSelector.value !== "none") {
    if (searchSelector.value === 'name') {
      guide.setAttribute('hidden', true);
      async function getNameData() {
        let nameCurrentPromise = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=' +
            document.getElementById('searchNameField').value +
            ',us&appid=4141cb60dd5584df8470037a5e7f4092'
        );
        let nameCurrentData = await nameCurrentPromise.json();

        let nameHourlyPromise = await fetch(
          'http://api.openweathermap.org/data/2.5/forecast?q=' +
            nameCurrentData.name +
            ',' +
            nameCurrentData.sys.country +
            ',&appid=4141cb60dd5584df8470037a5e7f4092'
        );
        let nameHourlyData = await nameHourlyPromise.json();
        return [nameCurrentData, nameHourlyData];
      }
      let nameData = await getNameData();
      renderData(nameData);
    } else if (searchSelector.value === 'zipcode') {
      let searchZipField = document.querySelector('#searchZipField');
      async function getZipData() {
        let zipCurrentPromise = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?zip=' +
            searchZipField.value +
            ',&appid=4141cb60dd5584df8470037a5e7f4092'
        );
        let zipCurrentData = await zipCurrentPromise.json();

        let zipHourlyPromise = await fetch(
          'http://api.openweathermap.org/data/2.5/forecast?zip=' +
            searchZipField.value +
            ',' +
            zipCurrentData.sys.country +
            '&appid=4141cb60dd5584df8470037a5e7f4092'
        );
        let zipHourlyData = await zipHourlyPromise.json();
        return [zipCurrentData, zipHourlyData];
      }
      let zipData = await getZipData();
      renderData(zipData);
    } else if (searchSelector.value === 'latlong') {
      let searchLatField = document.querySelector('#searchLatField');
      let searchLongField = document.querySelector('#searchLongField');
      async function getLatlongData() {
        let latlongCurrentPromise = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?lat=' +
            searchLatField.value +
            '&lon=' +
            searchLongField.value +
            '&appid=4141cb60dd5584df8470037a5e7f4092'
        );
        let latlongCurrentData = await latlongCurrentPromise.json();

        let latlongHourlyPromise = await fetch(
          'http://api.openweathermap.org/data/2.5/forecast?lat=' +
            searchLatField.value +
            '&lon=' +
            searchLongField.value +
            '&appid=4141cb60dd5584df8470037a5e7f4092'
        );
        let latlongHourlyData = await latlongHourlyPromise.json();
        return [latlongCurrentData, latlongHourlyData];
      }
      let latlongData = await getLatlongData();
      renderData(latlongData);
    }

    guide.setAttribute('hidden', true);
    outputDiv.removeAttribute('hidden');




  }

}




function changeSelector(event) {
  if (window.innerWidth <= 450) {
    mapButtons.setAttribute("hidden", "true")
    mapSelectorDiv.removeAttribute("hidden")

    inputButtonsDiv.innerHTML = `
      <select id = "searchSelector">
        <option value = "none" selected  disabled>
          Search Type
        </option>
        <option value = "name">
          City Name
        </option>
        <option value = "zipcode">
          Zip Code
        </option>
        <option value = "latlong">
          Latitude / Longitude
        </option>
      </select>
    `;
    let headerSpace = document.querySelector('#headerSpace');
    headerSpace.style.height =
      $('header').height() + $('#inputDiv').height() + 16 + 'px';
    searchNameField.value = 'Select a Search Type';

    searchNameField.setAttribute('readonly', true);
    searchNameField.removeEventListener('click', clearField);

    let searchSelector = document.querySelector('#searchSelector');
    searchSelector.addEventListener('change', changeSearchSelection);

    function changeSearchSelection(event) {
      let { target } = event;
      if (target.value === 'name') {
        searchFields.innerHTML = `
    <input id = "searchNameField" class = "searchField" type = "text" value = "Search by City Name" button = "nameButton" style="color: grey">
  `;
        let headerSpace = document.querySelector('#headerSpace');
        headerSpace.style.height =
          $('header').height() + $('#inputDiv').height() + 16 + 'px';
        let searchNameField = document.querySelector('#searchNameField');
        searchNameField.addEventListener('click', clearField);
      } else if (target.value === 'zipcode') {
        searchFields.innerHTML = `
    <input id = "searchZipField" class = "searchField" type = "text" value = "Search by Zip Code" button = "zipButton" style="color: grey">
  `;
        let headerSpace = document.querySelector('#headerSpace');
        headerSpace.style.height =
          $('header').height() + $('#inputDiv').height() + 16 + 'px';

        searchZipField.addEventListener('click', clearField);
      } else if (target.value === 'latlong') {
        searchFields.innerHTML = `
    <div id = "latlongDiv">
      <input id = "searchLatField" class = "searchField" type = "text" value = "Search by Latitude" button = "latlongButton" style="color: grey">
      <input id = "searchLongField" class = "searchField" type = "text" value = "and Longitude" style="color: grey">
    </div>
  `;

        searchLatField.addEventListener('click', clearField);
        searchLongField.addEventListener('click', clearField);

        let headerSpace = document.querySelector('#headerSpace');
        headerSpace.style.height =
          $('header').height() + $('#inputDiv').height() + 16 + 'px';
      }
    }
  } else {
    mapButtons.removeAttribute("hidden")
    mapSelectorDiv.setAttribute("hidden", "true")
    inputButtonsDiv.innerHTML = `
    <h3 id = "searchButtonsLabel">
    Search Type:
  </h3>

  <input id = "searchNameButton" class = "searchButton" type = "radio" name = "searchButton" value = "nameButton">
  <label id = "nameButtonLabel" class = "searchButtonLabel" for = "searchNameButton">
    City Name
  </label>

  <input id = "searchZipButton" class = "searchButton" type = "radio" name = "searchButton" value = "zipButton" >
  <label id = "zipButtonLabel" class = "searchButtonLabel" for = "searchZipButton">
    Zip Code
  </label>

  <input id = "searchLatlongButton" class = "searchButton" type = "radio" name = "searchButton" value = "latlongButton">
  <label id = "latlongButtonLabel" class = "searchButtonLabel" for = "searchLatlongButton">
    Latitide/Longitude
  </label>
    `;
    let headerSpace = document.querySelector('#headerSpace');
    headerSpace.style.height =
      $('header').height() + $('#inputDiv').height() + 32 + 'px';
    addChangeSearchType();
  }
}

let graphScroll = document.querySelector('.graphScroll');
function autoScroll() {
  graphScroll.scrollBy(1, 0);
  scrolldelay = setTimeout(autoScroll, 50);
 if (graphScroll.scrollLeft >= graphScroll.scrollWidth * 0.799) {

   setTimeout(function (){graphScroll.scrollLeft = 0}, 100)
 }
}



autoScroll();

window.addEventListener('resize', changeSelector);

window.addEventListener('load', changeSelector);
