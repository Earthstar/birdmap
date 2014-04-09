// Loads birds from file
// Returns a list of birds with objects processed
/*
{
  commonName: string,
  speciesName: string,
  userSpotted: string,
  position: google.maps.LatLng,
  date: Date,
  comment: string,
  image: string of location of file,
  attribution: string of source, photographer
}
*/
// Json is already parsed
$(function() {

  function processBirds(json) {
    var sightings = [];
    for (var i = json.length - 1; i >= 0; i--) {
      var sighting = json[i];
      var position = new google.maps.LatLng(sighting.position.latitude,
        sighting.position.longitude);
      var date = new Date(sighting.date);
      sighting.position = position;
      sighting.date = date;
      sightings.push(sighting)
    };
    return sightings
  }

  // Given a sighting object, displays on map
  function displayBird(sighting) {
    console.log("in display bird")
    var source = $("#bird-info-popup-template").html();
    var popupTemplate = Handlebars.compile(source);
    var html = popupTemplate(sighting)
    console.log(html)
    var infoWindow = new google.maps.InfoWindow({
      content: html
    })
    var position = sighting.position;
    console.log(position)
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: sighting.commonName
    })
    google.maps.event.addListener(marker, "click", function() {
      infoWindow.open(map, marker)
    })
    console.log("after display bird")
  }

  var birdSightings;

  $.getJSON('birds.json', function(json) {
    birdSightings = processBirds(json);
    console.log(birdSightings);
    // Find all birds that are on the screen
    // display sightings
    displayBird(birdSightings[0])
  })
})