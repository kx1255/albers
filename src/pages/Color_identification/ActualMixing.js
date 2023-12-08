import React, { useEffect } from 'react';
import d3 from 'd3';
import mixbox from 'mixbox';
const svgWidth = window.innerWidth;
const svgHeight = 650;

const mix_t = [];
var clickcount = 0;

const numCols = 15;
const rectSize = 50;
const buttonSize = 25;
const gapSize = 10;
const padding = (svgWidth - (numCols * (rectSize + gapSize + buttonSize) + gapSize)) / 2;
const toprectheight = svgHeight / 2;
const toprectwidth = svgWidth / 4;

const colors = [
    [249, 250, 249],//white
    [254, 236, 0], //cadmium yellow
    [252, 211, 0],//hansa yellow
    [255, 105, 0],//cadmium orange
    [255, 35, 2],//cadmium red
    [128, 2, 46],//quinacridone magenta
    [78, 0, 66],//cobalt violet
    [25, 0, 89],//Ultramarine Blue 
    [0, 33, 133],//cobalt blue
    [13, 27, 68],//phthalo blue
    [6, 60, 50],//phthalo green
    [7, 109, 22],//permanent green
    [107, 148, 4],//sap green
    [123, 72, 0],//burnt sienna
    [13, 9, 1],
];

function ActualMixing() {
    useEffect(() => {

        for (let i = 0; i < colors.length; i++) {
            mix_t[i] = {
                key: colors[i],
                value: 0
            };
        }
        const percentScale = d3.scaleLinear()
            .domain([0, 1])
            .range([toprectheight, 10 + gapSize]);

        const setup = () => {
            let svg = d3.select('#svg-container')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight);

            // Randomly generate color
            let randomColor = [
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256)
            ];

            // Random color rect
            let randomColorRect = svg.append("rect")
                .attr("x", svgWidth / 2 - toprectwidth)
                .attr("y", 10 + gapSize)
                .attr("width", toprectwidth)
                .attr("height", toprectheight)
                .attr("fill", `rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`)
                .attr("stroke", "black")
                .attr("stroke-width", 1);

            // Mixed color rect
            let mixedColorRect = svg.append("rect")
                .attr("class", "mixed-color-rect")
                .attr("x", svgWidth / 2)
                .attr("y", 10 + gapSize)
                .attr("width", toprectwidth)
                .attr("height", toprectheight)
                .attr("fill", "white")

                .attr("stroke", "black")
                .attr("stroke-width", 1);

            //Create percentage bars
            let percentRect = svg.selectAll("percent-rect")
                .data(mix_t)
                .enter()
                .append("rect")
                .attr("x", svgWidth / 2 + toprectwidth + 5)
                .attr("width", toprectwidth * 0.1)
                .attr("class", "percent-rect");

            const colorRects = svg.selectAll(".color-rect")
                .data(colors)
                .enter()
                .append("rect")
                .attr("class", "color-rect")
                .attr("x", (d, i) => {
                    const col = i % numCols;
                    return col * (rectSize + gapSize + buttonSize) + padding;
                })
                .attr("y", (d, i) => {
                    const row = Math.floor(i / numCols);
                    return row * (rectSize + gapSize + buttonSize) + buttonSize + toprectheight + gapSize;
                })
                .attr("width", rectSize)
                .attr("height", rectSize)
                .attr("fill", (d) => `rgb(${d[0]}, ${d[1]}, ${d[2]})`);

            const plusButtons = svg.selectAll(".plus-button")
                .data(mix_t)
                .enter()
                .append("foreignObject")
                .attr("class", "plus-button")
                .attr("x", (d, i) => {
                    const col = i % numCols;
                    return col * (rectSize + gapSize + buttonSize) + padding + rectSize;
                })
                .attr("y", (d, i) => {
                    const row = Math.floor(i / numCols);
                    return row * (rectSize + gapSize + buttonSize) + buttonSize + toprectheight + gapSize;
                })
                .attr("width", buttonSize)
                .attr("height", buttonSize)
                .html("<input type='button' value='+' style='width: 100%; height: 100%;'>")
                .on("click", (d, i) => {
                    clickcount++;
                    i.value = i.value + 1;
                    updateColor(mixedColorRect);
                    updatePercentage(percentRect);
                });

            const minusButtons = svg.selectAll(".minus-button")
                .data(mix_t)
                .enter()
                .append("foreignObject")
                .attr("class", "minus-button")
                .attr("x", (d, i) => {
                    const col = i % numCols;
                    return col * (rectSize + gapSize + buttonSize) + padding + rectSize;
                })
                .attr("y", (d, i) => {
                    const row = Math.floor(i / numCols);
                    return row * (rectSize + gapSize + buttonSize) + buttonSize + toprectheight + gapSize + buttonSize;
                })
                .attr("width", buttonSize)
                .attr("height", buttonSize)
                .html("<input type='button' value='-' style='width: 100%; height: 100%;'>")
                .on("click", (d, i) => {
                    clickcount--;
                    if (i.value > 0) {
                        i.value = i.value - 1;
                    } else {
                        i.value = 0;
                    }
                    // Call the updateColor function to recalculate the mixed color
                    updateColor(mixedColorRect);
                    updatePercentage(percentRect);
                });
        }

        function updateColor(rect) {
            let mixedColor;

            let latent_mix = [0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < mix_t.length; j++) {
                if (mix_t[j].value) {
                    let latent = mixbox.rgbToLatent(colors[j]);
                    let t = mix_t[j].value / clickcount;

                    for (let k = 0; k < latent.length; k++) {
                        latent_mix[k] += latent[k] * t;
                    }
                }
            }

            mixedColor = mixbox.latentToRgb(latent_mix);

            rect.attr('fill', mixedColor);
        };

        function updatePercentage(rect) {
            let cumulativeHeight = 0;

            rect.attr('height', (d, i) => {
                const yvalue = percentScale(d.value / clickcount);
                const height = Math.abs(cumulativeHeight - yvalue); // Take the absolute value
                cumulativeHeight = yvalue;
                return height;
            })
                .attr('y', (d, i) => {
                    const yvalue = percentScale(d.value / clickcount);
                    const y = yvalue < cumulativeHeight ? yvalue : cumulativeHeight; // Adjust the y position
                    cumulativeHeight = y; // Update cumulativeHeight to the current y value
                    return y;
                })
                .attr('fill', (d, i) => {
                    if (d.value > 0) {
                        return mix_t[i].key;
                    } else {
                        return 'white';
                    }
                });
        };


        // setup();
    }, []);

    return (
        <div style={{ marginTop: '50px' }}>
            <div id="svg-container" /> {/* Container for the SVG */}
        </div>
    );
}


export default ActualMixing;