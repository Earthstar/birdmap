// Loads birds from file
// Returns a list of birds with objects processed
/*
{
  commonName: string,
  speciesName: string,
  userSpotted: string,
  position: google.maps.LatLng,
  date: Date,
  comment: string
}
*/
// Json is already parsed
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

var birdSightings;

$.getJSON('birds.json', function(json) {
  birdSightings = processBirds(json);
  console.log(birdSightings);
})