const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
const simulationInfo = document.getElementById('simulationInfo');

let particles = [];
let numParticles, noiseLevel, interactionRadius;
let isRunning = false;
let animationId;
let stepCount = 0;

const particleSpeed = 2;
const arrowSize = 10;

function initializeParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angle: Math.random() * 2 * Math.PI
    });
  }
}

function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    let avgAngle = particle.angle;
    let numNeighbors = 0;

    for (let j = 0; j < particles.length; j++) {
      if (i !== j) {
        let dx = particles[j].x - particle.x;
        let dy = particles[j].y - particle.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < interactionRadius) {
          avgAngle += particles[j].angle;
          numNeighbors++;
        }
      }
    }

    if (numNeighbors > 0) {
      avgAngle /= (numNeighbors + 1);
      avgAngle += (Math.random() * 2 - 1) * noiseLevel * Math.PI;
    }

    particle.angle = avgAngle;

    let vx = Math.cos(particle.angle) * particleSpeed;
    let vy = Math.sin(particle.angle) * particleSpeed;

    particle.x += vx;
    particle.y += vy;

    if (particle.x < 0) particle.x += canvas.width;
    if (particle.x > canvas.width) particle.x -= canvas.width;
    if (particle.y < 0) particle.y += canvas.height;
    if (particle.y > canvas.height) particle.y -= canvas.height;
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];

    let hue = (particle.angle / (2 * Math.PI)) * 360;

    let rgb = hsvToRgb(hue, 1, 1);

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    ctx.fill();

    let dx = Math.cos(particle.angle) * arrowSize;
    let dy = Math.sin(particle.angle) * arrowSize;

    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y);
    ctx.lineTo(particle.x + dx, particle.y + dy);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
}

function hsvToRgb(h, s, v) {
  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;

  let r, g, b;
  if (h < 60) {
    r = c; g = x; b = 0;
  } else if (h < 120) {
    r = x; g = c; b = 0;
  } else if (h < 180) {
    r = 0; g = c; b = x;
  } else if (h < 240) {
    r = 0; g = x; b = c;
  } else if (h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}

function drawColorWheel() {
  const colorWheel = document.getElementById('colorWheel');
  const ctxColorWheel = colorWheel.getContext('2d');
  const centerX = colorWheel.width / 2;
  const centerY = colorWheel.height / 2;
  const radius = 20;

  for (let angle = 0; angle < 2 * Math.PI; angle += 0.01) {
    let hue = (angle / (2 * Math.PI)) * 360;
    let rgb = hsvToRgb(hue, 1, 1);
    ctxColorWheel.strokeStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    ctxColorWheel.beginPath();
    ctxColorWheel.moveTo(centerX, centerY);
    ctxColorWheel.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
    ctxColorWheel.stroke();
  }
}

function updateSimulationInfo() {
  let density = numParticles * Math.PI * interactionRadius * interactionRadius / (canvas.width * canvas.height);
  simulationInfo.textContent = `Density: ${density.toFixed(6)}, Step: ${stepCount}`;
}

function animate() {
  updateParticles();
  drawParticles();
  stepCount++;
  updateSimulationInfo();
  if (isRunning) {
    animationId = requestAnimationFrame(animate);
  }
}

function startSimulation() {
  numParticles = parseInt(document.getElementById('numParticles').value);
  interactionRadius = parseFloat(document.getElementById('interactionRadius').value);
  noiseLevel = parseFloat(document.getElementById('noiseLevel').value);

  initializeParticles();
  stepCount = 0;
  drawColorWheel();

  if (!isRunning) {
    isRunning = true;
    animate();
  }
}

function clearSimulation() {
  isRunning = false;
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  simulationInfo.textContent = '';
}

document.getElementById('startButton').addEventListener('click', startSimulation);
document.getElementById('stopButton').addEventListener('click', () => {
  isRunning = false;
  cancelAnimationFrame(animationId);
});
document.getElementById('clearButton').addEventListener('click', clearSimulation);
