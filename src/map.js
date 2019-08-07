async function drawHeatmap(map, centresOn = [51.5, 0]) {
    LoadECDonationData(data => _extractPostcodes(data, async function(d) {
    	const validPostcodeRegex = new RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');
        var thePostcodes = d.filter(x => validPostcodeRegex.test(x));
        var theLatLngs = [];
        window.errorCounter = 0;
        for (var i = thePostcodes.length - 1; i >= 0; i--) {
            console.log(thePostcodes[i]);
            var thePromise = fetch("http://api.postcodes.io/postcodes/" + thePostcodes[i])
                .then(body => body.json())
                .then(r => {
                	console.log(r)
                	theLatLngs.push([r["result"]["latitude"], r["result"]["longitude"]]);
                })
                .catch(error => {
                	console.warn("Found a postcode which no longer resolves: ",error); 
                	window.errorCounter++;
                });
            await thePromise;
        }
        var theJSON = GenGeoJSON(theLatLngs);
        map.addSource("postcodes", {
            "type": "geojson",
            "data": theJSON
        });
        map.addLayer({
            id: 'postcodes-heat',
            type: 'heatmap',
            source: 'postcodes',
            maxzoom: 15,
            paint: {
                // increase weight as diameter breast height increases
                'heatmap-weight': {
                    property: 'dbh',
                    type: 'exponential',
                    stops: [
                        [1, 0],
                        [62, 1]
                    ]
                },
                // increase intensity as zoom level increases
                'heatmap-intensity': {
                    stops: [
                        [11, 1],
                        [15, 3]
                    ]
                },
                // assign color values be applied to points depending on their density
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0, 'rgba(236,222,239,0)',
                    0.2, 'rgb(208,209,230)',
                    0.4, 'rgb(166,189,219)',
                    0.6, 'rgb(103,169,207)',
                    0.8, 'rgb(28,144,153)'
                ],
                // increase radius as zoom increases
                'heatmap-radius': {
                    stops: [
                        [11, 15],
                        [15, 20]
                    ]
                },
                // decrease opacity to transition into the circle layer
                'heatmap-opacity': {
                    default: 1,
                    stops: [
                        [14, 1],
                        [15, 0]
                    ]
                },
            }
        }, 'waterway-label');
    }));
}

mapboxgl.accessToken = 'pk.eyJ1Ijoic2F1bHNtIiwiYSI6ImNqeXpya2s5NTA0ZzEza2xvcTdnbzA5dGEifQ.od-gB5fE_iC0yssElhaCeg';
var map = new mapboxgl.Map({
    container: 'theMap',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-0.12, 51],
    zoom: 5
});