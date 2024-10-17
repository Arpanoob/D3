import { useEffect } from 'react';
import * as d3 from 'd3';
import { datasets } from '../utils/dataset';
import { speedToSymbolConverter } from '../models/speedToSymbolsConverter';
import { getColorBySpeed, symbol_SVG } from '../models/symbolToSVG';
import { getWindRotation } from '../models/getWindDirection';
import { getLength } from '../models/lenght';
// import { speedToSymbolConverter } from '../models/speedToSymbolsConverter';

const WindProfilerGraph = () => {
    useEffect(() => {
        // Clear any previous SVG elements (to avoid appending multiple times)
        d3.select("#chart-container").selectAll("*").remove();

        // Set dimensions and margins for the chart
        const margin = { top: 70, right: 30, bottom: 50, left: 80 };
        const width = 1200 - margin.left - margin.right;
        const height = 750 - margin.top - margin.bottom;

        // Set up the x and y scales
        const x = d3.scaleLinear().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // Create the SVG container
        const svg = d3.select("#chart-container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Set the domains for the axes
        x.domain([d3.min(datasets[0], d => d.year) as any
            , d3.max(datasets[0], d => d.year)]);
        y.domain([0, 600]);//d3.max(datasets[0], d => d.height) as any]);

        // Append the axes
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickPadding(10));

        svg.append("g")
            .call(d3.axisLeft(y).tickPadding(10));

        // Draw the top x-axis
        svg.append("g")
            .attr("transform", `translate(0, 0)`)
            .call(d3.axisTop(x).ticks(10).tickSize(-10).tickFormat(() => ""));

        // Draw the second right y-axis
        svg.append("g")
            .attr("transform", `translate(${width}, 0)`)
            .call(d3.axisRight(y).ticks(10).tickSize(-10).tickFormat(() => ""));

        datasets.forEach((data, index) => {
            const group = svg.selectAll("all" + index)
                .data(data)
                .enter()
                .append("g")
                .attr("class", `icon-${index}`)
                .attr("transform", `translate(${index * 10}, 0) `)
            // .attr('rotate', `10`);rotate(10, ${10}, ${10})


            group.each(function (d, i) {
                const xx = x(d.year);
                const yy = y(d.height);
                const { speed } = d;
                let pathData;

                const color = getColorBySpeed(speed)

                const s = speedToSymbolConverter(speed);
                // pathData = symbol_SVG(this, s, xx, yy, s.length * 5 , speed);
                pathData = symbol_SVG(this, s, xx, yy, getLength(s)*5, speed);

                console.log("speed symbol :", s, speed, pathData)

                // if (d.speed <= 125) {
                //     pathData = atOrLess1_5m_s(xx, yy, i);
                // } else if (d.speed > 125 && d.speed <= 250) {
                //     pathData = at2_50m_s(xx, yy, i);
                // } else if (d.speed > 250 && d.speed <= 500) {
                //     pathData = at5_00m_s(xx, yy, i);
                // } else if (d.speed > 500 && d.speed <= 750) {
                //     pathData = at7_50m_s(xx, yy, i);
                // } else if (d.speed > 750 && d.speed <= 1000) {
                //     pathData = at10_00m_s(xx, yy, i);
                // } else if (d.speed > 1000 && d.speed <= 1500) {
                //     pathData = at15_00m_s(xx, yy, i);
                // } else if (d.speed > 1500 && d.speed <= 1750) {
                //     pathData = at17_50m_s(xx, yy, i);
                // } else if (d.speed > 1750 && d.speed <= 2250) {
                //     createTriangle(this, xx, yy);
                // } else if (d.speed > 2250 && d.speed <= 3500) {
                //     createComplexPath(this, xx, yy);
                // } else if (d.speed > 3500 && d.speed <= 5000) {
                //     createDoubleTriangle(this, xx, yy);
                // } else {
                //     pathData = "";
                // }
                // pathData = `M${xx},${yy} L${xx - s.length * 5},${yy}`
                pathData = `M${xx},${yy} L${xx - getLength(s) * 5},${yy}`

                if (s !== 'x')
                    d3.select(this).append('path')
                        .attr("d", pathData as string)
                        .attr("fill", color)
                        .attr("stroke", color)
                        .attr("stroke-width", 2)
                // .attr("transform", `rotate(10, ${10},10)`)

                // d3.select(this).append('text')
                //     .attr("x", xx)
                //     .attr("y", yy - 115)
                //     .attr("text-anchor", "middle") // Center the text
                //     .attr("fill", "black")
                // .text(speed + " " + s); // Display the speed value

                d3.select(this).append('circle')
                    .attr("cx", xx)
                    .attr("cy", yy)
                    .attr("r", 1)
                    .attr("fill", "red")

                // group.attr("transform", "translate(250, 250)"); // center of the svg
                if (!d.windDirection) { // Rotate this group only if the speed is greater than 2000
                     d3.select(this).attr("transform", `rotate(${getWindRotation(d.windDirection)}, ${xx}, ${yy})`); // Rotate 45 degrees around (xx, yy)
                }

            });
        });

        // Functions to draw paths for different speed ranges
        function atOrLess1_5m_s(xx: any, yy: any, _u_index?: any) {
            return `M${xx},${yy} L${xx + 25},${yy}`;
        }
        function at2_50m_s(xx: any, yy: any, _u_index?: any) {
            return `M${xx},${yy} L${xx},${yy + 9} L${xx + 25},${yy + 9}`;
        }
        function at5_00m_s(xx: any, yy: any, _u_index?: any) {
            return `M${xx},${yy} L${xx},${yy + 15} L${xx + 25},${yy + 15}`;
        }
        function at7_50m_s(xx: any, yy: any, _u_index: any) {
            return `M${xx},${yy} L${xx},${yy + 25} L${xx + 50},${yy + 25}`;
        }
        function at10_00m_s(xx: any, yy: any, _u_index?: any) {
            return `M${xx},${yy} L${xx},${yy + 25} L${xx + 50},${yy + 25}`;
        }
        function at15_00m_s(xx: any, yy: any, _u_index?: any) {
            return `M${xx},${yy} L${xx},${yy + 25} L${xx + 50},${yy + 25}`;
        }
        function at17_50m_s(xx: any, yy: any, _u_index?: any) {
            return `M${xx},${yy} L${xx},${yy + 25} L${xx + 50},${yy + 25}`;
        }

        // Helper functions for triangles and lines
        function createTriangle(element: any, xx: number, yy: number) {
            const points = `${xx - 5},${yy - 10} ${xx - 5},${yy + 10} ${xx + 5},${yy + 10}`;
            d3.select(element).append('polygon')
                .attr("points", points)
                .attr("class", "triangle")
                .attr("fill", "blue");

            d3.select(element).append('line')
                .attr("x1", xx - 5)
                .attr("y1", yy + 10)
                .attr("x2", xx + 20)
                .attr("y2", yy + 10)
                .attr("stroke", "blue")
                .attr("stroke-width", 2);
        }

        function createComplexPath(element: any, xx: number, yy: number) {
            const linePath = `M${xx},${yy} L${xx},${yy + 9} L${xx + 4},${yy + 9} L${xx + 4},${yy - 10} L${xx + 4},${yy + 9}
                L${xx + 15},${yy + 9} L${xx + 15},${yy - 10} L${xx + 35},${yy + 9}`;
            d3.select(element).append('path')
                .attr('d', linePath)
                .attr("stroke", "blue")
                .attr("fill", "none")
                .attr("stroke-width", 2);
        }

        function createDoubleTriangle(element: any, xx: number, yy: number) {
            const points1 = `${xx - 5},${yy - 10} ${xx - 5},${yy + 10} ${xx + 5},${yy + 10}`;
            const points2 = `${xx + 5},${yy - 10} ${xx + 5},${yy + 10} ${xx + 15},${yy + 10}`;

            d3.select(element).append('polygon')
                .attr("points", points1)
                .attr("class", "triangle")
                .attr("fill", "blue");

            d3.select(element).append('polygon')
                .attr("points", points2)
                .attr("class", "triangle")
                .attr("fill", "blue");
        }

    }, []);  // Empty dependency array to ensure useEffect runs only once after the component mounts

    return <div id="chart-container"></div>;
};

export default WindProfilerGraph;
