var d3 = require("d3");

function totalsChart(el, fieldname) {

var margin = {top: 10, right:20, bottom:90, left:60};

var container = d3.select(el);

var containerWidth = container.node().offsetWidth;
var containerHeight = containerWidth;

var chartWidth = containerWidth - margin.right - margin.left;
var chartHeight = containerHeight - margin.top - margin.bottom;

var svg = container.append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
var xDomain = senate_topline.map(d => d.candidate);
var yDomain = [0,d3.max(senate_topline.map(d => d.total_net_contributions))+1000000];

var xScale = d3.scaleBand()
              .domain(xDomain)
              .range([0, chartWidth])
              .padding(0.1);

var yScale = d3.scaleLinear()
              .domain(yDomain)
              .range([chartHeight, 0]);

var formatAxis = d3.format("$.1s");

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale)
              .tickFormat(formatAxis)
              .tickSize(-chartWidth)
              .ticks(4);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(xAxis)
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

var tooltip = svg.append('text')
    .attr('class', 'chart-tooltip');

var colors = d3.scaleLinear()
  .domain(["R","D","G"])
  .range("red","blue","green");

console.log(colors)

svg.selectAll('.bar')
    .data(senate_topline)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.candidate))
    .attr('y', d => yScale(d[fieldname]))
    .attr('width', xScale.bandwidth())
    .attr('height', d => chartHeight - yScale(d[fieldname]))
    .attr("fill",function(d, i){
      if(d.party == "D"){
        return "#3366ff"
      }else if (d.party == "R") {
        return "#e60000"
      }else {
        return "green";
      }
    })
    .on('mouseenter', function(d) {
      // centers the text above each bar
      var x = xScale(d.candidate) + xScale.bandwidth() / 2;
      // the - 5 bumps up the text a bit so it's not directly over the bar
      var y = yScale(d[fieldname]) - 5;
      d3.select(this).classed('highlight', true);
      tooltip.text(d3.format("$,.0f")(d[fieldname]))
            .attr('transform',`translate(${x + 16}, ${y - 4}) rotate (-5)`)
    })
    .on('mouseleave', function(d) {
      d3.select(this).classed('highlight', false);
      tooltip.text('');
    });

}

totalsChart("#total-raised", "total_net_contributions")
totalsChart("#total-spent", "total_spending")
totalsChart("#cash-on-hand", "cash_on_hand")

//Shows percentages for different types of fundraising

function percentChart(el, fieldname) {

var margin = {top: 20, right:20, bottom:90, left:60};

var container = d3.select(el);

var containerWidth = container.node().offsetWidth;
var containerHeight = containerWidth;

var chartWidth = containerWidth - margin.right - margin.left;
var chartHeight = containerHeight - margin.top - margin.bottom;

var svg = container.append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
var xDomain = senate_topline.map(d => d.candidate);
var yDomain = [0,1];

var xScale = d3.scaleBand()
              .domain(xDomain)
              .range([0, chartWidth])
              .padding(0.1);

var yScale = d3.scaleLinear()
              .domain(yDomain)
              .range([chartHeight, 0]);

var formatAxis = d3.format(".0%");

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale)
              .tickFormat(formatAxis)
              .tickSize(-chartWidth)
              .ticks(4);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(xAxis)
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

var tooltip = svg.append('text')
    .attr('class', 'chart-tooltip');

svg.selectAll('.bar')
    .data(senate_topline)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.candidate))
    .attr('y', d => yScale(d[fieldname]))
    .attr('width', xScale.bandwidth())
    .attr('height', d => chartHeight - yScale(d[fieldname]))
    .attr("fill",function(d, i){
      if(d.party == "D"){
        return "#3366ff"
      }else if (d.party == "R") {
        return "#e60000"
      }else {
        return "green";
      }
    })
    .on('mouseenter', function(d) {
      // centers the text above each bar
      var x = xScale(d.candidate) + xScale.bandwidth() / 2;
      // the - 5 bumps up the text a bit so it's not directly over the bar
      var y = yScale(d[fieldname]) - 5;
      d3.select(this).classed('highlight', true);
      tooltip.text(d3.format(".0%")(d[fieldname]))
            .attr('transform', `translate(${x}, ${y})`)
    })
    .on('mouseleave', function(d) {
      d3.select(this).classed('highlight', false);
      tooltip.text('');
    });

}

