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
    <!-- Volumetric Ambient Nebula Glows -->
    <radialGradient id="nebula-cyan" cx="18%" cy="25%" r="60%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#00DFD8" stop-opacity="0.12" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>
    
    <radialGradient id="nebula-purple" cx="82%" cy="75%" r="60%">
      <stop offset="0%" stop-color="#7701D0" stop-opacity="0.48" />
      <stop offset="50%" stop-color="#7701D0" stop-opacity="0.15" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="avatar-center-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.45" />
      <stop offset="45%" stop-color="#7701D0" stop-opacity="0.28" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <!-- 3D Liquid Glass Gradients -->
    <linearGradient id="glass-chassis-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111827" stop-opacity="0.95" />
      <stop offset="40%" stop-color="#0E1422" stop-opacity="0.88" />
      <stop offset="100%" stop-color="#06090E" stop-opacity="0.98" />
    </linearGradient>

    <!-- Top Specular Edge Highlight -->
    <linearGradient id="specular-top-edge" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6" />
      <stop offset="30%" stop-color="#00DFD8" stop-opacity="0.25" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </linearGradient>

    <!-- Sweeping Laser Flare Gradient -->
    <linearGradient id="laser-flare-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent" />
      <stop offset="40%" stop-color="#00DFD8" stop-opacity="0.2" />
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="60%" stop-color="#A855F7" stop-opacity="0.2" />
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

    <linearGradient id="neon-text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="30%" stop-color="#F0FDFA" />
      <stop offset="70%" stop-color="#00DFD8" />
      <stop offset="100%" stop-color="#A855F7" />
    </linearGradient>

    <!-- Perspective Horizon Gradient -->
    <linearGradient id="horizon-grad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.3" />
      <stop offset="60%" stop-color="#7701D0" stop-opacity="0.1" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </linearGradient>

    <style>
      .bg-void { fill: #07090E; }
      
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
        filter: drop-shadow(0px 15px 35px rgba(0, 223, 216, 0.45));
      }
      
      .hud-text {
        font-family: 'Fira Code', 'SF Mono', Consolas, monospace;
        font-size: 12.5px;
        font-weight: 700;
        fill: rgba(255, 255, 255, 0.85);
        letter-spacing: 3px;
        text-anchor: middle;
      }

      .hud-text-left {
        font-family: 'Fira Code', 'SF Mono', Consolas, monospace;
        font-size: 12px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.75);
        letter-spacing: 2px;
        text-anchor: start;
      }
      
      .hud-text-right {
        font-family: 'Fira Code', 'SF Mono', Consolas, monospace;
        font-size: 12px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.75);
        letter-spacing: 2px;
        text-anchor: end;
      }

      .image-layer {
        filter: drop-shadow(0 0 50px rgba(0, 223, 216, 0.45)) drop-shadow(0 20px 40px rgba(0,0,0,0.95));
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
      .laser-cable {
        stroke-dasharray: 8, 12;
        animation: cablePulse 1.2s linear infinite;
      }
      @keyframes cablePulse {
        from { stroke-dashoffset: 20; }
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

      /* Audio Waveform Oscillators */
      .audio-bar {
        animation: audioBounce 1.2s ease-in-out infinite alternate;
      }
      @keyframes audioBounce {
        0% { transform: scaleY(0.2); }
        100% { transform: scaleY(1.0); }
      }
    </style>
    
    <pattern id="scanline" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="2" fill="rgba(0,0,0,0.25)" />
      <rect y="2" width="6" height="4" fill="transparent" />
    </pattern>

    <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- 3D Glassmorphic Master Substrate -->
  <polygon points="18,4 ${width - 18},4 ${width - 4},18 ${width - 4},${height - 18} ${width - 18},${height - 4} 18,${height - 4} 4,${height - 18} 4,18" fill="url(#glass-chassis-bg)" stroke="url(#chrome-border-grad)" stroke-width="1.6" />
  <rect width="${width}" height="${height}" fill="url(#cyber-grid)" />
  <rect width="${width}" height="${height}" fill="url(#nebula-cyan)" style="animation: pulse 8s infinite alternate;" />
  <rect width="${width}" height="${height}" fill="url(#nebula-purple)" style="animation: pulse 8s infinite alternate-reverse;" />
  
  <!-- Specular Top Edge Light Refraction -->
  <path d="M 18 5 L ${width - 18} 5 L ${width - 5} 18 L 5 18 Z" fill="url(#specular-top-edge)" opacity="0.85" />

  <!-- Sweeping Laser Beam Across Top Rail -->
  <rect x="0" y="4" width="280" height="3" fill="url(#laser-flare-grad)">
    <animate attributeName="x" from="-300" to="${width + 100}" dur="4.5s" repeatCount="indefinite" />
  </rect>

  <!-- Animated Laser Perimeter Stream -->
  <polygon points="22,8 ${width - 22},8 ${width - 8},22 ${width - 8},${height - 22} ${width - 22},${height - 8} 22,${height - 8} 8,${height - 22} 8,22" fill="none" stroke="#00DFD8" stroke-opacity="0.45" stroke-width="1.2" class="laser-cable" />

  <!-- Perspective Horizon Grid at Bottom -->
  <polygon points="0,${height} ${width},${height} ${width - 200},440 200,440" fill="url(#horizon-grad)" opacity="0.45" />
  <line x1="0" y1="${height - 20}" x2="${width}" y2="${height - 20}" stroke="rgba(0, 223, 216, 0.2)" stroke-width="1" />
  <line x1="0" y1="${height - 60}" x2="${width}" y2="${height - 60}" stroke="rgba(0, 223, 216, 0.1)" stroke-width="1" />

  <!-- 3D MULTI-PLANE TILTED GYROSCOPIC HOLOGRAM AROUND AVATAR -->
  <circle cx="${width / 2}" cy="280" r="230" fill="url(#avatar-center-glow)" />

  <!-- Target Reticle Tick Aperture -->
  <g transform="translate(${width / 2}, 280)">
    <circle cx="0" cy="0" r="255" fill="none" stroke="rgba(0, 223, 216, 0.2)" stroke-width="1" stroke-dasharray="2, 8">
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="30s" repeatCount="indefinite" />
    </circle>
  </g>

  <!-- 3D Tilted Gyroscope Outer Ring 1 (18s SMIL Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="280" rx="240" ry="120" fill="none" stroke="rgba(0, 223, 216, 0.45)" stroke-width="1.6" stroke-dasharray="16, 12">
      <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} 280" to="360 ${width / 2} 280" dur="18s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 3D Tilted Gyroscope Reverse Ring 2 (12s SMIL Counter-Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="280" rx="200" ry="100" fill="none" stroke="rgba(168, 85, 247, 0.45)" stroke-width="1.4" stroke-dasharray="10, 14">
      <animateTransform attributeName="transform" type="rotate" from="360 ${width / 2} 280" to="0 ${width / 2} 280" dur="12s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 3D Tilted Gyroscope Ring 3 (Inclined 45deg, 8s Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="280" rx="220" ry="80" fill="none" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1.2" stroke-dasharray="6, 8">
      <animateTransform attributeName="transform" type="rotate" from="45 ${width / 2} 280" to="405 ${width / 2} 280" dur="8s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 3D Tilted Gyroscope Ring 4 (Inclined 135deg, 5s Counter-Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="280" rx="180" ry="60" fill="none" stroke="rgba(245, 158, 11, 0.35)" stroke-width="1.2" stroke-dasharray="4, 6">
      <animateTransform attributeName="transform" type="rotate" from="135 ${width / 2} 280" to="-225 ${width / 2} 280" dur="5s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- Orbiting 3D Photon Satellites around Avatar -->
  <g>
    <circle cx="${width / 2}" cy="160" r="3.5" fill="#FFFFFF" filter="drop-shadow(0 0 8px #00DFD8)">
      <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} 280" to="360 ${width / 2} 280" dur="6s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2}" cy="400" r="3.5" fill="#E879F9" filter="drop-shadow(0 0 8px #A855F7)">
      <animateTransform attributeName="transform" type="rotate" from="360 ${width / 2} 280" to="0 ${width / 2} 280" dur="6s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 + 180}" cy="280" r="3" fill="#34D399" filter="drop-shadow(0 0 6px #10B981)">
      <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} 280" to="360 ${width / 2} 280" dur="4s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 - 160}" cy="280" r="3" fill="#FBBF24" filter="drop-shadow(0 0 6px #F59E0B)">
      <animateTransform attributeName="transform" type="rotate" from="360 ${width / 2} 280" to="0 ${width / 2} 280" dur="5s" repeatCount="indefinite" />
    </circle>
  </g>

  <rect width="${width}" height="${height}" fill="url(#scanline)" />

  <!-- 3D Floating Particles -->
  ${Array.from({ length: 120 }).map((_, i) => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 1.6 + 0.4;
    const opacity = Math.random() * 0.7 + 0.2;
    const delay = Math.random() * 10;
    const dur = Math.random() * 8 + 8;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" class="particle" opacity="${opacity.toFixed(2)}" style="animation-delay: -${delay.toFixed(1)}s; animation-duration: ${dur.toFixed(1)}s;" />`;
  }).join('\n  ')}

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

  <!-- HUD Glass Plate: Top Left (3D Chamfered Glass Chassis) -->
  <g transform="translate(38, 48)">
    <polygon points="6,0 360,0 368,8 368,76 360,84 6,84 0,78 0,6" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(0, 223, 216, 0.5)" stroke-width="1.3" />
    <path d="M 6 1 L 360 1 L 367 7 L 1 7 Z" fill="url(#specular-top-edge)" />
    <circle cx="16" cy="22" r="4" fill="#10B981" class="beacon" />
    <text x="28" y="26" class="hud-text-left" fill="#10B981">SYSTEM ONLINE // CORE TELEMETRY</text>
    <text x="16" y="48" class="hud-text-left">[CBO: 6.9271° N, 79.8612° E] • [BHX: 52.4862° N]</text>
    <text x="16" y="70" class="hud-text-left" fill="#00DFD8">SPEC: AI AGENTS • WEBGL 2.0 • KERNEL TUNING</text>
    
    <!-- Mini Equalizer Bars Inside Top Left Plate -->
    <g transform="translate(325, 36)">
      <rect x="0" y="0" width="2.5" height="18" fill="#10B981" class="audio-bar" style="transform-origin: bottom; animation-delay: 0.1s;" />
      <rect x="5" y="0" width="2.5" height="18" fill="#00DFD8" class="audio-bar" style="transform-origin: bottom; animation-delay: 0.4s;" />
      <rect x="10" y="0" width="2.5" height="18" fill="#38BDF8" class="audio-bar" style="transform-origin: bottom; animation-delay: 0.2s;" />
      <rect x="15" y="0" width="2.5" height="18" fill="#10B981" class="audio-bar" style="transform-origin: bottom; animation-delay: 0.5s;" />
    </g>
  </g>

  <!-- HUD Glass Plate: Top Right (3D Chamfered Glass Chassis) -->
  <g transform="translate(${width - 406}, 48)">
    <polygon points="8,0 362,0 368,6 368,78 362,84 8,84 0,76 0,8" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(168, 85, 247, 0.5)" stroke-width="1.3" />
    <path d="M 8 1 L 362 1 L 367 6 L 1 6 Z" fill="url(#specular-top-edge)" />
    <text x="350" y="26" class="hud-text-right" fill="#00DFD8">MATHIYA.CC ↗ // OFFICIAL PORTAL</text>
    <text x="350" y="48" class="hud-text-right">LEAD SYSTEMS ARCHITECT</text>
    <text x="350" y="70" class="hud-text-right" fill="#C084FC">50+ DEPLOYMENTS • 4+ YRS ACTIVE</text>
    
    <!-- Mini Equalizer Bars Inside Top Right Plate -->
    <g transform="translate(20, 36)">
      <rect x="0" y="0" width="2.5" height="18" fill="#A855F7" class="audio-bar" style="transform-origin: bottom; animation-delay: 0.3s;" />
      <rect x="5" y="0" width="2.5" height="18" fill="#E879F9" class="audio-bar" style="transform-origin: bottom; animation-delay: 0.6s;" />
      <rect x="10" y="0" width="2.5" height="18" fill="#7701D0" class="audio-bar" style="transform-origin: bottom; animation-delay: 0.15s;" />
      <rect x="15" y="0" width="2.5" height="18" fill="#A855F7" class="audio-bar" style="transform-origin: bottom; animation-delay: 0.45s;" />
    </g>
  </g>

  <!-- 3D Glass Badge Center Top -->
  <g transform="translate(${width / 2}, 150)">
    <polygon points="12,-16 220,-16 230,-6 230,12 220,20 -220,20 -230,12 -230,-6 -220,-16" fill="rgba(13, 17, 23, 0.92)" stroke="rgba(0, 223, 216, 0.7)" stroke-width="1.4" />
    <circle cx="-195" cy="2" r="3.5" fill="#00DFD8" style="animation: pulse 2s infinite;" />
    <text x="0" y="6" class="hud-text" fill="#00DFD8">LEAD SYSTEMS ARCHITECT // MATHIYA<tspan class="cursor" fill="#00DFD8">_</tspan></text>
  </g>

  <!-- Layer 1: Bold Outlined Text (Behind Photo) -->
  <text x="${width / 2}" y="315" class="text-outline">MATHISHA</text>

  <!-- Layer 2: Center Image -->
  <g class="image-layer">
    <image href="${imageBase64}" x="${width / 2 - 200}" y="95" width="400" height="500" preserveAspectRatio="xMidYMax slice" />
  </g>

  <!-- Layer 3: Bottom Text Solid (In Front of Photo) -->
  <text x="${width / 2}" y="475" class="text-solid">ANGIRASA</text>

  <!-- Subtitle Bottom Glass Ribbon -->
  <g transform="translate(${width / 2}, 545)">
    <line x1="-420" y1="0" x2="-310" y2="0" stroke="url(#chrome-border-grad)" stroke-width="1.4" />
    <text x="0" y="4" class="hud-text" fill="rgba(255,255,255,0.95)" style="letter-spacing: 5px;">MULTI-AGENT AI • WEBGL GRAPHICS • DISTRIBUTED SYSTEMS</text>
    <line x1="310" y1="0" x2="420" y2="0" stroke="url(#chrome-border-grad)" stroke-width="1.4" />
  </g>

</svg>
        `;

        fs.writeFileSync('header.svg', svg);
        console.log("Created header.svg successfully!");
    });
});
