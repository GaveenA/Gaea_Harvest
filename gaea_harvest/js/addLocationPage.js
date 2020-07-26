// Code for the Add Location page.
// API key for mapquest
L.mapquest.key = 'TvmWWPD5bBIpy8PdqgS5I2ry3EjvrDyR';

var map = L.mapquest.map('map', 
{
    center: [0, 0],
    layers: L.mapquest.tileLayer('map'),
    zoom: 14
});


L.mapquest.geocoding().geocode('Melbourne, Australia');




function locationFetched(error, response) {
    if (!isEmpty(error)) {
        alert('Please enter a valid Location...');
        console.log(error);
    } else {
        console.log(response);
        var location = response.results[0].locations[0];
        var latLng = location.displayLatLng;
        map.flyTo(latLng, 13);
        L.marker(latLng).addTo(map);
        var popup = L.popup()
            .setLatLng(latLng)
            .setContent('<p>Location Found!</p><br/><input id="locationName" placeholder="Nick Name" type="text"/><button onclick="saveLocation()" >Save</button>')
            .openOn(map);
    }
}

/*

When the user inputs the location the map flies 
to that location using its latitude and longitude
values given by the map quest API.

The location fetched function is been 
called inside the submit location function.


*/ 
function submitLocation() {

    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;

    L.mapquest.geocoding().geocode(city + ',' + country, locationFetched);
}


/*
 To save the selected location in locale storage 
 and then to disply it on the index.html page
 the saveLocation and the saveOnLocalStorage
 functions are been used.

 In the saveLocation function if the user
 does not want to enter a nickname, the 
 location can be stored as a concatenation 
 of the the city and country values.(input values)
*/
function saveLocation() {
    var name = document.getElementById("locationName").value;
    var latLng = map.getCenter();
    if (name === "") {
        var city = document.getElementById("city").value;
        var country = document.getElementById("country").value;
        name = city + ',' + country;
    }
    saveOnLocalStorage(name, latLng);
}

function saveOnLocalStorage(cityName, latLng) {
    var locationMap = localStorage.getItem('locationMap');
    if (locationMap == null) {
        locationMap = [];
    } else {
        locationMap = JSON.parse(localStorage.getItem('locationMap'));
    }

    var locationItem = {
        name: cityName,
        latLng: latLng
    };
    if (isUnique(locationItem)) {
        locationMap.push(locationItem);
        localStorage.setItem('locationMap', JSON.stringify(locationMap));
        alert('Location Added Successfully!');
    } else {
        alert('Location already exists!');
    }
    map.closePopup();
}

/*
  The isUnique function is used so that 
  the user is notified that a loaction already 
  exits with the same nick name.
*/
function isUnique(locationItem) {
    var locationMap = localStorage.getItem('locationMap');
    if (locationMap != null) {
        locationMap = JSON.parse(locationMap);
        for (item of locationMap) {
            if (item.name === locationItem.name) {
                return false;
            }
        }
    }

    return true;
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}