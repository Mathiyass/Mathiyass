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

        // Generate 320 3D floating cosmic particles with multi-speed twinkle, X-drift, and Y-drift
        const particles = Array.from({ length: 320 }).map((_, i) => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = Math.random() * 2.2 + 0.3;
            const op = (Math.random() * 0.8 + 0.2).toFixed(2);
            const dur = (Math.random() * 6 + 3).toFixed(1);
            const delay = (Math.random() * 10).toFixed(1);
            const color = Math.random() > 0.6 ? '#00DFD8' : (Math.random() > 0.3 ? '#E879F9' : (Math.random() > 0.15 ? '#38BDF8' : '#FFFFFF'));
            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${op}">
        <animate attributeName="opacity" values="${op};${(op * 0.1).toFixed(2)};${op}" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" />
        <animate attributeName="cy" values="${y.toFixed(1)};${(y - 80).toFixed(1)};${y.toFixed(1)}" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" />
        <animate attributeName="cx" values="${x.toFixed(1)};${(x + (Math.random() * 40 - 20)).toFixed(1)};${x.toFixed(1)}" dur="${(dur * 1.4).toFixed(1)}s" begin="-${delay}s" repeatCount="indefinite" />
      </circle>`;
        }).join('\n      ');

        const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Volumetric Ambient Nebula Glows -->
    <radialGradient id="nebula-cyan" cx="18%" cy="25%" r="60%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.55" />
      <stop offset="50%" stop-color="#00DFD8" stop-opacity="0.18" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>
    
    <radialGradient id="nebula-purple" cx="82%" cy="75%" r="60%">
      <stop offset="0%" stop-color="#7701D0" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#7701D0" stop-opacity="0.2" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="avatar-center-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9333EA" stop-opacity="0.75" />
      <stop offset="35%" stop-color="#7E22CE" stop-opacity="0.5" />
      <stop offset="70%" stop-color="#00DFD8" stop-opacity="0.3" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <!-- Top Specular Edge Highlight -->
    <linearGradient id="specular-top-edge" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85" />
      <stop offset="30%" stop-color="#00DFD8" stop-opacity="0.35" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </linearGradient>

    <!-- Sweeping Laser Flare Gradient -->
    <linearGradient id="laser-flare-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent" />
      <stop offset="35%" stop-color="#00DFD8" stop-opacity="0.5" />
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="1" />
      <stop offset="65%" stop-color="#E879F9" stop-opacity="0.5" />
      <stop offset="100%" stop-color="transparent" />
    </linearGradient>

    <!-- Vertical Scanner Gradient -->
    <linearGradient id="laser-scanner-vert" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="transparent" />
      <stop offset="50%" stop-color="#00DFD8" stop-opacity="0.85" />
      <stop offset="100%" stop-color="transparent" />
    </linearGradient>

    <linearGradient id="laser-scanner-vert-2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="transparent" />
      <stop offset="50%" stop-color="#E879F9" stop-opacity="0.85" />
      <stop offset="100%" stop-color="transparent" />
    </linearGradient>

    <!-- Dual-Tone Chrome Neon Stroke -->
    <linearGradient id="chrome-border-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.95" />
      <stop offset="25%" stop-color="#38BDF8" stop-opacity="0.7" />
      <stop offset="50%" stop-color="#A855F7" stop-opacity="0.95" />
      <stop offset="75%" stop-color="#7701D0" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#00DFD8" stop-opacity="0.95" />
    </linearGradient>

    <style>
      /* EXTREME HYPER ANIMATIONS (SAFE) */
      @keyframes cyber-scan {
        0% { transform: translateY(-100%); opacity: 0; }
        10% { opacity: 0.8; }
        90% { opacity: 0.8; }
        100% { transform: translateY(1000%); opacity: 0; }
      }
      @keyframes border-run {
        0% { stroke-dashoffset: 1000; }
        100% { stroke-dashoffset: 0; }
      }
      .cyber-scanner { animation: cyber-scan 3s cubic-bezier(0.1, 0.8, 0.9, 0.2) infinite; }
      .border-run { stroke-dasharray: 100 200; animation: border-run 5s linear infinite; }

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
        stroke: rgba(255, 255, 255, 0.95);
        stroke-width: 2.5px;
        letter-spacing: 6px;
        text-anchor: middle;
        
      }
      
      .text-solid {
        font-family: 'Arial Black', Impact, -apple-system, sans-serif;
        font-size: 225px;
        font-weight: 900;
        fill: #FFFFFF;
        letter-spacing: -1px;
        text-anchor: middle;
        filter: drop-shadow(0px 25px 50px rgba(0, 0, 0, 0.95)) drop-shadow(0px 0px 40px rgba(0, 223, 216, 0.45));
        animation: textGlowPulse 3.5s infinite alternate ease-in-out;
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
        filter: drop-shadow(0 0 70px rgba(147, 51, 234, 0.65)) drop-shadow(0 25px 50px rgba(0,0,0,0.95));
        transform-box: fill-box;
        transform-origin: center;
        animation: breathe 4s infinite ease-in-out;
      }

      @keyframes pulse {
  0% { opacity: 0.8; }
  100% { opacity: 0.8; }
}

      @keyframes breathe {
        0% { transform: scale(1) translateY(0px); }
        50% { transform: scale(1.03) translateY(-8px); }
        100% { transform: scale(1) translateY(0px); }
      }

      @keyframes textGlowPulse {
  0% { filter: drop-shadow(0px 25px 50px rgba(0, 0, 0, 0.95)) drop-shadow(0px 0px 40px rgba(0, 223, 216, 0.7)); }
  100% { filter: drop-shadow(0px 25px 50px rgba(0, 0, 0, 0.95)) drop-shadow(0px 0px 40px rgba(0, 223, 216, 0.7)); }
}

      

      .sonar-shockwave {
        animation: shockwaveExpand 2.4s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
      }
      @keyframes shockwaveExpand {
        0% { r: 50; opacity: 0.95; stroke-width: 2.5; }
        100% { r: 400; opacity: 0; stroke-width: 0.2; }
      }

      .laser-cable {
        stroke-dasharray: 10, 16;
        animation: cableStream 0.9s linear infinite;
      }
      @keyframes cableStream {
        from { stroke-dashoffset: 26; }
        to { stroke-dashoffset: 0; }
      }

      .corner-chase {
        stroke-dasharray: 20, 40;
        animation: cornerChase 2s linear infinite;
      }
      @keyframes cornerChase {
        from { stroke-dashoffset: 60; }
        to { stroke-dashoffset: 0; }
      }

      .laser-scanner-1 {
        animation: verticalScan1 3s ease-in-out infinite alternate;
      }
      @keyframes verticalScan1 {
        0% { transform: translateY(180px); opacity: 0.2; }
        50% { opacity: 0.9; }
        100% { transform: translateY(750px); opacity: 0.2; }
      }

      .laser-scanner-2 {
        animation: verticalScan2 3s ease-in-out infinite alternate-reverse;
      }
      @keyframes verticalScan2 {
        0% { transform: translateY(180px); opacity: 0.2; }
        50% { opacity: 0.9; }
        100% { transform: translateY(750px); opacity: 0.2; }
      }
    </style>
    
    <pattern id="scanline" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="2" fill="rgba(0,0,0,0.22)" />
      <rect y="2" width="6" height="4" fill="transparent" />
    </pattern>

    <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Deep Obsidian Background Void -->
  <rect width="${width}" height="${height}" class="bg-void" />
  <rect width="${width}" height="${height}" fill="url(#cyber-grid)" />
  <rect width="${width}" height="${height}" fill="url(#nebula-cyan)" style="animation: pulse 6s infinite alternate;" />
  <rect width="${width}" height="${height}" fill="url(#nebula-purple)" style="animation: pulse 6s infinite alternate-reverse;" />

  <!-- Specular Top Edge Light Refraction -->
  <path d="M 18 5 L ${width - 18} 5 L ${width - 5} 18 L 5 18 Z" fill="url(#specular-top-edge)" opacity="0.85" />

  <!-- Sweeping Laser Beam Across Top Rail -->
  <rect x="0" y="4" width="480" height="3.5" fill="url(#laser-flare-grad)">
    <animate attributeName="x" from="-500" to="${width + 100}" dur="3s" repeatCount="indefinite" />
  </rect>

  <!-- Sweeping Reverse Laser Beam Across Bottom Rail -->
  <rect x="0" y="${height - 7}" width="480" height="3.5" fill="url(#laser-flare-grad)">
    <animate attributeName="x" from="${width + 100}" to="-500" dur="3.5s" repeatCount="indefinite" />
  </rect>

  <!-- Animated Laser Perimeter Stream -->
  <polygon points="22,8 ${width - 22},8 ${width - 8},22 ${width - 8},${height - 22} ${width - 22},${height - 8} 22,${height - 8} 8,${height - 22} 8,22" fill="none" stroke="#00DFD8" stroke-opacity="0.5" stroke-width="1.4" class="laser-cable" />

  <!-- 3D MULTI-PLANE TILTED GYROSCOPIC HOLOGRAM AROUND AVATAR -->
  <circle cx="${width / 2}" cy="420" r="320" fill="url(#avatar-center-glow)" />

  <!-- Expanding Sonar Shockwaves from Center -->
  <!-- Target Reticle Tick Aperture (Dual Counter-Rotating Gears) -->
  <g transform="translate(${width / 2}, 420)">
    <circle cx="0" cy="0" r="325" fill="none" stroke="rgba(0, 223, 216, 0.4)" stroke-width="1.2" stroke-dasharray="4, 12">
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="22s" repeatCount="indefinite" />
    </circle>
    <circle cx="0" cy="0" r="285" fill="none" stroke="rgba(232, 121, 249, 0.35)" stroke-width="1" stroke-dasharray="2, 8">
      <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="18s" repeatCount="indefinite" />
    </circle>
  </g>

  <!-- 3D Tilted Gyroscope Outer Ring 1 (18s SMIL Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="420" rx="330" ry="155" fill="none" stroke="rgba(0, 223, 216, 0.65)" stroke-width="1.8" stroke-dasharray="18, 14">
      <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} 420" to="360 ${width / 2} 420" dur="18s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 3D Tilted Gyroscope Reverse Ring 2 (12s SMIL Counter-Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="420" rx="285" ry="125" fill="none" stroke="rgba(168, 85, 247, 0.65)" stroke-width="1.6" stroke-dasharray="12, 16">
      <animateTransform attributeName="transform" type="rotate" from="360 ${width / 2} 420" to="0 ${width / 2} 420" dur="12s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 3D Tilted Gyroscope Ring 3 (Inclined 45deg, 8s Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="420" rx="305" ry="100" fill="none" stroke="rgba(16, 185, 129, 0.55)" stroke-width="1.4" stroke-dasharray="8, 10">
      <animateTransform attributeName="transform" type="rotate" from="45 ${width / 2} 420" to="405 ${width / 2} 420" dur="8s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 3D Tilted Gyroscope Ring 4 (Inclined 135deg, 5s Counter-Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="420" rx="255" ry="80" fill="none" stroke="rgba(245, 158, 11, 0.55)" stroke-width="1.4" stroke-dasharray="6, 8">
      <animateTransform attributeName="transform" type="rotate" from="135 ${width / 2} 420" to="-225 ${width / 2} 420" dur="5s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 3D Tilted Gyroscope Ring 5 (Inclined 75deg, 10s Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="420" rx="270" ry="110" fill="none" stroke="rgba(56, 189, 248, 0.5)" stroke-width="1.2" stroke-dasharray="10, 8">
      <animateTransform attributeName="transform" type="rotate" from="75 ${width / 2} 420" to="435 ${width / 2} 420" dur="10s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 3D Tilted Gyroscope Ring 6 (Inclined 165deg, 6s Counter-Clockwise Rotation) -->
  <g>
    <ellipse cx="${width / 2}" cy="420" rx="235" ry="70" fill="none" stroke="rgba(236, 72, 153, 0.5)" stroke-width="1.2" stroke-dasharray="5, 7">
      <animateTransform attributeName="transform" type="rotate" from="165 ${width / 2} 420" to="-195 ${width / 2} 420" dur="6s" repeatCount="indefinite" />
    </ellipse>
  </g>

  <!-- 12 Orbiting 3D Photon Satellites around Avatar in Spatial Perspective -->
  <g>
    <circle cx="${width / 2}" cy="265" r="4.5" fill="#FFFFFF" filter="drop-shadow(0 0 12px #00DFD8)">
      <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} 420" to="360 ${width / 2} 420" dur="6s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2}" cy="575" r="4.5" fill="#E879F9" filter="drop-shadow(0 0 12px #A855F7)">
      <animateTransform attributeName="transform" type="rotate" from="360 ${width / 2} 420" to="0 ${width / 2} 420" dur="6s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 + 255}" cy="420" r="4" fill="#34D399" filter="drop-shadow(0 0 10px #10B981)">
      <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} 420" to="360 ${width / 2} 420" dur="4s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 - 225}" cy="420" r="4" fill="#FBBF24" filter="drop-shadow(0 0 10px #F59E0B)">
      <animateTransform attributeName="transform" type="rotate" from="360 ${width / 2} 420" to="0 ${width / 2} 420" dur="5s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 + 180}" cy="280" r="3.5" fill="#38BDF8" filter="drop-shadow(0 0 8px #00DFD8)">
      <animateTransform attributeName="transform" type="rotate" from="90 ${width / 2} 420" to="450 ${width / 2} 420" dur="4.5s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 - 180}" cy="560" r="3.5" fill="#F43F5E" filter="drop-shadow(0 0 8px #E11D48)">
      <animateTransform attributeName="transform" type="rotate" from="270 ${width / 2} 420" to="-90 ${width / 2} 420" dur="4.5s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 + 210}" cy="480" r="3.2" fill="#A78BFA" filter="drop-shadow(0 0 8px #8B5CF6)">
      <animateTransform attributeName="transform" type="rotate" from="180 ${width / 2} 420" to="540 ${width / 2} 420" dur="3.5s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 - 210}" cy="360" r="3.2" fill="#6EE7B7" filter="drop-shadow(0 0 8px #10B981)">
      <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} 420" to="-360 ${width / 2} 420" dur="3.5s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 + 130}" cy="320" r="2.8" fill="#F472B6" filter="drop-shadow(0 0 8px #DB2777)">
      <animateTransform attributeName="transform" type="rotate" from="45 ${width / 2} 420" to="405 ${width / 2} 420" dur="3s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 - 130}" cy="520" r="2.8" fill="#FDE047" filter="drop-shadow(0 0 8px #CA8A04)">
      <animateTransform attributeName="transform" type="rotate" from="225 ${width / 2} 420" to="-135 ${width / 2} 420" dur="3s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 + 240}" cy="350" r="2.8" fill="#22D3EE" filter="drop-shadow(0 0 8px #0891B2)">
      <animateTransform attributeName="transform" type="rotate" from="135 ${width / 2} 420" to="495 ${width / 2} 420" dur="2.5s" repeatCount="indefinite" />
    </circle>
  </g>
  <g>
    <circle cx="${width / 2 - 240}" cy="490" r="2.8" fill="#C084FC" filter="drop-shadow(0 0 8px #9333EA)">
      <animateTransform attributeName="transform" type="rotate" from="315 ${width / 2} 420" to="-45 ${width / 2} 420" dur="2.5s" repeatCount="indefinite" />
    </circle>
  </g>

  <rect width="${width}" height="${height}" fill="url(#scanline)" />

  <!-- 320 3D Floating Cosmic Particles -->
  <g>
    ${particles}
  </g>

  <!-- 3D Glass Corner Pods & Animated Brackets -->
  <g transform="translate(24, 24)">
    <polygon points="0,0 20,0 0,20" fill="rgba(0, 223, 216, 0.3)" />
    <path d="M 0 35 L 0 0 L 35 0" fill="none" stroke="#00DFD8" stroke-width="2.5" class="corner-chase" />
  </g>
  <g transform="translate(${width - 24}, 24)">
    <polygon points="0,0 -20,0 0,20" fill="rgba(0, 223, 216, 0.3)" />
    <path d="M 0 35 L 0 0 L -35 0" fill="none" stroke="#00DFD8" stroke-width="2.5" class="corner-chase" />
  </g>
  <g transform="translate(24, ${height - 24})">
    <polygon points="0,0 20,0 0,-20" fill="rgba(119, 1, 208, 0.3)" />
    <path d="M 0 -35 L 0 0 L 35 0" fill="none" stroke="#7701D0" stroke-width="2.5" class="corner-chase" />
  </g>
  <g transform="translate(${width - 24}, ${height - 24})">
    <polygon points="0,0 -20,0 0,-20" fill="rgba(119, 1, 208, 0.3)" />
    <path d="M 0 -35 L 0 0 L -35 0" fill="none" stroke="#7701D0" stroke-width="2.5" class="corner-chase" />
  </g>

  <!-- Top Metadata Bar -->
  <g transform="translate(${width / 2}, 55)">
    <line x1="-380" y1="-5" x2="-230" y2="-5" stroke="#00DFD8" stroke-width="1.5" stroke-opacity="0.85" />
    <text x="0" y="0" class="top-meta">SOFTWARE ENGINEER (MATHIYA)</text>
    <line x1="230" y1="-5" x2="380" y2="-5" stroke="#00DFD8" stroke-width="1.5" stroke-opacity="0.85" />
  </g>

  <!-- Layer 1: Outlined "MATHISHA" (Upper Background Behind Avatar) - Perfectly Fitted -->
  <text x="${width / 2}" y="295" class="text-outline">MATHISHA</text>

  <!-- Layer 2: Mathisha Portrait Photo in Suit with Dual Vertical Laser Hologram Scanners -->
  <g class="image-layer">
    <image href="${imageBase64}" x="${width / 2 - 260}" y="195" width="520" height="570" preserveAspectRatio="xMidYMid slice" />
  </g>

  <!-- Dual Counter-Phased Vertical Scanning Hologram Laser Beams -->
  <rect x="${width / 2 - 270}" y="0" width="540" height="4" fill="url(#laser-scanner-vert)" class="laser-scanner-1" />
  <rect x="${width / 2 - 270}" y="0" width="540" height="4" fill="url(#laser-scanner-vert-2)" class="laser-scanner-2" />

  <!-- Layer 3: Solid "ANGIRASA" (Foreground Bold Typography Overlapping Torso) - Perfectly Fitted -->
  <text x="${width / 2}" y="760" class="text-solid">ANGIRASA</text>

  <!-- Layer 4: Bottom Subtitle with Dual Chrome Neon Rules -->
  <g transform="translate(${width / 2}, 850)">
    <line x1="-480" y1="-4" x2="-350" y2="-4" stroke="url(#chrome-border-grad)" stroke-width="1.6" />
    <text x="0" y="0" class="bottom-meta">SOFTWARE ENGINEER &amp; AI SYSTEMS ARCHITECT</text>
    <line x1="350" y1="-4" x2="480" y2="-4" stroke="url(#chrome-border-grad)" stroke-width="1.6" />
  </g>

  <!-- Layer 5: Extreme Cyber Scanner Overlay -->
  <g class="hyper-overlay-effects" style="pointer-events: none;">
      <!-- Scanning laser -->
      <rect x="0" y="0" width="100%" height="2" fill="#00DFD8" opacity="0.7" class="cyber-scanner" filter="drop-shadow(0 0 8px #00DFD8)">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="0" y="-20" width="100%" height="40" fill="url(#specular-top-edge)" opacity="0.4" class="cyber-scanner" style="animation-delay: -0.1s" />
      
      <!-- Vignette / Border flare -->
      <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" fill="none" stroke="rgba(0,223,216,0.5)" stroke-width="2" class="border-run" />
  </g>
</svg>
        `;

        fs.writeFileSync('header.svg', svg);
        console.log("Successfully created maximum animation supercharged header.svg!");
    });
});
