## Plotly Challenge

This homework assigned used data from  to create a web site with plots and data using data from [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/).

## Summary
D3 and/or Plotly were used to create the data or graphs.  A dropdown list filters the dataset and updates all of the graphs and demographic information on the web page.

Three different sections were created:
- Demographic Info
    - An individual test subject's 
        - ID
        - Ethnicity
        - Gender
        - Age
        - Location
        - Bbtype
        - Wfreq:5
- Top 10 OTUs for Each Test Subject
    - A horizontal bar chart is created using the top 10 OTUs found for each individual test subject
- Bubble Chart of Samples
    - A bubble charts are created for each sample.  The data is colored by otu_ids and sized by sample values

An additonal bonus guage chart of weekly washing frequency was also created.

## Tasks
The following tasks were taken to create the web page:
- Create variable to gather data
- Display the various data sets
- Add values to the select dataset dropdown
- Grab the value of the selDataset value
- Add demographic info to the sample metadata box
- Filter all the datasets by the id 
- Grab all the otu_ids
- Grab the first 10 values of OTU ids
- Convert the OTU ids to strings
- Grab all the sample values
- Grab the first 10 sample values
- Grab all the otu labels
- Grab the first 10 otu labels
- Create a bar graph of the top 10 OTUs
- Create a bubble chart of all of the sample values
    - Colored by otu_ids
    - Sized by sample values

## Bonus
The bonus Weekly Washing Frequency Gauge was created using the following code:
- [Code1](https://code.tutsplus.com/tutorials/create-interactive-charts-using-plotlyjs-pie-and-gauge-charts--cms-29216)
- [Code2](https://codepen.io/Shokeen/pen/prNzpN)
- [Code3](https://codepen.io/plotly/pen/rxeZME)
Bonus credit is not expected.  



