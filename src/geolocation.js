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