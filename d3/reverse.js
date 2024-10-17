const datasets = [
    {
        name: "Red Triangles",
        color: "red",
        symbol: "triangle",
        dataPoints: [
            { height: 0, eastWind: -20 },
            { height: 2000, eastWind: -10 },
            { height: 3000, eastWind: 0 },
            { height: 4000, eastWind: 10 },
            { height: 5000, eastWind: 20 },
            { height: 6000, eastWind: 10 },
            { height: 7000, eastWind: 0 },
            { height: 8000, eastWind: -10 },
            { height: 9000, eastWind: -20, },
        ]
    },
    {
        name: "Blue Stars",
        color: "blue",
        symbol: "star",
        dataPoints: [
            { height: 0, eastWind: -40, },
            { height: 2000, eastWind: 30, },
            { height: 3000, eastWind: 3, },
            { height: 4000, eastWind: 30, },
            { height: 5000, eastWind: 30 },
            { height: 6000, eastWind: 30 },
            { height: 7000, eastWind: 3 },
            { height: 8000, eastWind: -30, },
            { height: 9000, eastWind: -30, },
        ]
    },
    {
        name: "Orange Line",
        color: "orange",
        symbol: null,
        curve: true,
        dataPoints: [
            { height: 0, eastWind: 60, },
            { height: 2000, eastWind: 40, },
            { height: 3000, eastWind: -20, },
            { height: 4000, eastWind: 60, },
            { height: 5000, eastWind: 30, },
            { height: 6000, eastWind: 20, },
            { height: 7000, eastWind: 30, },
            { height: 8000, eastWind: 60, },
            { height: 9000, eastWind: 60, },
        ]
    }
];

const svgWidth = 400;
const svgHeight = 700;
const margin = { top: 70, right: 20, bottom: 50, left: 70 };

const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

const xEast = d3.scaleLinear()
    .domain([-60, 60])  // East wind speed range
    .range([margin.left, svgWidth - margin.right]); // Updated range to fit new width

const yScale = d3.scaleLinear()
    .domain([0, 9000])  // Height range
    .range([svgHeight - margin.bottom, margin.top]);

const xAxis = svg.append("g")
    .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
    .call(d3.axisBottom(xEast).ticks(5).tickSize(-10));

xAxis.selectAll(".tick text")
    .attr("dy", "1.55em") // Adjust vertical alignment if needed
    .attr("x", 0); // Shift labels 10px to the right   

svg.append("text")
    .attr("x", svgWidth / 2 + 25) // Center the text horizontally
    .attr("y", margin.top - 20) // Position the text vertically in the margin
    .attr("text-anchor", "middle") // Center the text
    .text("Horizontal East Wind");


svg.append("text")
    .attr("class", "x-label")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - 10) // Adjust for the new bottom margin
    .attr("text-anchor", "middle")
    .text("Speed (m/s)");

svg.append("text")
    .attr("class", "y-label")
    .attr("transform", "rotate(-90)") // Rotate for the y-axis label
    .attr("y", 25) // Adjust to position on the y-axis
    .attr("x", -svgHeight / 2)
    .attr("text-anchor", "middle")
    .text("Height(m)");


// Draw the top x-axis
const xAxisTop = svg.append("g")
    .attr("transform", `translate(0, ${margin.top})`) // Position at the top
    .call(d3.axisTop(xEast).ticks(5).tickSize(-10).tickFormat(d => ""));



const yAxis = svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale).ticks(10).tickSize(-10));

// Draw the second right y-axis
const yAxisRight = svg.append("g")
    .attr("transform", `translate(${svgWidth - margin.right}, 0)`) // Align it with the right edge of the plot area
    .call(d3.axisRight(yScale).ticks(10).tickSize(-10).tickFormat(d => ""));

yAxis.selectAll(".tick text")
    .attr("dy", "0.35em") // Adjust vertical alignment if needed
    .attr("x", -10); // Shift labels 10px to the right   

const lineEast = d3.line()
    .x(d => xEast(d.eastWind))
    .y(d => yScale(d.height));

const lineEastCurve = d3.line()
    .x(d => xEast(d.eastWind))
    .y(d => yScale(d.height))
    .curve(d3.curveCardinal);

// Iterate over the datasets to draw paths and symbols
datasets.forEach(dataset => {
    // Draw the path (line or curve)
    const lineFunction = dataset.curve ? lineEastCurve : lineEast;
    svg.append("path")
        .datum(dataset.dataPoints)
        .attr("fill", "none")
        .attr("stroke", dataset.color)
        .attr("stroke-width", 2)
        .attr("d", lineFunction);

    // Draw symbols if applicable
    if (dataset.symbol === "triangle") {
        svg.selectAll("polygon." + dataset.name)
            .data(dataset.dataPoints)
            .enter()
            .append("polygon")
            .attr("points", d => {
                const x = xEast(d.eastWind);
                const y = yScale(d.height);
                return `${x},${y - 8} ${x - 5},${y + 5} ${x + 5},${y + 5}`; // Triangle vertices
            })
            .attr("fill", "none")
            .attr("stroke", dataset.color)
            .attr("stroke-width", 2);
    } else if (dataset.symbol === "star") {
        svg.selectAll("text." + dataset.name)
            .data(dataset.dataPoints)
            .enter()
            .append("text")
            .attr("x", d => xEast(d.eastWind))
            .attr("y", d => yScale(d.height) + 12)
            .attr('font-size', '25px')
            .attr('fill', dataset.color)
            .attr("text-anchor", "middle")
            .text("*");
    }
});



