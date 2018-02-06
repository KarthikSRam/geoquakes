// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var alternate_link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 2
  });

  $.ajax({
    method: "GET",
    // url: alternate_link,
    url: weekly_quakes_endpoint,
    success: function(json){
      for(var i = 0; i < json.features.length; i++){
        var title = json.features[i].properties.title;
        var timeElapsed = Date.now() - json.features[i].properties.time;
        timeElapsed = (timeElapsed / 60) / 60 / 1000;
        timeElapsed = timeElapsed.toFixed(2);
        $('#info').append(`<p>${title} / ${timeElapsed} hours ago</p>`);

        //Add pin to the map

        var pinLatitude = json.features[i].geometry.coordinates[1];
        var pinLongitude = json.features[i].geometry.coordinates[0];
        var pin = new google.maps.Marker({
           position: {lat: pinLatitude, lng: pinLongitude},
           map: map,
           title: `${json.features[i].properties.title}`
        });
      }
    },

    error: function(){
      alert("Error retrieving earthquake data");
    }
  });


  // var pin = new google.maps.Marker({
  //   position: {lat: 37.78, lng: -122.44},
  //   map: map,
  //   title: "SF"
  // })
});
