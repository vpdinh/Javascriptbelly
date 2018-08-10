function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
  
    // Use `d3.json` to fetch the metadata for a sample
      let sample_metadata = d3.select("#sample-metadata");
      // Use `.html("") to clear any existing metadata
      sample_metadata.html("");
      sample.forEach(function(metadata) {
        Object.entries(metadata).forEach(function([key, value]) {
          var row = sample_metadata.append("div");
          row.text(key + ":" + value);
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
  
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
  
       });
    });
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
  }
  
  function buildCharts() {
  
    var trace1 = {
      labels: ["beer", "wine", "martini", "margarita",
          "ice tea", "rum & coke", "mai tai", "gin & tonic"],
      values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
      type: 'pie'
    };
    
    var data = [trace1];
    
    var layout = {
      title: "'Bar' Chart",
    };
    
    Plotly.newPlot("plot", data, layout);
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
  
      // @TODO: Build a Bubble Chart using the sample data
  
      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
  }
  
  function init() {
  
      buildCharts();
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();
  