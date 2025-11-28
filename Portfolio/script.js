// Dark mode toggle
const toggleBtn = document.getElementById("mode-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  const isDark = document.body.classList.contains("dark");

  if (isDark) {
    sunIcon.style.opacity = "0";
    sunIcon.style.transform = "translateX(100%)";
    moonIcon.style.opacity = "1";
    moonIcon.style.transform = "translateX(0)";
  } else {
    moonIcon.style.opacity = "0";
    moonIcon.style.transform = "translateX(-100%)";
    sunIcon.style.opacity = "1";
    sunIcon.style.transform = "translateX(0)";
  }
  updateSidebarIcons();
});

// Background animation
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const buffer = 1000;
  canvas.width = window.innerWidth + buffer;
  canvas.height = window.innerHeight + buffer;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
}
resizeCanvas();

let particles = [];
for (let i = 0; i < 300; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    dx: Math.random() * 0.5 - 0.25,
    dy: Math.random() * 0.5 - 0.25
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    const isDarkMode = document.body.classList.contains("dark");
ctx.fillStyle = isDarkMode
  ? "rgba(255, 221, 0, 0.6)"   
  : "rgba(168, 85, 247, 0.6)";
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", resizeCanvas);

window.addEventListener("DOMContentLoaded", updateSidebarIcons);

function updateSidebarIcons() {
  const isDark = document.body.classList.contains("dark");
  document.querySelectorAll(".theme-icon").forEach((img) => {
    img.src = isDark ? img.dataset.dark : img.dataset.light;
  });
}

// Avatar hover swap
window.addEventListener("DOMContentLoaded", () => {
  const avatar = document.getElementById("avatar-icon");
  const happySrc = "images/happyIcon.svg";
  const winkSrc = "images/winkIcon.svg";

  if (avatar) {
    avatar.addEventListener("mouseenter", () => {
      avatar.src = winkSrc;
    });

    avatar.addEventListener("mouseleave", () => {
      avatar.src = happySrc;
    });
  }
});

// Glowing cursor effect
const glowCursor = document.createElement("div");
glowCursor.id = "cursor-glow";
document.body.appendChild(glowCursor);

document.addEventListener("mousemove", (e) => {
  glowCursor.style.left = `${e.clientX}px`;
  glowCursor.style.top = `${e.clientY}px`;
});
