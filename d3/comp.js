
const datasets = [
    {
        name: "Red Triangles",
        color: "red",
        symbol: "triangle",
        dataPoints: [
            { height: 0, eastWind: -20, northWind: -10 },
            { height: 2000, eastWind: -10, northWind: 0 },
            { height: 3000, eastWind: 0, northWind: 10 },
            { height: 4000, eastWind: 10, northWind: 20 },
            { height: 5000, eastWind: 20, northWind: 15 },
            { height: 6000, eastWind: 10, northWind: 10 },
            { height: 7000, eastWind: 0, northWind: 5 },
            { height: 8000, eastWind: -10, northWind: 0 },
            { height: 9000, eastWind: -20, northWind: -5 },
        ]
    },
    {
        name: "Blue Stars",
        color: "blue",
        symbol: "star",
        dataPoints: [
            { height: 0, eastWind: -40, northWind: -10 },
            { height: 2000, eastWind: 30, northWind: 0 },
            { height: 3000, eastWind: 3, northWind: 10 },
            { height: 4000, eastWind: 30, northWind: 20 },
            { height: 5000, eastWind: 30, northWind: 15 },
            { height: 6000, eastWind: 30, northWind: 10 },
            { height: 7000, eastWind: 3, northWind: 5 },
            { height: 8000, eastWind: -30, northWind: 0 },
            { height: 9000, eastWind: -30, northWind: -5 },
        ]
    },
    {
        name: "Orange Line",
        color: "orange",
        symbol: null,
        curve: true,
        dataPoints: [
            { height: 0, eastWind: 60, northWind: -10 },
            { height: 2000, eastWind: 40, northWind: 0 },
            { height: 3000, eastWind: -20, northWind: 10 },
            { height: 4000, eastWind: 60, northWind: 20 },
            { height: 5000, eastWind: 30, northWind: 15 },
            { height: 6000, eastWind: 20, northWind: 10 },
            { height: 7000, eastWind: 30, northWind: 5 },
            { height: 8000, eastWind: 60, northWind: 0 },
            { height: 9000, eastWind: 60, northWind: -5 },
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

// Scales
const xScale = d3.scaleLinear()
    .domain([-50, 70]) // Adjust the domain as needed
    .range([margin.left, svgWidth - margin.right]);

const yScale = d3.scaleLinear()
    .domain([0, 9000]) // Adjust the domain as needed
    .range([svgHeight - margin.bottom, margin.top]);

// Axes
svg.append("g")
    .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));

// Draw datasets
datasets.forEach(dataset => {
    if (dataset.symbol === "triangle") {
        dataset.dataPoints.forEach(point => {
            svg.append("polygon")
                .attr("points", `${xScale(point.eastWind)},${yScale(point.height)} ${xScale(point.eastWind - 5)},${yScale(point.height + 10)} ${xScale(point.eastWind + 5)},${yScale(point.height + 10)}`)
                .attr("fill", dataset.color);
        });
    } else if (dataset.symbol === "star") {
        dataset.dataPoints.forEach(point => {
            svg.append("circle")
                .attr("cx", xScale(point.eastWind))
                .attr("cy", yScale(point.height))
                .attr("r", 5)
                .attr("fill", dataset.color);
        });
    } else if (dataset.curve) {
        const line = d3.line()
            .x(d => xScale(d.eastWind))
            .y(d => yScale(d.height));

        svg.append("path")
            .datum(dataset.dataPoints)
            .attr("fill", "none")
            .attr("stroke", dataset.color)
            .attr("stroke-width", 2)
            .attr("d", line);
    }
});

// Function to draw the legend
function drawLegend(svg) {
    const legendData = [
        { shape: "circle", color: "blue", text: "result from this study" },
        { shape: "polygon", color: "orange", text: "result by manufacture" },
        { shape: "line", color: "black", text: "radiosonde data" },
    ];

    const xOffset = svgWidth - 100; // Position legend to the right
    const yOffset = 20;
    const spacing = 30;

    // Append shapes and text to the SVG
    legendData.forEach((item, index) => {
        const yPosition = yOffset + index * spacing;

        // Add shapes
        if (item.shape === "circle") {
            svg.append("circle")
                .attr("cx", xOffset)
                .attr("cy", yPosition)
                .attr("r", 5)
                .attr("fill", item.color);
        } else if (item.shape === "polygon") {
            svg.append("polygon")
                .attr("points", `${xOffset - 5},${yPosition + 5} ${xOffset + 5},${yPosition + 5} ${xOffset},${yPosition - 5}`)
                .attr("fill", item.color);
        } else if (item.shape === "line") {
            svg.append("line")
                .attr("x1", xOffset - 10)
                .attr("y1", yPosition)
                .attr("x2", xOffset + 10)
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