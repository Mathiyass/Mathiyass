const fs = require('fs');
const https = require('https');

// URL of the exact photo used in the portfolio
const imageUrl = 'https://pub-5f6d2fdae69b4366a0b8ce890c20cb8d.r2.dev/assets/assets/img/profile_photo/me.png';

https.get(imageUrl, (res) => {
    const data = [];
    res.on('data', (chunk) => data.push(chunk));
    res.on('end', () => {
        const imageBuffer = Buffer.concat(data);
        const imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;

        const width = 1400;
        const height = 600;

        const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background styling -->
    <radialGradient id="cyan-glow" cx="20%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.22" />
      <stop offset="60%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>
    
    <radialGradient id="purple-glow" cx="80%" cy="80%" r="55%">
      <stop offset="0%" stop-color="#7701d0" stop-opacity="0.25" />
      <stop offset="65%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="neon-text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#E0F7FA" />
      <stop offset="100%" stop-color="#00DFD8" />
    </linearGradient>

    <linearGradient id="border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#7701D0" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#00DFD8" stop-opacity="0.5" />
    </linearGradient>

    <!-- Star particle animations -->
    <style>
      .bg { fill: #07090E; }
      
      .text-outline {
        font-family: 'Arial Black', Impact, -apple-system, sans-serif;
        font-size: 175px;
        font-weight: 900;
        fill: transparent;
        stroke: rgba(0, 223, 216, 0.5);
        stroke-width: 2px;
        letter-spacing: -3px;
        text-anchor: middle;
        animation: glitch 4s infinite alternate ease-in-out;
      }
      
      .text-solid {
        font-family: 'Arial Black', Impact, -apple-system, sans-serif;
        font-size: 185px;
        font-weight: 900;
        fill: url(#neon-text-grad);
        letter-spacing: -3px;
        text-anchor: middle;
        filter: drop-shadow(0px 15px 30px rgba(0, 223, 216, 0.3));
      }
      
      .hud-text {
        font-family: 'SF Mono', Consolas, 'Courier New', monospace;
        font-size: 13px;
        font-weight: 700;
        fill: rgba(255, 255, 255, 0.7);
        letter-spacing: 4px;
        text-anchor: middle;
      }

      .hud-text-left {
        font-family: 'SF Mono', Consolas, 'Courier New', monospace;
        font-size: 13px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.5);
        letter-spacing: 3px;
        text-anchor: start;
      }
      
      .hud-text-right {
        font-family: 'SF Mono', Consolas, 'Courier New', monospace;
        font-size: 13px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.5);
        letter-spacing: 3px;
        text-anchor: end;
      }

      .image-layer {
        filter: drop-shadow(0 0 50px rgba(0, 223, 216, 0.2));
        transform-box: fill-box;
        transform-origin: center;
        animation: breathe 6s infinite ease-in-out;
      }
      
      .particle {
        fill: #00DFD8;
        opacity: 0.4;
        animation: float 14s infinite linear;
      }
      
      @keyframes float {
        0% { transform: translateY(0px) translateX(0px); opacity: 0; }
        50% { opacity: 0.7; }
        100% { transform: translateY(-220px) translateX(40px); opacity: 0; }
      }
      
      @keyframes pulse {
        0% { opacity: 0.2; }
        50% { opacity: 0.4; }
        100% { opacity: 0.2; }
      }

      @keyframes breathe {
        0% { transform: scale(1) translateY(0px); }
        50% { transform: scale(1.015) translateY(-8px); }
        100% { transform: scale(1) translateY(0px); }
      }

      @keyframes glitch {
        0% { stroke-dashoffset: 0; }
        20% { stroke-dashoffset: 10; transform: translate(-2px, 1px); }
        40% { stroke-dashoffset: 20; transform: translate(2px, -1px); }
        60% { stroke-dashoffset: 10; transform: translate(-1px, 2px); }
        80% { stroke-dashoffset: 5; transform: translate(1px, -2px); }
        100% { stroke-dashoffset: 0; transform: translate(0, 0); }
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      .cursor {
        animation: blink 1s step-end infinite;
      }
      
      .hud-line { stroke: rgba(0, 223, 216, 0.35); stroke-width: 1; }
      .hud-accent { fill: #00DFD8; }
    </style>
    
    <pattern id="scanline" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="2" fill="rgba(0,0,0,0.3)" />
      <rect y="2" width="6" height="4" fill="transparent" />
    </pattern>

    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background Base & Glows -->
  <rect width="${width}" height="${height}" rx="16" class="bg" />
  <rect width="${width}" height="${height}" rx="16" fill="url(#grid)" />
  <rect width="${width}" height="${height}" rx="16" fill="url(#cyan-glow)" style="animation: pulse 8s infinite alternate;" />
  <rect width="${width}" height="${height}" rx="16" fill="url(#purple-glow)" style="animation: pulse 8s infinite alternate-reverse;" />
  <rect width="${width}" height="${height}" rx="16" fill="url(#scanline)" />
  <rect width="${width - 4}" height="${height - 4}" x="2" y="2" rx="14" fill="none" stroke="url(#border-grad)" stroke-width="1.5" />

  <!-- Particles -->
  ${Array.from({ length: 120 }).map((_, i) => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 1.6 + 0.4;
    const opacity = Math.random() * 0.7 + 0.2;
    const delay = Math.random() * 10;
    const dur = Math.random() * 8 + 8;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" class="particle" opacity="${opacity.toFixed(2)}" style="animation-delay: -${delay.toFixed(1)}s; animation-duration: ${dur.toFixed(1)}s;" />`;
  }).join('\n  ')}

  <!-- HUD Corner Brackets -->
  <!-- Top Left -->
  <path d="M 24 44 L 24 24 L 44 24" fill="none" stroke="#00DFD8" stroke-width="2" />
  <!-- Top Right -->
  <path d="M ${width - 44} 24 L ${width - 24} 24 L ${width - 24} 44" fill="none" stroke="#00DFD8" stroke-width="2" />
  <!-- Bottom Left -->
  <path d="M 24 ${height - 44} L 24 ${height - 24} L 44 ${height - 24}" fill="none" stroke="#7701D0" stroke-width="2" />
  <!-- Bottom Right -->
  <path d="M ${width - 44} ${height - 24} L ${width - 24} ${height - 24} L ${width - 24} ${height - 44}" fill="none" stroke="#7701D0" stroke-width="2" />

  <!-- HUD Elements: Top Left -->
  <circle cx="48" cy="68" r="4" fill="#10B981" />
  <text x="60" y="72" class="hud-text-left" fill="#10B981">SYSTEM ONLINE</text>
  <text x="48" y="98" class="hud-text-left">LOC: BIRMINGHAM, UK</text>
  <text x="48" y="124" class="hud-text-left" fill="#00DFD8">SPEC: AI &amp; CLOUD ARCHITECT</text>

  <!-- HUD Elements: Top Right -->
  <text x="${width - 48}" y="72" class="hud-text-right" fill="#00DFD8">MATHIYA.DEV</text>
  <text x="${width - 48}" y="98" class="hud-text-right">FULL-STACK INNOVATION</text>
  <text x="${width - 48}" y="124" class="hud-text-right" fill="rgba(255,255,255,0.7)">OPEN FOR COLLABORATION</text>

  <!-- Subtitle Top Badge -->
  <g transform="translate(${width / 2}, 150)">
    <rect x="-180" y="-18" width="360" height="28" rx="14" fill="#0D1117" stroke="rgba(0, 223, 216, 0.4)" stroke-width="1" />
    <circle cx="-155" cy="-4" r="3.5" fill="#00DFD8" style="animation: pulse 2s infinite;" />
    <text x="0" y="0" class="hud-text" fill="#00DFD8">SYSTEM ARCHITECT // MATHIYA<tspan class="cursor" fill="#00DFD8">_</tspan></text>
  </g>

  <!-- Layer 1: Bold Outlined Text (Behind Photo) -->
  <text x="${width / 2}" y="315" class="text-outline">MATHISHA</text>

  <!-- Layer 2: Center Image -->
  <g class="image-layer">
    <image href="${imageBase64}" x="${width / 2 - 200}" y="95" width="400" height="500" preserveAspectRatio="xMidYMax slice" />
  </g>

  <!-- Layer 3: Bottom Text Solid (In Front of Photo) -->
  <text x="${width / 2}" y="475" class="text-solid">ANGIRASA</text>

  <!-- Subtitle Bottom Ribbon -->
  <g transform="translate(${width / 2}, 545)">
    <line x1="-350" y1="0" x2="-260" y2="0" stroke="url(#border-grad)" stroke-width="1" />
    <text x="0" y="4" class="hud-text" fill="rgba(255,255,255,0.85)" style="letter-spacing: 6px;">BUILDING INTELLIGENT SYSTEMS &amp; DISTRIBUTED CLOUD</text>
    <line x1="260" y1="0" x2="350" y2="0" stroke="url(#border-grad)" stroke-width="1" />
  </g>

</svg>
        `;

        fs.writeFileSync('header.svg', svg);
        console.log("Created header.svg successfully!");
    });
});
