document.addEventListener("DOMContentLoaded", () => {
  // --- 1. TYPEWRITER ENGINE ---
  const lines = [
    "Lead Systems Architect & AI Engineer ⚡",
    "Scalable Multi-Agent AI Ecosystems (SIVION) 🤖",
    "WebGL 2.0 Graphics & Custom GLSL Shaders 🎮",
    "Windows Low-Latency Kernel Tuning (MA-Optimizer) 🚀",
  ];

  const typeSpeed = 55;
  const eraseSpeed = 28;
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

  // --- 2. NATIVE WEB AUDIO API SYNTHESIZER ---
  let audioCtx = null;
  let sfxEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = "sine", duration = 0.08, gainVal = 0.04) {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback
    }
  }

  const sfxBtn = document.getElementById("sfx-toggle");
  if (sfxBtn) {
    sfxBtn.addEventListener("click", () => {
      initAudio();
      sfxEnabled = !sfxEnabled;
      sfxBtn.textContent = sfxEnabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";
      sfxBtn.classList.toggle("active", sfxEnabled);
      if (sfxEnabled) {
        playTone(880, "sine", 0.1, 0.06);
        setTimeout(() => playTone(1320, "sine", 0.15, 0.06), 100);
      }
    });
  }

  // Button Hover Sounds
  document.querySelectorAll(".hud-btn, .mode-btn, .filter-btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => playTone(540, "triangle", 0.04, 0.02));
    btn.addEventListener("click", () => playTone(880, "sine", 0.08, 0.05));
  });

  // --- 3. PROJECT FILTER ENGINE ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // --- 4. 3D CARD PARALLAX TILT PHYSICS ---
  document.querySelectorAll(".hud-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });

  // --- 5. INTERACTIVE HUD CLI TERMINAL SHELL ---
  const terminalForm = document.getElementById("terminal-form");
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("terminal-output");

  const commands = {
    help: () => [
      "[SYSTEM] Available commands:",
      "  - about     : Architectural background & leadership thesis",
      "  - projects  : List flagship engineering projects",
      "  - skills    : Technical competencies & framework matrix",
      "  - sivion    : SIVION v2.4 multi-agent architecture overview",
      "  - optimizer : MA Optimizer kernel latency specs",
      "  - matrix    : Switch canvas to Cyber Matrix mode",
      "  - audio     : Toggle native audio synthesizer SFX",
      "  - contact   : Official channels (LinkedIn, Discord, Email)",
      "  - resume    : View verified credentials & resume link",
      "  - clear     : Clear terminal history",
    ],
    about: () => [
      "🏛️ Mathisha Angirasa (MATHIYA) — Lead Systems Architect & AI Specialist",
      "  • Dual Presence: Colombo 🇱🇰 & Birmingham 🇬🇧",
      "  • 50+ Production Deployments • 4+ Years Active",
      "  • Specializations: Multi-Agent Swarms, WebGL 2.0 Shaders, Win32 Kernel Tuning",
    ],
    projects: () => [
      "🚀 Flagship Engineering Projects:",
      "  1. MA Optimizer (Windows Kernel OS Tuning Suite) -> mathiya.cc/projects/MA-Optimizer",
      "  2. SIVION Automation (Enterprise Multi-Agent Swarm) -> mathiya.cc/projects/sivion",
      "  3. mathiya.cc & The Lab (WebGL 2.0 & GLSL Shaders) -> mathiya.cc/lab",
      "  4. Dev Marketplace (Kotlin KMP / Native Android) -> mathiya.cc/projects/marketplace",
      "  5. VELORA Paint Factory POS (Full-Stack POS System)",
    ],
    skills: () => [
      "🛠️ Architectural Stack Matrix:",
      "  • AI/ML      : Python 3.12, PyTorch, Multi-Agent Swarms, pgvector RAG, FastAPI",
      "  • Systems    : C++20, Rust, Go, Windows API, Kernel Tuning, PowerShell, POSIX",
      "  • Frontend   : Next.js 16 (Turbopack), React 19, TS 5, WebGL 2.0, GLSL, Tailwind",
      "  • Cloud/DB   : Node.js, Bun, Docker, Kubernetes, AWS, GCP, Supabase, Redis, PostgreSQL",
    ],
    sivion: () => [
      "🤖 SIVION v2.4 Multi-Agent Cognitive Engine:",
      "  [Stage 01] Hybrid RAG Query -> pgvector semantic embedding search",
      "  [Stage 02] Swarm Consensus -> Planner + Critic reasoning swarm",
      "  [Stage 03] Execution -> Sub-millisecond tool execution pipeline",
      "  [Stage 04] Sync -> Supabase Realtime WebSockets to Concurrent React 19",
    ],
    optimizer: () => [
      "⚡ MA Optimizer Engine Telemetry:",
      "  • Input Latency : 0.42ms [Sub-millisecond]",
      "  • Kernel Tuning : Win32 Ring 0 timer resolution & scheduler tuning",
      "  • Telemetry     : 100% telemetry lockdown & bloatware elimination",
      "  • Architecture  : React + Electron + Native PowerShell + Windows API",
    ],
    matrix: () => {
      currentMode = "matrix";
      initMatrix();
      document.querySelectorAll(".mode-btn:not(#sfx-toggle)").forEach((b) => {
        b.classList.toggle("active", b.dataset.mode === "matrix");
      });
      return ["[SYSTEM] Switched canvas renderer to Cyber Matrix Rain mode."];
    },
    audio: () => {
      initAudio();
      sfxEnabled = !sfxEnabled;
      if (sfxBtn) {
        sfxBtn.textContent = sfxEnabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";
        sfxBtn.classList.toggle("active", sfxEnabled);
      }
      return [`[SYSTEM] Native Web Audio SFX is now ${sfxEnabled ? "ENABLED" : "DISABLED"}.`];
    },
    contact: () => [
      "🌐 Official Network Channels:",
      "  • Portfolio : https://mathiya.cc",
      "  • LinkedIn  : https://linkedin.com/in/mathisha-a-a955941a2/",
      "  • Discord   : https://discord.gg/z3k3NVxuqY",
      "  • Twitter/X : https://x.com/__Mathiya__",
      "  • GitHub    : https://github.com/Mathiyass",
    ],
    resume: () => [
      "📄 Verified Resume & Credentials:",
      "  • Direct Access: https://mathiya.cc/resume",
    ],
    date: () => [`[TIME] Current System Timestamp: ${new Date().toUTCString()}`],
  };

  if (terminalForm && terminalInput && terminalOutput) {
    terminalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const rawInput = terminalInput.value.trim();
      if (!rawInput) return;

      playTone(1050, "sine", 0.05, 0.03);

      // Append user command
      const userLine = document.createElement("div");
      userLine.classList.add("term-line");
      userLine.innerHTML = `<span class="terminal-user-prompt">visitor@mathiya.cc:~$</span> <span class="term-cmd">${rawInput}</span>`;
      terminalOutput.appendChild(userLine);

      const cmdKey = rawInput.toLowerCase();

      if (cmdKey === "clear") {
        terminalOutput.innerHTML = "";
      } else if (commands[cmdKey]) {
        const responseLines = commands[cmdKey]();
        responseLines.forEach((line) => {
          const respEl = document.createElement("div");
          respEl.classList.add("term-line");
          respEl.textContent = line;
          terminalOutput.appendChild(respEl);
        });
      } else {
        const errLine = document.createElement("div");
        errLine.classList.add("term-line", "term-error");
        errLine.textContent = `[ERROR] Command not recognized: '${rawInput}'. Type 'help' for valid options.`;
        terminalOutput.appendChild(errLine);
      }

      terminalInput.value = "";
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    });
  }

  // --- 6. 60FPS MULTI-MODE CANVAS ENGINE ---
  const canvas = document.getElementById("neural-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let currentMode = "neural"; // 'neural' | 'matrix' | 'spectrum'

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
    initMatrix();
  });

  // Mode switcher event listeners
  const modeButtons = document.querySelectorAll(".mode-btn:not(#sfx-toggle)");
  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentMode = btn.dataset.mode;
      if (currentMode === "matrix") initMatrix();
    });
  });

  // --- MODE 1: NEURAL MESH ---
  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 65);
  const maxDistance = 140;

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

  function renderNeural() {
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
  }

  // --- MODE 2: MATRIX STREAM ---
  const matrixChars = "01010101ABCDEF0123456789MATHIYA";
  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  let drops = [];

  function initMatrix() {
    columns = Math.floor(width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50;
    }
  }
  initMatrix();

  function renderMatrix() {
    ctx.fillStyle = "rgba(7, 9, 14, 0.15)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#00DFD8";
    ctx.font = `${fontSize}px 'Fira Code', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      ctx.fillStyle = Math.random() > 0.85 ? "#FFFFFF" : "#00DFD8";
      ctx.shadowColor = "#00DFD8";
      ctx.shadowBlur = 6;
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  // --- MODE 3: AUDIO SPECTRUM WAVE ---
  let waveTime = 0;
  function renderSpectrum() {
    waveTime += 0.03;
    const centerY = height * 0.75;
    const waveCount = 4;

    for (let w = 0; w < waveCount; w++) {
      ctx.beginPath();
      ctx.moveTo(0, centerY);

      const color = w % 2 === 0 ? "rgba(0, 223, 216, 0.4)" : "rgba(119, 1, 208, 0.4)";
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;

      for (let x = 0; x < width; x += 15) {
        const freq = (x * 0.005) + waveTime + w;
        const amp = Math.sin(freq) * 45 * Math.sin(waveTime * 0.5 + w);
        ctx.lineTo(x, centerY + amp);
      }
      ctx.stroke();
    }
  }

  // --- MASTER RENDER LOOP ---
  function animate() {
    if (currentMode !== "matrix") {
      ctx.clearRect(0, 0, width, height);
    }

    if (currentMode === "neural") {
      renderNeural();
    } else if (currentMode === "matrix") {
      renderMatrix();
    } else if (currentMode === "spectrum") {
      renderSpectrum();
    }

    requestAnimationFrame(animate);
  }

  animate();
});
