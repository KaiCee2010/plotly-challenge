var url = 'samples.json'


var heroes = [{
    name: "Batman", franchise: "DC"},
	{name: "Ironman", franchise: "Marvel"},
	{name: "Thor", franchise: "Marvel"},
	{name: "Superman", franchise: "DC"}
];

var marvelHeroes =  heroes.filter(function(hero) {
	return hero.franchise === "Marvel";
});

console.log(marvelHeroes);


function optionChanged(val) {
    d3.selectAll("#sample-metadata").select("h5").remove();
    
    console.log(`this is an id: ${val}`)
    d3.json(url).then(function(data) {
        console.log(data);
        
        var names = data.names
        var metadata = data.metadata
        var samples = data.samples

        console.log(names)
        console.log(metadata)
        console.log(samples)

        // var sel = d3.select('#selDataset').node().value
        // console.log("Dropdown value", sel)

        d3.select("#selDataset")
        .selectAll("option")
        .data(names)
        .enter() // creates placeholder for new data
        .append("option") // appends a div to placeholder
        .html(function(d) {
            return `${d}`;
        }); // sets the html in the div to an image tag with the link

        var sel = document.getElementById('selDataset');
        var sel_val = sel.options[sel.selectedIndex].value
        console.log(sel_val)

        var metadataFiltered = metadata.filter(function(data) {
            return String(data.id) === sel_val;
        });
        console.log(metadataFiltered)

        d3.select("#sample-metadata")
        .selectAll("h5")
        .data(metadataFiltered)
        .enter() // creates placeholder for new data
        .append("h5") // appends a div to placeholder
        .html(function(d) {
            return `ID: ${d.id}<br>
            Ethnicity: ${d.ethnicity}<br>
            Gender: ${d.gender}<br>
            Age: ${d.age}<br>
            Location: ${d.location}<br>
            Bbtype: ${d.bbtype}<br>
            Wfreq:${d.wfreq}<br>
            `;
        }); // sets the html in the div to an image tag with the link

        var samplesFiltered = samples.filter(function(data) {
            return data.id === sel_val;
        });
        console.log(samplesFiltered)

    });

}


optionChanged()
    