// svg.selectAll("polygon.data1")
//     .data(data1)
//     .enter()
//     .append("polygon")
//     .attr("points", d => {
//         const x = xEast(d.eastWind);
//         const y = yScale(d.height);
//         return `${ x },${ y - 8 } ${ x - 5 },${ y + 5 } ${ x + 5 },${ y + 5 } `; // Triangle vertices
//     })
//     .attr("fill", "none") // Ensure fill color is visible
//     .attr("stroke", "red") // Set stroke color to red
//     .attr("stroke-width", 2); // Set stroke width
//Draw circles for data points
// svg.selectAll("circle")
//     .data(data1)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xEast(d.eastWind)) // Use xEast for eastWind
//     .attr("cy", d => yScale(d.height))  // Use yScale for height
//     .attr("r", 4)
//     .attr("fill", "red");

// svg.selectAll("polygon")
//     .data(data)
//     .enter()
//     .append("polygon")
//     .attr("points", d => {
//         const x = xEast(d.eastWind);
//         const y = yScale(d.height);
//         return `${ x },${ y - 8 } ${ x - 5 },${ y + 5 } ${ x + 5 },${ y + 5 } `; // Triangle vertices
//     })
//     .attr("fill", "red");
// svg.selectAll("text")
//     .data(data1)
//     .enter()
//     .append("text")
//     .attr("cx", d => xEast(d.eastWind)) // Use xEast for eastWind
//     .attr("cy", d => yScale(d.height))  // Use yScale for height
//     .attr('font-size', '25px')
//     .attr('fill', 'black')
//     .attr("text-anchor", "middle")
//     .attr("dy", ".35em") // Adjust vertical alignment
//     .text("*");



// svg.selectAll("circle")
//     .data(data1)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xEast(d.eastWind)) // Use xEast for eastWind
//     .attr("cy", d => yScale(d.height))  // Use yScale for height
//     .attr("r", 4)
//     .attr("fill", "red");
// Add text for data1 points
// svg.selectAll("text")
//     .data(data1)
//     .enter()
//     .append("text")
//     .attr("x", d => xEast(d.eastWind)) // Use xEast for eastWind
//     .attr("y", d => yScale(d.height))  // Use yScale for height
//     .attr('font-size', '25px')
//     .attr('fill', 'black')
//     .attr("text-anchor", "middle")
//     .text("*");




// svg.append("rect")
//     .attr("x", 10)
//     .attr("y", 10)
//     .attr("width", 10)
//     .attr("height", 10)
//     .style("fill", "blue");
// svg.append("text")
//     .attr("x", 25)
//     .attr("y", 20)
//     .text("East Wind")
//     .style("font-size", "12px");

// svg.append("rect")
//     .attr("x", 10)
//     .attr("y", 30)
//     .attr("width", 10)
//     .attr("height", 10)
//     .style("fill", "red");

// svg.append("text")
//     .attr("x", 25)
//     .attr("y", 40)
//     .text("North Wind")
//     .style("font-size", "12px");


// Function to draw the legend
function drawLegend(svg) {
    const legendData = [
        { shape: "circle", color: "blue", text: "result from this study" },
        { shape: "polygon", color: "orange", text: "result by manufacture" },
        { shape: "line", color: "black", text: "radiosonde data" },
    ];

    const xOffset = svgWidth - 220; // Position legend to the right
    const yOffset = 100;
    const spacing = 20;

    // Draw the background rectangle for the legend
    const boxWidth = 180;
    const boxHeight = spacing * legendData.length + 20; // Additional space for padding

    svg.append("rect")
        .attr("x", xOffset - 15)
        .attr("y", yOffset - 14) // Offset to align with the first item
        .attr("width", boxWidth + 18)
        .attr("height", boxHeight - 10)
        .attr("fill", "white")
        .attr("stroke", "black");

    // Append shapes and text to the SVG
    legendData.forEach((item, index) => {
        const yPosition = yOffset + index * spacing;

        // Add shapes
        if (item.shape === "circle") {

            svg.append("line")
                .attr("x1", xOffset - 10)
                .attr("y1", yPosition)
                .attr("x2", xOffset + 18)
                .attr("y2", yPosition)
                .attr("stroke", item.color)
                .attr("stroke-width", 2);

            svg.append("circle")
                .attr("cx", xOffset + 5) // Offset for positioning inside the box
                .attr("cy", yPosition)
                .attr("r", 5)
                .attr("fill", item.color);
        } else if (item.shape === "polygon") {
            svg.append("line")
                .attr("x1", xOffset - 10)
                .attr("y1", yPosition)
                .attr("x2", xOffset + 18)
                .attr("y2", yPosition)
                .attr("stroke", item.color)
                .attr("stroke-width", 2);

            svg.append("polygon")
                .attr("points", `${xOffset + 10 - 5 - 5},${yPosition + 5} ${xOffset + 10 + 5},${yPosition + 5} ${xOffset + 10 - 5},${yPosition - 5 - 5}`)
                .attr("fill", item.color);
        } else if (item.shape === "line") {
            svg.append("line")
                .attr("x1", xOffset + 10 - 10 - 10)
                .attr("y1", yPosition)
                .attr("x2", xOffset + 10 + 5)
                .attr("y2", yPosition)
                .attr("stroke", item.color)
                .attr("stroke-width", 2);
        }

        // Add text
        svg.append("text")
            .attr("x", xOffset + 20)
            .attr("y", yPosition + 5)
            .attr("class", "legend")
            .text(item.text);
    });
}


// Call the legend function
drawLegend(svg);        