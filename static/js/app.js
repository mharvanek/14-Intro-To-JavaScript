// from data.js
var tableData = data;


//get dropdown values for filter
var unique = {};
var distinctCity = [];

for( var i in tableData ){
 if( typeof(unique[tableData[i].city]) == "undefined"){
  distinctCity.push(tableData[i].city);  // push the unique cities into the array
    }
}

// console.log(distinctCity);

//populate unfiltered Dataset
var ufo_tbody = d3.select("#ufo-tbody");

data.forEach((sighting) => {
    var row = ufo_tbody.append("tr").attr("id", "ufo-tr");
    Object.entries(sighting).forEach(([key, value]) => {
      var cell = row.append("td").attr("id", "ufo-td");
      cell.text(value);
    });
  });

// Select the submit button
var filter_submit = d3.select("#filter-btn");

filter_submit.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    //clear table data
    ufo_tbody.selectAll("#ufo-tr").remove()

    // Get the value of the input element by id
    var dateTimeInputValue = d3.select("#datetime").property("value");
    var cityInputValue = d3.select("#city").property("value");
    var stateInputValue = d3.select("#state").property("value");
    var countryInputValue = d3.select("#country").property("value");
    var shapeInputValue = d3.select("#shape").property("value");

    //create object to store filter values
    var filters = {};
    
    //if filter is not blank add to filters object
    if (!!dateTimeInputValue) {
        filters.datetime = dateTimeInputValue;
    } 

    if (!!cityInputValue) {
        filters.city = cityInputValue;
    } 

    if (!!stateInputValue) {
        filters.state = stateInputValue;
    } 

    if (!!countryInputValue) {
        filters.country = countryInputValue;
    } 

    if (!!shapeInputValue) {
        filters.shape = shapeInputValue;
    } 

    //
    filteredtableData = tableData.filter(function(item) {
        for (var key in filters) {
          if (item[key] === undefined || item[key] != filters[key])
            return false;
        }
        return true;
      });

   //add filtered data to table
   filteredtableData.forEach((sighting) => {
        var row = ufo_tbody.append("tr").attr("id", "ufo-tr");
        Object.entries(sighting).forEach(([key, value]) => {
          var cell = row.append("td").attr("id", "ufo-td");
          cell.text(value);
        });
      });

    
});

// restore all the data
var see_all_submit = d3.select("#see-all-btn");

see_all_submit.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    //clear table data
    ufo_tbody.selectAll("#ufo-tr").remove()

   //add filtered data to table
   tableData.forEach((sighting) => {
    var row = ufo_tbody.append("tr").attr("id", "ufo-tr");
    Object.entries(sighting).forEach(([key, value]) => {
      var cell = row.append("td").attr("id", "ufo-td");
      cell.text(value);
    });
  });    
});

// restore all the data
var reset_filters_submit = d3.select("#reset-filters-btn");

reset_filters_submit.on("click", function() {
    d3.select("#datetime").property("value", "")
    d3.select("#city").property("value", "")
    d3.select("#state").property("value", "")
    d3.select("#country").property("value", "")
    d3.select("#shape").property("value", "")
});
