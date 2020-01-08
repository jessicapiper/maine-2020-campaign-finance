var d3 = require("d3");

function totalsChart(el, fieldname) {

var margin = {top: 20, right:20, bottom:20, left:60};

var container = d3.select(el);

var containerWidth = container.node().offsetWidth;
var containerHeight = containerWidth * 0.66;

var chartWidth = containerWidth - margin.right - margin.left;
var chartHeight = containerHeight - margin.top - margin.bottom;

var svg = container.append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
var xDomain = senate_data_3.map(d => d.candidate);
var yDomain = [0,d3.max(senate_data_3.map(d => d[fieldname]))+1000000];

var xScale = d3.scaleBand()
              .domain(xDomain)
              .range([0, chartWidth])
              .padding(0.1);

var yScale = d3.scaleLinear()
              .domain(yDomain)
              .range([chartHeight, 0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale)
              .tickSize(-chartWidth)
              .ticks(4);
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

var tooltip = svg.append('text')
    .attr('class', 'chart-tooltip');

svg.selectAll('.bar')
    .data(senate_data_3)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.candidate))
    .attr('y', d => yScale(d[fieldname]))
    .attr('width', xScale.bandwidth())
    .attr('height', d => chartHeight - yScale(d[fieldname]))
    .on('mouseenter', function(d) {
      // centers the text above each bar
      var x = xScale(d.candidate) + xScale.bandwidth() / 2;
      // the - 5 bumps up the text a bit so it's not directly over the bar
      var y = yScale(d[fieldname]) - 5;
      d3.select(this).classed('highlight', true);
      tooltip.text(d[fieldname])
            .attr('transform', `translate(${x}, ${y})`)
    })
    .on('mouseleave', function(d) {
      d3.select(this).classed('highlight', false);
      tooltip.text('');
    });
}

totalsChart("#total-raised", "total_net_contributions")
totalsChart("#total-spent", "total_spending")
totalsChart("#cash-on-hand", "cash_on_hand")
//createChart("#percent-small-donors", "percent_from_small_donors")
//createChart("#percent-large-donors", "percent_from_large_donors")
//createChart("#percent-pacs", "percent_from_PACs")

console.log('hello, this is my charts file!');
