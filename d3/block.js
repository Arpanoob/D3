// Function to create a legend SVG
function createLegend(svgContainer, legendData, options = {}) {
    const { xOffset = 20, yOffset = 20, spacing = 30 } = options;

    // Append shapes and text to the SVG
    legendData.forEach((item, index) => {
        const yPosition = yOffset + index * spacing;

        // Add shapes
        if (item.shape === "circle") {
            // Append a line
            svgContainer.append("line")
                .attr("x1", xOffset - 10)
                .attr("y1", yPosition)
                .attr("x2", xOffset + 10)
                .attr("y2", yPosition)
                .attr("stroke", item.color)
                .attr("stroke-width", 2);

            // Append a circle over the line at (x1, y1)
            svgContainer.append("circle")
                .attr("cx", xOffset) // Center the circle over the line
                .attr("cy", yPosition)
                .attr("r", 5) // Set the radius of the circle
                .attr("fill", item.color); // Fill color matching the line

        } else if (item.shape === "polygon") {
            svgContainer.append("line")
                .attr("x1", xOffset - 10)
                .attr("y1", yPosition)
                .attr("x2", xOffset + 10)
                .attr("y2", yPosition)
                .attr("stroke", item.color)
                .attr("stroke-width", 2);
            svgContainer.append("polygon")
                .attr("points", `${xOffset - 5},${yPosition + 5} ${xOffset + 5},${yPosition + 5} ${xOffset},${yPosition - 5}`)
                .attr("fill", item.color);
        } else if (item.shape === "line") {
            svgContainer.append("line")
                .attr("x1", xOffset - 10)
                .attr("y1", yPosition)
                .attr("x2", xOffset + 10)
                .attr("y2", yPosition)
                .attr("stroke", item.color)
                .attr("stroke-width", 2);
        }

        // Add text
        svgContainer.append("text")
            .attr("x", xOffset + 20)
            .attr("y", yPosition + 5)
            .attr("class", "legend")
            .text(item.text);
    });
}

// Example usage:
const svgWidth = 200;
const svgHeight = 100;

const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Legend Data
const legendData = [
    { shape: "circle", color: "blue", text: "result from this study" },
    { shape: "polygon", color: "orange", text: "result by manufacture" },
    { shape: "line", color: "black", text: "radiosonde data" },
];

// Create the legend using the function
createLegend(svg, legendData);
