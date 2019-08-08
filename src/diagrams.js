// TODO: Create customisable granulation

function drawSankeyChart(data) {
    var sankey_chart = anychart.sankey(data);//customizing the width of the nodes
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
