import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as mixbox from './mixbox.esm.js';

const svgWidth = window.innerWidth;
const svgHeight = 650;

const mix_t = [];
var clickcount = 0;

const rectSize = 50;
const buttonSize = 25;
const gapSize = 10;
const toprectheight = svgHeight / 2;
const toprectwidth = svgWidth / 4;


const colors = [
    [249, 250, 249],//white
    [252, 211, 0],//hansa yellow
    [255, 35, 2],//cadmium red
    [25, 0, 89],//Ultramarine Blue 
    [0, 0, 0]
];

for (let i = 0; i < colors.length; i++) {
    mix_t[i] = {
        key: colors[i],
        value: 0
    };
}
const padding = (svgWidth - (colors.length * (rectSize + gapSize + buttonSize) + gapSize)) / 2;


function Hard() {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;
        setup(svg);
    }, []);

    const setup = (svg) => {
        d3.select('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

        // Randomly generate color
        let randomColor = [
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256)
        ];

        // Random color rect
        d3.select(svg)
            .append("rect")
            .attr("class", "rand-color-rect")
            .attr("x", svgWidth / 2 - toprectwidth)
            .attr("y", 10 + gapSize)
            .attr("width", toprectwidth)
            .attr("height", toprectheight)
            .attr("fill", `rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`)
            .attr('stroke', 'gray')
            .attr('stroke-width', 0.25);

        // Mixed color rect
        d3.select(svg)
            .append("rect")
            .attr("class", "mixed-color-rect")
            .attr("x", svgWidth / 2)
            .attr("y", 10 + gapSize)
            .attr("width", toprectwidth)
            .attr("height", toprectheight)
            .attr("fill", 'white')

            .attr('stroke', 'gray')
            .attr('stroke-width', 0.25);

        // Refresh button
        d3.select(svg)
            .append("foreignObject")
            .attr("class", "refresh-button")
            .attr("x", svgWidth / 2 + toprectwidth + 40)
            .attr("y", 10 + gapSize)
            .attr("width", rectSize / 2)
            .attr("height", rectSize / 2)
            .attr("fill", "gray")
            .html("<input type='button' value=&#10227 style='width: 100%; height: 100%;'>")
            .on("click", refreshColors);

        function refreshColors() {
            // Generate a new random color
            const newColor = [
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256)
            ];
            console.log("new color: " + newColor);

            d3.select("#rand-color-rect")
                .attr("fill", `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`);

            // Reset the mixed color rect
            d3.select(".mixed-color-rect")
                .attr("fill", "white");

            // Reset mix_t values
            mix_t.forEach((item) => {
                item.value = 0;
            });

            // Reset clickcount
            clickcount = 0;
            updateStackedBarChart();

        }
        function updateStackedBarChart() {
            d3.select('.stacked-bar-chart').remove();

            const colorScale = d3.scaleLinear()
                .domain([0, clickcount])
                .range([0, toprectheight]);

            let accumulatedHeight = 0;

            d3.select('svg')
                .append('g')
                .attr('class', 'stacked-bar-chart')
                .selectAll('rect')
                .data(mix_t)
                .enter()
                .append('rect')
                .attr("x", svgWidth / 2 + toprectwidth + 10)
                .attr("y", (d) => {
                    const rectHeight = colorScale(d.value);
                    const y = accumulatedHeight + 10 + gapSize;
                    accumulatedHeight += rectHeight;
                    return toprectheight - y - rectHeight;
                })
                .attr('width', 20)
                .attr('height', (d) => colorScale(d.value))
                .attr('fill', (d) => `rgb(${d.key[0]}, ${d.key[1]}, ${d.key[2]})`);
        }

        // Color rects
        d3.select(svg)
            .selectAll(".color-rect")
            .data(colors)
            .enter()
            .append("rect")
            .attr("class", "color-rect")
            .attr("x", (d, i) => {
                const col = i % colors.length;
                return col * (rectSize + gapSize + buttonSize) + padding;
            })
            .attr("y", (d, i) => {
                const row = Math.floor(i / colors.length);
                return row * (rectSize + gapSize + buttonSize) + buttonSize + toprectheight + gapSize;
            })
            .attr("width", rectSize)
            .attr("height", rectSize)
            .attr("fill", (d) => `rgb(${d[0]}, ${d[1]}, ${d[2]})`)
            .attr('stroke', 'gray')
            .attr('stroke-width', 0.25);

        // plusButtons = 
        d3.select(svg)
            .selectAll(".plus-button")
            .data(mix_t)
            .enter()
            .append("foreignObject")
            .attr("class", "plus-button")
            .attr("x", (d, i) => {
                const col = i % colors.length;
                return col * (rectSize + gapSize + buttonSize) + padding + rectSize;
            })
            .attr("y", (d, i) => {
                const row = Math.floor(i / colors.length);
                return row * (rectSize + gapSize + buttonSize) + buttonSize + toprectheight + gapSize;
            })
            .attr("width", buttonSize)
            .attr("height", buttonSize)
            .html("<input type='button' value='+' style='width: 100%; height: 100%;'>")
            .on("click", (d, i) => {
                clickcount++;
                i.value = i.value + 1;

                updateColor();
            });

        // minusButtons 
        d3.select(svg)
            .selectAll(".minus-button")
            .data(mix_t)
            .enter()
            .append("foreignObject")
            .attr("class", "minus-button")
            .attr("x", (d, i) => {
                const col = i % colors.length;
                return col * (rectSize + gapSize + buttonSize) + padding + rectSize;
            })
            .attr("y", (d, i) => {
                const row = Math.floor(i / colors.length);
                return row * (rectSize + gapSize + buttonSize) + buttonSize + toprectheight + gapSize + buttonSize;
            })
            .attr("width", buttonSize)
            .attr("height", buttonSize)
            .html("<input type='button' value='-' style='width: 100%; height: 100%;'>")
            .on("click", (d, i) => {
                if (clickcount > 0) {
                    clickcount--;
                }
                else { clickcount = 0; }

                if (i.value > 0) {
                    i.value = i.value - 1;
                } else {
                    i.value = 0;
                }
                updateColor();

            });

        function updateColor() {
            if (clickcount === 0) {
                return 'rgb(255, 255, 255)';
            }
            else {
                let latent_mix = [0, 0, 0, 0, 0, 0, 0];
                for (let j = 0; j < mix_t.length; j++) {
                    if (mix_t[j].value) {
                        let latent = mixbox.default.rgbToLatent(colors[j]);
                        let t = mix_t[j].value / clickcount;

                        for (let k = 0; k < latent.length; k++) {
                            latent_mix[k] += latent[k] * t;
                        }
                    }
                }

                let mix = mixbox.default.latentToRgb(latent_mix);
                d3.selectAll(".mixed-color-rect")
                    .attr("fill", `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`);

                updateStackedBarChart();

            }
        };
    };


    return (
        <div >
            <svg ref={svgRef} width={window.innerWidth} height={600} />
        </div>
    );
}


export default Hard;