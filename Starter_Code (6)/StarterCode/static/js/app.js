//assigning url to variable
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//using d3 to read the data in json
d3.json(url).then(function(data) {
    console.log(data);
});

//initialzing dashboard
function init(){
    //drop down selection
    let dropdown = d3.select("#selDataset");
    //accessing data using d3
    d3.json(url).then((data) => {
        let sample_ids = data.names;
        console.log(sample_ids);
        for (id of sample_ids){
            dropdown.append("option").attr("value", id).text(id);
        };
    //store the first sample for display
    let first_entry = sample_ids[0];
    console.log(first_entry);
    makeBar(first_entry);
    makeBubble(first_entry);
    makeDemographics(first_entry);
    }); //end of d3 access
};