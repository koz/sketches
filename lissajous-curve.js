const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

/*
Lissajous curve
x = A * sin(a + angle)
y = B * sin(b)

A -> Amplitude in X
B -> Amplitude in Y
a/b -> Figure appearance
*/

const getLissajousCurve = ({
  amplitudeX,
  amplitudeY,
  offsetX,
  offsetY,
  a,
  b,
  angle = Math.PI / 2,
  length,
}) => {
  const points = []
  let counter = 0;
  for (i=0; i < length; i+=1) {
    points.push([offsetX + amplitudeX * Math.sin(a * counter + angle), offsetY + amplitudeY * Math.sin(b * counter)])
    counter+=0.01
  }

  return points
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    for (l = 0; l < 300; l+=10) {
      const points = getLissajousCurve({
        amplitudeX: width / 3,
        amplitudeY: height / 3,
        offsetX: width / 2,
        offsetY: height / 2 + l - 150,
        a: 6,
        b: 3,
        angle: Math.PI / 5,
        length: 650
      })

      context.beginPath();
      context.strokeStyle = 'blue';
      points.forEach((p, i) => {
        if (i === 0) {
          return
        }
        context.lineTo(p[0], p[1])
      })
      context.stroke();
      context.closePath();
    }
  };
};

canvasSketch(sketch, settings);
