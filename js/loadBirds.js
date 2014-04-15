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

  var birdSightings;
$(function() {
  $.getJSON('smallbirds.json', function(json) {
    birdSightings = Birdmap.processBirds(json);
    // Find all birds that are on the screen
    // display sightings
    Display.init()
    Display.birdSightings(birdSightings)
  })
})