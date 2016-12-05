// window.onload = function() {
//     $.ajax({
//         url: "http://nflarrest.com/api/v1/crime/",
//         type: "get",
//         dataType: "json",
//         success: function(data){
//             console.log(data);
//             //var message =
//         },
//         error: function(err) {
//             console.log(err);
//         }
//     });
// };


// OFFENSE TYPE AND # OF ARRESTS
var arrestCount = [{"Category":"DUI","arrest_count":"210"},{"Category":"Domestic violence","arrest_count":"92"},{"Category":"Drugs","arrest_count":"91"},{"Category":"Assault","arrest_count":"68"},{"Category":"Disorderly conduct","arrest_count":"42"},{"Category":"Gun","arrest_count":"33"},{"Category":"Public intoxication","arrest_count":"18"},{"Category":"License","arrest_count":"18"},{"Category":"Battery","arrest_count":"17"},{"Category":"Reckless driving","arrest_count":"17"},{"Category":"Alcohol","arrest_count":"17"},{"Category":"Theft","arrest_count":"16"},{"Category":"Resisting arrest","arrest_count":"15"},{"Category":"Outstanding warrant","arrest_count":"10"},{"Category":"DUI, drugs","arrest_count":"10"}];



// // set the dimensions of the canvas
//     var margin = {top: 20, right: 20, bottom: 100, left: 40},
//     width = 600 - margin.left - margin.right,
//     height = 300 - margin.top - margin.bottom;
//
// // set the ranges
// var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
// var y = d3.scale.linear().range([height, 0]);
//
// // define the axis
// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom")
// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .ticks(10);
//
// // add the SVG element
// var svg = d3.select("#viz1").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");



// load the data
// d3.json("/jsonData/", function(error, data) {
// d3.json(jsonP, function(error, data) {
function arrestByOffense(data){

    // set the dimensions of the canvas
    var margin = {top: 20, right: 20, bottom: 100, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
    var y = d3.scale.linear().range([height, 0]);

// define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

// add the SVG element
    var svg = d3.select("#viz1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        data.forEach(function(d) {
            d.Category = d.Category;
            d.arrest_count = +d.arrest_count;
        });

        // scale the range of the data
        x.domain(data.map(function(d) { return d.Category; }));
        y.domain([0, d3.max(data, function(d) { return d.arrest_count; })]);

        // add axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-60)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("# of crimes");

        // Add bar chart
        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.Category); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.arrest_count); })
            .attr("height", function(d) { return height - y(d.arrest_count); })
            .on("mouseover", function() { tooltip.style("display", null); })
            .on("mouseout", function() { tooltip.style("display", "none"); })
            .on("mousemove", function(d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.arrest_count);
            });

        // Prep the tooltip bits, initial display is hidden
        // CODING ASSISTANCE:  http://bl.ocks.org/mstanaland/6100713
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");
}

var teamArrestData = [{"Team":"MIN","Team_name":"Vikings","Team_city":"Minneapolis","arrest_count":"49"},{"Team":"DEN","Team_name":"Broncos","Team_city":"Denver","arrest_count":"47"},{"Team":"CIN","Team_name":"Bengals","Team_city":"Cincinatti","arrest_count":"43"},{"Team":"TB","Team_name":"Buccaneers","Team_city":"Tampa Bay","arrest_count":"36"},{"Team":"TEN","Team_name":"Titans","Team_city":"Nashville","arrest_count":"36"},{"Team":"JAC","Team_name":"Jaguars","Team_city":"Jacksonville","arrest_count":"32"},{"Team":"CLE","Team_name":"Browns","Team_city":"Cleveland","arrest_count":"32"},{"Team":"IND","Team_name":"Colts","Team_city":"Indianapolis","arrest_count":"32"},{"Team":"CHI","Team_name":"Bears","Team_city":"Chicago","arrest_count":"31"},{"Team":"KC","Team_name":"Chiefs","Team_city":"Kansas City","arrest_count":"31"},{"Team":"MIA","Team_name":"Dolphins","Team_city":"Miami","arrest_count":"30"},{"Team":"BAL","Team_name":"Ravens","Team_city":"Baltimore","arrest_count":"26"},{"Team":"SD","Team_name":"Chargers","Team_city":"San Diego","arrest_count":"26"},{"Team":"NO","Team_name":"Saints","Team_city":"New Orleans","arrest_count":"26"},{"Team":"SF","Team_name":"49ers","Team_city":"San Francisco","arrest_count":"24"},{"Team":"PIT","Team_name":"Steelers","Team_city":"Pittsburgh","arrest_count":"24"},{"Team":"SEA","Team_name":"Seahawks","Team_city":"Seattle","arrest_count":"24"},{"Team":"GB","Team_name":"Packers","Team_city":"Green Bay","arrest_count":"21"},{"Team":"WAS","Team_name":"Redskins","Team_city":"Washington DC","arrest_count":"21"},{"Team":"OAK","Team_name":"Raiders","Team_city":"Oakland","arrest_count":"21"},{"Team":"ATL","Team_name":"Falcons","Team_city":"Atlanta","arrest_count":"21"},{"Team":"NE","Team_name":"Patriots","Team_city":"Boston","arrest_count":"20"},{"Team":"CAR","Team_name":"Panthers","Team_city":"Charlotte","arrest_count":"20"},{"Team":"ARI","Team_name":"Cardinals","Team_city":"Phoenix","arrest_count":"19"},{"Team":"NYJ","Team_name":"Jets","Team_city":"New York","arrest_count":"18"},{"Team":"DET","Team_name":"Lions","Team_city":"Detroit","arrest_count":"18"},{"Team":"BUF","Team_name":"Buffalo Bills","Team_city":"Buffalo","arrest_count":"18"},{"Team":"PHI","Team_name":"Eagles","Team_city":"Philadelphia","arrest_count":"18"},{"Team":"DAL","Team_name":"Cowboys","Team_city":"Dallas","arrest_count":"17"},{"Team":"LA","Team_name":"Rams","Team_city":"Los Angeles","arrest_count":"16"},{"Team":"NYG","Team_name":"NY Giants","Team_city":"New York","arrest_count":"14"},{"Team":"HOU","Team_name":"Texans","Team_city":"Houston","arrest_count":"13"},{"Team":"Free ","Team_name":"Free Agents","Team_city":"N\/A","arrest_count":"3"}];

