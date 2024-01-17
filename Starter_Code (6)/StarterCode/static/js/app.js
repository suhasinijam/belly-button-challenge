//read json from URL
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//find the selector
let selector = d3.select('select');

//find metadata chart
let metadataChart = d3.select('.panel-body');

//find bar
let bar = d3.select('#bar');

//find bubble
let bubble = d3.select('#bubble');

//initialize variables
let ids = [];
let otuIds = [];
let otuLabels = [];
let sampleValues = [];
let metaData = [];


function init(json) {
    let data = json.samples;
    metaData = json.metadata;
    let defaultKey = 0;

    //add values to initialized arrays
    ids = getID(data);
    otuIds = getOtuIDs(data);
    otuLabels = getOtuLabels(data);
    sampleValues = getSampleValues(data);

    //add ids to the selector
    ids.map((label) => {selector.append('option').text(label)});

    //initialize charts and metadata
    plotBar(defaultKey, otuIds, otuLabels, sampleValues, false);
    plotBubble(defaultKey, otuIds, otuLabels, sampleValues, false);
    metadataChart.append('metadata').text(createMetadata(metaData[defaultKey]));
    
};

//initialize dashboard
d3.json(url).then(init);

//update charts and metadata on selector change
selector.on('change', function() {
    let s = d3.select(this);
    let newId = s.property("value");
    let newIndex = ids.findIndex((val) => val === newId);
    plotBubble(newIndex, otuIds, otuLabels, sampleValues, true);
    plotBar(newIndex, otuIds, otuLabels, sampleValues, true);
    updateMetadata(metaData[newIndex]);
});

function getID(json) {
    let idArray = json.map((value) => value.id);
    return idArray
};

function getOtuIDs(json) {
    let otuIDArray = json.map((value) => value.otu_ids);
    return otuIDArray
};

function getOtuLabels(json) {
    let otuLabelArray = json.map((value) => value.otu_labels);
    return otuLabelArray
};

function getSampleValues(json) {
    let sampleValueArray = json.map((value) => value.sample_values);
    return sampleValueArray
};

function createMetadata(metadata) {
    metadataChart.append('id').text(`id: ${metadata.id}`).attr('style', 'font-size: 10px').append('div');
    metadataChart.append('ethnicity').text(`ethnicity: ${metadata.ethnicity}`).attr('style', 'font-size: 10px').append('div');
    metadataChart.append('gender').text(`gender: ${metadata.gender}`).attr('style', 'font-size: 10px').append('div');
    metadataChart.append('age').text(`age: ${metadata.age}`).attr('style', 'font-size: 10px').append('div');
    metadataChart.append('location').text(`location: ${metadata.location}`).attr('style', 'font-size: 10px').append('div');
    metadataChart.append('bbtype').text(`bbtype: ${metadata.bbtype}`).attr('style', 'font-size: 10px').append('div');
    metadataChart.append('wfreq').text(`wfreq: ${metadata.wfreq}`).attr('style', 'font-size: 10px');
}

function updateMetadata(metadata) {
    d3.select('id').text(`id: ${metadata.id}`).attr('style', 'font-size: 10px').append('div');
    d3.select('ethnicity').text(`ethnicity: ${metadata.ethnicity}`).attr('style', 'font-size: 10px').append('div');
    d3.select('gender').text(`gender: ${metadata.gender}`).attr('style', 'font-size: 10px').append('div');
    d3.select('age').text(`age: ${metadata.age}`).attr('style', 'font-size: 10px').append('div');
    d3.select('location').text(`location: ${metadata.location}`).attr('style', 'font-size: 10px').append('div');
    d3.select('bbtype').text(`bbtype: ${metadata.bbtype}`).attr('style', 'font-size: 10px').append('div');
    d3.select('wfreq').text(`wfreq: ${metadata.wfreq}`).attr('style', 'font-size: 10px');
}

function createBarTrace(idIndexVal, otuIdsArray, otuLabelsArray, sampleValuesArray) {
    let sampleValuesToPlot = sampleValuesArray[idIndexVal].slice(0, 10).reverse();
    let otuIdsToPlot = otuIdsArray[idIndexVal].map(otuId => `OTU ${otuId}`).slice(0, 10).reverse();
    let otuLabelsToPlot = otuLabelsArray[idIndexVal].slice(0, 10).reverse();
    trace1 = {
        x: sampleValuesToPlot,
        y: otuIdsToPlot,
        type: 'bar',
        orientation: 'h',
        hovertext: otuLabelsToPlot
    }
    return trace1;
}

function plotBar(idIndexVal, otuIdsArray, otuLabelsArray, sampleValuesArray, restyle) {;
    trace = createBarTrace(idIndexVal, otuIdsArray, otuLabelsArray, sampleValuesArray);
    data = [trace];
    Plotly.newPlot(bar.node(), data);
}

function createBubbleTrace(idIndexVal, otuIdsArray, otuLabelsArray, sampleValuesArray){
    let sampleValuesToPlot = sampleValuesArray[idIndexVal];
    let otuIdsToPlot = otuIdsArray[idIndexVal];
    let otuLabelsToPlot = otuLabelsArray[idIndexVal];
    //bubble chart trace
    //https://plotly.com/javascript/bubble-charts/
    trace1 = {
        x: otuIdsToPlot,
        y: sampleValuesToPlot,
        mode: 'markers',
        marker: {
            size: sampleValuesToPlot,
            color: otuIdsToPlot
        },
        text: otuLabelsToPlot,
        type:'scatter'
    }
    return trace1;
}

function plotBubble(idIndexVal, otuIdsArray, otuLabelsArray, sampleValuesArray, restyle) {
    trace = createBubbleTrace(idIndexVal, otuIdsArray, otuLabelsArray, sampleValuesArray);
    data = [trace];
    Plotly.newPlot(bubble.node(), data);
}