function drawSankeyChart(data) {
    //creating the data
    //calling the Sankey function
    var sankey_chart = anychart.sankey(data);//customizing the width of the nodes
    sankey_chart.container("container");//initiating drawing the Sankey diagram
    sankey_chart.draw();
}
/*
anychart.onDocumentReady(function(){
    var test = [
        {from: "Google", to: "Facebook", weight: 20000},
        {from: "Google", to: "Twitter", weight: 17000},
        {from: "Google", to: "YouTube", weight: 8000},
        {from: "Google", to: "Wikipedia", weight: 11000},
        {from: "Bing", to: "Facebook", weight: 7500},
        {from: "Bing", to: "Twitter", weight: 5000},
        {from: "Bing", to: "Wikipedia", weight: 4000}
    ];
    drawSankeyChart(test);
});
*/
/*Schema: index 1 donee index 5 name index 9 type*/

function buildSankeyData(data, fromIndex) {
    // Pass fromIndex = 9 to get results by type ; pass fromIndex = 6 for by individual
    let sankeyItems = [];
    data.forEach(function(item) {
        console.log(item[fromIndex]);
        sankeyItems.push({
            from: item[9],
            to: item[2],
            weight: currency(item[3])
         });   
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