function arrestsByTeam(data){
// set the dimensions of the canvas
    var margin = {top: 20, right: 20, bottom: 100, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
    var y = d3.scale.linear().range([height, 0]);

// define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

// add the SVG element
    var svg = d3.select("#viz2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// load the data
//     d3.json("/byTeam/", function(error, data) {
//         data.forEach(function(d) {
//             d.Category = d.Team_name;
//             d.arrest_count = +d.arrest_count;
//         });

        data.forEach(function(d) {
            d.Team_name = d.Team_name;
            d.arrest_count = +d.arrest_count;
        });

        // scale the range of the data
        x.domain(data.map(function(d) { return d.Team_name; }));
        y.domain([0, d3.max(data, function(d) { return d.arrest_count; })]);

        // add axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-60)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("# of crimes");

        // Add bar chart
        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.Team_name); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.arrest_count); })
            .attr("height", function(d) { return height - y(d.arrest_count); })
            .on("mouseover", function() { tooltip.style("display", null); })
            .on("mouseout", function() { tooltip.style("display", "none"); })
            .on("mousemove", function(d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.arrest_count);
            });


        // Prep the tooltip bits, initial display is hidden
        // CODING ASSISTANCE:  http://bl.ocks.org/mstanaland/6100713
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");
};


var vikings = [{"Name":"Bryant McKinnie","arrest_count":"4"},{"Name":"Kenny Mixon","arrest_count":"3"},{"Name":"Jerome Simpson","arrest_count":"2"},{"Name":"Chris Cook","arrest_count":"2"},{"Name":"Everson Griffen","arrest_count":"2"},{"Name":"Kevin Williams","arrest_count":"2"},{"Name":"Mike Nattiel","arrest_count":"2"},{"Name":"Erin Henderson","arrest_count":"2"},{"Name":"Cedric Griffin","arrest_count":"2"},{"Name":"Dwight Smith","arrest_count":"2"},{"Name":"Adrian Peterson","arrest_count":"2"},{"Name":"E.J. Henderson","arrest_count":"2"},{"Name":"Jabari Price","arrest_count":"1"},{"Name":"Chris Walsh","arrest_count":"1"},{"Name":"Jerome Felton","arrest_count":"1"},{"Name":"Darrion Scott","arrest_count":"1"},{"Name":"Travis Taylor","arrest_count":"1"},{"Name":"Fred Smoot","arrest_count":"1"},{"Name":"Randy Moss","arrest_count":"1"},{"Name":"Tom Johnson","arrest_count":"1"},{"Name":"Isame Faciane","arrest_count":"1"},{"Name":"Caleb King","arrest_count":"1"},{"Name":"Tyrell Johnson","arrest_count":"1"},{"Name":"Koren Robinson","arrest_count":"1"},{"Name":"Moe Williams","arrest_count":"1"},{"Name":"Kelly Campbell","arrest_count":"1"},{"Name":"Steve Farmer","arrest_count":"1"},{"Name":"John Davis","arrest_count":"1"},{"Name":"A.J. Jefferson","arrest_count":"1"},{"Name":"Benny Sapp","arrest_count":"1"},{"Name":"Rhett Bomar","arrest_count":"1"},{"Name":"Ronyell Whitaker","arrest_count":"1"},{"Name":"Daunte Culpepper","arrest_count":"1"},{"Name":"Marcus Johnson","arrest_count":"1"}];

function arrestsVikings(data){
// set the dimensions of the canvas
    var margin = {top: 20, right: 20, bottom: 100, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
    var y = d3.scale.linear().range([height, 0]);

// define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

// add the SVG element
    var svg = d3.select("#viz3").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// load the data
//     d3.json("/vikings/", function(error, data) {
//         data.forEach(function(d) {
//             d.Category = d.Name;
//             d.arrest_count = +d.arrest_count;
//         });

        data.forEach(function(d) {
            d.Name = d.Name;
            d.arrest_count = +d.arrest_count;
        });

        // scale the range of the data
        x.domain(data.map(function(d) { return d.Name; }));
        y.domain([0, d3.max(data, function(d) { return d.arrest_count; })]);

        // add axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-60)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("# of crimes");

        // Add bar chart
        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.Name); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.arrest_count); })
            .attr("height", function(d) { return height - y(d.arrest_count); })
            .on("mouseover", function() { tooltip.style("display", null); })
            .on("mouseout", function() { tooltip.style("display", "none"); })
            .on("mousemove", function(d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.arrest_count);
            });


        // Prep the tooltip bits, initial display is hidden
        // CODING ASSISTANCE:  http://bl.ocks.org/mstanaland/6100713
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");
};



