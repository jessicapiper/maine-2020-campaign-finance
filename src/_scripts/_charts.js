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

var margin = {top: 20, right:20, bottom:80, left:80};

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
var yDomain = pac_data.map(d => d.type);
var xDomain = [0,1];

var yScale = d3.scaleBand()
              .domain(yDomain)
              .range([0, chartHeight])
              .padding(0.1);

var xScale = d3.scaleLinear()
              .domain(xDomain)
              .range([0, chartWidth]);

var formatAxis = d3.format(".0%");

var xAxis = d3.axisBottom(xScale)
          .tickFormat(formatAxis)
          .tickSize(-chartWidth)
          .ticks(4);

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
    .call(yAxis);

var tooltip = svg.append('text')
    .attr('class', 'chart-tooltip');

/*pac_keys = ["ideological","labor","leadership","business","other"]
series = d3.stack()
  .keys(pac_keys)*/

svg.selectAll('.bar')
    .data(pac_data)
    .enter().append("rect")
    .attr("x", 0)
    .attr("y", d => yScale(d.type))
    .attr("width",d => xScale(d.ideological))
    .attr("height",yScale.bandwidth())
    .on('mouseenter', function(d) {
      // centers the text above each bar
      var y = yScale(d.type) + yScale.bandwidth() / 2;
      // the - 5 bumps up the text a bit  so it's not directly over the bar
      var x = xScale(d.ideological) + 45;
      d3.select(this).classed('highlight', true);
      tooltip.text("ideological: " + d3.format(".0%")(d.ideological))
            .attr('transform', `translate(${x}, ${y})`)
    })
    .on('mouseleave', function(d) {
      d3.select(this).classed('highlight', false);
      tooltip.text('');
    });

}
/*
z.domain(keys)

svg.append("g")
  .selectAll("g")
  .data(d3.stack().keys(keys)(pac_data))
  .enter().append("g")
    .attr("fill",function(d){return z(d.key);})
  .select("rect")
  .data(function(d){return d;})
  .enter().append("rect")
    .attr("y",function(d) {return y(d.type)})
    .attr("x",function(d) {return x(d[0]);})
    .attr("width", function(d){ return x(d[1] - x(d[0]);)})
    .attr("height",y.bandwith())
/*
var tooltip = svg.append('text')
    .attr('class', 'chart-tooltip');

svg.selectAll('.bar')
    .data(collins_pacs)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.type))
    .attr('y', d => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', d => chartHeight - yScale(d.value))
    .on('mouseenter', function(d) {
      // centers the text above each bar
      var x = xScale(d.candidate) + xScale.bandwidth() / 2;
      // the - 5 bumps up the text a bit so it's not directly over the bar
      var y = yScale(d.value) - 5;
      d3.select(this).classed('highlight', true);
      tooltip.text(d3.format(".0%")(d.value))
            .attr('transform', `translate(${x}, ${y})`)
    })
    .on('mouseleave', function(d) {
      d3.select(this).classed('highlight', false);
      tooltip.text('');
    });
*/

//var raw_data = d3.JSON.parse(await FileAttachment(filename).text(), d3.autoType)
//var raw_data = [{type:"ideological",number:0.7501615252},{type:"leadership",number:0.02431561469},{type:"business", number:0.1746258125},{type:"other",number:0.00545860738},{type:"labor",number:0.04543844031}];
//var data = d3.pie().sort(null).value(function(d){return d.number;})(raw_data);
/*
var radius = 50 //Math.min(chartWidth,chartHeight)/3.1

var pie = d3.pie().value(function(d) {
    return d.value;
});

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - 80);*/

/*d3.json("gideon_pacs.json",function(error, data){
  if(error){
    throw error;
  }*/

/*var segments = d3.arc()
    .innerRadius(2)
    .outerRadius(90)
    .padAngle(.05)
    .padRadius(50)

var sections = svg.append("g").attr("transform","translate(20,20)")
    .selectAll("path").data(data);

sections.enter().append("path").attr("d",segments).attr("fill",function(d){return colors(d.data.number);})

svg.selectAll('allSlices')
  .on('mouseleave', function(d) {
    d3.select(this).classed('highlight', false);
    tooltip.text('');
  });*/

  /*var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter(.append("g"))
    .attr("class","arc")

  arc.append("path")
    .attr("d", path)
    .attr("fill","#66ff33")*/

//})


pacChart("#all-pacs")
//pacChart("#gideon-pacs","gideon_pacs.json")

console.log('hello, this is my charts file!');
