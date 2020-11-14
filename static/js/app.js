var url = 'samples.json'


// function optionChanged(id){
//     console.log (id)
// }



function optionChanged(id) {
    console.log(`this is an id: ${id}`)
    d3.json(url).then(function(data) {
        console.log(data);
        
        var names = data.names
        var metadata = data.metadata
        var samples = data.samples

        console.log(names)
        console.log(metadata)
        console.log(samples)


        d3.select("#selDataset")
        .selectAll("option")
        .data(names)
        .enter() // creates placeholder for new data
        .append("option") // appends a div to placeholder
        .html(function(d) {
            return `${d}`;
        }); // sets the html in the div to an image tag with the link




    });

}

optionChanged()
    
