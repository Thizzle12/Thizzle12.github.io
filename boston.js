var dataset, xScale, yScale;
var dataLadies;
var w = 1000;
var h = 600;
var xPadding = 120;
var yPadding = 60;
var paddingDiff = 40;
var svg, xAxis, yAxis;
var rScale, line, straightLineMen, straightLineWomen;
var x0M,y0M,x1M,y1M,dataLineMen;
var x0Q,y0Q,x1Q,y1Q,dataLineWomen;
var dates = ["1897","1907","1917","1927","1937","1947","1957","1967","1977","1987","1997","2007","2017"]

d3.csv("BostonMen.csv", function(data){
  dataset = data;

  loadWomen();
});

function loadWomen(){
  d3.csv("BostonLadies.csv", function(data){
    dataLadies = data;

    xScale = d3.scaleLinear()
                .domain([dataset[0].year, d3.max(dataset, function(d){
                  return parseFloat(d.year);
                })])
                .range([0,w-xPadding])

    yScale = d3.scaleLinear()
                .domain([120, d3.max(dataLadies, function(d){
                  return parseFloat(d.minutes);
                })])
                .range([h-yPadding, 0]);

    rScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d){
                  return d.minutes;
                })])
                .range([2,5])

    xAxis = d3.axisBottom()
              .scale(xScale)
              .ticks(13)
              .tickValues(dates)
              .tickFormat(function(d,i){
                return dates[i]
              });

    yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(20);

    line = d3.line()
              .x(function(d) {return xScale(d.year)+(paddingDiff+30)})
              .y(function(d) {return yScale(d.minutes)+(paddingDiff-20)})

    straightLineMen = d3.line()
              .x(function(d) {return xScale(d.year)+(paddingDiff+30)})
              .y(function(d) {return yScale(d.year)*(-0.29) + 159+(paddingDiff-20)})

    x0M = dataset[0].year;
    y0M = 159
    x1M = dataset[dataset.length-1].year;
    y1M = (dataset.length-1)*(-0.29) + 159 //The slope of -0.29 and the crossing with the y-axis is Calculated in google sheet
    dataLineMen = [[x0M,y0M,x1M,y1M]]

    x0Q = dataLadies[0].year;
    y0Q = 179
    x1Q = dataLadies[dataLadies.length-1].year;
    y1Q = (dataLadies.length-1)*(-0.925) + 179 //The slope of -0.29 and the crossing with the y-axis is Calculated in google sheet
    dataLineWomen = [[x0Q,y0Q,x1Q,y1Q]]

    makeVis();
  })

}

function makeVis(){


  svg = d3.select("#boston-svg")
            .attr("width", w)
            .attr("height", h);

  svg.append("clipPath")
      .attr("id","boston")
      .append("rect")
      .attr("x", paddingDiff+30)
      .attr("y", paddingDiff-20)
      .attr("width", w - xPadding)
      .attr("height", h)
      .attr("fill", "teal")

  svg.append("g")
      .attr("id", "crosses")
      .attr("clip-path", "url(#boston)")
      .selectAll(".point")
      .data(dataset)
      .enter()
      .append("path")
      .attr("d", d3.symbol().type(function(d){
        return d3.symbolCross;
      }))
      .attr("transform", function(d){
        return "translate(" + (xScale(d.year) + paddingDiff+30) + ", " + (yScale(d.minutes) + paddingDiff-20) +")"
      })
      .attr("fill", "rgb(0,0,255)")
      .append("title")
      .text(function(d){
        return "Year: " + d.year + ", Minutes: " + d.minutes;
      });

  svg.append("path")
      .datum(dataset)
      .attr("id","menline")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line)


  svg.append("path")
      .datum(dataLadies)
      .attr("id","womenLine")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line)

