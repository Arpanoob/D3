// Set dimensions and margins for the chart
const margin = { top: 70, right: 30, bottom: 50, left: 80 };
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Set up the x and y scales
const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// Create the SVG element and append it to the chart container
const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create the datasets
const datasets = [
    [
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
    ],
    [
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
    ],
    [
        { height: 105, speed: 800 },
        { height: 170, speed: 780 },
        { height: 270, speed: 610 },
        { height: 370, speed: 580 },
        { height: 470, speed: 450 },
        { height: 590, speed: 300 },
        { height: 370, speed: 0 },
        { height: 470, speed: -250 },
        { height: 370, speed: -350 },
        { height: 270, speed: -480 },
        { height: 170, speed: -600 },
        { height: 270, speed: -780 },
    ]
];

// Define an array of colors for the lines
const colors = ["steelblue", "orange", "green"];

// Set the domains for the axes
x.domain([d3.min(datasets[0], d => d.speed), d3.max(datasets[0], d => d.speed)]);
y.domain([d3.min(datasets[0], d => d.height), d3.max(datasets[0], d => d.height) + 100]);

// Append the axes
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickSize(-height).tickPadding(10));

svg.append("g")
    .call(d3.axisLeft(y).tickSize(-width).tickPadding(10));

// Add grid lines
svg.selectAll(".tick line")
    .attr("stroke", "#ddd")
    .attr("stroke-dasharray", "2,2");

// Define the line generator
const line = d3.line()
    .x(d => x(d.speed))
    .y(d => y(d.height))
    .curve(d3.curveMonotoneX);

// Draw the datasets
datasets.forEach((dataset, index) => {
    // Draw the line
    svg.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", colors[index % colors.length]) // Use different colors
        .attr("stroke-width", 2)
        .attr("d", line);

    // Get the peak for the current dataset
    const peak = dataset.reduce((max, data) => (max.height > data.height ? max : data));

    // Append circles to each data point, excluding the peak
    svg.selectAll(`circle.dataset${index}`)
        .data(dataset)
        .enter()
        .filter(d => d !== peak)
        .append("circle")
        .attr("class", `dataset${index}`)
        .attr("cx", d => x(d.speed))
        .attr("cy", d => y(d.height))
        .attr("r", 4)
        .attr("fill", "red");

    // Append a special marker for the peak point
    svg.append("circle")
        .attr("cx", x(peak.speed))
        .attr("cy", y(peak.height))
        .attr("r", 6)
        .attr("fill", "black");

    // Optionally add a label for the peak
    svg.append("text")
        .attr('x', x(peak.speed))
        .attr('y', y(peak.height) + 12)
        .attr('font-size', '25px')
        .attr('fill', 'white')
        .attr("text-anchor", "middle")
        .text("*");
});

// Add a vertical line at x = 0
svg.append("line")
    .attr("x1", x(0))
    .attr("y1", 0)
    .attr("x2", x(0))
    .attr("y2", height)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

svg.append("text")
    .attr("class", "x-label")
    .attr("x", width / 2)
    .attr("y", height + 40) // Adjust for the new bottom margin
    .attr("text-anchor", "middle")
    .text("Speed");

svg.append("text")
    .attr("class", "y-label")
    .attr("transform", "rotate(-90)") // Rotate for the y-axis label
    .attr("y", -60) // Adjust to position on the y-axis
    .attr("x", -height / 2)
    .attr("text-anchor", "middle")
    .text("Height");
