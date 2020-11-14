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

        // var trace3 = [
        //     {
        //       domain: { x: [0, 1], y: [0, 1] },
        //       value: metadataFilteredWfreq,
        //       title: { text: "Scrubs per Week" },
        //       type: "indicator",
        //       mode: "gauge+number",
        //       gauge: {
        //         axis: { range: [null, 9] },
        //         steps: [
        //           { range: [0, 4], color: "lightgray" },
        //           { range: [4, 9], color: "gray" }
        //         ]
        //         }
        //       }
        //   ];

        var plotData3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: 350,
                title: { text: "Speed" },
                type: "indicator",
                mode: "gauge+number"
            }
        ];

        var layout3 = { 
            width: 600, 
            height: 450, 
            margin: { t: 0, b: 0
        }};

        Plotly.newPlot("gauge", plotData3, layout3)

    });

}


optionChanged()
    
