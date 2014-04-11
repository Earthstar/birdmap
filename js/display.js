var Display = {
  popupTemplate: null,
  // compiles handlebars template
  init: function() {
    var source = $("#bird-info-popup-template").html();
    this.popupTemplate = Handlebars.compile(source);
  },

  // Given a sighting object, displays on map
  birdSighting: function(sighting) {
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
  },

  // Given a list of sighting objects, displays them on map
  birdSightings: function(sightings) {
    for (var i = sightings.length - 1; i >= 0; i--) {
      Display.birdSighting(sightings[i])
    };
  }
}