var time = [
// DUI
    {"Month":"2","Year":"2000","arrest_count":"1"},{"Month":"3","Year":"2000","arrest_count":"1"},{"Month":"5","Year":"2000","arrest_count":"3"},{"Month":"7","Year":"2000","arrest_count":"1"},{"Month":"8","Year":"2000","arrest_count":"1"},{"Month":"10","Year":"2000","arrest_count":"1"},{"Month":"11","Year":"2000","arrest_count":"1"},{"Month":"2","Year":"2001","arrest_count":"1"},{"Month":"3","Year":"2001","arrest_count":"1"},{"Month":"6","Year":"2001","arrest_count":"1"},{"Month":"7","Year":"2001","arrest_count":"2"},{"Month":"8","Year":"2001","arrest_count":"1"},{"Month":"9","Year":"2001","arrest_count":"1"},{"Month":"10","Year":"2001","arrest_count":"1"},{"Month":"11","Year":"2001","arrest_count":"1"},{"Month":"12","Year":"2001","arrest_count":"1"},{"Month":"2","Year":"2002","arrest_count":"1"},{"Month":"5","Year":"2002","arrest_count":"1"},{"Month":"6","Year":"2002","arrest_count":"2"},{"Month":"7","Year":"2002","arrest_count":"2"},{"Month":"8","Year":"2002","arrest_count":"2"},{"Month":"9","Year":"2002","arrest_count":"1"},{"Month":"10","Year":"2002","arrest_count":"2"},{"Month":"11","Year":"2002","arrest_count":"2"},{"Month":"12","Year":"2002","arrest_count":"1"},{"Month":"1","Year":"2003","arrest_count":"2"},{"Month":"3","Year":"2003","arrest_count":"1"},{"Month":"4","Year":"2003","arrest_count":"2"},{"Month":"5","Year":"2003","arrest_count":"1"},{"Month":"7","Year":"2003","arrest_count":"1"},{"Month":"8","Year":"2003","arrest_count":"1"},{"Month":"9","Year":"2003","arrest_count":"2"},{"Month":"10","Year":"2003","arrest_count":"2"},{"Month":"11","Year":"2003","arrest_count":"2"},{"Month":"1","Year":"2004","arrest_count":"1"},{"Month":"2","Year":"2004","arrest_count":"1"},{"Month":"4","Year":"2004","arrest_count":"4"},{"Month":"5","Year":"2004","arrest_count":"1"},{"Month":"6","Year":"2004","arrest_count":"1"},{"Month":"7","Year":"2004","arrest_count":"1"},{"Month":"9","Year":"2004","arrest_count":"1"},{"Month":"10","Year":"2004","arrest_count":"2"},{"Month":"11","Year":"2004","arrest_count":"1"},{"Month":"12","Year":"2004","arrest_count":"3"},{"Month":"2","Year":"2005","arrest_count":"1"},{"Month":"5","Year":"2005","arrest_count":"1"},{"Month":"6","Year":"2005","arrest_count":"2"},{"Month":"8","Year":"2005","arrest_count":"1"},{"Month":"9","Year":"2005","arrest_count":"2"},{"Month":"10","Year":"2005","arrest_count":"2"},{"Month":"11","Year":"2005","arrest_count":"2"},{"Month":"5","Year":"2006","arrest_count":"2"},{"Month":"6","Year":"2006","arrest_count":"3"},{"Month":"8","Year":"2006","arrest_count":"2"},{"Month":"9","Year":"2006","arrest_count":"4"},{"Month":"10","Year":"2006","arrest_count":"2"},{"Month":"11","Year":"2006","arrest_count":"5"},{"Month":"12","Year":"2006","arrest_count":"1"},{"Month":"1","Year":"2007","arrest_count":"1"},{"Month":"2","Year":"2007","arrest_count":"1"},{"Month":"3","Year":"2007","arrest_count":"2"},{"Month":"5","Year":"2007","arrest_count":"1"},{"Month":"6","Year":"2007","arrest_count":"1"},{"Month":"7","Year":"2007","arrest_count":"1"},{"Month":"8","Year":"2007","arrest_count":"1"},{"Month":"10","Year":"2007","arrest_count":"1"},{"Month":"11","Year":"2007","arrest_count":"2"},{"Month":"12","Year":"2007","arrest_count":"1"},{"Month":"1","Year":"2008","arrest_count":"2"},{"Month":"2","Year":"2008","arrest_count":"2"},{"Month":"3","Year":"2008","arrest_count":"2"},{"Month":"5","Year":"2008","arrest_count":"2"},{"Month":"6","Year":"2008","arrest_count":"3"},{"Month":"8","Year":"2008","arrest_count":"1"},{"Month":"9","Year":"2008","arrest_count":"2"},{"Month":"10","Year":"2008","arrest_count":"1"},{"Month":"11","Year":"2008","arrest_count":"1"},{"Month":"1","Year":"2009","arrest_count":"1"},{"Month":"2","Year":"2009","arrest_count":"1"},{"Month":"3","Year":"2009","arrest_count":"1"},{"Month":"4","Year":"2009","arrest_count":"1"},{"Month":"5","Year":"2009","arrest_count":"1"},{"Month":"6","Year":"2009","arrest_count":"1"},{"Month":"8","Year":"2009","arrest_count":"2"},{"Month":"10","Year":"2009","arrest_count":"1"},{"Month":"11","Year":"2009","arrest_count":"1"},{"Month":"12","Year":"2009","arrest_count":"1"},{"Month":"1","Year":"2010","arrest_count":"2"},{"Month":"2","Year":"2010","arrest_count":"2"},{"Month":"3","Year":"2010","arrest_count":"2"},{"Month":"6","Year":"2010","arrest_count":"1"},{"Month":"7","Year":"2010","arrest_count":"1"},{"Month":"8","Year":"2010","arrest_count":"1"},{"Month":"9","Year":"2010","arrest_count":"2"},{"Month":"10","Year":"2010","arrest_count":"1"},{"Month":"11","Year":"2010","arrest_count":"3"},{"Month":"12","Year":"2010","arrest_count":"2"},{"Month":"2","Year":"2011","arrest_count":"1"},{"Month":"5","Year":"2011","arrest_count":"1"},{"Month":"6","Year":"2011","arrest_count":"1"},{"Month":"7","Year":"2011","arrest_count":"2"},{"Month":"8","Year":"2011","arrest_count":"2"},{"Month":"9","Year":"2011","arrest_count":"1"},{"Month":"1","Year":"2012","arrest_count":"1"},{"Month":"2","Year":"2012","arrest_count":"1"},{"Month":"4","Year":"2012","arrest_count":"2"},{"Month":"5","Year":"2012","arrest_count":"1"},{"Month":"6","Year":"2012","arrest_count":"4"},{"Month":"7","Year":"2012","arrest_count":"4"},{"Month":"9","Year":"2012","arrest_count":"1"},{"Month":"10","Year":"2012","arrest_count":"1"},{"Month":"11","Year":"2012","arrest_count":"1"},{"Month":"12","Year":"2012","arrest_count":"1"},{"Month":"1","Year":"2013","arrest_count":"1"},{"Month":"2","Year":"2013","arrest_count":"3"},{"Month":"3","Year":"2013","arrest_count":"1"},{"Month":"5","Year":"2013","arrest_count":"5"},{"Month":"7","Year":"2013","arrest_count":"2"},{"Month":"11","Year":"2013","arrest_count":"3"},{"Month":"1","Year":"2014","arrest_count":"1"},{"Month":"2","Year":"2014","arrest_count":"1"},{"Month":"6","Year":"2014","arrest_count":"3"},{"Month":"7","Year":"2014","arrest_count":"1"},{"Month":"8","Year":"2014","arrest_count":"1"},{"Month":"9","Year":"2014","arrest_count":"1"},{"Month":"12","Year":"2014","arrest_count":"1"},{"Month":"1","Year":"2015","arrest_count":"2"},{"Month":"3","Year":"2015","arrest_count":"2"},{"Month":"8","Year":"2015","arrest_count":"1"},{"Month":"12","Year":"2015","arrest_count":"1"},{"Month":"2","Year":"2016","arrest_count":"1"},{"Month":"5","Year":"2016","arrest_count":"1"},{"Month":"9","Year":"2016","arrest_count":"2"},{"Month":"10","Year":"2016","arrest_count":"1"},{"Month":"11","Year":"2016","arrest_count":"1"},
// DOMESTIC VIOLENCE
    {"Month":"1","Year":"2000","arrest_count":"1"},{"Month":"2","Year":"2000","arrest_count":"1"},{"Month":"3","Year":"2000","arrest_count":"1"},{"Month":"8","Year":"2000","arrest_count":"1"},{"Month":"9","Year":"2000","arrest_count":"1"},{"Month":"3","Year":"2001","arrest_count":"1"},{"Month":"5","Year":"2001","arrest_count":"3"},{"Month":"6","Year":"2001","arrest_count":"2"},{"Month":"8","Year":"2001","arrest_count":"1"},{"Month":"12","Year":"2001","arrest_count":"1"},{"Month":"3","Year":"2002","arrest_count":"1"},{"Month":"7","Year":"2002","arrest_count":"2"},{"Month":"10","Year":"2002","arrest_count":"1"},{"Month":"5","Year":"2003","arrest_count":"1"},{"Month":"7","Year":"2003","arrest_count":"2"},{"Month":"6","Year":"2004","arrest_count":"2"},{"Month":"11","Year":"2004","arrest_count":"1"},{"Month":"1","Year":"2005","arrest_count":"1"},{"Month":"2","Year":"2005","arrest_count":"1"},{"Month":"3","Year":"2005","arrest_count":"1"},{"Month":"4","Year":"2005","arrest_count":"1"},{"Month":"6","Year":"2005","arrest_count":"1"},{"Month":"7","Year":"2005","arrest_count":"1"},{"Month":"8","Year":"2005","arrest_count":"1"},{"Month":"9","Year":"2005","arrest_count":"1"},{"Month":"11","Year":"2005","arrest_count":"1"},{"Month":"1","Year":"2006","arrest_count":"1"},{"Month":"2","Year":"2006","arrest_count":"1"},{"Month":"4","Year":"2006","arrest_count":"1"},{"Month":"5","Year":"2006","arrest_count":"1"},{"Month":"6","Year":"2006","arrest_count":"3"},{"Month":"8","Year":"2006","arrest_count":"1"},{"Month":"10","Year":"2006","arrest_count":"2"},{"Month":"3","Year":"2007","arrest_count":"2"},{"Month":"6","Year":"2007","arrest_count":"1"},{"Month":"10","Year":"2007","arrest_count":"2"},{"Month":"1","Year":"2008","arrest_count":"1"},{"Month":"2","Year":"2008","arrest_count":"2"},{"Month":"3","Year":"2008","arrest_count":"3"},{"Month":"4","Year":"2008","arrest_count":"2"},{"Month":"5","Year":"2008","arrest_count":"1"},{"Month":"3","Year":"2009","arrest_count":"1"},{"Month":"5","Year":"2009","arrest_count":"1"},{"Month":"9","Year":"2009","arrest_count":"2"},{"Month":"10","Year":"2009","arrest_count":"1"},{"Month":"1","Year":"2010","arrest_count":"1"},{"Month":"2","Year":"2010","arrest_count":"1"},{"Month":"4","Year":"2010","arrest_count":"1"},{"Month":"5","Year":"2010","arrest_count":"1"},{"Month":"11","Year":"2010","arrest_count":"1"},{"Month":"12","Year":"2010","arrest_count":"1"},{"Month":"6","Year":"2011","arrest_count":"1"},{"Month":"10","Year":"2011","arrest_count":"1"},{"Month":"11","Year":"2011","arrest_count":"1"},{"Month":"7","Year":"2012","arrest_count":"1"},{"Month":"8","Year":"2012","arrest_count":"1"},{"Month":"10","Year":"2012","arrest_count":"1"},{"Month":"1","Year":"2013","arrest_count":"3"},{"Month":"3","Year":"2013","arrest_count":"1"},{"Month":"4","Year":"2013","arrest_count":"1"},{"Month":"5","Year":"2013","arrest_count":"1"},{"Month":"11","Year":"2013","arrest_count":"1"},{"Month":"2","Year":"2014","arrest_count":"1"},{"Month":"5","Year":"2014","arrest_count":"1"},{"Month":"8","Year":"2014","arrest_count":"1"},{"Month":"9","Year":"2014","arrest_count":"2"},{"Month":"1","Year":"2015","arrest_count":"1"},{"Month":"3","Year":"2015","arrest_count":"1"},{"Month":"4","Year":"2015","arrest_count":"1"},{"Month":"5","Year":"2015","arrest_count":"1"},{"Month":"7","Year":"2015","arrest_count":"1"},{"Month":"2","Year":"2016","arrest_count":"1"},{"Month":"9","Year":"2016","arrest_count":"1"},
// DRUGS
    {"Month":"4","Year":"2000","arrest_count":"1"},{"Month":"5","Year":"2000","arrest_count":"1"},{"Month":"6","Year":"2000","arrest_count":"1"},{"Month":"8","Year":"2000","arrest_count":"1"},{"Month":"5","Year":"2001","arrest_count":"1"},{"Month":"9","Year":"2001","arrest_count":"1"},{"Month":"11","Year":"2001","arrest_count":"2"},{"Month":"12","Year":"2001","arrest_count":"1"},{"Month":"7","Year":"2002","arrest_count":"1"},{"Month":"2","Year":"2003","arrest_count":"1"},{"Month":"5","Year":"2003","arrest_count":"2"},{"Month":"6","Year":"2003","arrest_count":"1"},{"Month":"2","Year":"2004","arrest_count":"1"},{"Month":"3","Year":"2004","arrest_count":"1"},{"Month":"12","Year":"2005","arrest_count":"1"},{"Month":"1","Year":"2006","arrest_count":"1"},{"Month":"2","Year":"2006","arrest_count":"1"},{"Month":"3","Year":"2006","arrest_count":"1"},{"Month":"7","Year":"2006","arrest_count":"1"},{"Month":"9","Year":"2006","arrest_count":"1"},{"Month":"10","Year":"2006","arrest_count":"1"},{"Month":"1","Year":"2007","arrest_count":"1"},{"Month":"2","Year":"2007","arrest_count":"1"},{"Month":"3","Year":"2007","arrest_count":"1"},{"Month":"6","Year":"2007","arrest_count":"1"},{"Month":"7","Year":"2007","arrest_count":"1"},{"Month":"12","Year":"2007","arrest_count":"2"},{"Month":"2","Year":"2008","arrest_count":"3"},{"Month":"3","Year":"2008","arrest_count":"2"},{"Month":"4","Year":"2008","arrest_count":"2"},{"Month":"6","Year":"2008","arrest_count":"1"},{"Month":"7","Year":"2008","arrest_count":"2"},{"Month":"8","Year":"2008","arrest_count":"1"},{"Month":"9","Year":"2008","arrest_count":"1"},{"Month":"10","Year":"2008","arrest_count":"1"},{"Month":"11","Year":"2008","arrest_count":"1"},{"Month":"1","Year":"2009","arrest_count":"1"},{"Month":"2","Year":"2009","arrest_count":"1"},{"Month":"8","Year":"2009","arrest_count":"1"},{"Month":"12","Year":"2009","arrest_count":"1"},{"Month":"5","Year":"2010","arrest_count":"1"},{"Month":"10","Year":"2010","arrest_count":"1"},{"Month":"3","Year":"2011","arrest_count":"1"},{"Month":"4","Year":"2011","arrest_count":"1"},{"Month":"5","Year":"2011","arrest_count":"1"},{"Month":"6","Year":"2011","arrest_count":"2"},{"Month":"10","Year":"2011","arrest_count":"1"},{"Month":"11","Year":"2011","arrest_count":"1"},{"Month":"12","Year":"2011","arrest_count":"1"},{"Month":"1","Year":"2012","arrest_count":"2"},{"Month":"2","Year":"2012","arrest_count":"4"},{"Month":"3","Year":"2012","arrest_count":"1"},{"Month":"4","Year":"2012","arrest_count":"1"},{"Month":"7","Year":"2012","arrest_count":"1"},{"Month":"10","Year":"2012","arrest_count":"1"},{"Month":"2","Year":"2013","arrest_count":"1"},{"Month":"4","Year":"2013","arrest_count":"2"},{"Month":"8","Year":"2013","arrest_count":"1"},{"Month":"11","Year":"2013","arrest_count":"2"},{"Month":"12","Year":"2013","arrest_count":"1"},{"Month":"1","Year":"2014","arrest_count":"1"},{"Month":"2","Year":"2014","arrest_count":"1"},{"Month":"3","Year":"2014","arrest_count":"1"},{"Month":"5","Year":"2014","arrest_count":"1"},{"Month":"7","Year":"2014","arrest_count":"2"},{"Month":"8","Year":"2014","arrest_count":"3"},{"Month":"1","Year":"2015","arrest_count":"1"},{"Month":"2","Year":"2015","arrest_count":"2"},{"Month":"12","Year":"2015","arrest_count":"1"},{"Month":"2","Year":"2016","arrest_count":"1"},{"Month":"3","Year":"2016","arrest_count":"2"},
// ASSAULT
    {"Month":"7","Year":"2000","arrest_count":"1"},{"Month":"9","Year":"2000","arrest_count":"1"},{"Month":"2","Year":"2001","arrest_count":"1"},{"Month":"3","Year":"2001","arrest_count":"1"},{"Month":"7","Year":"2001","arrest_count":"1"},{"Month":"12","Year":"2001","arrest_count":"1"},{"Month":"5","Year":"2002","arrest_count":"1"},{"Month":"7","Year":"2002","arrest_count":"1"},{"Month":"11","Year":"2002","arrest_count":"1"},{"Month":"3","Year":"2003","arrest_count":"1"},{"Month":"10","Year":"2003","arrest_count":"1"},{"Month":"6","Year":"2004","arrest_count":"3"},{"Month":"10","Year":"2004","arrest_count":"1"},{"Month":"11","Year":"2004","arrest_count":"1"},{"Month":"7","Year":"2005","arrest_count":"1"},{"Month":"2","Year":"2006","arrest_count":"2"},{"Month":"4","Year":"2006","arrest_count":"1"},{"Month":"10","Year":"2006","arrest_count":"1"},{"Month":"12","Year":"2006","arrest_count":"1"},{"Month":"1","Year":"2007","arrest_count":"1"},{"Month":"3","Year":"2007","arrest_count":"1"},{"Month":"5","Year":"2007","arrest_count":"2"},{"Month":"7","Year":"2007","arrest_count":"1"},{"Month":"12","Year":"2007","arrest_count":"1"},{"Month":"2","Year":"2008","arrest_count":"1"},{"Month":"3","Year":"2008","arrest_count":"1"},{"Month":"4","Year":"2008","arrest_count":"1"},{"Month":"5","Year":"2008","arrest_count":"1"},{"Month":"6","Year":"2008","arrest_count":"1"},{"Month":"10","Year":"2008","arrest_count":"1"},{"Month":"12","Year":"2008","arrest_count":"1"},{"Month":"5","Year":"2009","arrest_count":"1"},{"Month":"6","Year":"2009","arrest_count":"1"},{"Month":"8","Year":"2009","arrest_count":"2"},{"Month":"10","Year":"2009","arrest_count":"2"},{"Month":"11","Year":"2009","arrest_count":"1"},{"Month":"4","Year":"2010","arrest_count":"1"},{"Month":"6","Year":"2010","arrest_count":"2"},{"Month":"10","Year":"2010","arrest_count":"1"},{"Month":"1","Year":"2011","arrest_count":"1"},{"Month":"2","Year":"2011","arrest_count":"1"},{"Month":"6","Year":"2011","arrest_count":"1"},{"Month":"7","Year":"2011","arrest_count":"2"},{"Month":"11","Year":"2011","arrest_count":"1"},{"Month":"12","Year":"2011","arrest_count":"1"},{"Month":"2","Year":"2012","arrest_count":"1"},{"Month":"4","Year":"2012","arrest_count":"1"},{"Month":"3","Year":"2013","arrest_count":"1"},{"Month":"6","Year":"2013","arrest_count":"1"},{"Month":"12","Year":"2013","arrest_count":"1"},{"Month":"1","Year":"2014","arrest_count":"1"},{"Month":"4","Year":"2014","arrest_count":"1"},{"Month":"5","Year":"2014","arrest_count":"1"},{"Month":"7","Year":"2014","arrest_count":"1"},{"Month":"10","Year":"2014","arrest_count":"1"},{"Month":"2","Year":"2015","arrest_count":"1"},{"Month":"7","Year":"2015","arrest_count":"1"},{"Month":"1","Year":"2016","arrest_count":"1"},{"Month":"7","Year":"2016","arrest_count":"1"},{"Month":"9","Year":"2016","arrest_count":"1"},
// Disorderly conduct
    {"Month":"2","Year":"2000","arrest_count":"2"},{"Month":"3","Year":"2000","arrest_count":"1"},{"Month":"6","Year":"2001","arrest_count":"1"},{"Month":"7","Year":"2001","arrest_count":"1"},{"Month":"8","Year":"2001","arrest_count":"1"},{"Month":"9","Year":"2001","arrest_count":"1"},{"Month":"2","Year":"2003","arrest_count":"1"},{"Month":"4","Year":"2003","arrest_count":"1"},{"Month":"7","Year":"2003","arrest_count":"2"},{"Month":"6","Year":"2004","arrest_count":"2"},{"Month":"7","Year":"2005","arrest_count":"1"},{"Month":"9","Year":"2005","arrest_count":"2"},{"Month":"1","Year":"2006","arrest_count":"1"},{"Month":"2","Year":"2006","arrest_count":"1"},{"Month":"3","Year":"2006","arrest_count":"1"},{"Month":"5","Year":"2006","arrest_count":"2"},{"Month":"4","Year":"2007","arrest_count":"2"},{"Month":"6","Year":"2007","arrest_count":"2"},{"Month":"3","Year":"2008","arrest_count":"1"},{"Month":"6","Year":"2008","arrest_count":"1"},{"Month":"8","Year":"2008","arrest_count":"1"},{"Month":"2","Year":"2009","arrest_count":"2"},{"Month":"4","Year":"2009","arrest_count":"1"},{"Month":"5","Year":"2010","arrest_count":"1"},{"Month":"9","Year":"2010","arrest_count":"1"},{"Month":"12","Year":"2010","arrest_count":"1"},{"Month":"3","Year":"2011","arrest_count":"1"},{"Month":"3","Year":"2012","arrest_count":"1"},{"Month":"8","Year":"2012","arrest_count":"1"},{"Month":"4","Year":"2013","arrest_count":"1"},{"Month":"9","Year":"2013","arrest_count":"1"},{"Month":"4","Year":"2014","arrest_count":"2"},{"Month":"7","Year":"2014","arrest_count":"1"},
// Gun
    {"Month":"4","Year":"2000","arrest_count":"1"},{"Month":"10","Year":"2001","arrest_count":"1"},{"Month":"11","Year":"2001","arrest_count":"1"},{"Month":"1","Year":"2002","arrest_count":"1"},{"Month":"6","Year":"2002","arrest_count":"1"},{"Month":"4","Year":"2003","arrest_count":"1"},{"Month":"3","Year":"2005","arrest_count":"1"},{"Month":"5","Year":"2005","arrest_count":"1"},{"Month":"6","Year":"2005","arrest_count":"2"},{"Month":"1","Year":"2006","arrest_count":"1"},{"Month":"5","Year":"2006","arrest_count":"1"},{"Month":"6","Year":"2006","arrest_count":"1"},{"Month":"1","Year":"2007","arrest_count":"1"},{"Month":"3","Year":"2007","arrest_count":"2"},{"Month":"6","Year":"2008","arrest_count":"1"},{"Month":"12","Year":"2008","arrest_count":"1"},{"Month":"2","Year":"2010","arrest_count":"1"},{"Month":"4","Year":"2010","arrest_count":"1"},{"Month":"5","Year":"2010","arrest_count":"1"},{"Month":"7","Year":"2010","arrest_count":"1"},{"Month":"3","Year":"2011","arrest_count":"3"},{"Month":"1","Year":"2013","arrest_count":"1"},{"Month":"2","Year":"2013","arrest_count":"1"},{"Month":"6","Year":"2013","arrest_count":"1"},{"Month":"10","Year":"2013","arrest_count":"1"},{"Month":"3","Year":"2014","arrest_count":"1"},{"Month":"1","Year":"2015","arrest_count":"1"},{"Month":"7","Year":"2015","arrest_count":"1"},{"Month":"10","Year":"2016","arrest_count":"1"},
// Public intoxication
    {"Month":"5","Year":"2002","arrest_count":"1"},{"Month":"12","Year":"2003","arrest_count":"1"},{"Month":"6","Year":"2004","arrest_count":"1"},{"Month":"8","Year":"2006","arrest_count":"1"},{"Month":"9","Year":"2009","arrest_count":"1"},{"Month":"1","Year":"2010","arrest_count":"1"},{"Month":"1","Year":"2011","arrest_count":"1"},{"Month":"2","Year":"2011","arrest_count":"1"},{"Month":"3","Year":"2011","arrest_count":"1"},{"Month":"7","Year":"2011","arrest_count":"1"},{"Month":"3","Year":"2013","arrest_count":"1"},{"Month":"4","Year":"2013","arrest_count":"1"},{"Month":"5","Year":"2013","arrest_count":"1"},{"Month":"9","Year":"2013","arrest_count":"1"},{"Month":"1","Year":"2014","arrest_count":"1"},{"Month":"5","Year":"2014","arrest_count":"1"},{"Month":"3","Year":"2015","arrest_count":"2"},
// License
    {"Month":"6","Year":"2002","arrest_count":"1"},{"Month":"10","Year":"2002","arrest_count":"1"},{"Month":"5","Year":"2006","arrest_count":"1"},{"Month":"3","Year":"2007","arrest_count":"1"},{"Month":"2","Year":"2008","arrest_count":"1"},{"Month":"12","Year":"2008","arrest_count":"1"},{"Month":"1","Year":"2010","arrest_count":"2"},{"Month":"4","Year":"2010","arrest_count":"1"},{"Month":"5","Year":"2010","arrest_count":"2"},{"Month":"6","Year":"2010","arrest_count":"1"},{"Month":"7","Year":"2010","arrest_count":"1"},{"Month":"8","Year":"2010","arrest_count":"1"},{"Month":"4","Year":"2011","arrest_count":"1"},{"Month":"9","Year":"2013","arrest_count":"1"},{"Month":"6","Year":"2014","arrest_count":"1"},{"Month":"3","Year":"2016","arrest_count":"1"},
// Battery
    {"Month":"6","Year":"2000","arrest_count":"1"},{"Month":"6","Year":"2002","arrest_count":"1"},{"Month":"7","Year":"2002","arrest_count":"1"},{"Month":"8","Year":"2005","arrest_count":"1"},{"Month":"3","Year":"2006","arrest_count":"1"},{"Month":"3","Year":"2007","arrest_count":"1"},{"Month":"6","Year":"2007","arrest_count":"1"},{"Month":"12","Year":"2007","arrest_count":"1"},{"Month":"2","Year":"2008","arrest_count":"1"},{"Month":"4","Year":"2008","arrest_count":"1"},{"Month":"7","Year":"2008","arrest_count":"1"},{"Month":"4","Year":"2009","arrest_count":"1"},{"Month":"5","Year":"2010","arrest_count":"1"},{"Month":"3","Year":"2012","arrest_count":"1"},{"Month":"11","Year":"2012","arrest_count":"1"},{"Month":"3","Year":"2014","arrest_count":"1"},{"Month":"7","Year":"2014","arrest_count":"1"},
// Reckless driving
    {"Month":"2","Year":"2002","arrest_count":"1"},{"Month":"7","Year":"2002","arrest_count":"1"},{"Month":"11","Year":"2004","arrest_count":"1"},{"Month":"5","Year":"2005","arrest_count":"1"},{"Month":"5","Year":"2006","arrest_count":"1"},{"Month":"8","Year":"2007","arrest_count":"1"},{"Month":"9","Year":"2007","arrest_count":"1"},{"Month":"5","Year":"2008","arrest_count":"2"},{"Month":"1","Year":"2009","arrest_count":"1"},{"Month":"3","Year":"2009","arrest_count":"1"},{"Month":"8","Year":"2010","arrest_count":"1"},{"Month":"4","Year":"2013","arrest_count":"1"},{"Month":"5","Year":"2014","arrest_count":"1"},{"Month":"3","Year":"2016","arrest_count":"2"},{"Month":"4","Year":"2016","arrest_count":"1"}
];

