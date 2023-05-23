import * as d3 from "d3";

export const addChart = (Y, svg, container) => {
  const margin = { top: 30, right: 30, bottom: 40, left: 105 };
  const height = container.getBoundingClientRect().height - margin.bottom;
  const width = container.getBoundingClientRect().width - margin.bottom;

  const I = [0, 1, 2];
  const X = ["Bitcoin", "Tesla", "Dogecoin"];

  const x = d3
    .scaleBand()
    .range([margin.left, width - margin.right])
    .padding(0.5)
    .domain(X);

  const y = d3
    .scaleLinear()
    .domain([0, 200000])
    .range([height - margin.bottom, margin.top]);

  svg
    .append("g")
    .style("font-size", "20px")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat((d) => d));

  svg
    .append("g")
    .attr("class", "y-ticks")
    .style("font-size", "20px")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5).tickSizeOuter(0));

  svg.selectAll(".y-ticks g.tick text").attr("transform", "rotate(5)");

  svg
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width / 1.75 )
    .attr("y", height +10)
    .text("Asset categories");

  svg
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 0)
    .attr("x", -100)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Average Engagement");

    svg
    .selectAll(".bar")
    .data(I)
    .enter()
    .append("rect")
    .attr("fill", "#ff6347")
    .style("transition", "opacity 0.7s ease")
    .style("opacity", "1")
    .attr("class", "bar")
    .attr("x", (i) => x(X[i]))
    .attr("y", (i) => y(Y[i]))
    .attr("width", x.bandwidth())
    .attr("height", (i) => height - margin.bottom - y(Y[i]))
    .on("mouseover", function (d, i) {
      d3.select(this).style("opacity", "0.8");
      const xPosition = parseFloat(d3.select(this).attr("x"));
      const yPosition = parseFloat(d3.select(this).attr("y"));
      svg
        .append("text")
        .attr("pointer-events", "none")
        .attr("id", "tooltip")
        .attr("x", xPosition + 30)
        .attr("y", yPosition - 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "24px")
        .attr("font-weight", "lighter")
        .attr("fill", "")
        .text(Y[i]);
    })
};
