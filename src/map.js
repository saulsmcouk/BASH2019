async function drawHeatmap(map, centresOn = [51.5, 0]) {
    GetCSVDonationData(data => _extractPostcodes(data, async thePostcodes => {
        Toastify({
            text: "drawHeatmap",
            duration: 3000
        }).showToast();
        // Setup the Progressbar
        let progressBar = new ProgressBar.Line("#theProgressBar", {
            color: "rgb(0,255,0)",
            style: {
                // Text color.
                // Default: same as stroke color (options.color)
                color: '#f00',
                position: 'absolute',
                left: '50%',
                top: '50%',
                padding: 0,
                margin: 0
        },

        });
        var theLatLngs = [];
        window.errorCounter = 0;
        for (var i = thePostcodes.length - 1; i >= 0; i--) {
            let progress = 1 - (i / thePostcodes.length);
            progressBar.set(progress);
            progressBar.text = Math.floor(progress * 100) + "%";
            var thePromise = fetch("http://api.postcodes.io/postcodes/" + thePostcodes[i])
                .then(body => body.json())
                .then(r => {
                    theLatLngs.push([r["result"]["latitude"], r["result"]["longitude"]]);
                })
                .catch(error => {
                    console.warn("Found a postcode which no longer resolves: ", error);
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