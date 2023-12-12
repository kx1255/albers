import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './inuse.scss';
import * as d3 from 'd3';

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

const numCols = 15;
const rectSize = 50;
const buttonSize = 25;
const gapSize = 10;

function distance(color1, color2) {
    // Calculate the distance between two colors using a basic distance formula
    const rDiff = color2[0] - color1[0];
    const gDiff = color2[1] - color1[1];
    const bDiff = color2[2] - color1[2];
    return Math.sqrt(Math.pow(rDiff, 2) + Math.pow(gDiff, 2) + Math.pow(bDiff, 2));
}

function isColorSimilar(color1, color2, threshold) {
    // Check if the distance between two colors is less than the threshold
    return distance(color1, color2) < threshold;
}

function processImage(canvas, selectedColor, imageUrl) {
    console.log('Processing image with selected color:', selectedColor);
    const ctx = canvas.getContext('2d');
    const image = new Image();
    const threshold = 100; // Adjust as needed for color similarity

    image.onload = () => {
        canvas.width = image.height;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const pixelColor = [data[i], data[i + 1], data[i + 2]];

            // Check if the pixel's color is similar to the selected color
            if (isColorSimilar(pixelColor, selectedColor, threshold)) {
                // Highlight the pixel by changing its color to white
                data[i] = selectedColor[0]; // Set red channel to max
                data[i + 1] = selectedColor[1]; // Set green channel to max
                data[i + 2] = selectedColor[2]; // Set blue channel to max
            } else {
                if (selectedColor[0] === 249 && selectedColor[1] === 250 && selectedColor[2] === 249) {
                    // Set other colors to black for better contrast
                    data[i] = 0; // Set red channel to min
                    data[i + 1] = 0; // Set green channel to min
                    data[i + 2] = 0; // Set blue channel to min
                } else {
                    data[i] = 255; // Set red channel to white
                    data[i + 1] = 255; // Set green channel to white
                    data[i + 2] = 255; // Set blue channel to white
                }
            }
        }

        console.log('Updated Canvas Element:', canvas);

        ctx.putImageData(imageData, 0, 0);
    };

    image.src = imageUrl;
}


function Inuse() {
    const location = useLocation();
    const imageSrc = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get('image');
    }, [location.search]);

    const canvasRef = useRef(null);
    const svgRef = useRef(null);

    const handleColorSelection = useCallback((selectedColor) => {
        const canvas = canvasRef.current;

        processImage(canvas, selectedColor, imageSrc);
    }, [imageSrc]);

    useEffect(() => {
        const svg = svgRef.current;
        colorClicker(svg, handleColorSelection);
    }, [handleColorSelection]);

    return (
        <div>
            <div className="artwork">
                <img src={imageSrc} alt="" loading="lazy" height={window.innerWidth * 0.4} />
                <canvas ref={canvasRef} loading="lazy" className='centered-image' />
            </div>
            <svg ref={svgRef} width={window.innerWidth} height={200} />
        </div>
    );
}


function colorClicker(svg, handleColorSelection) {
    const padding = (svg.getAttribute('width') - (numCols * (rectSize + gapSize + buttonSize) + gapSize)) / 2;

    d3.select(svg)
        .selectAll('.color-rect')
        .data(colors)
        .enter()
        .append('rect')
        .attr('class', 'color-rect')
        .attr('x', (d, i) => {
            const col = i % numCols;
            return col * (rectSize + gapSize + buttonSize) + padding;
        })
        .attr('y', 20)
        .attr('width', rectSize)
        .attr('height', rectSize)
        .attr('fill', (d) => `rgb(${d[0]}, ${d[1]}, ${d[2]})`)
        .attr('stroke', 'gray')
        .attr('stroke-width', 0.25);

    d3.select(svg)
        .selectAll('.color-rect')
        .on('click', (event, d) => {
            const selectedColor = d;
            // Update the UI to indicate the selected color
            d3.select(svg)
                .selectAll('.color-rect')
                .attr('opacity', 1);
            d3.select(event.target)
                .attr('opacity', 0.5);
                
            handleColorSelection(selectedColor);
        });
}


export default Inuse;