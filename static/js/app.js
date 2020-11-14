var url = 'samples.json'

function optionChanged(val) {
    d3.selectAll("#sample-metadata").select("h6").remove();
    
    console.log(`this is an id: ${val}`)
    d3.json(url).then(function(data) {
        console.log(data);
        
        var names = data.names
        var metadata = data.metadata
        var samples = data.samples
        // var samplesOTU = data.samples.otu_ids

        console.log(typeof names)
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
        console.log("Metadata filtered", metadataFiltered)

        d3.select("#sample-metadata")
        .selectAll("h6")
        .data(metadataFiltered)
        .enter() // creates placeholder for new data
        .append("h6") // appends a div to placeholder
        .html(function(d) {
            return `ID: ${d.id}<br><br>
            Ethnicity: ${d.ethnicity}<br><br>
            Gender: ${d.gender}<br><br>
            Age: ${d.age}<br><br>
            Location: ${d.location}<br><br>
            Bbtype: ${d.bbtype}<br><br>
            Wfreq:${d.wfreq}<br><br>
            `;
        }); // sets the html in the div to an image tag with the link

        var samplesFiltered = samples.filter(function(data) {
            return data.id === sel_val;
        });
        console.log(samplesFiltered)

        // var samplesOtuIds =  samplesFiltered.map(row => row.otu_ids);
        var samplesOtuIds =  samplesFiltered.map(function(d){
            return d.otu_ids
        });
        console.log ("all sample otu", samplesOtuIds)

        var samplesOtuIds10 = samplesOtuIds[0].filter(function(d, i){
            return i<10
        });
        console.log("First 10", samplesOtuIds10)

        var samplesOtuIds10_strings = samplesOtuIds10.map(String)
        console.log("Firt 10 String", samplesOtuIds10_strings)

        var samplesSamVals =  samplesFiltered.map(function(d){
            return d.sample_values
        });
        console.log ("all sample values", samplesSamVals)

        var samplesSamVals10 = samplesSamVals[0].filter(function(d, i){
            return i<10
        });
        console.log("First 10", samplesSamVals10)

        var samplesOtuLabels =  samplesFiltered.map(function(d){
            return d.otu_labels
        });
        console.log ("all sample values", samplesOtuLabels)

        var samplesOtuLabels10 = samplesOtuLabels[0].filter(function(d, i){
            return i<10
        });
        console.log("First 10", samplesOtuLabels10)

        var trace1 = {
            x: samplesSamVals10,
            y: samplesOtuIds10_strings,
            name: samplesOtuLabels10,
            type: "bar",
            orientation: "h",
            text: samplesOtuLabels10
            
          };

        var plotData = [trace1]

        var layout = {
            title: `Test Subject ID: ${sel_val} `,
            xaxis: {
                title:"Sample Values"
                
            },
            yaxis: {
                title: "OTU IDs",
                autorange:'reversed',
                type: "category"

              
            }
          };
        
        Plotly.newPlot("bar", plotData, layout)

        var trace2 = {
            x: samplesOtuIds10_strings,
            y: samplesSamVals10,
            text: samplesOtuLabels10,
            mode: 'markers',
            marker: {
                color: samplesOtuIds10,
                size: samplesSamVals10 
            }
        };
            
        var plotData2 = [trace2]

        var layout2 = {
            title: `Bubble Sample Values for ${sel_val} `,
            xaxis: {
                title:"OTU ID"
                
            },
            yaxis: {
                title: "Sample Values",             
            }
        };

        Plotly.newPlot("bubble", plotData2, layout2)

        
        var metadataFilteredWfreq = metadataFiltered[0].wfreq
        console.log(metadataFilteredWfreq)

        
        // Enter a speed between 0 and 180
        var level = metadataFilteredWfreq;

        // Trig to calc meter point
        var degrees = 9 - level,
            radius = .5;
        var radians = degrees * Math.PI / 9;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var plotData3 = [{
            type: 'scatter',
            x: [0], y:[0],
                marker: {size: 28, color:'#901713'},
                showlegend: false,
                name: 'speed',
                text: level,
                hoverinfo: 'text+name'},
            { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            rotation: 90,
            text: ['8-9','7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
            textinfo: 'text',
            textposition:'inside',	  
            marker: {colors:["#FEFDE2", "#F1F4D4", "#E4ECC7", "#D7E4B9", "#CADCAC", "#BDD49E", "#B0CC91", "#A3C483", "#97BC76", "rgba(255, 255, 255, 0)"]},
            labels: ['8-9','7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
        }];

        var layout3 = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '#901713',
            line: {
                color: '#901713'
            }
            }],
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 450,
        width: 600,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot("gauge", plotData3, layout3)

    });

}


optionChanged()
    
