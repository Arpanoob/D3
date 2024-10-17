// // Set dimensions and margins for the chart
// const margin = { top: 70, right: 30, bottom: 50, left: 80 };
// const width = 1200 - margin.left - margin.right;
// const height = 500 - margin.top - margin.bottom;

// // Set up the x and y scales
// const x = d3.scaleLinear().range([0, width]);
// const y = d3.scaleLinear().range([height, 0]);

// // Create the SVG element and append it to the chart container
// const svg = d3.select("#chart-container")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

// const datasets = [
//     [
//         { height: 50, speed: 800, year: 2000 },
//         { height: 100, speed: 780, year: 2001 },
//         { height: 200, speed: 600, year: 2002 },
//         { height: 300, speed: 580, year: 2003 },
//         { height: 400, speed: 450, year: 2004 },
//         { height: 500, speed: 300, year: 2005 },
//         { height: 300, speed: 0, year: 2006 },
//         { height: 400, speed: -250, year: 2007 },
//         { height: 300, speed: -350, year: 2008 },
//         { height: 200, speed: -480, year: 2009 },
//         { height: 100, speed: -600, year: 2010 },
//         { height: 150, speed: -780, year: 2011 },
//     ],
//     [
//         { height: 85, speed: 800, year: 2000 },
//         { height: 150, speed: 780, year: 2001 },
//         { height: 280, speed: 610, year: 2002 },
//         { height: 350, speed: 580, year: 2003 },
//         { height: 450, speed: 450, year: 2004 },
//         { height: 550, speed: 300, year: 2005 },
//         { height: 350, speed: 0, year: 2006 },
//         { height: 450, speed: -250, year: 2007 },
//         { height: 350, speed: -350, year: 2008 },
//         { height: 250, speed: -480, year: 2009 },
//         { height: 150, speed: -600, year: 2010 },
//         { height: 200, speed: -780, year: 2011 },
//     ],
//     [
//         { height: 105, speed: 800, year: 2000 },
//         { height: 170, speed: 780, year: 2001 },
//         { height: 270, speed: 610, year: 2002 },
//         { height: 370, speed: 580, year: 2003 },
//         { height: 470, speed: 450, year: 2004 },
//         { height: 590, speed: 300, year: 2005 },
//         { height: 370, speed: 0, year: 2006 },
//         { height: 470, speed: -250, year: 2007 },
//         { height: 370, speed: -350, year: 2008 },
//         { height: 270, speed: -480, year: 2009 },
//         { height: 170, speed: -600, year: 2010 },
//         { height: 270, speed: -780, year: 2011 },
//     ]
// ];

// // Set the domains for the axes
// x.domain([d3.min(datasets[0], d => d.year), d3.max(datasets[0], d => d.year)]);
// y.domain([d3.min(datasets[0], d => d.height), d3.max(datasets[0], d => d.height)]);

// // Append the axes
// svg.append("g")
//     .attr("transform", `translate(0,${height})`)
//     .call(d3.axisBottom(x).tickPadding(10));

// svg.append("g")
//     .call(d3.axisLeft(y).tickPadding(10));

// // Draw the top x-axis
// const xAxisTop = svg.append("g")
//     .attr("transform", `translate(0, ${0})`) // Position at the top
//     .call(d3.axisTop(x).ticks(5).tickSize(-10).tickFormat(d => ""));

// // Draw the second right y-axis
// const yAxisRight = svg.append("g")
//     .attr("transform", `translate(${width}, 0)`) // Align it with the right edge of the plot area
//     .call(d3.axisRight(y).ticks(10).tickSize(-10).tickFormat(d => ""));

// // Append lines for each point in the dataset to form an L-shaped triangle (no hypotenuse)
// svg.selectAll("line.vertical")
//     .data(datasets[0])
//     .enter()
//     .append("line")
//     .attr("x1", d => x(d.year))  // Start at (xx, yy)
//     .attr("y1", d => y(d.height))
//     .attr("x2", d => x(d.year))  // End at (xx, yy + 9), vertical line
//     .attr("y2", d => y(d.height) + 9)
//     .attr("stroke", "blue")
//     .attr("stroke-width", 2);

