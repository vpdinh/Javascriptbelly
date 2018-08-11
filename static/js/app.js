
function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  let Metadatasample = "/metadata/"+sample;
  // Use `d3.json` to fetch the metadata for a sample
    const sample_metadata = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");
    d3.json(Metadatasample).then((metadata) => {
      Object.entries(metadata).forEach(function([key, value]) {
     // metadata.forEach((sample) => {
        var row = sample_metadata.append("div");
        var bold = row.append("b");
        bold.text(key+" : "+value);
        if (key == 'WFREQ')
        {
          // Enter the washing frequency between 0 and 180
          var level = value*22;
          // Trig to calc meter point
          var degrees = 180 - level,
              radius = .5;
          var radians = degrees * Math.PI / 180;
          var x = radius * Math.cos(radians);
          var y = radius * Math.sin(radians);
          // Path: may have to change to create a better triangle
          var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
              pathX = String(x),
              space = ' ',
              pathY = String(y),
              pathEnd = ' Z';
          var path = mainPath.concat(pathX,space,pathY,pathEnd);
          var data = [{ type: 'scatter',
          x: [0], y:[0],
              marker: {size: 12, color:'850000'},
              showlegend: false,
              name: 'Week',
              text: level,
              hoverinfo: 'text+name'},
          { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
          rotation: 90,
          text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
          textinfo: 'text',
          textposition:'inside',
          marker: {
              colors:[
                  'rgba(0, 105, 11, .5)', 'rgba(10, 120, 22, .5)',
                  'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                  'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                  'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                  'rgba(240, 230, 215, .5)', 'rgba(255, 255, 255, 0)']},
          labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
          hoverinfo: 'label',
          hole: .5,
          type: 'pie',
          showlegend: false
          }];
          var layout = {
          shapes:[{
              type: 'path',
              path: path,
              fillcolor: '850000',
              line: {
                  color: '850000'
              }
              }],
          title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
          height: 500,
          width: 600,
          xaxis: {zeroline:false, showticklabels:false,
                      showgrid: false, range: [-1, 1]},
          yaxis: {zeroline:false, showticklabels:false,
                      showgrid: false, range: [-1, 1]}
          };
          Plotly.newPlot('gauge', data, layout);
       }
     });
  });
}



function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
    let sampledata = "/samples/"+sample;
    d3.json(sampledata).then((data2) => {
      //
      var mapvalue = data2.sample_values.map((val,i)=>
      {
       return val;
      });

      //
      var top10values = mapvalue.sort((a,b) =>  b-a).slice(0,10);
      var listindextop10values = [];
      top10values.forEach((value) =>{
            listindextop10values.push(data2.sample_values.indexOf(value));
      });
      //
      function getvaluefromindex (arrindex,arr2) {
        let values = [];
        arrindex.forEach((value) => {
         values.push(arr2[value]);
        });
        return values;

      }

        let otu_ids = getvaluefromindex (listindextop10values,data2.otu_ids);
        let otu_labels = getvaluefromindex (listindextop10values,data2.otu_labels);


      var trace1 = {
          labels: otu_ids,
          values: top10values,
          text: otu_labels,
          textinfo: 'percent',
          textposition: 'inside',
          hoverinfo : 'label+text+value+percent',
          type: 'pie'
        };
        let data = [trace1];
         Plotly.newPlot("pie",data);
// @TODO: Build a Bubble Chart using the sample data
      var trace2 = {
        x: data2.otu_ids,
        y: data2.sample_values,
        mode: 'markers',
        marker: {
        color: data2.otu_ids,
        size: data2.sample_values,
        },
        text: data2.otu_labels,
        hoverinfo : 'y+x+text',
        hovermode:'closest',
        type: 'scatter'
      };
      let data1 = [trace2];
      var layout = {
        xaxis: {
          title: 'OTC ID',
        }
      }
      Plotly.newPlot("bubble",data1,layout);
      });
      }

function init() {

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text("BB_"+sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}
init();
