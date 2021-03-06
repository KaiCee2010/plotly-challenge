var url = 'samples.json'

function optionChanged(val) {
    d3.selectAll("#sample-metadata").select("h6").remove();
    
    console.log(`this is an id: ${val}`)
    d3.json(url).then(function(data) {
        console.log(data);
        

        //create variable to gather data
        var names = data.names
        var metadata = data.metadata
        var samples = data.samples
        
        //display the various data sets
        console.log(names)
        console.log(metadata)
        console.log(samples)

        //Add values to the select dataset dropdown
        d3.select("#selDataset")
        .selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .html(function(d) {
            return `${d}`;
        });

        //grab the value of the selDataset value
        var sel = document.getElementById('selDataset');
        var sel_val = sel.options[sel.selectedIndex].value
        console.log(sel_val)

        var metadataFiltered = metadata.filter(function(data) {
            return String(data.id) === sel_val;
        });
        console.log("Metadata filtered", metadataFiltered)


        //Add values to the sample metadata box
        d3.select("#sample-metadata")
        .selectAll("h6")
        .data(metadataFiltered)
        .enter() 
        .append("h6") 
        .html(function(d) {
            return `ID: ${d.id}<br><br>
            Ethnicity: ${d.ethnicity}<br><br>
            Gender: ${d.gender}<br><br>
            Age: ${d.age}<br><br>
            Location: ${d.location}<br><br>
            Bbtype: ${d.bbtype}<br><br>
            Wfreq:${d.wfreq}<br><br>
            `;
        }); 

        //Filter all the datasets by the id 
        var samplesFiltered = samples.filter(function(data) {
            return data.id === sel_val;
        });
        console.log(samplesFiltered)

        //grab all the otu_ids
        var samplesOtuIds =  samplesFiltered.map(function(d){
            return d.otu_ids
        });
        console.log ("all sample otu", samplesOtuIds)

        //grab the first 10 values of OTU ids
        var samplesOtuIds10 = samplesOtuIds[0].filter(function(d, i){
            return i<10
        });
        console.log("First 10", samplesOtuIds10)

        //convert the OTU ids to strings
        var samplesOtuIds10_strings = samplesOtuIds10.map(String)
        console.log("Firt 10 String", samplesOtuIds10_strings)

        //grab all the sample values
        var samplesSamVals =  samplesFiltered.map(function(d){
            return d.sample_values
        });
        console.log ("all sample values", samplesSamVals)

        //grab the first 10 sample values
        var samplesSamVals10 = samplesSamVals[0].filter(function(d, i){
            return i<10
        });
        console.log("First 10", samplesSamVals10)

        //grab all the otu labels
        var samplesOtuLabels =  samplesFiltered.map(function(d){
            return d.otu_labels
        });
        console.log ("all sample values", samplesOtuLabels)

        //grab the first 10 otu labels
        var samplesOtuLabels10 = samplesOtuLabels[0].filter(function(d, i){
            return i<10
        });
        console.log("First 10", samplesOtuLabels10)


        //create a bar graph of the top 10 OTUs
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


        //create a bubble chart of all of the sample values
        //colored by otu_ids
        //size by sample values
        var trace2 = {
            x: samplesOtuIds[0],
            y: samplesSamVals[0],
            text: samplesOtuLabels[0],
            mode: 'markers',
            marker: {
                color: samplesOtuIds[0],
                size: samplesSamVals[0] 
            }
        };
            
        var plotData2 = [trace2]

        var layout2 = {
            title: `Bubble Sample Values for ${sel_val} `,
            xaxis: {
                title:"OTU ID"
                
            },
            yaxis: {
                title: "Sample Values"      
            }
        };

        Plotly.newPlot("bubble", plotData2, layout2)

        var metadataFilteredWfreq = metadataFiltered[0].wfreq
        console.log(metadataFilteredWfreq)


       //All of this code was taken from other sources
       //Created just to see if it would work
        var weight = 0;
        if (metadataFilteredWfreq == 1){
            weight = 10
        } else if (metadataFilteredWfreq == 2){
            weight = 15
        } else if (metadataFilteredWfreq == 3){
            weight = 12;
        } else if (metadataFilteredWfreq == 4){
            weight = 5;
        } else if (metadataFilteredWfreq == 5){
            weight = -5;
        } else if (metadataFilteredWfreq == 6){
            weight = -10;
        } else if (metadataFilteredWfreq == 7){
            weight = -15;
        } else{
            weight = 0
        }

        var degrees = (20 * metadataFilteredWfreq + weight)
	        radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = -1 * radius * Math.cos(radians);
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
                marker: {size: 20, color:'#901713'},
                showlegend: false,
                name: 'Wash Freq',
                text: metadataFilteredWfreq,
                hoverinfo: 'name+text'},
            { values: [180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180 ],
            rotation: 90,
            text: ['0-1','1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ''],
            direction: 'clockwise',
            textinfo: 'text',
            textposition:'inside',	  
            marker: {colors:["#FEFDE2", "#F1F4D4", "#E4ECC7", "#D7E4B9", "#CADCAC", "#BDD49E", "#B0CC91", "#A3C483", "#97BC76", "#FFFFFF"]},
            labels: ['0-1','1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ''],
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
    