// // Add the horizontal line
// svg.selectAll("line.horizontal")
//     .data(datasets[0])
//     .enter()
//     .append("line")
//     .attr("x1", d => x(d.year))  // Start at (xx, yy + 9)
//     .attr("y1", d => y(d.height) + 9)
//     .attr("x2", d => x(d.year) + 10)  // End at (xx + 10, yy + 9), horizontal line
//     .attr("y2", d => y(d.height) + 9)
//     .attr("stroke", "blue")
//     .attr("stroke-width", 2);

// // // Append a path for each data point to create an L-shaped triangle
// // svg.selectAll("path")
// //     .data(datasets[0])
// //     .enter()
// //     .append("path")
// //     .attr("d", (d,i )=> {
// //         console.log(d)
// //         const xx = x(d.year);
// //         const yy = y(d.height);
// //         // Create the L-shaped triangle path
// //         return `M${xx},${yy} L${xx},${yy + 9} L${xx + 10},${yy + 9}`;
// //     })
// //     .attr("fill", "none")
// //     .attr("stroke", "blue")
// //     .attr("stroke-width", 2);





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

const datasets = [
    // Dataset 0
    [
        { height: 500, speed: 5000, year: 2000 },
        { height: 50, speed: 3700, year: 2000 },
        { height: 100, speed: 3500, year: 2001 },
        { height: 200, speed: 2500, year: 2002 },
        { height: 300, speed: 2200, year: 2003 },
        { height: 400, speed: 1700, year: 2004 },
        { height: 500, speed: 1500, year: 2005 },
        { height: 300, speed: 1000, year: 2006 },
        { height: 400, speed: 750, year: 2007 },
        { height: 300, speed: 500, year: 2008 },
        { height: 200, speed: 250, year: 2009 },
        { height: 100, speed: 125, year: 2010 },
        { height: 150, speed: 0, year: 2011 },
    ],
    // Dataset 1
    [
        { height: 85, speed: 800, year: 2000 },
        { height: 150, speed: 780, year: 2001 },
        { height: 280, speed: 610, year: 2002 },
        { height: 350, speed: 580, year: 2003 },
        { height: 450, speed: 450, year: 2004 },
        { height: 550, speed: 300, year: 2005 },
        { height: 350, speed: 0, year: 2006 },
        { height: 450, speed: -250, year: 2007 },
        { height: 350, speed: -350, year: 2008 },
        { height: 250, speed: -480, year: 2009 },
        { height: 150, speed: -600, year: 2010 },
        { height: 200, speed: -780, year: 2011 },
    ],
    // Dataset 2
    [
        { height: 105, speed: 800, year: 2000 },
        { height: 170, speed: 780, year: 2001 },
        { height: 270, speed: 610, year: 2002 },
        { height: 370, speed: 580, year: 2003 },
        { height: 470, speed: 450, year: 2004 },
        { height: 590, speed: 300, year: 2005 },
        { height: 370, speed: 0, year: 2006 },
        { height: 470, speed: -250, year: 2007 },
        { height: 370, speed: -350, year: 2008 },
        { height: 270, speed: -480, year: 2009 },
        { height: 170, speed: -600, year: 2010 },
        { height: 270, speed: -780, year: 2011 },
    ]
];

// Set the domains for the axes
x.domain([d3.min(datasets[2], d => d.year), d3.max(datasets[2], d => d.year)]);
y.domain([0, d3.max(datasets[2], d => d.height)]);

// Append the axes
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickPadding(10));

svg.append("g")
    .call(d3.axisLeft(y).tickPadding(10));

// Draw the top x-axis
const xAxisTop = svg.append("g")
    .attr("transform", `translate(0, ${0})`) // Position at the top
    .call(d3.axisTop(x).ticks(5).tickSize(-10).tickFormat(d => ""));

// Draw the second right y-axis
const yAxisRight = svg.append("g")
    .attr("transform", `translate(${width}, 0)`) // Align it with the right edge of the plot area
    .call(d3.axisRight(y).ticks(10).tickSize(-10).tickFormat(d => ""));
