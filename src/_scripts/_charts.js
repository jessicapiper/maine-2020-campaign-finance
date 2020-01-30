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

var colors = d3.scaleLinear()
  .domain(["R","D","G"])
  .range("red","blue","green");

console.log(colors)

svg.selectAll('.bar')
    .data(senate_data_4)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.candidate))
    .attr('y', d => yScale(d[fieldname]))
    .attr('width', xScale.bandwidth())
    .attr('height', d => chartHeight - yScale(d[fieldname]))
    .attr('fill',function(d){
      return "green";
    })
    /*.attr("fill", function(d){
      //return colors(d.party);
      //console.log(d3.select(this))
      //d3.select(this.parentNode)
      //var parentData = d3.select(this.parentNode).pacData()[0];
      //console.log(parentData)
      if(d.party = "D"){
        return "#003F92"
      }else if (d.party = "R") {
        return "#B90C0C"
      }else {
        return "green";
      }
    })*/
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
    .attr('fill',function(d){
      return "green";
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
var yDomain = pac_data.map(d => d.type);
var xDomain = [0,1];

var yScale = d3.scaleBand()
              .domain(yDomain)
              .range([0, chartHeight - 20])
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
    .attr("transform", `translate(0,30)`)
    .call(yAxis);

var tooltip = svg.append('text')
    .attr('class', 'chart-tooltip')
    .style("position","absolute")
    .style("visibility","hidden")
    .style("background", "#000");

var keys = ["ideological","labor","leadership","business","other"]

var series = d3.stack().keys(keys)(pac_data)

console.log(series);

var color = d3.scaleOrdinal()
  .domain(keys)
  //.range(d3.schemeDark2)
  .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), series.length).reverse())
  .unknown("#ccc")

//console.log(color);

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
      //var x = d3.mouse(this)[0];
      //var y = yScale(d.type) - 5;
      //var yPosition = d3.mouse(this)[1] + 50;
      d3.select(this).classed('highlight', true);
      tooltip.text("test: " + d.data.key)
        //.attr("position","absolute")
        //.attr("background","pink")
        .attr('transform', `translate(${d3.mouse(this)[0]}, ${yScale(d.data.type)-20})`)
        .style("top")
      //tooltip.text(d.key + " : " + d3.format(".0%")(xScale(d[1]-d[0])))// ": " + d3.format(".0%")(d[1]-d[0]))
      /*tooltip.text(d3.format(".0%")xScale(d[1]-d[0]))
            .attr('transform', `translate(${xPosition}, ${yPosition})`)*/
    })
    .on('mouseleave', function(d) {
      d3.select(this).classed('highlight', false);
      tooltip.text('');
    });
/*
{
  // centers the text above each bar
  var x = xScale(d.candidate) + xScale.bandwidth() / 2;
  // the - 5 bumps up the text a bit so it's not directly over the bar
  var y = yScale(d[fieldname]) - 5;
  d3.select(this).classed('highlight', true);
  tooltip.text(d3.format("$,.0f")(d[fieldname]))
        .attr('transform',`translate(${x + 8}, ${y - 4}) rotate (-10)`)
})
*/

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

/*var pac_keys = ["ideological","labor","leadership","business","other"]
series = d3.stack()
  .keys(pac_keys)

  var x = xScale(d.candidate) + xScale.bandwidth() / 2;
  // the - 5 bumps up the text a bit so it's not directly over the bar
  var y = yScale(d[fieldname]) - 5;
var colors = d3.scaleOrdinal(d3.schemeDark2);
  .domain(series.map(d => d.key))
  .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), series.length).reverse())
  .unknown("#ccc")*/

/*svg.selectAll('.bar')
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d){ return color(d.key);})
      .attr("class", function(d){ return "myRect " + d.key }) // Add a class to each subgroup: their name
      .selectAll("rect")
      .data(function(d) {return d;})
      .enter().append("rect")
      .attr("y",function(d){return y(d.data.type)})
      .attr("x", function(d) {return x(d[1]);})
      .attr("height",yScale.bandwith())
      .attr("width", function(d) {return x(d[0] - x(d[1]));})*/

    /*.attr("x", 0)
    .attr("y", d => yScale(d.type))
    .attr("width",d => xScale(d.ideological))
    .attr("height",yScale.bandwidth())*/

//working unstacked bars
/*svg.selectAll('.bar')
    .data(pac_data)
    .enter().append("rect")
    .attr("x", 0)
    .attr("y", d => yScale(d.type))
    .attr("width",d => xScale(d.ideological))
    .attr("height",yScale.bandwidth())
    /*.on('mouseenter', function(d) {
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
    });*/

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
