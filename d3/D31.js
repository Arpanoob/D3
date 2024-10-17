// Set dimensions and margins for the chart
const margin = { top: 70, right: 30, bottom: 40, left: 80 };
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Set up the x and y scales
const x = d3.scaleLinear()
    .range([0, width]);

const y = d3.scaleLinear()
    .range([height, 0]);

// Create the SVG element and append it to the chart container
const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create the dataset
const dataset = [
    { height: 50, speed: 800 },
    { height: 100, speed: 780 },
    { height: 200, speed: 600 },
    { height: 300, speed: 580 },
    { height: 400, speed: 450 },
    { height: 500, speed: 300 },
    { height: 300, speed: 0 },
    { height: 400, speed: -250 },
    { height: 300, speed: -350 },
    { height: 200, speed: -480 },
    { height: 100, speed: -600 },
    { height: 150, speed: -780 },
];

const dataset1 = [
    { height: 85, speed: 800 },
    { height: 150, speed: 780 },
    { height: 280, speed: 610 },
    { height: 350, speed: 580 },
    { height: 450, speed: 450 },
    { height: 550, speed: 300 },
    { height: 350, speed: 0 },
    { height: 450, speed: -250 },
    { height: 350, speed: -350 },
    { height: 250, speed: -480 },
    { height: 150, speed: -600 },
    { height: 200, speed: -780 },
];

// Set the domains for the axes
x.domain([d3.min(dataset, d => d.speed), d3.max(dataset, d => d.speed)]);
y.domain([d3.min(dataset, d => d.height), d3.max(dataset, d => d.height) + 100]);

// Append the x-axis
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickSize(-height).tickPadding(10));

// Append the y-axis
svg.append("g")
    .call(d3.axisLeft(y).tickSize(-width).tickPadding(10));

// Add grid lines (by using ticks to span across the chart)
svg.selectAll(".tick line")
    .attr("stroke", "#ddd")
    .attr("stroke-dasharray", "2,2"); // Dotted grid lines for stock market look

// Define the line generator with a curve
const line = d3.line()
    .x(d => x(d.speed))
    .y(d => y(d.height))
    .curve(d3.curveMonotoneX); // Smooth, stock-market style curves

const line2 = d3.line().x(d => x(d.speed)).y(d => y(d.height)).curve(d3.curveMonotoneX); // Smooth, stock-market style curves


// Append the curvy line path
svg.append("path")
    .datum(dataset)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

svg.append("path")
    .datum(dataset1)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("d", line);



// Add a vertical line at x = 0 (reference line for speed)
svg.append("line")
    .attr("x1", x(0))
    .attr("y1", 0)
    .attr("x2", x(0))
    .attr("y2", height)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

// Optional: Add tooltips or hover effects if needed for a more interactive feel

// Get the peak
const Peak = dataset.reduce((max, data) => {
    return max.height > data.height ? max : data;
});
console.log("Peak : ", Peak);
const Peak2 = dataset1.reduce((max, data) => {
    return max.height > data.height ? max : data;
});
console.log("Peak : ", Peak2);

/// Append circles to each data point in the first dataset, excluding the peak
svg.selectAll("circle.first")
.data(dataset)
.enter()
.filter(d => d !== Peak) // Use object reference for filtering
.append("circle")
.attr("class", "first") // Class for the first dataset circles
.attr("cx", d => x(d.speed))
.attr("cy", d => y(d.height))
.attr("r", 4)
.attr("fill", "red"); // Red points commonly used to highlight stock market data

// Append a special marker for the peak point of the first dataset
svg.append("circle")
.attr("cx", x(Peak.speed))
.attr("cy", y(Peak.height))
.attr("r", 6) // Slightly larger radius for emphasis
.attr("fill", "green"); // Different color for peak point

// Optionally add a label for the peak of the first dataset
svg.append("text")
.attr('x', x(Peak.speed))
.attr('y', y(Peak.height) - 10) // Adjust position above the peak point
.attr('font-size', '14px')
.attr('fill', 'green')
.attr("text-anchor", "middle")
.text("Peak");

// Append circles to each data point in the second dataset, excluding the peak
svg.selectAll("circle.second")
.data(dataset1)
.enter()
.filter(d => d !== Peak2) // Use object reference for filtering
.append("circle")
.attr("class", "second") // Class for the second dataset circles
.attr("cx", d => x(d.speed))
.attr("cy", d => y(d.height))
.attr("r", 4)
.attr("fill", "red"); // Red points commonly used to highlight stock market data

// Append a special marker for the peak point of the second dataset
svg.append("circle")
.attr("cx", x(Peak2.speed))
.attr("cy", y(Peak2.height))
.attr("r", 6) // Slightly larger radius for emphasis
.attr("fill", "green"); // Different color for peak point

// Optionally add a label for the peak of the second dataset
svg.append("text")
.attr('x', x(Peak2.speed))
.attr('y', y(Peak2.height) - 10) // Adjust position above the peak point
.attr('font-size', '14px')
.attr('fill', 'green')
.attr("text-anchor", "middle")
.text("Peak");