const points = [
    [100, 20], // Top point
    [40, 180], // Bottom left point
    [160, 180] // Bottom right point
].map(d => d.join(",")).join(" ");

datasets.forEach((data, index) => {

    const group = svg.selectAll("all" + index)
        .data(data)
        .enter()
        .append("g") 
        .attr("class", `icon-${index}`)
        .attr("transform", `translate(${index * 10}, 0)`)

    group.each(function (d, i) { // Use each to retain the current group context
        const xx = x(d.year);
        const yy = y(d.height);

        // Create path for the speed category
        let pathData;

        if (d.speed <= 125) {
            console.log(atOrLess1_5m_s(xx, yy, i));
            pathData = atOrLess1_5m_s(xx, yy, i);
        } else if (d.speed > 125 && d.speed <= 250) {
            pathData = at2_50m_s(xx, yy, i);
        } else if (d.speed > 250 && d.speed <= 500) {
            pathData = at5_00m_s(xx, yy, i);
        } else if (d.speed > 500 && d.speed <= 750) {
            pathData = at7_50m_s(xx, yy, i);
        } else if (d.speed > 750 && d.speed <= 1000) {
            pathData = at10_00m_s(xx, yy, i);
        } else if (d.speed > 1000 && d.speed <= 1500) {
            pathData = at15_00m_s(xx, yy, i);
        } else if (d.speed > 1500 && d.speed <= 1750) {
            pathData = at17_50m_s(xx, yy, i);
        } else if (d.speed > 1750 && d.speed <= 2250) {
            pathData = at22_50m_s(xx, yy, i);
        } else if (d.speed > 2250 && d.speed <= 2500) {
            console.log("yess");

            // Define triangle points
            const points = `${xx - 5},${yy - 10} ${xx - 5},${yy + 10} ${xx + 5},${yy + 10}`; // Triangle points

            // Append the triangle to the current group
            d3.select(this).append('polygon')
                .attr("points", points)
                .attr("class", "triangle")
                .attr("fill", "blue"); // Change color as desired

            // Append the underline line
            d3.select(this).append('line')
                .attr("x1", xx - 5) // Left point of the triangle
                .attr("y1", yy + 10) // Bottom left point of the triangle
                .attr("x2", xx + 20) // Right point of the triangle
                .attr("y2", yy + 10) // Bottom right point of the triangle
                .attr("stroke", "blue") // Change line color as desired
                .attr("stroke-width", 2); // Line thickness

            pathData = ""; // Return an empty string for the path data
        } else if (d.speed > 2500 && d.speed <= 3500) {
            console.log("yess");

            // Define triangle points
            const points = `${xx - 5},${yy - 10} ${xx - 5},${yy + 10} ${xx + 5},${yy + 10}`; // Triangle points

            // Append the triangle to the current group
            d3.select(this).append('polygon')
                .attr("points", points)
                .attr("class", "triangle")
                .attr("fill", "blue"); // Change color as desired

            const linePath = `M${xx},${yy} 
                L${xx},${yy + 9} 
                 L${xx + 4},${yy + 9} 
                L${xx + 4},${yy - 10} 
                L${xx + 4},${yy + 9}
                L${xx + 15},${yy + 9}
                L${xx + 15},${yy - 10} 
               L${xx + 15},${yy + 9}
                L${xx + 35},${yy + 9}   
                `;

            // Append the custom path line to the current group
            d3.select(this).append('path')
                .attr('d', linePath) // Set the path data
                .attr("stroke", "blue") // Line color
                .attr("fill", "none") // No fill for the path
                .attr("stroke-width", 2); // Line thickness



            pathData = ""; // Return an empty string for the path data
        } else if (d.speed > 3500 && d.speed <= 3700) {
            console.log("yess");

            // Define triangle points
            const points = `${xx - 5},${yy - 10} ${xx - 5},${yy + 10} ${xx + 5},${yy + 10}`; // Triangle points

            // Append the triangle to the current group
            d3.select(this).append('polygon')
                .attr("points", points)
                .attr("class", "triangle")
                .attr("fill", "blue"); // Change color as desired

            const linePath = `M${xx},${yy} 
                L${xx},${yy + 9} 
                 L${xx + 4},${yy + 9} 
                L${xx + 4},${yy - 10} 
                L${xx + 4},${yy + 9}
                L${xx + 15},${yy + 9}
                L${xx + 15},${yy - 10} 
               L${xx + 15},${yy + 9}
                L${xx + 25},${yy + 9} 
                 L${xx + 25},${yy - 4} 
                 L${xx + 25},${yy + 9} 
                 L${xx + 35},${yy + 9} 


                `;

            // Append the custom path line to the current group
            d3.select(this).append('path')
                .attr('d', linePath) // Set the path data
                .attr("stroke", "blue") // Line color
                .attr("fill", "none") // No fill for the path
                .attr("stroke-width", 2); // Line thickness



            pathData = ""; // Return an empty string for the path data
        } else if (d.speed > 3700 && d.speed <= 5000) {
            console.log("yess");

            // Define triangle points
            const points = `${xx - 5},${yy - 10} ${xx - 5},${yy + 10} ${xx + 5},${yy + 10}`; // Triangle points
            const points1 = `${xx + 5},${yy - 10} ${xx + 5},${yy + 10} ${xx + 15},${yy + 10}`; // Triangle points

            // Append the triangle to the current group
            d3.select(this).append('polygon')
                .attr("points", points)
                .attr("class", "triangle")
                .attr("fill", "blue"); // Change color as desired
            // Append the triangle to the current group
            d3.select(this).append('polygon')
                .attr("points", points1)
                .attr("class", "triangle")
                .attr("fill", "blue"); // Change color as desired

            d3.select(this).append('line')
                .attr("x1", xx - 5) // Left point of the triangle
                .attr("y1", yy + 10) // Bottom left point of the triangle
                .attr("x2", xx + 20) // Right point of the triangle
                .attr("y2", yy + 10) // Bottom right point of the triangle
                .attr("stroke", "blue") // Change line color as desired
                .attr("stroke-width", 2); // Line thickness


            pathData = ""; // Return an empty string for the path data
        } else {
            pathData = ""; // Return an empty string or some default if speed > 2500
        }

        // Create the path element
        d3.select(this).append('path')
            .attr("d", pathData)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2);
    });


    // Create a group for each dataset
    // const group = svg.selectAll("all" + index)
    //     .data(data)
    //     .enter()
    //     .append("g") // Use a group to manage paths and triangles
    //     .attr("class", `icon-${index}`);

    // group.append('path')
    //     .attr("d", (d, i) => {
    //         const speed = d.speed;
    //         const xx = x(d.year);
    //         const yy = y(d.height);

    //         if (speed <= 125) {
    //             console.log(atOrLess1_5m_s(xx, yy, i));
    //             return atOrLess1_5m_s(xx, yy, i);
    //         }
    //         if (speed > 125 && speed <= 250) {
    //             return at2_50m_s(xx, yy, i);
    //         }
    //         if (speed > 250 && speed <= 500) {
    //             return at5_00m_s(xx, yy, i);
    //         }
    //         if (speed > 500 && speed <= 750) {
    //             return at7_50m_s(xx, yy, i);
    //         }
    //         if (speed > 750 && speed <= 1000) {
    //             return at10_00m_s(xx, yy, i);
    //         }
    //         if (speed > 1000 && speed <= 1500) {
    //             return at15_00m_s(xx, yy, i);
    //         }
    //         if (speed > 1500 && speed <= 1750) {
    //             return at17_50m_s(xx, yy, i);
    //         }
    //         if (speed > 1750 && speed <= 2250) {
    //             return at22_50m_s(xx, yy, i);
    //         }
    //         // if (speed > 2250 && speed <= 2500) {
    //         //     console.log("yess");
    //         //     // Returning coordinates to draw a triangle
    //         //     return makeLine(xx, yy, i); // This function should return the path data for the triangle
    //         // }
    //         // Return an empty string or some default if speed > 2500
    //         return "";
    //     })
    //     .attr("fill", "none")
    //     .attr("stroke", "blue")
    //     .attr("stroke-width", 2);

    // Append triangle only if speed is within the desired range
    // group.filter(d => d.speed > 2250 && d.speed <= 2500)
    //     .append('polygon')
    //     .attr("points", (d, i) => {
    //         const xx = x(d.year);
    //         const yy = y(d.height);
    //         // Define triangle points based on xx, yy
    //         return `${xx},${yy - 10} ${xx - 10},${yy + 10} ${xx + 10},${yy + 10}`; // Adjust points as needed
    //     })
    //     .attr("class", "triangle")
    //     .attr("fill", "red"); // Change color as desired

    // group.filter(d => d.speed > 2250 && d.speed <= 2500)
    //     .each(function (d, i) {
    //         const xx = x(d.year);
    //         const yy = y(d.height);
    //         const points = `${xx - 5},${yy - 10} ${xx - 5},${yy + 10} ${xx + 5},${yy + 10}`; // Triangle points

    //         // Append the triangle
    //         d3.select(this).append('polygon')
    //             .attr("points", points)
    //             .attr("class", "triangle")
    //             .attr("fill", "blue"); // Change color as desired

    //         // Append the underline line
    //         d3.select(this).append('line')
    //             .attr("x1", xx - 5) // Left point of the triangle
    //             .attr("y1", yy + 10) // Bottom left point of the triangle
    //             .attr("x2", xx + 15) // Right point of the triangle
    //             .attr("y2", yy + 10) // Bottom right point of the triangle
    //             .attr("stroke", "blue") // Change line color as desired
    //             .attr("stroke-width", 2); // Line thickness
    //     });
    // group.filter(d => d.speed > 2250 && d.speed <= 2500)
    //     .each(function (d, i) {
    //         const xx = x(d.year);
    //         const yy = y(d.height);
    //         const points = `${xx - 5},${yy - 10} ${xx - 5},${yy + 10} ${xx + 5},${yy + 10}`; // Triangle points

    //         // Append the triangle
    //         d3.select(this).append('polygon')
    //             .attr("points", points)
    //             .attr("class", "triangle")
    //             .attr("fill", "blue"); // Change color as desired

    //         // Append the underline line
    //         d3.select(this).append('line')
    //             .attr("x1", xx - 5) // Left point of the triangle
    //             .attr("y1", yy + 10) // Bottom left point of the triangle
    //             .attr("x2", xx + 15) // Right point of the triangle
    //             .attr("y2", yy + 10) // Bottom right point of the triangle
    //             .attr("stroke", "blue") // Change line color as desired
    //             .attr("stroke-width", 2); // Line thickness
    //     });
});



