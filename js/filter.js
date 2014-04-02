// Reserve Filter namespace
var Filter = {

  // sightings - list of objects representing birds
  // start, end - Date objects
  byDate: function(sightings, start, end) {
    var matches = [];
    for (var i = sightings.length - 1; i >= 0; i--) {
      var sightingDate = sightings[i].date;
      if ((sightingDate.getTime() >= start.getTime()) &&
        sightingDate.getTime() <= end.getTime()) {
        matches.push(sightings[i]);
      }
    }
    return matches;
  },

  // species - string representing species. Case-insensitive
  bySpecies: function(sightings, species) {
  },

  // user - string of user name. Case-sensitive
  byUser: function(sightings, user) {

  },

  // bounds - a google.maps.LatLngBounds object representing area
  byLocation: function(sightings, bounds) {

  },
}