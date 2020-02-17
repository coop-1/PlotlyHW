//pull data to create drop down; default view
d3.json("samples.json").then(function(data){
  data.names.forEach(function(data){
    d3.select("#selDataset").append("option")
      .property("value", data)  
      .text(data)
  });  

//default summary/charts
SUMMARY(data.names[0]);
CHARTS(data.names[0]);

});

//refresh data; event listener in html file
function optionChanged(data) {
  SUMMARY(data);
  CHARTS(data);
}

//build summary
function SUMMARY(sample) {
    d3.json("samples.json").then(function(data) {

      var filtered = data.metadata
        .filter(input => input.id == sample)[0];
      
      console.log(filtered);

      document.getElementById('id').innerHTML = filtered.id;
      document.getElementById('ethnicity').innerHTML = filtered.ethnicity;
      document.getElementById('gender').innerHTML = filtered.gender;
      document.getElementById('age').innerHTML = filtered.age;
      document.getElementById('location').innerHTML = filtered.location;
      document.getElementById('bbtype').innerHTML = filtered.bbtype;
      document.getElementById('wfreq').innerHTML = filtered.wfreq;
    
  });
};

  //build charts
  function CHARTS(sample) {
    d3.json("samples.json").then(function(data) {
      
      var filtered = data.samples
        .filter(input => input.id == sample)[0];
      
      //bar
      var data_bar = [
        {
          x: filtered.sample_values.slice(0,10),
          y: filtered.otu_ids.slice(0, 10)
            .map(SAMPLEID => `Culture# ${SAMPLEID}`),
          type: "bar",
          orientation: "h",
          text: filtered.otu_labels,
        }
      ];
  
      var layout_bar = {
        title: "Top 10 Bacteria Cultures Found (hover over data for info)",
      };
  
      Plotly.newPlot("bar", data_bar, layout_bar);

      // bubble
      var data_bubble = [
        {
          x: filtered.otu_ids,
          y: filtered.sample_values,
          mode: "markers",
          text: filtered.otu_labels,
          marker: {
            size: filtered.sample_values,
          }
        }
      ];

      var layout_bubble = {
        title: "Bacteria Cultures Per Sample (hover over data for info)",
        hovermode: "closest",
      };
    
      Plotly.newPlot("bubble", data_bubble, layout_bubble);

    });
  }