//speed less than 1.5m/s
function atOrLess1_5m_s(xx, yy, u_index) {
    return `M${xx},${yy} L${xx + 25},${yy}`;
}
//speed between 1.5 to 2.5
function at2_50m_s(xx, yy, u_index) {
    return `M${xx},${yy} L${xx},${yy + 9} L${xx + 25},${yy + 9}`;
}
//speed between 2.50 to 5.00
function at5_00m_s(xx, yy, u_index) {
    return `M${xx},${yy} L${xx},${yy + 15} L${xx + 25},${yy + 15}`;
}
//speed between 5.00 to 7.50
function at7_50m_s(xx, yy, u_index) {
    return `M${xx},${yy} 
    L${xx},${yy + 25} 
    L${xx + 10},${yy + 25} 
    L${xx + 10},${yy + 25} 
    L${xx + 10},${yy + 25} 
    L${xx + 50},${yy + 25} 
    `;
}
//speed between 7.50 to 10.00
function at10_00m_s(xx, yy, u_index) {
    return `M${xx},${yy} 
    L${xx},${yy + 25} 
    L${xx + 10},${yy + 25} 
    L${xx + 10},${yy} 
    L${xx + 10},${yy + 25} 
    L${xx + 50},${yy + 25} 
    `;
}
//speed between 10.00 to 15.00
function at15_00m_s(xx, yy, u_index) {
    return `M${xx},${yy} 
    L${xx},${yy + 25} 
    L${xx + 10},${yy + 25} 
    L${xx + 10},${yy} 
    L${xx + 10},${yy + 25} 
    L${xx + 20},${yy + 25} 
    L${xx + 20},${yy + 25} 
    L${xx + 20},${yy} 
    L${xx + 20},${yy + 25} 
    L${xx + 50},${yy + 25} `;
}
//speed between 15.00 to 17.50
function at17_50m_s(xx, yy, u_index) {
    return `M${xx},${yy} 
    L${xx},${yy + 25} 
    L${xx + 10},${yy + 25} 
    L${xx + 10},${yy} 
    L${xx + 10},${yy + 25} 
    L${xx + 20},${yy + 25} 
    L${xx + 20},${yy + 25} 
    L${xx + 20},${yy} 
    L${xx + 20},${yy + 25} 
    L${xx + 30},${yy + 25} 
    L${xx + 30},${yy + 25} 
    L${xx + 30},${yy + 25} 
    L${xx + 50},${yy + 25}
     `;
}
//speed between 17.50 to 22.50
function at22_50m_s(xx, yy, u_index) {
    return `M${xx},${yy} 
    L${xx},${yy + 25} 
    L${xx + 10},${yy + 25} 
    L${xx + 10},${yy} 
    L${xx + 10},${yy + 25} 
    L${xx + 20},${yy + 25} 
    L${xx + 20},${yy + 25} 
    L${xx + 20},${yy} 
    L${xx + 20},${yy + 25} 
    L${xx + 30},${yy + 25} 
    L${xx + 30},${yy} 
    L${xx + 30},${yy + 25} 
    L${xx + 40},${yy + 25} 
    L${xx + 40},${yy + 25} 
    L${xx + 40},${yy + 25}
    L${xx + 60},${yy + 25}
     `;
}
//speed between 22.50 to 25.00
function at25_00m_s(xx, yy, u_index) {

    return `M${xx},${yy} 
    L${xx},${yy + 25} 
    L${xx + 10},${yy + 25} 
    L${xx},${yy + 25} 
    L${xx},${yy} 
    L${xx + 9},${yy + 25} 
     `;
}
function aO(xx, yy, i) {
    return `
        M${xx},${yy}               // Move to the top vertex
        L${xx + 10},${yy + 50}     // Line to the bottom left
        L${xx + 20},${yy}          // Line to the bottom right
        Z                          // Close the path to form a triangle
    `;
}
function makeLine(xx, yy, i) {
    return `M${xx},${yy + 9.1} L${xx + 25},${yy + 9.1}`;
}

