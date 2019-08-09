// TODO: Create customisable granulation

function drawSankeyChart(data) {
    var sankey_chart = anychart.sankey(data);//customizing the width of the nodes
    sankey_chart.nodeWidth("50%");
    sankey_chart.nodePadding(5);
    sankey_chart.container("container");//initiating drawing the Sankey diagram
    sankey_chart.draw();
}



/*Schema: index 1 donee index 5 name index 9 type*/
function applyGranularFilter(item) {
    // TODO: Allow this to accept filters - default behaviour is to 
    // not group political parties but group other things
    let filteredItem = {
        from: item[9],
        weight: currency(item[3])
    }
    if (item[2] == "Political Party") {
        filteredItem["to"] = item[1];
    } else {
        filteredItem["to"] = item[2];
    }
    return filteredItem;
}


function buildSankeyData(data, fromIndex) {
    // Pass fromIndex = 9 to get results by type ; pass fromIndex = 6 for by individual
    let sankeyItems = [];
    data.forEach(function(item) {
        // Granualate here:
        sankeyItems.push(applyGranularFilter(item));
    });
    return sankeyItems;
}

function drawSankeyDiagram(fromIndex) {
    GetCSVDonationData(data => {
        let theData = buildSankeyData(data.slice(1, data.length-1, fromIndex));
        drawSankeyChart(theData);
    });
}

function tallyTotals(data, type, amount) {
    let totalsByType = {};
    for (let id in data) {
        let theAmount = currency(data[id][amount]).value;
        if (data[id][type] in totalsByType) {
            totalsByType[data[id][type]] += theAmount;
        } else {
            totalsByType[data[id][type]] = theAmount;
        }
    }
    return totalsByType;
}

// Pie Charts
function getSpendingPieChartData(callback) {
    GetSpendingData(data => {
        data = data.slice(1, data.length - 1);
        callback(tallyTotals(data, 6, 4));
    })
}

function getPieChartPercentages(callback) {
    GetCSVDonationData(data => {
        data = data.slice(1, data.length-1);
        callback(tallyTotals(data, 9, 3));
    });
}

let chartPalette = {
    "Uncategorised": "#8B8BFF",
    "Overheads and general administration": "#6a041d",
    "Unsolicited material to electors": "#f5b841",
    "Transport": "#f4ff52",
    "Advertising": "#1b4ca2",
    "Rallies and other events": "#61ebe9",
    "Manifesto or Referendum material": "#ad2155",
    "Media": "#fe638a",
    "Market research/canvassing": "#c4e8a1",
    "Balancing item": "#2df90e",
    "Campaign broadcasts": "#955090",
    "Unsolicited material to electors (outside s.75)": "#b177eb",
    "Advertising (outside s.75)": "#8a9d0d",
    "Overheads and general administration (outside s.75)": "#f07746",
    "Rallies and other events (outside s.75)": "#c7f05e",
    "Market research/canvassing (outside s.75)": "#d1b3ce",
    "Transport (outside s.75)": "#5e21d1",
    "Manifesto or Referendum material (outside s.75)": "#eb1803"
};

function drawPieChart(data, container) { 
    let pieData = [];
    for (let [key, val] of Object.entries(data)) {
        pieData.push({
            x: key,
            value: val
        });
    }

    let theChart = anychart.pie(pieData);
    theChart.container(container);
    theChart.radius("100%");
    let theColours = theChart.toJson()["chart"]["palette"]["items"];
    let theData = theChart.toJson()["chart"]["data"];

    for (var i = 0; i < theData.length; i++) {
        let type = theData[i]["x"];
        theColours[i] = chartPalette[type];
    }

    theChart.draw();
}

function testPie() {
    getPieChartPercentages(data => drawPieChart(data, "pieContainer1"));
}
