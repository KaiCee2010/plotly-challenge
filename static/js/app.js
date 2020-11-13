var url = 'samples.json'

d3.json(url).then(function(data) {
    console.log(data);
    

    d3.select("#selDataset")
    .selectAll("option")
    .data(data.names)
    .enter() // creates placeholder for new data
    .append("option") // appends a div to placeholder
    .html(function(d) {
        return `${d}`;
    }); // sets the html in the div to an image tag with the link
  });

  