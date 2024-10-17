const data = [
    [
        { height: 0, eastWind: -20, northWind: -10 },
        { height: 2000, eastWind: -10, northWind: 0 },
        { height: 3000, eastWind: 0, northWind: 10 },
        { height: 4000, eastWind: 10, northWind: 20 },
        { height: 5000, eastWind: 20, northWind: 15 },
        { height: 6000, eastWind: 10, northWind: 10 },
        { height: 7000, eastWind: 0, northWind: 5 },
        { height: 8000, eastWind: -10, northWind: 0 },
        { height: 9000, eastWind: -20, northWind: -5 },
    ],
    [
        { height: 0, eastWind: -40, northWind: -10 },
        { height: 2000, eastWind: 30, northWind: 0 },
        { height: 3000, eastWind: 3, northWind: 10 },
        { height: 4000, eastWind: 30, northWind: 20 },
        { height: 5000, eastWind: 30, northWind: 15 },
        { height: 6000, eastWind: 30, northWind: 10 },
        { height: 7000, eastWind: 3, northWind: 5 },
        { height: 8000, eastWind: -30, northWind: 0 },
        { height: 9000, eastWind: -30, northWind: -5 },
    ],
    [
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
];

const colors = ["red", "blue", "orange"];
const svgWidth = 800;
const svgHeight = 700;
const margin = { top: 70, right: 20, bottom: 50, left: 50 };

const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

const xEast = d3.scaleLinear()
    .domain([-60, 60])  // East wind speed range
    .range([margin.left, svgWidth / 2 - margin.right]);

const yScale = d3.scaleLinear()
    .domain([0, 9000])  // Height range
    .range([svgHeight - margin.bottom, margin.top]);

// X-axis with ticks inside the box
svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale)
        .ticks(10)
        .tickSizeInner(-(svgWidth / 2 - margin.left - margin.right)))
    .call(g => g.select(".domain").remove());

// Y-axis with ticks inside the box
svg.append("g")
    .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
    .call(d3.axisBottom(xEast)
        .ticks(5)
        .tickSizeInner(-(svgHeight - margin.top - margin.bottom)))
    .call(g => g.select(".domain").remove());

const lineEast = d3.line()
    .x(d => xEast(d.eastWind))
    .y(d => yScale(d.height));

const lineEastCurve = d3.line()
    .x(d => xEast(d.eastWind))
    .y(d => yScale(d.height))
    .curve(d3.curveCardinal);

const datasets = [
    { dataPoints: data[0], color: colors[0], symbol: "triangle", curve: false },
    { dataPoints: data[1], color: colors[1], symbol: "star", curve: false },
    { dataPoints: data[2], color: colors[2], symbol: "curve", curve: true }
];

// Draw lines and symbols
// datasets.forEach((dataset, index) => {
//     // Draw the path (line or curve)
//     const lineFunction = dataset.curve ? lineEastCurve : lineEast;
//     svg.append("path")
//         .datum(dataset.dataPoints)
//         .attr("fill", "none")
//         .attr("stroke", dataset.color)
//         .attr("stroke-width", 2)
//         .attr("d", lineFunction);

//     // Draw symbols
//     if (dataset.symbol === "triangle") {
//         svg.selectAll("polygon.data" + index)
//             .data(dataset.dataPoints)
//             .enter()
//             .append("polygon")
//             .attr("points", d => {
//                 const x = xEast(d.eastWind);
//                 const y = yScale(d.height);
//                 return `${x},${y - 8} ${x - 5},${y + 5} ${x + 5},${y + 5}`; // Triangle vertices
//             })
//             .attr("fill", "none")
//             .attr("stroke", dataset.color)
//             .attr("stroke-width", 2);
//     } else if (dataset.symbol === "star") {
//         svg.selectAll("text.data" + index)
//             .data(dataset.dataPoints)
//             .enter()
//             .append("text")
//             .attr("x", d => xEast(d.eastWind))
//             .attr("y", d => yScale(d.height) + 12)
//             .attr('font-size', '25px')
//             .attr('fill', dataset.color)
//             .attr("text-anchor", "middle")
//             .text("*");
//     }
// });