const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const getSinCurve = ({
  offsetY = 0,
  offsetX = 0,
  amplitude,
  period = 10, // wave length
  distance
}) => {
  const points = []
  let counter = 0;
  for (i = offsetX; i < distance; i += period) {
    points.push([i, offsetY + (Math.sin(counter) * amplitude)])
    counter += period / 200;
  }
  return points
}


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    for (s = 0; s < 1600; s+=800) {
      for (l = 0; l < 600; l+=10) {
        const points = getSinCurve({
          offsetY: 330 + l + s,
          amplitude: 300,
          period: 10,
          distance: width
        })

        context.beginPath();
        context.strokeStyle = 'green';
        points.forEach((p, i) => {
          if (i === 0) {
            return
          }
          context.lineTo(p[0], p[1])
        })
        context.stroke();
        context.closePath();
      }
    }
  };
};

canvasSketch(sketch, settings);