// // 
// function at2_50m_s(xx, yy, u_index) {
//     // svg.selectAll(`.icon - ${ u_index } `)
//     //     .enter()
//     //     .append("path")
//     //     .attr("class", `icon - ${ u_index } `) // Give each dataset a unique class
//     //     .attr("d", (d) => {
//     //         const xx = x(d.year);
//     //         const yy = y(d.height);
//     //         // Create the L-shaped icon path
//     return `M${ xx },${ yy } L${ xx },${ yy + 9 } L${ xx + 25 },${ yy + 9 } `;
//     // })
//     // .attr("fill", "none")
//     // .attr("stroke", "blue")// index === 0 ? "blue" : index === 1 ? "red" : "green") // Different colors for each dataset
//     // .attr("stroke-width", 2);
// }





// .data(datasets[0])
// .enter()
// .append("path")
// .attr("class", `icon - ${ 1 } `) // Give each dataset a unique class
// .attr("d", (d) => {
//     const xx = x(d.year);
//     const yy = y(d.height);
//     // Create the L-shaped icon path
//     return `M${ xx },${ yy } L${ xx },${ yy + 9 } L${ xx + 25 },${ yy + 9 } `;
// })
// .attr("fill", "none")
// .attr("stroke", "blue")// index === 0 ? "blue" : index === 1 ? "red" : "green") // Different colors for each dataset
// .attr("stroke-width", 2);