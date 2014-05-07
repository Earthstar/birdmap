// Things I don't know where else to put.
var Birdmap = {
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
  marker: a Google circle object
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
  },

  // Returns True if one sighting is equal to another sighting
  // false otherwise
  isEqual: function(s1, s2) {
    // pairwise comparison of fields
    if ((s1.commonName === s2.commonName) &&
      (s1.position.equals(s2.position)) &&
      (s1.userSpotted === s2.userSpotted) &&
      (s1.date.getTime() === s2.date.getTime()) &&
      (s1.comment === s2.comment) &&
      (s1.image === s2.image) &&
      s1.attribution === s2.attribution) {
      return true;
    } else {
      return false;
    }
  },

}

// All filtering of birds
// Note that these are and-filters
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
      var sightingSpecies = sightings[i].commonName;
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

  // Merges a list of filters
  // How to make an ormarkers-filter
  // Filter.or(Filter.byLocation, Filter.byUser)
  or: function(sightings1, sightings2) {
    var toReturn = sightings1;
    // For each entry in sightings2, if it is not in sightings1
    // add it to the list.
    // This is really slow.
    for (var i = sightings2.length - 1; i >= 0; i--) {
      for (var j = sightings1.length - 1; j >= 0; j--) {
        // If the element is in the list, then keep going
        if (Birdmap.isEqual(sightings2[i], sightings1[j])) {
          break;
        }
      };
      toReturn.push(sightings2[i]);
    };
    return toReturn;
  },
}

var Display = {
  popupTemplate: null,
  filterListSpeciesTemplate: null,
  // compiles handlebars template
  init: function() {
    var source = $("#bird-info-popup-template").html();
    this.popupTemplate = Handlebars.compile(source);
    infoWindow = new google.maps.InfoWindow();

    source = $('#filter-list-species-template').html();
    this.filterListSpeciesTemplate = Handlebars.compile(source);
  },

  // Given a sighting object, creates and displays circles
  // This should only be called once upon every bird sighting
  // options - object of options to pass into marker
  createAndDisplayBirdSighting: function(sighting, options) {
    var html = this.popupTemplate(sighting)
    var thisPosition = sighting.position;
    // Set default options that can be overridden
    var defaultOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 1,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: 0.5,
      map: map,
      center: thisPosition,
      radius: 1000,
      clickable: true,
      infoWindowContent: html,
      infoWindow: infoWindow,
    }
    if (typeof options == 'object') {
      options = $.extend(defaultOptions, options);
    } else {
      options = defaultOptions
    }

    circle = new google.maps.Circle(options);

    google.maps.event.addListener(circle, "click", function(event) {
      infoWindow.close()
      infoWindow.setContent(this.infoWindowContent)
      // infoWindow.setPosition(position);
      infoWindow.setPosition(this.getCenter())
      infoWindow.open(map)
    })
    return circle;
  },

  // Given a list of sighting objects, displays them on map
  createAndDisplayBirdSightings: function(sightings, options) {
    for (var i = sightings.length - 1; i >= 0; i--) {
      Display.createAndDisplayBirdSighting(sightings[i], options);
    };
  },

  // Only displays a bird sighting
  displayBirdSighting: function(sighting) {
    sighting.marker.setVisible(true);
  },

  displayBirdSightings: function(sightings) {
    for (var i = sightings.length - 1; i >= 0; i--) {
      Display.displayBirdSighting(sightings[i]);
    };
  },
}