"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { type Temp } from "~/zodSchemas";

type Props = {
  data: Temp[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const TempSvg = ({
  data,
  width = 320,
  height = 200,
  margin = { top: 20, right: 20, bottom: 20, left: 40 },
}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Create scales
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date) as [Date, Date])
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    .domain([35, 38])
    .range([height - margin.bottom, margin.top]);

  // Create line generator
  const line = d3
    .line<Temp>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.temp));

  // Initialize chart on component mount and whenever data changes
  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Remove previous chart content
      svg.selectAll("*").remove();

      // Append the line path
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Append scatter dots
      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.date))
        .attr("cy", (d) => yScale(d.temp))
        .attr("r", 2) // radius of the circle
        .attr("fill", "black");

      // Append x-axis
      svg
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(
          d3
            .axisBottom<Date>(xScale)
            .ticks(5)
            .tickFormat(d3.timeFormat("%m-%d")),
        );

      // Append y-axis
      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale));
    }
  }, [data, height, line, margin, width, xScale, yScale]);

  return (
    <div className="flex justify-center items-center p-5 bg-white rounded-lg">
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default TempSvg;
