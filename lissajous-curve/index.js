import canvasSketch from 'canvas-sketch';
import { renderPaths } from 'canvas-sketch-util/penplot';

/*
Lissajous curve
x = A * sin(a + angle)
y = B * sin(b)

A -> Amplitude in X
B -> Amplitude in Y
a/b -> Figure appearance
*/
const getLissajousCurve = ({ amplitudeX, amplitudeY, offsetX, offsetY, a, b, angle = Math.PI / 2, length }) =>
  new Array(length)
    .fill(null)
    .map((_, i) => [
      offsetX + amplitudeX * Math.sin(a * i * 0.01 + angle),
      offsetY + amplitudeY * Math.sin(b * i * 0.01),
    ]);

// You can force a specific seed by replacing this with a string value
const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const sketch = ({ context, width, height }) => {
  context.fillStyle = 'white';
  context.fillRect(0, 0, width, height);

  const lines = new Array(30).fill(null).map((l, index) => {
    return getLissajousCurve({
      amplitudeX: width / 2.2,
      amplitudeY: height / 3,
      offsetX: width / 2,
      offsetY: height / 2 + index * 0.2 - 4.3,
      a: 3,
      b: 5,
      angle: 0,
      length: 650,
    });
  });

  return (props) =>
    renderPaths(lines, {
      ...props,
      lineWidth: 0.08,
      lineJoin: 'round',
      // Optimize SVG paths for pen plotter use
      optimize: true,
    });
};

canvasSketch(sketch, settings);
