var dataset2, xScale2, yScale2;
var w2 = 1000;
var h2 = 300;
var xPadding2 = 60;
var yPadding2 = 60;
var svg2, xAxis2, yAxis2;
var origData;
var ticks = d3.range([12]);


d3.csv("fruit.csv", function(data){
  origData = data;
  dataset2 = data.slice(0,12);
  xScale2 = d3.scaleBand()
              .domain(d3.range([12]))
              .rangeRound([0,w2-xPadding2])
              .paddingInner(0.05);

  yScale2 = d3.scaleLinear()
              .domain([0, d3.max(dataset2, function(d){
                return parseFloat(d.Count);
              })])
              .range([h2-yPadding2, 0]);

  xAxis2 = d3.axisBottom()
            .scale(xScale2)
            .tickValues(ticks)
            .tickFormat(function(d,i){
              return dataset2[i].Month;
            });

  yAxis2 = d3.axisLeft()
            .scale(yScale2)
            .ticks(10);

  makeVis2();
});

function makeVis2(){



  svg2 = d3.select("#fruit-svg")
            .attr("width", w2)
            .attr("height", h2);

  svg2.selectAll("rect")
    .data(dataset2.slice(0,12))
    .enter()
    .append("rect")
    .attr("class", "fruit")
    .attr("x", function(d, i){
      return xScale2(i)+xPadding2;
    })
    .attr("width", xScale2.bandwidth())
    .attr("y", function(d){
      return (yScale2(d.Count))+40;
    })
    .attr("height", function(d) {
      return h2-yScale2(d.Count)-yPadding2;
    })
    .attr("fill", function(d){
        return "rgb(0,0,255)"
    })

    svg2.selectAll("text")
      .data(dataset2.slice(0,12))
      .enter()
      .append("text")
      .attr("class", "fuit-text")
      .text(function(d){
          return d.Count;
      })
      .attr("x", function(d, i){
        return xScale2(i)+xScale2.bandwidth()/2 + xPadding2;
      })
      .attr("y", function(d, i){
        if(d.Count > 1){
          return yScale2(d.Count) + yPadding2;
        }
      })
      .attr("font-size", "10px")
      .attr("fill", "white")
      .attr("font-family", "sans-serif")
      .attr("text-anch2or", "middle");


    svg2.append("g")
        .attr("class", "x axis fruit")
        .attr("transform", "translate( " + xPadding2 + ", " + (h2-20) + ")")
        .call(xAxis2);

    svg2.append("g")
        .attr("class", "y axis fruit")
        .attr("transform", "translate(" + xPadding2 + " ," + (yPadding2-20) + ")")
        .call(yAxis2);

    svg2.append("text")
        .attr("class", "y label fruit")
        .attr("text-anchor", "end")
        .attr("y", 25)
        .attr("x", -45)
        .attr("dy", "5px")
        .attr("font-size", "15px")
        .attr("transform", "rotate(-90)")
        .text("# of Unique Kinds of Produce");

    svg2.append("text")
        .attr("class", "x label fruit")
        .attr("text-anchor", "middle")
        .attr("y", 20)
        .attr("x", w/2)
        .attr("dy", "5px")
        .attr("font-size", "30px")
        .text("NYC Green Markets - Unique Produce Types");
  }


  d3.select("#index0")
    .on("click", function(){
      dataset2 = origData.slice(0,12);
      yScale2.domain([0, d3.max(dataset2,function(d){
        return parseFloat(d.Count);
      })])
      svg2.selectAll(".fruit")
          .data(dataset2)
          .transition()
          .duration(700)
          .attr("y", function(d){
            return (yScale2(d.Count))+40;
          })
          .attr("height", function(d) {
            return h2-yScale2(d.Count)-yPadding2;
          })
          .attr("fill", function(){
              return "rgb(0,0,255)"
          });

      svg2.selectAll(".fuit-text")
          .data(dataset2)
          .transition()
          .duration(700)
          .text(function(d){
            return d.Count;
          })
          .attr("x", function(d, i){
            return xScale2(i)+xScale2.bandwidth()/2 + xPadding2;
          })
          .attr("y", function(d, i){
            if(d.Count > 1){
              return yScale2(d.Count) + yPadding2;
            }
          });

      svg2.select(".x.axis.fruit")
          .transition()
          .duration(700)
          .call(xAxis2)
      svg2.select(".y.axis.fruit")
          .transition()
          .duration(700)
          .call(yAxis2)
    })

    d3.select("#index1")
      .on("click", function(){
        dataset2 = origData.slice(12,24);
        yScale2.domain([0, d3.max(dataset2,function(d){
          return parseFloat(d.Count);
        })])
        svg2.selectAll(".fruit")
            .data(dataset2)
            .transition()
            .duration(700)
            .attr("y", function(d){
              return (yScale2(d.Count))+40;
            })
            .attr("height", function(d) {
              return h2-yScale2(d.Count)-yPadding2;
            })
            .attr("fill", function(){
                return "rgb(0,255,0)"
            });

        svg2.selectAll(".fuit-text")
            .data(dataset2)
            .transition()
            .duration(700)
            .text(function(d){
              return d.Count;
            })
            .attr("x", function(d, i){
              return xScale2(i)+xScale2.bandwidth()/2 + xPadding2;
            })
            .attr("y", function(d, i){
              if(d.Count > 1){
                return yScale2(d.Count) + yPadding2;
              }
            })


        svg2.select(".x.axis.fruit")
            .transition()
            .duration(700)
            .call(xAxis2)
        svg2.select(".y.axis.fruit")
            .transition()
            .duration(700)
            .call(yAxis2)
      })

      d3.select("#index2")
        .on("click", function(){
          dataset2 = origData.slice(24,36);

          // console.log(d3.max(dataset2,function(d){
          // 	return parseFloat(d.Count);
          // }))

          yScale2.domain([0, d3.max(dataset2,function(d){

            return parseFloat(d.Count);
          })])
          svg2.selectAll(".fruit")
              .data(dataset2)
              .transition()
              .duration(700)
              .attr("y", function(d){
                return (yScale2(d.Count))+40;
              })
              .attr("height", function(d) {
                return h2-yScale2(d.Count)-yPadding2;
              })
              .attr("fill", function(){
                  return "rgb(255,0,0)"
              });

          svg2.selectAll(".fuit-text")
              .data(dataset2)
              .transition()
              .duration(700)
              .text(function(d){
                return d.Count;
              })
              .attr("x", function(d, i){
                return xScale2(i)+xScale2.bandwidth()/2 + xPadding2;
              })
              .attr("y", function(d, i){
                if(d.Count > 1){
                  return yScale2(d.Count) + yPadding2;
                }
              })

          svg2.select(".x.axis.fruit")
              .transition()
              .duration(700)
              .call(xAxis2)
          svg2.select(".y.axis.fruit")
              .transition()
              .duration(700)
              .call(yAxis2)
        })

        d3.select("#index3")
          .on("click", function(){
            dataset2 = origData.slice(36,origData.length2);
            yScale2.domain([0, d3.max(dataset2,function(d){
              return parseFloat(d.Count);
            })])
            svg2.selectAll(".fruit")
                .data(dataset2)
                .transition()
                .duration(700)
                .attr("y", function(d){
                  return (yScale2(d.Count))+40;
                })
                .attr("height", function(d) {
                  return h2-yScale2(d.Count)-yPadding2;
                })
                .attr("fill", function(){
                    return "rgb(0,0,0)"
                });

            svg2.selectAll(".fuit-text")
                .data(dataset2)
                .transition()
                .duration(700)
                .text(function(d){
                  return d.Count;
                })
                .attr("x", function(d, i){
                  return xScale2(i)+xScale2.bandwidth()/2 + xPadding2;
                })
                .attr("y", function(d, i){
                  if(d.Count > 1){
                    return yScale2(d.Count) + yPadding2;
                  }
                })

            svg2.select(".x.axis.fruit")
                .transition()
                .duration(700)
                .call(xAxis2)
            svg2.select(".y.axis.fruit")
                .transition()
                .duration(700)
                .call(yAxis2)
          })
