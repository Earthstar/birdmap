// Reserve Filter namespace
var Filter = {

  // sightings - list of objects representing birds
  // start, end - Date objects
  // Not a very efficient implementation.
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
    var matches = [];
    var capSpecies = species.toUpperCase();
    for (var i = sightings.length - 1; i >= 0; i--) {
      var sightingSpecies = sightings[i].speciesName;
      if (sightingSpecies.toUpperCase() === capSpecies) {
        matches.push(sightings[i])
      }
    };
    return matches;
  },

  // user - string of user name. Case-sensitive
  byUser: function(sightings, user) {
    var matches = [];
    for (var i = sightings.length - 1; i >= 0; i--) {
      var sightingUser = sightings[i].userSpotted;
      if (sightingUser === user) {
        matches.push(sightings[i])
      }
    };
    return matches;
  },

  // bounds - a google.maps.LatLngBounds object representing area
  byLocation: function(sightings, bounds) {
    var matches = [];
    for (var i = sightings.length - 1; i >= 0; i--) {
      var sightingPosition = sightings[i].position;
      if (bounds.contains(sightingPosition)) {
        matches.push(sightings[i]);
      }
    };
    return matches;
  },
}