var map;
var startCenter = {lat: -33.865427, lng: 151.196123};
var setupDict = {zoom: 2, 
    center: startCenter,
    mapTypeId: 'map'};
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), setupDict);

    var script = document.createElement('script');

    script.src = 'data.js'; // js file calling postcodeHeatmap on an array of postcodes
    document.getElementsByTagName('head')[0].appendChild(script);
}

function getLatLng(postcode) {
    var lat = '';
    var lng = '';
    geocoder.geocode({'address': postcode}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lat();
        } else {
            alert("Geocode was not successful for the following reasun: " + status);
        }
    });
    var latlng = new google.maps.LatLng(lat, lng);
    return latlng;
}

function drawPostcodeHeatmap(postcodes) {
    var heatmapData = [];
    for (var i = 0; i < postcodes.length; i++) {
        var postcode = postcodes[i];
        var latlng = getLatLng(postcode);
        heatmapData.push(latlng);
    }
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        dissipating: false,
        map: map
    });
}