percentChart("#percent-small-donors", "percent_from_small_donors")
percentChart("#percent-large-donors", "percent_from_large_donors")
percentChart("#percent-pacs", "percent_from_PACs")

function pacChart(el) {

var margin = {top: 20, right:20, bottom:70, left:80};

var container = d3.select(el);

var containerWidth = container.node().offsetWidth;
var containerHeight = containerWidth*0.4;

var chartWidth = containerWidth - margin.right - margin.left;
var chartHeight = containerHeight - margin.top - margin.bottom;

var svg = container.append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
var yDomain = senate_pacs.map(d => d.type);
var xDomain = [0,2500000];

var yScale = d3.scaleBand()
              .domain(yDomain)
              .range([0, chartHeight - 20])
              .padding(0.1);

var xScale = d3.scaleLinear()
              .domain(xDomain)
              .range([0, chartWidth]);

var formatAxis = d3.format("$.1s");

var xAxis = d3.axisBottom(xScale)
          .tickFormat(formatAxis)
          .tickSize(-chartWidth)
          .ticks(2);

var yAxis = d3.axisLeft(yScale);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(xAxis)
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(0,30)`)
    .call(yAxis);

var tooltip = svg.append('text')
    .attr('class', 'chart-tooltip')
    .style('background-color',"#ffffff")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")
    //.style("position","absolute")
    //.style("visibility","hidden")
    //.style("background", "#000");

/*(tooltip.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.2);*/

var keys = ["ideological","leadership","labor","business","other"]

var series = d3.stack().keys(keys)(senate_pacs)

console.log(series);

var color = d3.scaleOrdinal()
  .domain(keys)
  //.range(d3.schemeDark2)
  .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), series.length).reverse())
  .unknown("#ccc")

svg.append("g")
  .selectAll("g")
  .data(series)
  .enter().append("g")
    .attr("fill", d => color(d.key))
  .selectAll("rect")
  .data(d => d)
  .join("rect")
    .attr("x", d => xScale(d[0]))//d => x(d[0]))
    .attr("y", d => yScale(d.data.type)+40)
    .attr("width", d => xScale(d[1]-d[0]))
    .attr("height",yScale.bandwidth()-20)
  .on('mouseenter', function(d) {
      var coordinates= d3.mouse(this);
      var xPosition = coordinates[0]//coordinates[0];
      var yPosition = coordinates[1]+10//coordinates[1] + 25;
      d3.select(this).classed('highlight', true);
      tooltip.html((d.key) + ": " + d3.format("$.1s")(xScale(d[1]-d[0])))//(d3.format("$,.0f")(xScale(d[1]-d[0]))
            .style("opacity", 1)
            .attr('transform',`translate(${xPosition}, ${yPosition}) `) //rotate (-10)`)
        //.attr("x",function(d) {return xPosition;})
        //.attr("y",function(d) {return yPosition;})
        //myTool.html("testing")
      //tooltip.select("text").text("testing")
      //  .attr('transform', `translate(${xPosition}, ${yPosition})`)
      //tooltip.text(d.key + " : " + d3.format(".0%")(xScale(d[1]-d[0])))// ": " + d3.format(".0%")(d[1]-d[0]))
      /*tooltip.text(d3.format(".0%")xScale(d[1]-d[0]))
            .attr('transform', `translate(${xPosition}, ${yPosition})`)*/
    })
    .on('mouseleave', function(d) {
      d3.select(this).classed('highlight', false);
      tooltip.text('');
    });

var legend = svg.append("g")
  .attr("width",series.length * 36)
  .attr("height",40)
  .attr("font-family", "helvetica")
  .attr("font-size", 12)
  //.style("margin-left", `${margin.left}px`)
  .attr("text-anchor", "left")
  .style("display", "block")
  .selectAll("g")
  .data(series)//(keys)
  .join("g")
    .attr("transform", (d, i) => `translate(${i * 100},0)`);

legend.append("rect")
      .attr("x", 0)
      .attr("y",0)
      .attr("width", 36)
      .attr("height", 25)
      .attr("fill", d => color(d.key));

legend.append("text")
  .attr("x", 0)
  .attr("y",32)
  .attr("dy", "0.35em")
  .text(d => d.key);

}

pacChart("#all-pacs")
//pacChart("#gideon-pacs","gideon_pacs.json")

console.log('hello, this is my charts file!');
