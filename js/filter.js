// Should birds position object be processed into latlng?
var Filter = function() {

  // sightings - list of objects representing birds
  // start, end - Date objects
  this.byDate = function(sightings, start, end) {

  }

  // species - string representing species. Case-insensitive
  this.bySpecies = function(sightings, species) {

  }

  // user - string of user name. Case-sensitive
  this.byUser = function(sightings, user) {

  }

  // bounds - a google.maps.LatLngBounds object representing area
  this.byLocation = function(sightings, bounds) {

  }
}