import { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
import { useSelector } from "react-redux";

function BumpChart() {

    const chartRef = useRef(null);
    const { datas } = useSelector((state) => state.bump)
    const { countries, loading, error } = useSelector((state) => state.countries)

    const flags = countries.filter((item) => {
        const CountryArr = [...new Set(datas.map((countries) => countries.Country))]
        for (let i = 0; i < CountryArr.length; i++) {
            if (item.name.common == CountryArr[i]) {
                return item
            }
        }
    })

    useEffect(() => {
        // Set up the chart dimensions
        const ranks = datas.map((item) => item.Rank);
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 1400 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        function getFlagUrlByCountry(val) {
            return flags.filter((item) => item.name.common == val ? item : null)
        }

        const colorScale = d3.scaleOrdinal()
            .domain([...new Set(datas.map((item) => item.Country))])
            .range(d3.schemeCategory10)


        // Create an SVG container
        const svg = d3.select(chartRef.current)

        svg.selectAll("*").remove();

        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)


        // Define scales for x and y
        const xScale = d3.scaleLinear()
            .domain([d3.min(datas, d => d.Year), d3.max(datas, d => d.Year)])
            .range([20, width]);

        const yScale = d3.scaleLinear()
            .domain([Math.min(...ranks), Math.max(...ranks)])
            .range([22, height - 20])


        svg.selectAll(".grid-row")
            .data(d3.range(Math.min(...ranks), Math.max(...ranks), 10)) 
            .enter().append("line")
            .attr("class", "grid-row")
            .attr("x1", 0)
            .attr("x2", width)
            .transition().duration(1500)
            .attr("y1", d => yScale(d))
            .attr("y2", d => yScale(d))
            .style("stroke", "gray")

        svg.selectAll(".grid-column")
            .data(d3.range(d3.min(datas, d => d.Year), d3.max(datas, d => d.Year) + 1, 1))
            .enter().append("line")
            .attr("class", "grid-column")
            .attr("x1", d => xScale(d))
            .attr("x2", d => xScale(d))
            .attr("y1", 0)
            .attr("y2", height)
            .style("stroke", "gray");

        // Group datas by Country
        const groupeddatas = d3.group(datas, d => d.Country);
        groupeddatas.forEach((country, year) => {
            country.sort((a, b) => a.Year - b.Year)
        })
        // Create lines for each Country
        const lines = svg.selectAll(".line")
            .data(groupeddatas)
            .enter()
            .append("path")
            .attr("class", "line")
            .attr("d", d => {
                return d3.line()
                    .x(d => xScale(d.Year))
                    .y(d => yScale(d.Rank))
                    .curve(d3.curveLinear)
                    (d[1]); 
            })
            .style("fill", "none")
            .style("stroke", d => {
                return `${colorScale(d[0])}`
            })
            .style('stroke-width', '0')


        lines.transition().duration(2500)
            .style("stroke-width", "1") // Change the stroke width, for example
            .style("stroke", d => colorScale(d[0]));


        lines.each(function (d) {
            // const lastdatasPoint = d[1][0];
            // const lineColor = d3.select(this).style('stroke')
            // console.log(lineColor);
            // svg.append("text")
            //     .transition().duration(1500)
            //     .attr("x", xScale(lastdatasPoint.Year)) // Adjust the x-position as needed
            //     .attr("y", yScale(lastdatasPoint.Rank))
            //     .text(lastdatasPoint.Country)
            //     .style("font-size", "16px")
            //     .style('font-weight', '100')
            //     .style('stroke', `${lineColor}`)
            //     .style('color', `${lineColor}`)
            //     .attr("alignment-baseline", "middle");


            const lastDataPoint = d[1][0]; 
            const flagUrl = getFlagUrlByCountry(lastDataPoint.Country)[0]?.flags.svg; 
            const lineColor = d3.select(this).style('stroke');
            svg.append("image")
                .attr("x", xScale(lastDataPoint.Year) - 15) 
                .attr("y", yScale(lastDataPoint.Rank) - 20) 
                .attr("width", 30) 
                .attr("height", 20) 
                .attr("xlink:href", flagUrl)
                .style('stroke', lineColor);
        });

        // Create circles for each datas point (representing entities)
        const circles = svg.selectAll(".circle")
            .data(datas)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.Year))
            .attr("cy", d => yScale(d.Rank))
            .attr("r", 3)
            .style('display', 'none')
            .style("fill", d => colorScale(d.Country))
            .style('cursor', 'pointer')

        // Create x-axis
        const xAxis = d3.axisBottom(xScale)
            .tickSize(2)
            .tickValues(d3.range(d3.min(datas, d => d.Year), d3.max(datas, d => d.Year), 4)) // Specify tick values
            .tickFormat(d3.format("d")); // Format ticks as integers // Hide tick lines
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(10, ${height})`)
            .call(xAxis)
            .append("text")
            .attr("x", width / 2)
            .attr("y", 25)
            .style("text-anchor", "middle")
            .text("Year")
            .style("font-size", "19px") // Increase the font size as needed


        // Create y-axis
        const yAxis = d3.axisLeft(yScale)
            .tickSize(4)
            .tickValues(d3.range(Math.max(...ranks), Math.min(...ranks), 2)) // Specify tick values
            .tickFormat(d3.format("d")); // Format ticks as integers // Hide tick lines

        console.log("yAxis Ticks:", yAxis.scale().ticks());

        // Hide tick lines
        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis)
            .attr("transform", "rotate(0)")
            .append("text")
            .attr("x", -height / 2) // Note the negative value to move it to the left
            .attr("y", -30) // Note the negative value to move it up
            .style("text-anchor", "middle") // Set dominant-baseline to control vertical alignment
            .text("Rank")

        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .attr("id", "tooltip")
            .style("opacity", 0);

        // Add mouseover and mouseout events to points for tooltip
        svg.selectAll("circle.datas-point") // Add a class "datas-point" to the circles
            .data(datas)
            .enter()
            .append("circle")
            .attr("class", "datas-point") // Add the class to filter the mouse events
            .attr("cx", d => xScale(d.Year))
            .attr("cy", d => yScale(d.Rank))
            .attr("r", 4)
            .style("fill", d => colorScale(d.Country))
            .style('cursor', 'pointer')
            .on("mouseover", (event, d) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                tooltip.html(`<strong>Country:</strong> ${d.Country}<br><strong>Year:</strong> ${d.Year}<br><strong>Rank:</strong> ${d.Rank}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        lines.exit().remove();

    }, [datas, countries])

    return (
        <svg id="#bumpChart" ref={chartRef}></svg>
    );
}

export default BumpChart;
