const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

let x, y, vx, vy, k, m, damping, temperature;
let isRunning = false;
let animationId;
let trail = [];
const trailMaxLength = 200;
const trailFadeTime = 100;

function updatePosition() {
  let ax = (-k * (x - canvas.width / 2) - damping * vx) / m;
  let ay = (-k * (y - canvas.height / 2) - damping * vy) / m;

  // Add thermal noise force
  let noiseForceX = Math.sqrt(2 * damping * temperature) * (Math.random() - 0.5);
  let noiseForceY = Math.sqrt(2 * damping * temperature) * (Math.random() - 0.5);
  ax += noiseForceX / m;
  ay += noiseForceY / m;

  vx += ax;
  vy += ay;
  x += vx;
  y += vy;

  trail.push({ x: x, y: y, alpha: 1 });
  if (trail.length > trailMaxLength) {
    trail.shift();
  }
}

function drawObject() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw trail
  for (let i = 0; i < trail.length; i++) {
    const point = trail[i];
    const alpha = point.alpha - (1 / trailFadeTime);
    if (alpha > 0) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(0, 0, 255, ${alpha})`;
      ctx.fill();
      point.alpha = alpha;
    } else {
      trail.splice(i, 1);
      i--;
    }
  }

  // Draw particle
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.stroke();
}

function animate() {
  updatePosition();
  drawObject();
  if (isRunning) {
    animationId = requestAnimationFrame(animate);
  }
}

function startSimulation() {
  k = parseFloat(document.getElementById('springConstant').value);
  m = parseFloat(document.getElementById('mass').value);
  damping = parseFloat(document.getElementById('damping').value);
  temperature = parseFloat(document.getElementById('temperature').value);
  x = parseFloat(document.getElementById('initialPositionX').value);
  y = parseFloat(document.getElementById('initialPositionY').value);
  vx = parseFloat(document.getElementById('initialVelocityX').value);
  vy = parseFloat(document.getElementById('initialVelocityY').value);

  trail = [];

  if (!isRunning) {
    isRunning = true;
    animate();
  }
}

document.getElementById('startButton').addEventListener('click', startSimulation);

document.getElementById('stopButton').addEventListener('click', () => {
  isRunning = false;
  cancelAnimationFrame(animationId);
});