// // CODE TO COMBINE THE TOP 10 CRIMES BY MONTH, YEAR
// var result = [];
// time.forEach(function(element){
//     //var Date = element.
//     result.push({ Date: new Date(element.Year + ' ' + element.Month),
//         Month: element.Month,
//         Year: element.Year,
//         arrest_count: parseInt(element.arrest_count) } );
// });
// //console.log(result);
//
// var holder = {};
// result.forEach(function(element) {
//     var identifier = element.Month + element.Year;
//     if (holder[identifier]) {
//         holder[identifier].arrest_count += element.arrest_count;
//     } else {
//         holder[identifier] = element;
//     };
// });
// jsonArrests = [];
// for(var identifier in holder) {
//     jsonArrests.push(holder[identifier]);
// }
// jsonArrests.sort(function(a, b){
//     var dateA=new Date(a.Date), dateB=new Date(b.Date)
//     return dateA-dateB //sort by date ascending
// })
// //jsonArrests = jsonArrests.sort(sortByDateAscending);
// console.log(jsonArrests);





// CALL THE ARREST BY OFFENSE FUNCTION
arrestByOffense(arrestCount);

// CALL THE ARREST BY TEAM FUNCTION
arrestsByTeam(teamArrestData);

//  CALL THE VIKING'S ARREST DATA
arrestsVikings(vikings);