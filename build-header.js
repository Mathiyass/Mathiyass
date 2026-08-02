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
    <radialGradient id="cyan-glow" cx="25%" cy="25%" r="50%">
      <stop offset="0%" stop-color="#00fbfb" stop-opacity="0.15" />
      <stop offset="70%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>
    
    <radialGradient id="purple-glow" cx="75%" cy="75%" r="50%">
      <stop offset="0%" stop-color="#7701d0" stop-opacity="0.15" />
      <stop offset="70%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <!-- Star particle animations -->
    <style>
      .bg { fill: #000000; }
      
      .text-outline {
        font-family: 'Arial Black', Impact, sans-serif;
        font-size: 180px;
        font-weight: 900;
        fill: transparent;
        stroke: rgba(255, 255, 255, 0.8);
        stroke-width: 3px;
        letter-spacing: -5px;
        text-anchor: middle;
        animation: glitch 4s infinite alternate ease-in-out;
      }
      
      .text-solid {
        font-family: 'Arial Black', Impact, sans-serif;
        font-size: 190px;
        font-weight: 900;
        fill: #ffffff;
        letter-spacing: -5px;
        text-anchor: middle;
        filter: drop-shadow(0px 20px 30px rgba(0,0,0,0.8));
      }
      
      .hud-text {
        font-family: Consolas, 'Courier New', monospace;
        font-size: 14px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.4);
        letter-spacing: 4px;
        text-anchor: middle;
      }

      .hud-text-left {
        font-family: Consolas, 'Courier New', monospace;
        font-size: 14px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.4);
        letter-spacing: 4px;
        text-anchor: start;
      }
      
      .hud-text-right {
        font-family: Consolas, 'Courier New', monospace;
        font-size: 14px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.4);
        letter-spacing: 4px;
        text-anchor: end;
      }

      .image-layer {
        filter: drop-shadow(0 0 40px rgba(255,255,255,0.1));
        transform-box: fill-box;
        transform-origin: center;
        animation: breathe 6s infinite ease-in-out;
      }
      
      .particle {
        fill: #ffffff;
        opacity: 0.5;
        animation: float 15s infinite linear;
      }
      
      @keyframes float {
        0% { transform: translateY(0px) translateX(0px); opacity: 0; }
        50% { opacity: 0.8; }
        100% { transform: translateY(-200px) translateX(50px); opacity: 0; }
      }
      
      @keyframes pulse {
        0% { opacity: 0.15; }
        50% { opacity: 0.3; }
        100% { opacity: 0.15; }
      }

      @keyframes breathe {
        0% { transform: scale(1) translateY(0px); }
        50% { transform: scale(1.02) translateY(-10px); }
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
    </style>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" class="bg" />
  <rect width="${width}" height="${height}" fill="url(#cyan-glow)" style="animation: pulse 8s infinite alternate;" />
  <rect width="${width}" height="${height}" fill="url(#purple-glow)" style="animation: pulse 8s infinite alternate-reverse;" />

  <!-- Particles -->
  ${Array.from({ length: 150 }).map((_, i) => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 1.5;
    const opacity = Math.random() * 0.8 + 0.2;
    const delay = Math.random() * 10;
    const dur = Math.random() * 10 + 10;
    return `<circle cx="${x}" cy="${y}" r="${r}" class="particle" opacity="${opacity}" style="animation-delay: -${delay}s; animation-duration: ${dur}s;" />`;
  }).join('\\n  ')}

  <!-- HUD Elements -->
  <!-- Top Left -->
  <text x="40" y="80" class="hud-text-left" fill="rgba(255,255,255,0.7)">PORTFOLIO © 2024</text>
  <text x="40" y="110" class="hud-text-left">COLOMBO, SRI LANKA</text>
  <text x="40" y="140" class="hud-text-left" fill="#34d399">OPEN FOR OPPORTUNITIES</text>

  <!-- Top Right -->
  <text x="${width - 40}" y="80" class="hud-text-right" fill="rgba(255,255,255,0.7)">INDEPENDENT CREATIVE</text>
  <text x="${width - 40}" y="110" class="hud-text-right">SOFTWARE ENGINEERING</text>
  <text x="${width - 40}" y="140" class="hud-text-right">AI SYSTEMS ARCHITECTURE</text>

  <!-- Subtitle Top -->
  <g transform="translate(${width / 2}, 160)">
    <line x1="-150" y1="-4" x2="-110" y2="-4" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
    <text x="0" y="0" class="hud-text" fill="rgba(255,255,255,0.7)">SOFTWARE ENGINEER (MATHIYA)</text>
    <line x1="110" y1="-4" x2="150" y2="-4" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
  </g>

  <!-- Layer 1: Bold Outlined Text (Behind Photo) -->
  <text x="${width / 2}" y="320" class="text-outline">MATHISHA</text>

  <!-- Layer 2: Center Image -->
  <g class="image-layer">
    <image href="${imageBase64}" x="${width / 2 - 200}" y="100" width="400" height="500" preserveAspectRatio="xMidYMax slice" />
  </g>

  <!-- Layer 3: Bottom Text Solid (In Front of Photo) -->
  <text x="${width / 2}" y="480" class="text-solid">ANGIRASA</text>

  <!-- Subtitle Bottom -->
  <text x="${width / 2}" y="550" class="hud-text" style="letter-spacing: 8px;">BUILDING INTELLIGENT SYSTEMS &amp; SCALABLE ARCHITECTURES</text>

</svg>
        `;

        fs.writeFileSync('header.svg', svg);
        console.log("Created header.svg successfully!");
    });
});
