import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as mixbox from './mixbox.esm.js';

const svgWidth = window.innerWidth;
const svgHeight = 650;

const mix_t = [];
var clickcount = 0;

const numCols = 5;
const rectSize = 50;
const buttonSize = 25;
const gapSize = 10;
const padding = (svgWidth - (numCols * (rectSize + gapSize + buttonSize) + gapSize)) / 2;
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

        // Color rects
        d3.select(svg)
            .selectAll(".color-rect")
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