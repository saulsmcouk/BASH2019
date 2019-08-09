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
    // Tally company types TODO: IMPLEMENT THIS, for loops make cors angry
    // let companyTypes = {};
    // data.forEach(function(item) {
    //     if(item[9] == "Company") {
    //         getSIC(item[11], sic => {
    //             let thePhrase = SICtoPhrase(sic);
    //             if (thePhrase in companyTypes) {
    //                 companyTypes[thePhrase] += currency(item[3]);
    //             } else {
    //                 companyTypes[thePhrase] = currency(item[3]);
    //             }
    //         });
    //     }
    // });
    return sankeyItems;
}

function drawSankeyDiagram(fromIndex) {
    GetCSVDonationData(data => {
        let theData = buildSankeyData(data.slice(1, data.length-1, fromIndex));
        drawSankeyChart(theData);
    });
}

function tallyTypesOfDonor(recipient, data) {
    donorTypes = {};
    data.shift();
    for (var i = 0; i < data.length; i++) {
        if(data[i][9] in donorTypes) {
            donorTypes[data[i][9]] +=1;
        }
        else {
            donorTypes[data[i][9]] = 1;
        }
    }
    console.log(donorTypes);
    return donorTypes;
}

// Pie Charts
function getPieChartPercentages(callback) {
    GetCSVDonationData(data => {
        data = data.slice(1, data.length-1);
        let totalsByType = {};
        for (let id in data) {
            let theAmount = currency(data[id][3]).value;
            if (data[id][9] in totalsByType) {
                totalsByType[data[id][9]] += theAmount;
            } else {
                totalsByType[data[id][9]] = theAmount;
            }
        }
        callback(totalsByType);
    });
}

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
    theChart.draw();
    console.log(Object.entries(pieData));
}

function testPie() {
    getPieChartPercentages(data => drawPieChart(data, "pieContainer1"));
}

// TODO: Comparisons - put pie charts on own page?