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
// google-chrome --allow-file-access-from-files

$(function() {
  function processBirds(json) {
    var sightings = [];
    for (var i = json.length - 1; i >= 0; i--) {
      var sighting = json[i];
      var position = new google.maps.LatLng(sighting.position.latitude,
        sighting.position.longitude);
      sighting.position = position;
      // If sighting has a time element, concatenate
      if (sighting.time) {
        var datestring = sighting.date + "T" + sighting.time + '-05:00';
      } else {
        var datestring = sighting.date;
      }
      sighting.date = new Date(Date.parse(datestring));
      sightings.push(sighting);
    };
    return sightings
  }

  var birdSightings;

  $.getJSON('smallbirds.json', function(json) {
    birdSightings = processBirds(json);
    // Find all birds that are on the screen
    // display sightings
    Display.init()
    Display.birdSightings(birdSightings)
  })
})