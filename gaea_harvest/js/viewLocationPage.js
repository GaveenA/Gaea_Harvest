// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.

var selectedLocation = localStorage.getItem(APP_PREFIX + "-selectedLocation");
if (selectedLocation !== null) {
    selectedLocation = JSON.parse(selectedLocation);
    document.getElementById("headerBarTitle").textContent = selectedLocation.name;
}

function createCropItem(crop) {
    var ul = document.getElementById("cropList");
    var li = document.createElement("li");
    li.className = "mdl-list__item";
    var spanElement = document.createElement('span');
    var iTag = document.createElement('i');
    iTag.className = "material-icons mdl-list__item-icon";
    iTag.appendChild(document.createTextNode('nature_people'));
    spanElement.appendChild(document.createTextNode(crop.name));
    spanElement.appendChild(iTag);
    var estimationElement = document.createElement('span');
    estimationElement.appendChild(document.createTextNode(getEstimation(crop)));
    li.appendChild(spanElement);
    li.appendChild(estimationElement);
    ul.appendChild(li);
}

/*
 Deleting the desired location.
*/
function deleteClicked()

{   var confirmation = confirm ('Are you OK with deleting this location? ');
    if (confirmation === true)
    {
    var newLocationMap = [];
    var locationMap = JSON.parse(localStorage.getItem('locationMap'));
    locationMap.forEach(function (locationItem) {
        if(locationItem.name != selectedLocation.name) {
            newLocationMap.push(locationItem);
        }
    });
    localStorage.setItem('locationMap', JSON.stringify(newLocationMap));
    window.location.replace("index.html");
    }
}

/*
 Checking weather the crop will 
 give a high yield,low yield or 
 within how many days it will prish
*/
function getEstimation(crop) {
    var weather = getFromLocalStorage(moment().format('YYYY-MM-DD'), selectedLocation.latLng.lat, selectedLocation.latLng.lng);
    var minTempDegrees = ((weather.minTemp-32)*5)/9;
    var maxTempDegrees = ((weather.maxTemp-32)*5)/9;

    if (crop.minTemp <= minTempDegrees && crop.maxTemp >= maxTempDegrees) {
        return "High Yield!";
    } else if (crop.minTemp - crop.lowYieldOffset <= minTempDegrees && crop.maxTemp + crop.lowYieldOffset >= maxTempDegrees) {
        return "Low Yield!";
    } else {
        var days = 0;
        
        if (crop.minTemp - crop.lowYieldOffset < minTempDegrees ) {
            days = Math.ceil(crop.tolerance / (1 + Math.abs( minTempDegrees- (crop.minTemp - crop.lowYieldOffset))));
        } else {
            days = Math.ceil(crop.tolerance / (1 + Math.abs( maxTempDegrees - (crop.maxTemp + crop.lowYieldOffset))));
        }
        return " Crop will Perish in " + days + " day(s).";
    }
}

L.mapquest.key = 'TvmWWPD5bBIpy8PdqgS5I2ry3EjvrDyR';

var map = L.mapquest.map('map', {
    center: [0, 0],
    layers: L.mapquest.tileLayer('map'),
    zoom:14
});

showLocation();
getWeather();

/*
 Displaying the crop list and its status,
 according to the locations weather by 
 calling the createCropItem function.
*/

function renderCropList() {
    var ul = document.getElementById("cropList");
    ul.innerHTML="";
    var cropList = JSON.parse(localStorage.getItem('cropList'));
    if (cropList != null) {
        cropList.forEach(createCropItem);
    }
}

function showLocation() {
    map.flyTo(selectedLocation.latLng, 13);
    L.marker(selectedLocation.latLng).addTo(map);
    var popup = L.popup()
        .setLatLng(selectedLocation.latLng)
        .setContent('<p>' + selectedLocation.name + '</p>')
        .openOn(map);
}

/*
 Calling the Dark sky and storing the weather 
 information in the local storage.
*/
function getWeather() {
    var weatherObject = getFromLocalStorage(moment().format('YYYY-MM-DD'), selectedLocation.latLng.lat, selectedLocation.latLng.lng);
    if (weatherObject === null) {
        $.ajax({
            url: "https://api.darksky.net/forecast/a7672a8713288767269a83d0d68d63e3/" + selectedLocation.latLng.lat + "," + selectedLocation.latLng.lng + "/",
            dataType: "jsonp",
            success: function (result) {
                console.log(result);
                processWeather(result.daily);
            },
            error: function (error) {
                console.log('Error occured while fetching weather data...' + error);
            }
        });
    } else {
        updateWeatherView(weatherObject.summary, weatherObject.minTemp, weatherObject.maxTemp);
        
        renderCropList();
    }

}

/*
 The updateWeatherView function displays a summary 
 of the weather data of the current date.
 Displays the date,summary of weather,
 minimum temperature and the maximum temperature.
*/
function updateWeatherView(summary, minTemp, maxTemp) {
	document.getElementById("weatherSummary").appendChild(document.createTextNode("Date: " + moment().format('YYYY-MM-DD')));
    document.getElementById("weatherSummary").appendChild(document.createElement("br"));
    document.getElementById("weatherSummary").appendChild(document.createTextNode("Summary: " +summary));
    document.getElementById("weatherSummary").appendChild(document.createElement("br"));
    document.getElementById("weatherSummary").appendChild(document.createTextNode("Min Temperature: "+minTemp + ' F'));
    document.getElementById("weatherSummary").appendChild(document.createElement("br"));
    document.getElementById("weatherSummary").appendChild(document.createTextNode("Max Temperature: "+maxTemp + ' F' ));


   }

/*
 The process weather function updates the array 
 weatherMap which holds the information 
 about the weather of the location.

*/
function processWeather(daily) {
    updateWeatherView(daily.summary, daily.data[0].temperatureMin, daily.data[0].temperatureMax);
    var weatherMap = JSON.parse(localStorage.getItem('weatherMap'));
    if (weatherMap === null) {
        weatherMap = [];
    }
    daily.data.forEach( function (dailtForecast) {
        var weatherData = {
            date: moment(dailtForecast.time * 1000).format('YYYY-MM-DD'),
            summary: dailtForecast.summary,
            lat: selectedLocation.latLng.lat,
            lng: selectedLocation.latLng.lng,
            minTemp: dailtForecast.temperatureMin,
            maxTemp: dailtForecast.temperatureMax
        };
        weatherMap.push(weatherData);
    });
    localStorage.setItem('weatherMap', JSON.stringify(weatherMap));
    renderCropList();
}

function getFromLocalStorage(date, lat, lng) {
    var weatherMap = localStorage.getItem('weatherMap');
    if (weatherMap != null) {
        weatherMap = JSON.parse(weatherMap);
        for (weather of weatherMap) {
            if (weather.date === date && weather.lat === lat && weather.lng === lng) {
                return weather;
            }
        }
    }
    return null;
}
