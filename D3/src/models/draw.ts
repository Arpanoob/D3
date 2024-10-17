export const drawTriangle = (group: any, xx: number, yy: number, color: string = "blue") => {
    const points = `${xx - 5},${yy - 10} ${xx - 5},${yy + 10} ${xx + 5},${yy + 10}`;
    group.append('polygon')
        .attr("points", points)
        .attr("class", "triangle")
        .attr("fill", color);
}

export const drawLine = (group: any, x1: number, y1: number, x2: number, y2: number, color: string = "blue", width: number = 2) => {
    group.append('line')
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", color)
        .attr("stroke-width", width);
}

export const drawCustomPath = (group: any, pathData: string, color: string = "blue") => {
    group.append('path')
        .attr("d", pathData)
        .attr("stroke", color)
        .attr("fill", "none")
        .attr("stroke-width", 2);
}
