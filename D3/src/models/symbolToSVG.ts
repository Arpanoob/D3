import * as d3 from "d3";

export const symbol_SVG = (element: SVGGElement, s: string, xx: number, yy: number, ref: number, speed: number) => {

    // console.log("s p l i t", s.split(''))
    // return `M${xx},${yy} L${xx + 25},${yy}`
    const color = getColorBySpeed(speed)
    console.log(color, speed)
    if (s === 'x')
        d3.select(element).append('circle')
            .attr("cx", xx)
            .attr("cy", yy)
            .attr("r", 5)
            .attr("fill", "transparent")
            .attr("stroke", "blue")
            .attr("stroke-width", 1)
            .style("pointer-events", "all")

    s.split('').forEach((e, i) => {

        switch (e) {
            case 'a': 
            d3.select(element)
                .append('path')
                .attr('d', `M${xx},${yy} L${xx - ref},${yy}`)
                .attr('stroke', color)
                .attr('fill', color);
                break;
            case 'b': if (i == 0) {
                console.log('s')
                d3.select(element)
                    .append('path')
                    .attr('d', `M${xx - ref},${yy} L${xx - ref},${yy - 6}`)
                    .attr('stroke', color)
                    .attr('fill', color);
            } else {
                console.log('hellow speed', s)
                d3.select(element)
                    .append('path')
                    .attr('d', `M${xx + 5 * i - ref},${yy} L${xx + 5 * i - ref},${yy - 6}`)
                    .attr('stroke', color)
                    .attr('fill', color);
            }
                break;
            case 'c': if (i == 0) {
                d3.select(element)
                    .append('path')
                    .attr('d', `M${xx - ref},${yy} L${xx - ref},${yy - 10}`)
                    .attr('stroke', color)
                    .attr('fill', 'none');
            } else {
                d3.select(element)
                    .append('path')
                    .attr('d', `M${xx + 5 * i - ref},${yy} L${xx + 5 * i - ref},${yy - 10}`)
                    .attr('stroke', color)
                    .attr('fill', color);
            }
                break;
            case 'd': if (i == 0) {
                const points1 = `${xx - ref},${yy - 12} ${xx - ref},${yy} ${xx + 5 - ref},${yy}`;

                d3.select(element).append('polygon')
                    .attr("points", points1)
                    .attr("class", "triangle")
                    .attr("fill", color);
            } else {
                const points2 = s.charAt(i - 1) === 'd' ? `${xx + 5 * i - ref},${yy - 12} ${xx + 5 * i - ref},${yy} ${xx + 5 + 5 * i - ref},${yy}` : `${xx + 5 * i - ref + 5},${yy - 12} ${xx + 5 * i - ref + 5},${yy} ${xx + 5 + 5 * i - ref + 5},${yy}`;

                d3.select(element).append('polygon')
                    .attr("points", points2)
                    .attr("class", "triangle")
                    .attr("fill", color);
            }
        }
        return `M${xx},${yy} L${xx + ref},${yy}`
    })
}






export const getColorBySpeed = (speed: number) => {
    // Define the color gradient mapping
    const colorMap = [
        { min: 0, max: 200, color: "#0000ff" },   // 0-10: Blue
        { min: 200, max: 400, color: "#00ccff" },  // 10-20: Sky Blue
        { min: 400, max: 600, color: "#00ffcc" },  // 20-30: Cyan
        { min: 600, max: 800, color: "#0fff0f" },  // 20-30: Cyan
        { min: 800, max: 1000, color: "#4cff00" },  // 30-40: Green
        { min: 1000, max: 1200, color: "#ffff00" },  // 40-50: Yellow
        { min: 1200, max: 1400, color: "#ff9900" },  // 50-60: Orange Yellow
        { min: 1400, max: 1600, color: "#ff4c00" },  // 60-70: Orange
        { min: 1600, max: 1800, color: "#ff0000" },  // 70-80: Red
        { min: 1800, max: 2000, color: "#ff0000" }   // 70-80: Red

    ];

    // Find the appropriate color based on the speed value
    for (const range of colorMap) {
        if (speed >= range.min && speed < range.max) {
            return range.color;
        }
    }

    // If speed is out of range, return a default color or null
    return "#ff0000"; // or any default color
}

// Example usage
// console.log(getColorForWindSpeed(15)); // Should return "#00ffcc"
// console.log(getColorForWindSpeed(40)); // Should return "#ff4c00"
// console.log(getColorForWindSpeed(55)); // Should return null (out of range)





















// import * as d3 from "d3";

// export const symbol_SVG = (element: SVGGElement, s: string, xx: number, yy: number, ref: number) => {

//     // console.log("s p l i t", s.split(''))
//     // return `M${xx},${yy} L${xx + 25},${yy}`

//     if (s === 'x')
//         d3.select(element).append('circle')
//             .attr("cx", xx)
//             .attr("cy", yy)
//             .attr("r", 5)
//             .attr("fill", "transparent")
//             .attr("stroke", "blue")
//             .attr("stroke-width", 1)
//             .style("pointer-events", "all")

//     s.split('').forEach((e, i) => {

//         switch (e) {
//             case 'a': d3.select(element)
//                 .append('path')
//                 .attr('d', `M${xx},${yy} L${xx - 25},${yy}`)
//                 .attr('stroke', 'black')
//                 .attr('fill', 'none');
//                 break;
//             case 'b': if (i == 0) {
//                 console.log('s')
//                 d3.select(element)
//                     .append('path')
//                     .attr('d', `M${xx - 25},${yy} L${xx - 25},${yy - 6}`)
//                     .attr('stroke', 'black')
//                     .attr('fill', 'none');
//             } else {
//                 d3.select(element)
//                     .append('path')
//                     .attr('d', `M${xx + 5 * i - 25},${yy} L${xx + 5 * i - 25},${yy - 6}`)
//                     .attr('stroke', 'black')
//                     .attr('fill', 'none');
//             }
//                 break;
//             case 'c': if (i == 0) {
//                 d3.select(element)
//                     .append('path')
//                     .attr('d', `M${xx - 25},${yy} L${xx - 25},${yy - 10}`)
//                     .attr('stroke', 'black')
//                     .attr('fill', 'none');
//             } else {
//                 d3.select(element)
//                     .append('path')
//                     .attr('d', `M${xx + 5 * i - 25},${yy} L${xx + 5 * i - 25},${yy - 10}`)
//                     .attr('stroke', 'black')
//                     .attr('fill', 'none');
//             }
//                 break;
//             case 'd': if (i == 0) {
//                 const points1 = `${xx - 5 - 25},${yy - 20} ${xx - 5 - 25},${yy} ${xx + 5 - 25},${yy}`;

//                 d3.select(element).append('polygon')
//                     .attr("points", points1)
//                     .attr("class", "triangle")
//                     .attr("fill", "blue");
//             } else {
//                 const points2 = `${xx + 5 * i - 25},${yy - 20} ${xx + 5 * i - 25},${yy} ${xx + 10 + 5 * i - 25},${yy}`;

//                 d3.select(element).append('polygon')
//                     .attr("points", points2)
//                     .attr("class", "triangle")
//                     .attr("fill", "blue");
//             }
//         }
//         return `M${xx},${yy} L${xx + 25},${yy}`
//     })
// }