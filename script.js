document.addEventListener("DOMContentLoaded", () => {
  // --- 1. TYPEWRITER ENGINE ---
  const lines = [
    "Lead Systems Architect & AI Engineer ⚡",
    "Scalable Multi-Agent AI Ecosystems 🤖",
    "WebGL 2.0 Graphics & Custom GLSL Shaders 🎮",
    "High-Performance Distributed Cloud Architectures 🚀",
  ];
  
  const typeSpeed = 60;
  const eraseSpeed = 30;
  const pauseDuration = 2200;
  
  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingEl = document.querySelector(".typing");
  if (typingEl) {
    const cursorEl = document.createElement("span");
    cursorEl.classList.add("cursor");
    cursorEl.textContent = "\u00A0";
    typingEl.after(cursorEl);

    function tick() {
      const currentText = lines[lineIndex];

      if (!isDeleting) {
        typingEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(tick, pauseDuration);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        typingEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          lineIndex = (lineIndex + 1) % lines.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, eraseSpeed);
      }
    }

    setInterval(() => {
      cursorEl.classList.toggle("inactive");
    }, 500);

    setTimeout(tick, 500);
  }

  // --- 2. 60FPS INTERACTIVE NEURAL PARTICLE MESH ---
  const canvas = document.getElementById("neural-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 65);
  const maxDistance = 140;

  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 1.8 + 1;
      this.color = Math.random() > 0.4 ? "#00DFD8" : "#7701D0";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 223, 216, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
});
