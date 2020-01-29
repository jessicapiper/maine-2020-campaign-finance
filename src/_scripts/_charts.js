var d3 = require("d3");

function totalsChart(el, fieldname) {

var margin = {top: 10, right:20, bottom:80, left:60};

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
var xDomain = senate_data_4.map(d => d.candidate);
var yDomain = [0,14000000];

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

svg.selectAll('.bar')
    .data(senate_data_4)
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
      tooltip.text(d3.format("$,.0f")(d[fieldname]))
            .attr('transform',`translate(${x + 8}, ${y - 4}) rotate (-10)`)
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

var margin = {top: 20, right:20, bottom:80, left:60};

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
var xDomain = senate_data_4.map(d => d.candidate);
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
    .data(senate_data_4)
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

var margin = {top: 70, right:0, bottom:0, left:80};

var colors = d3.scaleOrdinal(d3.schemeDark2);
var container = d3.select(el);

var containerWidth = container.node().offsetWidth;
var containerHeight = containerWidth;

var chartWidth = containerWidth - margin.right - margin.left;
var chartHeight = containerHeight - margin.top - margin.bottom;

var svg = container.append("svg")
  .attr("width",chartWidth)
  .attr("height",chartHeight)
  .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

var raw_data = [{type:"ideological",number:0.7501615252},{type:"leadership",number:0.02431561469},{type:"business", number:0.1746258125},{type:"other",number:0.00545860738},{type:"labor",number:0.04543844031}];

var data = d3.pie().sort(null).value(function(d){return d.number;})(raw_data);

var segments = d3.arc()
  .innerRadius(0)
  .outerRadius(80)
  .padAngle(.05)
  .padRadius(50)

var sections = svg.append("g").attr("transform","translate(20,20)")
  .selectAll("path").data(data);

sections.enter().append("path").attr("d",segments).attr("fill",function(d){return colors(d.data.number);})

var content = d3.select("g").selectAll("text").data(data);
content.enter().append("text").each(function(d){
  var center = segments.centroid(d);
  d3.select(this).attr("x", center[0]).attr("y",center[1])
                  .text(d.data.number)
  })
}

pacChart("#collins-pacs",)

/*    .domain(xDomain)
    .range([0, chartWidth])
    .padding(0.1);
var yScale = d3.scaleLinear()
    .domain(yDomain)
    .range([chartHeight, 0]);
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale)
var headers = ["ideological","labor","leadership","business","other"]
var layers = d3.layout.stack()(headers.map(function(pac_data)))
*/
/*var xDomain = [0,1]
var yDomain = pac_data.map(d => d.type);
var pacData = pac_data
svg.append("g")
    .attr("class", "x axis")
    .call(xAxis);
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
*/


//pacChart("#all-candidates-pacs")

console.log('hello, this is my charts file!');
