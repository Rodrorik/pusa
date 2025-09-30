const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
let hearts = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Heart {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.opacity = 1;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size, this.size);
    ctx.beginPath();
    ctx.moveTo(0, -2);
    ctx.bezierCurveTo(2, -4, 4, 0, 0, 4);
    ctx.bezierCurveTo(-4, 0, -2, -4, 0, -2);
    ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
    ctx.fill();
    ctx.restore();
  }
  update() {
    this.y -= this.speed;
    this.opacity -= 0.003;
  }
}

function spawnHeart() {
  let x = Math.random() * canvas.width;
  let y = canvas.height + 10;
  let size = Math.random() * 0.6 + 0.2;
  let speed = Math.random() * 5 + 0.5;
  hearts.push(new Heart(x, y, size * 10, speed));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((h, i) => {
    h.update();
    h.draw();
    if (h.opacity <= 0) hearts.splice(i, 1);
  });
  if (Math.random() < 0.2) spawnHeart();
  requestAnimationFrame(animate);
}
animate();

