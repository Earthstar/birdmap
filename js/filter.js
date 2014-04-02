var Filter = function() {

  // sightings - list of objects representing birds
  // start, end - Date objects
  this.byDate = function(sightings, start, end) {
    var matches = [];
    for (var i = sightings.length - 1; i >= 0; i--) {
      var sightingDate = sightings[i].date;
      if ((sightingDate.getTime() >= start.getTime()) &&
        sightingDate.getTime <= end.getTime()) {
        matches.push(sightings[i]);
      }
    }
    return matches;
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