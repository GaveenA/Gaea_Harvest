// Code for LocationWeatherCache class and other shared code.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";

// creating a crop class
function Crop(name, season, minTemp, maxTemp, lowYieldOffset, tolerance) {
    this.name = name;
    this.season = season;
    this.minTemp = minTemp;
    this.maxTemp = maxTemp;
    this.lowYieldOffset = lowYieldOffset;
    this.tolerance = tolerance;
}

function LocationWeatherCache() {
    // Private attributes:

    var locations = [];
    var callbacks = {};

    // Public methods:

    // Returns the number of locations stored in the cache.
    //
    this.length = function () {};

    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function (index) {};

    // Given a latitude, longitude and nickname, this method saves a
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function (latitude, longitude, nickname) {}

    // Removes the saved location at the given index.
    //
    this.removeLocationAtIndex = function (index) {}

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function () {};

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function (locationWeatherCachePDO) {};

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the
    // weather object for that location.
    //
    this.getWeatherAtIndexForDate = function (index, date, callback) {};

    // This is a callback function passed to darksky.net API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function (response) {};

    // Private methods:

    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude) {}
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations() {}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations() {}