svg.selectAll(".trendline")
  .data(dataLineMen)
  .enter()
  .append("line")
  .attr("class", "trendline")
  .attr("x1", function(d) { return xScale(d[0]) + xPadding/2+10; })
  .attr("y1", function(d) { return yScale(d[1]) + paddingDiff; })
  .attr("x2", function(d) { return xScale(d[2]) + xPadding/2+10; })
  .attr("y2", function(d) { return yScale(d[3]) + paddingDiff; })
  .attr("stroke", "black")
  .attr("stroke-width", 1);


svg.selectAll(".trendline2")
  .data(dataLineWomen)
  .enter()
  .append("line")
  .attr("class", "trendline2")
  .attr("x1", function(d) { return xScale(d[0]) + xPadding/2+10; })
  .attr("y1", function(d) { return yScale(d[1]) + paddingDiff; })
  .attr("x2", function(d) { return xScale(d[2]) + xPadding/2+10; })
  .attr("y2", function(d) { return yScale(d[3]) + paddingDiff; })
  .attr("stroke", "black")
  .attr("stroke-width", 1);

svg.append("g")
    .attr("id", "circles")
    .attr("clip-path", "url(#boston)")
    .selectAll("circle")
    .data(dataLadies)
    .enter()
    .append("circle")
    .attr("cx", function(d){
      return xScale(d.year) + paddingDiff+30;
    })
    .attr("cy", function(d){
      return yScale(d.minutes) + paddingDiff-20;
    })
    .attr("r", function(d){
      return rScale(d.minutes);
    })
    .attr("fill", "rgb(255,0,0)")
    .append("title")
    .text(function(d){
      return "Year: " + d.year + ", Minutes: " + d.minutes;
    });


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate( " + (paddingDiff+30) + ", " + (h-40) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (paddingDiff+30) + " ," + (paddingDiff-20) + ")")
      .call(yAxis);

  svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 25)
      .attr("x", -h/2)
      .attr("dy", "5px")
      .attr("font-size", "15px")
      .attr("transform", "rotate(-90)")
      .text("Minutes");

  svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("y", h-15)
      .attr("x", w/2)
      .attr("dy", "5px")
      .attr("font-size", "15px")
      .text("Year");

  svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("y", 20)
      .attr("x", w/3)
      .attr("dy", "5px")
      .attr("font-size", "30px")
      .attr("font-family", "sans-serif")
      .text("Boston Marathon");


  }



  d3.select("#men")
    .on("click", function(){
        selectMen();

  });

  d3.select("#women")
    .on("click", function(){
        selectWomen();

  });

  d3.select("#all")
    .on("click", function(){
      selectAll()

  });

    function selectMen(){
      svg.selectAll("#crosses")
          .data(dataset)
          .transition()
          .duration(700)
          .attr("d", d3.symbol().type(function(d){
            return d3.symbolCross;
          }))
          .attr("transform", function(d){
            return "translate(" + (xScale(d.year)) + ", " + (yScale(d.minutes) - 5.25*paddingDiff) +")"
          })
          .attr("fill", "rgb(0,0,255)");

      svg.selectAll("circle")
          .transition()
          .duration(700)
          .attr("cx", function(d){
            return null;
          })
          .attr("cy", function(d){
            return null;
          })
          .attr("r", function(d){
            return null;
          })
          .attr("fill", "rgb(255,0,0)");

      svg.selectAll(".trendline2")
          .transition()
          .duration(0)
          .attr("x1", function(d) { return 0; })
          .attr("y1", function(d) { return 0; })
          .attr("x2", function(d) { return 0; })
          .attr("y2", function(d) { return 0; })
          .attr("fill", "rgb(255,0,0)")

      svg.selectAll("#womenLine")
          .transition()
          .duration(0)
          .attr("stroke-width", 0.0)

      svg.selectAll(".trendline")
          .transition()
          .duration(0)
          .attr("x1", function(d) { return xScale(d[0]) + xPadding/2+10; })
          .attr("y1", function(d) { return yScale(d[1]) + paddingDiff; })
          .attr("x2", function(d) { return xScale(d[2]) + xPadding/2+10; })
          .attr("y2", function(d) { return yScale(d[3]) + paddingDiff; })
          .attr("fill", "rgb(255,0,0)")

      svg.selectAll("#menline")
          .transition()
          .duration(700)
          .attr("stroke-width", 1.5)
    }

    function selectWomen(){
      svg.selectAll("circle")
          .data(dataLadies)
          .transition()
          .duration(700)
          .attr("cx", function(d){
            return xScale(d.year) + paddingDiff+30;
          })
          .attr("cy", function(d){
            return yScale(d.minutes) + paddingDiff-20;
          })
          .attr("r", function(d){
            return rScale(d.minutes);
          })
          .attr("fill", "rgb(255,0,0)");


      svg.selectAll("#crosses")
          .transition()
          .duration(0)
          .attr("fill","white")
          .attr("d", d3.symbol().type(function(d){
            return d3.symbolDiamond;
          }))
          .attr("transform", function(d){
            return "translate(" + (xScale(0)) + ", " + (yScale(0)) +")"
          })

      svg.selectAll(".trendline")
          .transition()
          .duration(0)
          .attr("x1", function(d) { return 0; })
          .attr("y1", function(d) { return 0; })
          .attr("x2", function(d) { return 0; })
          .attr("y2", function(d) { return 0; })
          .attr("fill", "rgb(255,0,0)")

      svg.selectAll("#menline")
          .transition()
          .duration(0)
          .attr("stroke-width", 0.0)

      svg.selectAll(".trendline2")
          .transition()
          .duration(0)
          .attr("x1", function(d) { return xScale(d[0]) + xPadding/2+10; })
          .attr("y1", function(d) { return yScale(d[1]) + paddingDiff; })
          .attr("x2", function(d) { return xScale(d[2]) + xPadding/2+10; })
          .attr("y2", function(d) { return yScale(d[3]) + paddingDiff; })
          .attr("fill", "rgb(255,0,0)")

      svg.selectAll("#womenLine")
          .transition()
          .duration(700)
          .attr("stroke-width", 1.5)


    }


    function selectAll(){
      svg.selectAll("#crosses")
          .data(dataset)
          .transition()
          .duration(700)
          .attr("d", d3.symbol().type(function(d){
            return d3.symbolCross;
          }))
          .attr("transform", function(d){
            return "translate(" + (xScale(d.year)) + ", " + (yScale(d.minutes) - 5.25*paddingDiff) +")"
          })
          .attr("fill", "rgb(0,0,255)");

          svg.selectAll(".trendline")
              .transition()
              .duration(0)
              .attr("x1", function(d) { return xScale(d[0]) + xPadding/2+10; })
              .attr("y1", function(d) { return yScale(d[1]) + paddingDiff; })
              .attr("x2", function(d) { return xScale(d[2]) + xPadding/2+10; })
              .attr("y2", function(d) { return yScale(d[3]) + paddingDiff; })
              .attr("fill", "rgb(255,0,0)")

          svg.selectAll("#menline")
              .transition()
              .duration(700)
              .attr("stroke-width", 1.5)


          svg.selectAll("circle")
              .data(dataLadies)
              .transition()
              .duration(700)
              .attr("cx", function(d){
                return xScale(d.year) + paddingDiff+30;
              })
              .attr("cy", function(d){
                return yScale(d.minutes) + paddingDiff-20;
              })
              .attr("r", function(d){
                return rScale(d.minutes);
              })
              .attr("fill", "rgb(255,0,0)");


          svg.selectAll(".trendline2")
              .transition()
              .duration(0)
              .attr("x1", function(d) { return xScale(d[0]) + xPadding/2+10; })
              .attr("y1", function(d) { return yScale(d[1]) + paddingDiff; })
              .attr("x2", function(d) { return xScale(d[2]) + xPadding/2+10; })
              .attr("y2", function(d) { return yScale(d[3]) + paddingDiff; })
              .attr("fill", "rgb(255,0,0)")

          svg.selectAll("#womenLine")
              .transition()
              .duration(700)
              .attr("stroke-width", 1.5)


    }
