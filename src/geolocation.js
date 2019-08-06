

// Opencage Geocoding Info
var apikey = '3e343658c7664c0b9b0758ebf7de5472';
var api_url = 'https://api.opencagedata.com/geocode/v1/json'

function getLatLng(postcode) {
    var lat = '';
    var lng = '';
    var request_url = api_url
        + '?'
        + 'key=' + apikey
        + '&q=' + encodeURIComponent(postcode)
        + '&pretty=1'
        + '&no_annotations=1';
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);
    request.onload = function() {
        if (request.status == 200){ 
            var data = JSON.parse(request.responseText);
            lat = data.results[0].geometry.lat;
            lng = data.results[0].geometry.lng;
    
        } else if (request.status <= 500){                  
            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log(data.status.message);
        } else {
            console.log("server error");
        }
      };
    
    request.onerror = function() {
        console.log("unable to connect to server");        
    };
    
    request.send();
    return [lat,lng];
}

function GenGeoJSON(locs) {
    // Spec: https://tools.ietf.org/html/rfc7946 (see section 1.5 for an example)
    var theData = {
        "type": "FeatureCollection",
        "features": []
    };
    console.log(locs);
    for (var i = locs.length - 1; i >= 0; i--) {
        theData["features"].push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [locs[i][1],locs[i][0]]
            },
            "properties": {}
        });
    }
    return theData;
}

/*
Google Maps Config
var startCenter = {lat: 51.555333, lng: -0.087356};
var setupDict = {zoom: 7, 
    center: startCenter};
*/


// function drawPostcodeHeatmap(postcodes) {
//     var heatmapData = [];
//     for (var i = 0; i < postcodes.length; i++) {
//         var postcode = postcodes[i];
//         var latlng = getLatLng(postcode);
//         heatmapData.push(latlng);
//     }
//     var heatmap = new google.maps.visualization.HeatmapLayer({
//         data: heatmapData,
//         dissipating: false,
//         map: map
//     });
// }

/*

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), setupDict);

    var script = document.createElement('script');

    script.src = 'data.js'; // js file calling postcodeHeatmap on an array of postcodes
    document.getElementsByTagName('head')[0].appendChild(script);
}
*/
