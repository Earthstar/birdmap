// Things I don't know where else to put.
var Birdmap = {
  // Returns a list of objects of all bird species in sightings
  // Not in any particular order
  // format:
  /*
  {
  commonName: string,
  speciesName: string
  }
  */
  getBirdSpecies: function(sightings) {
    var alreadyFound = [];
    var toReturn = [];
    for (var i = sightings.length - 1; i >= 0; i--) {
      name = sightings[i].speciesName;
      // if species not in list, add it to list
      if (alreadyFound.indexOf(name) < 0) {
        toReturn.push({
          speciesName: name,
          commonName: sightings[i].commonName
        });
        alreadyFound.push(name);
      }
    };
    return toReturn;
  },

// Format of bird object
/*
{
  commonName: string,
  speciesName: string,
  userSpotted: string,
  position: google.maps.LatLng,
  date: Date (javascript object),
  comment: string,
  image: string of location of file,
  attribution: string of source, photographer
}
*/

  processBirds: function(json) {
    var sightings = [];
    for (var i = json.length - 1; i >= 0; i--) {
      var sighting = json[i];
      var position = new google.maps.LatLng(sighting.position.latitude,
        sighting.position.longitude);
      sighting.position = position;
      // If sighting has a time element, concatenate
      if (sighting.time) {
        // Assume EST
        var datestring = sighting.date + "T" + sighting.time + '-05:00';
      } else {
        var datestring = sighting.date;
      }
      sighting.date = new Date(Date.parse(datestring));
      sightings.push(sighting);
    };
    return sightings;
  }
}

// All filtering of birds
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

var Display = {
  popupTemplate: null,
  // compiles handlebars template
  init: function() {
    var source = $("#bird-info-popup-template").html();
    this.popupTemplate = Handlebars.compile(source);
  },

  // Given a list of sighting objects, displays them on map
  birdSightings: function(sightings) {
    for (var i = sightings.length - 1; i >= 0; i--) {
      var sighting = sightings[i]
      var html = this.popupTemplate(sighting)
      var infoWindow = new google.maps.InfoWindow({
        content: html
      })
      var position = sighting.position;
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: sighting.commonName
      })
      google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map, marker)
      })
    };
  }
}