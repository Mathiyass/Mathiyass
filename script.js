/* ========================================
   MATHIYA — Script
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ---- Typing Effect ----
  const lines = [
    "Full-Stack Engineer 🚀",
    "Software Engineering @ BCU 🎓",
    "AI & Machine Learning Enthusiast 🧠",
    "Building the Future with Code ⚡",
    "Cloud Architecture & DevOps ☁️",
  ];
  const speed = 70;
  const eraseSpeed = 35;
  const pauseAfterType = 2000;
  const pauseAfterErase = 400;
  let lineIndex = 0;
  let charIndex = 0;

  const typingEl = document.querySelector(".typing-text");

  function typeLine() {
    if (!typingEl) return;
    if (charIndex < lines[lineIndex].length) {
      typingEl.textContent += lines[lineIndex].charAt(charIndex++);
      setTimeout(typeLine, speed);
    } else {
      setTimeout(eraseLine, pauseAfterType);
    }
  }

  function eraseLine() {
    if (charIndex > 0) {
      typingEl.textContent = lines[lineIndex].slice(0, --charIndex);
      setTimeout(eraseLine, eraseSpeed);
    } else {
      lineIndex = (lineIndex + 1) % lines.length;
      setTimeout(typeLine, pauseAfterErase);
    }
  }

  typeLine();

  // ---- Scroll Reveal ----
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealEls.forEach((el) => revealObserver.observe(el));

  // ---- Particle Background ----
  const canvas = document.getElementById("particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h;
    let particles = [];
    const particleCount = 60;
    const connectionDistance = 120;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      };
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 225, ${p.alpha})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 225, ${0.06 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    init();
    animate();

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(init, 200);
    });
  }

});
