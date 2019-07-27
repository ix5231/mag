// Constant for calculations
const mu_0 = 4*Math.PI*1e-7;

// Styling
const lineWidth = 7;
const margin = 0;
const dotSize = 5;
const maxN = 1000;

const defaults = {
    current: 1,
    radius: 1,
    vertex: 3,
};

function clear(canvasCtx, size) {
    const radius = (size - lineWidth) / 2 - margin;

    canvasCtx.fillStyle = '#fdfdfd';
    canvasCtx.fillRect(0, 0, size, size);

    canvasCtx.beginPath();
    canvasCtx.strokeStyle = '#812cb2';
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.arc(size / 2, size / 2, radius, 0, 2*Math.PI, false);
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.fillStyle = '#ef055b';
    canvasCtx.arc(size / 2, size / 2, dotSize, 0, 2*Math.PI, false);
    canvasCtx.fill();
}

function drawLines(canvasCtx, size, n) {
    const radius = (size - lineWidth) / 2 - margin;

    canvasCtx.beginPath();
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = '#ef055b';
    canvasCtx.moveTo(size / 2 + radius, size / 2);

    // "Optimize"
    n = Math.min(n, maxN);

    for (let i = 0; i < n; i++) {
        const theta = 2*Math.PI / n * (i + 1);
        canvasCtx.lineTo(
            size / 2 + radius * Math.cos(theta),
            size / 2 + radius * Math.sin(theta)
        );
    }
    canvasCtx.stroke();
}

function calcB(I, a) {
    return (mu_0*I) / (2*a)
}

function calcBPrime(I, a, n) {
    return (mu_0*I*n) / (2*Math.PI*a) * Math.tan(Math.PI/n);
}

export default { defaults, calcB, calcBPrime, clear, drawLines };
