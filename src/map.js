async function drawHeatmap(map, centresOn = [51.5, 0]) {
    // Convert postcodes to latlngs, draw heatmap
    // 1) Get Postcodes
    LoadECDonationData(data => _extractPostcodes(data, async function(d) {
        var thePostcodes = d.filter(x => x != null);
        var theLatLngs = [];
        var thePromise;
        for (var i = thePostcodes.length - 1; i >= 0; i--) {
            console.log(thePostcodes[i]);
            // theLatLngs.push(getLatLng(thePostcodes[i]));
            let thePromise = fetch("http://api.postcodes.io/postcodes/" + thePostcodes[i])
                .then(body => body.json())
                .then(r => theLatLngs.push([r["result"]["latitude"], r["result"]["longitude"]]));
            let result = await thePromise;
        }
        console.log(theLatLngs);
        var theJSON = GenGeoJSON(theLatLngs);
        console.log(theJSON);

        map.addSource("postcodes", {
            "type": "geojson",
            "data": theJSON
        });
        // map.addLayer({
        // 	"id": "postcodes-heat",
        // 	"type": "heatmap",
        // 	"source": "postcodes"
        // });
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
    map.addLayer({
        id: 'postcodes-point',
        type: 'circle',
        source: 'postcodes',
        minzoom: 14,
        paint: {
            // increase the radius of the circle as the zoom level and dbh value increases
            'circle-radius': {
                property: 'dbh',
                type: 'exponential',
                stops: [
                    [{
                        zoom: 15,
                        value: 1
                    }, 5],
                    [{
                        zoom: 15,
                        value: 62
                    }, 10],
                    [{
                        zoom: 22,
                        value: 1
                    }, 20],
                    [{
                        zoom: 22,
                        value: 62
                    }, 50],
                ]
            },
            'circle-color': {
                property: 'dbh',
                type: 'exponential',
                stops: [
                    [0, 'rgba(236,222,239,0)'],
                    [10, 'rgb(236,222,239)'],
                    [20, 'rgb(208,209,230)'],
                    [30, 'rgb(166,189,219)'],
                    [40, 'rgb(103,169,207)'],
                    [50, 'rgb(28,144,153)'],
                    [60, 'rgb(1,108,89)']
                ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': {
                stops: [
                    [14, 0],
                    [15, 1]
                ]
            }
        }
    }, 'waterway-label');
}

mapboxgl.accessToken = 'pk.eyJ1Ijoic2F1bHNtIiwiYSI6ImNqeXpya2s5NTA0ZzEza2xvcTdnbzA5dGEifQ.od-gB5fE_iC0yssElhaCeg';
var map = new mapboxgl.Map({
    container: 'theMap',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-0.12, 51],
    zoom: 5
});