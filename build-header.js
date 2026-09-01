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
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.32" />
      <stop offset="60%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>
    
    <radialGradient id="purple-glow" cx="80%" cy="80%" r="55%">
      <stop offset="0%" stop-color="#7701d0" stop-opacity="0.35" />
      <stop offset="65%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="avatar-center-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.25" />
      <stop offset="50%" stop-color="#7701D0" stop-opacity="0.15" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="neon-text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="40%" stop-color="#E0F7FA" />
      <stop offset="80%" stop-color="#00DFD8" />
      <stop offset="100%" stop-color="#7701D0" />
    </linearGradient>

    <linearGradient id="border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#7701D0" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#00DFD8" stop-opacity="0.9" />
    </linearGradient>

    <!-- Perspective Horizon Gradient -->
    <linearGradient id="horizon-grad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.18" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </linearGradient>

    <style>
      .bg { fill: #07090E; }
      
      .text-outline {
        font-family: 'Arial Black', Impact, -apple-system, sans-serif;
        font-size: 175px;
        font-weight: 900;
        fill: transparent;
        stroke: rgba(0, 223, 216, 0.45);
        stroke-width: 2.5px;
        letter-spacing: -3px;
        text-anchor: middle;
        animation: glitch 6s infinite alternate ease-in-out;
      }
      
      .text-solid {
        font-family: 'Arial Black', Impact, -apple-system, sans-serif;
        font-size: 185px;
        font-weight: 900;
        fill: url(#neon-text-grad);
        letter-spacing: -3px;
        text-anchor: middle;
        filter: drop-shadow(0px 15px 35px rgba(0, 223, 216, 0.4));
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
        font-size: 12.5px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.65);
        letter-spacing: 2.5px;
        text-anchor: start;
      }
      
      .hud-text-right {
        font-family: 'SF Mono', Consolas, 'Courier New', monospace;
        font-size: 12.5px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.65);
        letter-spacing: 2.5px;
        text-anchor: end;
      }

      .image-layer {
        filter: drop-shadow(0 0 50px rgba(0, 223, 216, 0.3));
        transform-box: fill-box;
        transform-origin: center;
        animation: breathe 5s infinite ease-in-out;
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
        50% { opacity: 0.5; }
        100% { opacity: 0.2; }
      }

      @keyframes breathe {
        0% { transform: scale(1) translateY(0px); }
        50% { transform: scale(1.02) translateY(-6px); }
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
      
      .beacon {
        animation: beaconGlow 1.8s infinite alternate;
      }
      @keyframes beaconGlow {
        0% { opacity: 0.4; transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1.25); filter: drop-shadow(0 0 6px #10B981); }
      }
    </style>
    
    <pattern id="scanline" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="2" fill="rgba(0,0,0,0.3)" />
      <rect y="2" width="6" height="4" fill="transparent" />
    </pattern>

    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background Base & Glows -->
  <rect width="${width}" height="${height}" rx="16" class="bg" />
  <rect width="${width}" height="${height}" rx="16" fill="url(#grid)" />
  <rect width="${width}" height="${height}" rx="16" fill="url(#cyan-glow)" style="animation: pulse 8s infinite alternate;" />
  <rect width="${width}" height="${height}" rx="16" fill="url(#purple-glow)" style="animation: pulse 8s infinite alternate-reverse;" />
  
  <!-- Perspective Horizon Lines at Bottom -->
  <polygon points="0,${height} ${width},${height} ${width - 200},450 200,450" fill="url(#horizon-grad)" opacity="0.4" />
  <line x1="0" y1="${height - 20}" x2="${width}" y2="${height - 20}" stroke="rgba(0, 223, 216, 0.15)" stroke-width="1" />
  <line x1="0" y1="${height - 60}" x2="${width}" y2="${height - 60}" stroke="rgba(0, 223, 216, 0.08)" stroke-width="1" />

  <!-- Holographic Avatar Backdrop Reticle HUD with Pure Native SMIL Animations -->
  <circle cx="${width / 2}" cy="280" r="230" fill="url(#avatar-center-glow)" />
  <g>
    <circle cx="${width / 2}" cy="280" r="210" fill="none" stroke="rgba(0, 223, 216, 0.25)" stroke-width="1.5" stroke-dasharray="12, 12" />
    <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} 280" to="360 ${width / 2} 280" dur="24s" repeatCount="indefinite" />
  </g>
  <g>
    <circle cx="${width / 2}" cy="280" r="170" fill="none" stroke="rgba(119, 1, 208, 0.3)" stroke-width="1.2" stroke-dasharray="8, 16" />
    <animateTransform attributeName="transform" type="rotate" from="360 ${width / 2} 280" to="0 ${width / 2} 280" dur="16s" repeatCount="indefinite" />
  </g>
  <circle cx="${width / 2}" cy="280" r="130" fill="none" stroke="rgba(0, 223, 216, 0.2)" stroke-width="1" />

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
  <path d="M 24 44 L 24 24 L 44 24" fill="none" stroke="#00DFD8" stroke-width="2" />
  <path d="M ${width - 44} 24 L ${width - 24} 24 L ${width - 24} 44" fill="none" stroke="#00DFD8" stroke-width="2" />
  <path d="M 24 ${height - 44} L 24 ${height - 24} L 44 ${height - 24}" fill="none" stroke="#7701D0" stroke-width="2" />
  <path d="M ${width - 44} ${height - 24} L ${width - 24} ${height - 24} L ${width - 24} ${height - 44}" fill="none" stroke="#7701D0" stroke-width="2" />

  <!-- HUD Elements: Top Left -->
  <circle cx="48" cy="68" r="4" fill="#10B981" class="beacon" />
  <text x="62" y="72" class="hud-text-left" fill="#10B981">SYSTEM ONLINE // TELEMETRY ACTIVE</text>
  <text x="48" y="98" class="hud-text-left">[CBO: 6.9271° N, 79.8612° E] • [BHX: 52.4862° N, 1.8904° W]</text>
  <text x="48" y="124" class="hud-text-left" fill="#00DFD8">SPEC: AI AGENTS • WEBGL 2.0 • KERNEL TUNING</text>

  <!-- HUD Elements: Top Right -->
  <text x="${width - 48}" y="72" class="hud-text-right" fill="#00DFD8">MATHIYA.CC ↗</text>
  <text x="${width - 48}" y="98" class="hud-text-right">LEAD SYSTEMS ARCHITECT</text>
  <text x="${width - 48}" y="124" class="hud-text-right" fill="rgba(255,255,255,0.75)">50+ DEPLOYMENTS • 4+ YRS ACTIVE</text>

  <!-- Subtitle Top Badge -->
  <g transform="translate(${width / 2}, 150)">
    <rect x="-210" y="-18" width="420" height="28" rx="14" fill="#0D1117" stroke="rgba(0, 223, 216, 0.5)" stroke-width="1.2" />
    <circle cx="-185" cy="-4" r="3.5" fill="#00DFD8" style="animation: pulse 2s infinite;" />
    <text x="0" y="0" class="hud-text" fill="#00DFD8">LEAD SYSTEMS ARCHITECT // MATHIYA<tspan class="cursor" fill="#00DFD8">_</tspan></text>
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
    <line x1="-400" y1="0" x2="-290" y2="0" stroke="url(#border-grad)" stroke-width="1.2" />
    <text x="0" y="4" class="hud-text" fill="rgba(255,255,255,0.9)" style="letter-spacing: 6px;">MULTI-AGENT AI • WEBGL GRAPHICS • DISTRIBUTED SYSTEMS</text>
    <line x1="290" y1="0" x2="400" y2="0" stroke="url(#border-grad)" stroke-width="1.2" />
  </g>

</svg>
        `;

        fs.writeFileSync('header.svg', svg);
        console.log("Created header.svg successfully!");
    });
});
