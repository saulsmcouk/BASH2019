function drawSankeyChart(data) {
    //creating the data
    //calling the Sankey function
    var sankey_chart = anychart.sankey(data);//customizing the width of the nodes
    sankey_chart.nodeWidth("20%");//setting the chart title
    sankey_chart.title("Simple Sankey Diagram Example");//customizing the vertical padding of the nodes
    sankey_chart.nodePadding(20);//setting the container id
    sankey_chart.container("container");//initiating drawing the Sankey diagram
    sankey_chart.draw();
}

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