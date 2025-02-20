// Set dimensions and margins for the chart
const margin = { top: 70, right: 30, bottom: 40, left: 80 };
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Set up the x and y scales
const x = d3.scaleTime()
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

// Create two datasets
const dataset = [
    { date: new Date("2022-01-01"), value: 200 },
    { date: new Date("2022-02-01"), value: 250 },
    { date: new Date("2022-03-01"), value: 180 },
    { date: new Date("2022-04-01"), value: 300 },
    { date: new Date("2022-05-01"), value: 280 },
    { date: new Date("2022-06-01"), value: 220 },
    { date: new Date("2022-07-01"), value: 300 },
    { date: new Date("2022-08-01"), value: 450 },
    { date: new Date("2022-09-01"), value: 280 },
    { date: new Date("2022-10-01"), value: 600 },
    { date: new Date("2022-11-01"), value: 780 },
    { date: new Date("2022-12-01"), value: 320 }
];

const dataset2 = [
    { date: new Date("2022-01-01"), value: 600 },
    { date: new Date("2022-02-01"), value: 350 },
    { date: new Date("2022-03-01"), value: 480 },
    { date: new Date("2022-04-01"), value: 500 },
    { date: new Date("2022-05-01"), value: 380 },
    { date: new Date("2022-06-01"), value: 520 },
    { date: new Date("2022-07-01"), value: 600 },
    { date: new Date("2022-08-01"), value: 750 },
    { date: new Date("2022-09-01"), value: 380 },
    { date: new Date("2022-10-01"), value: 700 },
    { date: new Date("2022-11-01"), value: 980 },
    { date: new Date("2022-12-01"), value: 120 }
];

// Define the x and y domains based on the dataset
x.domain(d3.extent(dataset, d => d.date));
y.domain([0, d3.max(dataset2, d => d.value)]); // Use max from dataset2 to scale y properly for both datasets

// Add the x-axis
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x)
        .ticks(d3.timeMonth.every(1))
        .tickFormat(d3.timeFormat("%b %Y")));

// Add the y-axis
svg.append("g")
    .call(d3.axisLeft(y));

// Create the line generator for the first dataset
const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

// Create the line generator for the second dataset
const line2 = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

// Add the line path for the first dataset
svg.append("path")
    .datum(dataset)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line);

// Add the line path for the second dataset
svg.append("path")
    .datum(dataset2)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 1.5)
    .attr("d", line2);


const peak1 = dataset.reduce((max, d) => {
    if (d.value > max.value) {
        return d;
    }
    return max;
})

const peak2 = dataset2.reduce((max, d) => {
    if (d.value > max.value) {
        return d;
    }
    return max;
})

console.log("peak1: ", peak1);
console.log("peak2: ", peak2);

svg.append("text")
    .attr('x', x(peak1.date))
    .attr('y', y(peak1.value))
    .attr('font-size', "24px")
    .attr("fill", "green")
    .attr("text-anchor", "middle")
    .text("*")

svg.append("text")
    .attr('x', x(peak2.date))
    .attr('y', y(peak2.value))
    .attr('fornt-size', '24px')
    .attr('fill', 'green')
    .attr("text-anchor", "middle")
    .text("*")    