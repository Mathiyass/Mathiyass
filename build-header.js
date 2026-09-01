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

        const width = 1600;
        const height = 900;

        // Generate 3D floating cosmic particles
        const particles = Array.from({ length: 180 }).map((_, i) => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = Math.random() * 1.8 + 0.4;
            const op = (Math.random() * 0.7 + 0.2).toFixed(2);
            const dur = (Math.random() * 8 + 6).toFixed(1);
            const delay = (Math.random() * 10).toFixed(1);
            const color = Math.random() > 0.6 ? '#00DFD8' : (Math.random() > 0.3 ? '#E879F9' : '#FFFFFF');
            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${op}">
        <animate attributeName="opacity" values="${op};${(op * 0.2).toFixed(2)};${op}" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" />
        <animate attributeName="cy" values="${y.toFixed(1)};${(y - 60).toFixed(1)};${y.toFixed(1)}" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" />
      </circle>`;
        }).join('\n      ');

        const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Volumetric Ambient Nebula Glows -->
    <radialGradient id="nebula-cyan" cx="18%" cy="25%" r="60%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#00DFD8" stop-opacity="0.12" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>
    
    <radialGradient id="nebula-purple" cx="82%" cy="75%" r="60%">
      <stop offset="0%" stop-color="#7701D0" stop-opacity="0.5" />
      <stop offset="50%" stop-color="#7701D0" stop-opacity="0.15" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="avatar-center-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9333EA" stop-opacity="0.65" />
      <stop offset="35%" stop-color="#7E22CE" stop-opacity="0.4" />
      <stop offset="70%" stop-color="#00DFD8" stop-opacity="0.22" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <!-- Top Specular Edge Highlight -->
    <linearGradient id="specular-top-edge" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.65" />
      <stop offset="30%" stop-color="#00DFD8" stop-opacity="0.25" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </linearGradient>

    <!-- Sweeping Laser Flare Gradient -->
    <linearGradient id="laser-flare-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent" />
      <stop offset="40%" stop-color="#00DFD8" stop-opacity="0.3" />
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.95" />
      <stop offset="60%" stop-color="#A855F7" stop-opacity="0.3" />
      <stop offset="100%" stop-color="transparent" />
    </linearGradient>

    <!-- Dual-Tone Chrome Neon Stroke -->
    <linearGradient id="chrome-border-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.95" />
      <stop offset="25%" stop-color="#38BDF8" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#A855F7" stop-opacity="0.95" />
      <stop offset="75%" stop-color="#7701D0" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#00DFD8" stop-opacity="0.95" />
    </linearGradient>

    <style>
      .bg-void { fill: #000000; }
      
      .top-meta {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 13px;
        font-weight: 500;
        fill: #94A3B8;
        letter-spacing: 7px;
        text-anchor: middle;
      }

      .text-outline {
        font-family: 'Arial Black', Impact, -apple-system, sans-serif;
        font-size: 195px;
        font-weight: 900;
        fill: transparent;
        stroke: rgba(255, 255, 255, 0.9);
        stroke-width: 2.5px;
        letter-spacing: 6px;
        text-anchor: middle;
        animation: glitch 6s infinite alternate ease-in-out;
      }
      
      .text-solid {
        font-family: 'Arial Black', Impact, -apple-system, sans-serif;
        font-size: 225px;
        font-weight: 900;
        fill: #FFFFFF;
        letter-spacing: -1px;
        text-anchor: middle;
        filter: drop-shadow(0px 25px 50px rgba(0, 0, 0, 0.95)) drop-shadow(0px 0px 35px rgba(0, 223, 216, 0.3));
      }

      .bottom-meta {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
        fill: #00DFD8;
        letter-spacing: 8px;
        text-anchor: middle;
      }

      .image-layer {
        filter: drop-shadow(0 0 60px rgba(147, 51, 234, 0.55)) drop-shadow(0 25px 50px rgba(0,0,0,0.95));
        transform-box: fill-box;
        transform-origin: center;
        animation: breathe 5s infinite ease-in-out;
      }

      @keyframes pulse {
        0% { opacity: 0.25; }
        50% { opacity: 0.65; }
        100% { opacity: 0.25; }
      }

      @keyframes breathe {
        0% { transform: scale(1) translateY(0px); }
        50% { transform: scale(1.02) translateY(-6px); }
        100% { transform: scale(1) translateY(0px); }
      }

      @keyframes glitch {
        0% { stroke-dashoffset: 0; stroke: rgba(255, 255, 255, 0.9); }
        20% { stroke-dashoffset: 10; transform: translate(-2px, 1px); stroke: #00DFD8; }
        40% { stroke-dashoffset: 20; transform: translate(2px, -1px); stroke: #E879F9; }
        60% { stroke-dashoffset: 10; transform: translate(-1px, 2px); stroke: rgba(255, 255, 255, 0.9); }
        80% { stroke-dashoffset: 5; transform: translate(1px, -2px); }
        100% { stroke-dashoffset: 0; transform: translate(0, 0); }
      }

      .sonar-shockwave {
        animation: shockwaveExpand 3s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
      }
      @keyframes shockwaveExpand {
        0% { r: 80; opacity: 0.8; stroke-width: 2; }
        100% { r: 340; opacity: 0; stroke-width: 0.3; }
      }

      .laser-cable {
        stroke-dasharray: 10, 16;
        animation: cablePulse 1.2s linear infinite;
      }
      @keyframes cablePulse {
        from { stroke-dashoffset: 26; }
        to { stroke-dashoffset: 0; }
      }

      .corner-chase {
        stroke-dasharray: 20, 40;
        animation: cornerChase 3s linear infinite;
      }
      @keyframes cornerChase {
        from { stroke-dashoffset: 60; }
        to { stroke-dashoffset: 0; }
      }
    </style>
    
    <pattern id="scanline" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="2" fill="rgba(0,0,0,0.25)" />
      <rect y="2" width="6" height="4" fill="transparent" />
    </pattern>

    <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Deep Obsidian Background Void -->
  <rect width="${width}" height="${height}" class="bg-void" />
  <rect width="${width}" height="${height}" fill="url(#cyber-grid)" />
  <rect width="${width}" height="${height}" fill="url(#nebula-cyan)" style="animation: pulse 8s infinite alternate;" />
  <rect width="${width}" height="${height}" fill="url(#nebula-purple)" style="animation: pulse 8s infinite alternate-reverse;" />

  <!-- Specular Top Edge Light Refraction -->
  <path d="M 18 5 L ${width - 18} 5 L ${width - 5} 18 L 5 18 Z" fill="url(#specular-top-edge)" opacity="0.75" />

  <!-- Sweeping Laser Beam Across Top Rail -->
  <rect x="0" y="4" width="380" height="3" fill="url(#laser-flare-grad)">
    <animate attributeName="x" from="-400" to="${width + 100}" dur="4s" repeatCount="indefinite" />
  </rect>

  <!-- Animated Laser Perimeter Stream -->
  <polygon points="22,8 ${width - 22},8 ${width - 8},22 ${width - 8},${height - 22} ${width - 22},${height - 8} 22,${height - 8} 8,${height - 22} 8,22" fill="none" stroke="#00DFD8" stroke-opacity="0.4" stroke-width="1.2" class="laser-cable" />

  <!-- 3D MULTI-PLANE TILTED GYROSCOPIC HOLOGRAM AROUND AVATAR -->
  <circle cx="${width / 2}" cy="420" r="300" fill="url(#avatar-center-glow)" />

  <!-- Expanding Sonar Shockwaves from Center -->
  <circle cx="${width / 2}" cy="420" r="80" fill="none" stroke="#00DFD8" class="sonar-shockwave" />
  <circle cx="${width / 2}" cy="420" r="80" fill="none" stroke="#A855F7" class="sonar-shockwave" style="animation-delay: -1.5s;" />

  <!-- Target Reticle Tick Aperture (30s SMIL Rotation) -->
  <g transform="translate(${width / 2}, 420)">
    <circle cx="0" cy="0" r="310" fill="none" stroke="rgba(0, 223, 216, 0.3)" stroke-width="1" stroke-dasharray="3, 10">
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="30s" repeatCount="indefinite" />
    </circle>
  </g>

  <!-- 3D Tilted Gyroscope Outer Ring 1 (18s SMIL Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="420" rx="320" ry="150" fill="none" stroke="rgba(0, 223, 216, 0.55)" stroke-width="1.6" stroke-dasharray="16, 12">
      <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} 420" to="360 ${width / 2} 420" dur="18s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 3D Tilted Gyroscope Reverse Ring 2 (12s SMIL Counter-Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="420" rx="275" ry="120" fill="none" stroke="rgba(168, 85, 247, 0.55)" stroke-width="1.4" stroke-dasharray="10, 14">
      <animateTransform attributeName="transform" type="rotate" from="360 ${width / 2} 420" to="0 ${width / 2} 420" dur="12s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 3D Tilted Gyroscope Ring 3 (Inclined 45deg, 8s Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="420" rx="295" ry="95" fill="none" stroke="rgba(16, 185, 129, 0.45)" stroke-width="1.2" stroke-dasharray="6, 8">
      <animateTransform attributeName="transform" type="rotate" from="45 ${width / 2} 420" to="405 ${width / 2} 420" dur="8s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 3D Tilted Gyroscope Ring 4 (Inclined 135deg, 5s Counter-Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="420" rx="245" ry="75" fill="none" stroke="rgba(245, 158, 11, 0.45)" stroke-width="1.2" stroke-dasharray="4, 6">
      <animateTransform attributeName="transform" type="rotate" from="135 ${width / 2} 420" to="-225 ${width / 2} 420" dur="5s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- Orbiting 3D Photon Satellites around Avatar -->
  <g>
    <circle cx="${width / 2}" cy="270" r="4.5" fill="#FFFFFF" filter="drop-shadow(0 0 10px #00DFD8)">
      <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} 420" to="360 ${width / 2} 420" dur="6s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2}" cy="570" r="4.5" fill="#E879F9" filter="drop-shadow(0 0 10px #A855F7)">
      <animateTransform attributeName="transform" type="rotate" from="360 ${width / 2} 420" to="0 ${width / 2} 420" dur="6s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 + 250}" cy="420" r="4" fill="#34D399" filter="drop-shadow(0 0 8px #10B981)">
      <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} 420" to="360 ${width / 2} 420" dur="4s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 - 220}" cy="420" r="4" fill="#FBBF24" filter="drop-shadow(0 0 8px #F59E0B)">
      <animateTransform attributeName="transform" type="rotate" from="360 ${width / 2} 420" to="0 ${width / 2} 420" dur="5s" repeatCount="indefinite" />
    </circle>
  </g>

  <rect width="${width}" height="${height}" fill="url(#scanline)" />

  <!-- 3D Floating Cosmic Particles -->
  <g>
    ${particles}
  </g>

  <!-- 3D Glass Corner Pods & Animated Brackets -->
  <g transform="translate(24, 24)">
    <polygon points="0,0 20,0 0,20" fill="rgba(0, 223, 216, 0.2)" />
    <path d="M 0 35 L 0 0 L 35 0" fill="none" stroke="#00DFD8" stroke-width="2.2" class="corner-chase" />
  </g>
  <g transform="translate(${width - 24}, 24)">
    <polygon points="0,0 -20,0 0,20" fill="rgba(0, 223, 216, 0.2)" />
    <path d="M 0 35 L 0 0 L -35 0" fill="none" stroke="#00DFD8" stroke-width="2.2" class="corner-chase" />
  </g>
  <g transform="translate(24, ${height - 24})">
    <polygon points="0,0 20,0 0,-20" fill="rgba(119, 1, 208, 0.2)" />
    <path d="M 0 -35 L 0 0 L 35 0" fill="none" stroke="#7701D0" stroke-width="2.2" class="corner-chase" />
  </g>
  <g transform="translate(${width - 24}, ${height - 24})">
    <polygon points="0,0 -20,0 0,-20" fill="rgba(119, 1, 208, 0.2)" />
    <path d="M 0 -35 L 0 0 L -35 0" fill="none" stroke="#7701D0" stroke-width="2.2" class="corner-chase" />
  </g>

  <!-- Top Metadata Bar -->
  <g transform="translate(${width / 2}, 55)">
    <line x1="-380" y1="-5" x2="-230" y2="-5" stroke="#00DFD8" stroke-width="1.2" stroke-opacity="0.6" />
    <text x="0" y="0" class="top-meta">SOFTWARE ENGINEER (MATHIYA)</text>
    <line x1="230" y1="-5" x2="380" y2="-5" stroke="#00DFD8" stroke-width="1.2" stroke-opacity="0.6" />
  </g>

  <!-- Layer 1: Outlined "MATHISHA" (Upper Background Behind Avatar) - Perfectly Fitted -->
  <text x="${width / 2}" y="295" class="text-outline">MATHISHA</text>

  <!-- Layer 2: Mathisha Portrait Photo in Suit -->
  <g class="image-layer">
    <image href="${imageBase64}" x="${width / 2 - 260}" y="195" width="520" height="570" preserveAspectRatio="xMidYMid slice" />
  </g>

  <!-- Layer 3: Solid "ANGIRASA" (Foreground Bold Typography Overlapping Torso) - Perfectly Fitted with Safe Margins -->
  <text x="${width / 2}" y="760" class="text-solid">ANGIRASA</text>

  <!-- Layer 4: Bottom Subtitle -->
  <g transform="translate(${width / 2}, 850)">
    <line x1="-480" y1="-4" x2="-350" y2="-4" stroke="url(#chrome-border-grad)" stroke-width="1.4" />
    <text x="0" y="0" class="bottom-meta">SOFTWARE ENGINEER &amp; AI SYSTEMS ARCHITECT</text>
    <line x1="350" y1="-4" x2="480" y2="-4" stroke="url(#chrome-border-grad)" stroke-width="1.4" />
  </g>

</svg>
        `;

        fs.writeFileSync('header.svg', svg);
        console.log("Successfully fixed font sizes and margin padding in header.svg!");
    });
});
