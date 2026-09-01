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
        const height = 940;

        // Generate 3D point cloud & galaxy dust particles (Spline 3D simulation)
        const particles = Array.from({ length: 220 }).map((_, i) => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = Math.random() * 1.6 + 0.4;
            const op = (Math.random() * 0.7 + 0.2).toFixed(2);
            const dur = (Math.random() * 8 + 6).toFixed(1);
            const delay = (Math.random() * 10).toFixed(1);
            const color = Math.random() > 0.6 ? '#00DFD8' : (Math.random() > 0.3 ? '#C084FC' : '#FFFFFF');
            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${op}">
        <animate attributeName="opacity" values="${op};${(op * 0.2).toFixed(2)};${op}" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" />
        <animate attributeName="cy" values="${y.toFixed(1)};${(y - 30).toFixed(1)};${y.toFixed(1)}" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" />
      </circle>`;
        }).join('\n      ');

        const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep Space Void & Portfolio Atmospheric Gradients -->
    <radialGradient id="aurora-cyan" cx="15%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#00DFD8" stop-opacity="0.22" />
      <stop offset="60%" stop-color="#00DFD8" stop-opacity="0.04" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>
    
    <radialGradient id="aurora-pink" cx="85%" cy="70%" r="50%">
      <stop offset="0%" stop-color="#FF525C" stop-opacity="0.18" />
      <stop offset="60%" stop-color="#FF525C" stop-opacity="0.03" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="nebula-purple-core" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#9333EA" stop-opacity="0.55" />
      <stop offset="30%" stop-color="#7E22CE" stop-opacity="0.35" />
      <stop offset="60%" stop-color="#4C1D95" stop-opacity="0.18" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <!-- Floating Dock Glass Gradient -->
    <linearGradient id="dockGlass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95" />
    </linearGradient>

    <linearGradient id="dockBorder" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.2)" />
      <stop offset="50%" stop-color="#00DFD8" stop-opacity="0.5" />
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.2)" />
    </linearGradient>

    <style>
      .bg-void { fill: #000000; }
      
      .hud-mono {
        font-family: 'Fira Code', 'SF Mono', Consolas, monospace;
        font-size: 11px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.45);
        letter-spacing: 2.5px;
      }

      .hud-badge-text {
        font-family: 'Fira Code', 'SF Mono', Consolas, monospace;
        font-size: 9.5px;
        font-weight: 700;
        fill: #34D399;
        letter-spacing: 1.5px;
      }

      .top-meta {
        font-family: 'Fira Code', 'SF Mono', Consolas, monospace;
        font-size: 12px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.75);
        letter-spacing: 5px;
        text-anchor: middle;
      }

      .text-outline-mathisha {
        font-family: 'Arial Black', -apple-system, Impact, sans-serif;
        font-size: 235px;
        font-weight: 900;
        fill: transparent;
        stroke: rgba(255, 255, 255, 0.85);
        stroke-width: 2.2px;
        letter-spacing: 2px;
        text-anchor: middle;
        animation: mathishaGlitch 8s infinite alternate ease-in-out;
      }

      .text-solid-angirasa {
        font-family: 'Arial Black', -apple-system, Impact, sans-serif;
        font-size: 275px;
        font-weight: 900;
        fill: #FFFFFF;
        letter-spacing: -4px;
        text-anchor: middle;
        filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.95));
      }

      .bottom-subtitle {
        font-family: 'Fira Code', 'SF Mono', Consolas, monospace;
        font-size: 13.5px;
        font-weight: 700;
        fill: #00DFD8;
        letter-spacing: 6px;
        text-anchor: middle;
      }

      .dock-label {
        font-family: 'Fira Code', 'SF Mono', Consolas, monospace;
        font-size: 9.5px;
        font-weight: 600;
        fill: rgba(255, 255, 255, 0.8);
        letter-spacing: 1px;
      }

      .pulse-green {
        animation: beaconPing 1.8s infinite alternate;
      }
      .pulse-cyan {
        animation: cyanPing 2s infinite alternate;
      }

      @keyframes beaconPing {
        0% { opacity: 0.4; transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1.2); filter: drop-shadow(0 0 6px #10B981); }
      }
      @keyframes cyanPing {
        0% { opacity: 0.4; transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1.2); filter: drop-shadow(0 0 6px #00DFD8); }
      }
      @keyframes mathishaGlitch {
        0% { stroke: rgba(255, 255, 255, 0.85); transform: translate(0, 0); }
        92% { stroke: rgba(255, 255, 255, 0.85); transform: translate(0, 0); }
        94% { stroke: #00DFD8; transform: translate(-2px, 1px); }
        96% { stroke: #FF525C; transform: translate(2px, -1px); }
        98% { stroke: rgba(255, 255, 255, 0.85); transform: translate(0, 0); }
      }

      .dock-float {
        animation: dockLevitate 4s ease-in-out infinite alternate;
      }
      @keyframes dockLevitate {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-4px); }
      }
    </style>
  </defs>

  <!-- Deep Black Void -->
  <rect width="${width}" height="${height}" class="bg-void" />

  <!-- Atmospheric Nebulas (Matching mathiya.cc) -->
  <rect width="${width}" height="${height}" fill="url(#aurora-cyan)" />
  <rect width="${width}" height="${height}" fill="url(#aurora-pink)" />

  <!-- 3D Point Cloud Galaxy Particles -->
  <g>
    ${particles}
  </g>

  <!-- Swirling Nebula Core behind Portrait -->
  <g transform="translate(${width / 2}, 430)">
    <ellipse cx="0" cy="0" rx="680" ry="340" fill="url(#nebula-purple-core)" />
  </g>

  <!-- Portfolio HUD: Top Left -->
  <g transform="translate(60, 50)">
    <circle cx="0" cy="0" r="3.5" fill="#00DFD8" class="pulse-cyan" />
    <text x="14" y="4" class="hud-mono" fill="rgba(255,255,255,0.75)">PORTFOLIO © 2026</text>
    <text x="0" y="24" class="hud-mono">COLOMBO, SRI LANKA</text>
    
    <!-- Open for Opportunities Badge -->
    <g transform="translate(0, 36)">
      <rect x="0" y="0" width="190" height="22" rx="11" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.3)" stroke-width="1" />
      <circle cx="14" cy="11" r="3.5" fill="#10B981" class="pulse-green" />
      <text x="26" y="14.5" class="hud-badge-text">OPEN FOR OPPORTUNITIES</text>
    </g>
  </g>

  <!-- Portfolio HUD: Top Right -->
  <g transform="translate(${width - 60}, 50)">
    <text x="0" y="4" class="hud-mono" text-anchor="end" fill="rgba(255,255,255,0.75)">INDEPENDENT CREATIVE</text>
    <text x="0" y="24" class="hud-mono" text-anchor="end">SOFTWARE ENGINEERING</text>
    <text x="0" y="44" class="hud-mono" text-anchor="end">AI SYSTEMS ARCHITECTURE</text>
  </g>

  <!-- Portfolio HUD: Top Center -->
  <g transform="translate(${width / 2}, 65)">
    <line x1="-380" y1="-4" x2="-230" y2="-4" stroke="rgba(255,255,255,0.2)" stroke-width="1.2" />
    <text x="0" y="0" class="top-meta">SOFTWARE ENGINEER (MATHIYA)</text>
    <line x1="230" y1="-4" x2="380" y2="-4" stroke="rgba(255,255,255,0.2)" stroke-width="1.2" />
  </g>

  <!-- Layer 1: Outlined "MATHISHA" (Behind Portrait) -->
  <text x="${width / 2}" y="295" class="text-outline-mathisha">MATHISHA</text>

  <!-- Layer 2: Mathisha Portrait Photo in Suit -->
  <g style="filter: drop-shadow(0 0 50px rgba(147, 51, 234, 0.45)) drop-shadow(0 20px 40px rgba(0,0,0,0.9));">
    <image href="${imageBase64}" x="${width / 2 - 270}" y="200" width="540" height="590" preserveAspectRatio="xMidYMid slice" />
  </g>

  <!-- Layer 3: Solid Bold "ANGIRASA" (Foreground Typography) -->
  <text x="${width / 2}" y="775" class="text-solid-angirasa">ANGIRASA</text>

  <!-- Layer 4: Cyan Subtitle (Variable Proximity Style) -->
  <text x="${width / 2}" y="830" class="bottom-subtitle">SOFTWARE ENGINEER &amp; AI SYSTEMS ARCHITECT</text>

  <!-- Layer 5: Floating Quick Launch Dock (Matching mathiya.cc FloatingDock) -->
  <g transform="translate(${width / 2}, 875)" class="dock-float">
    <rect x="-240" y="-18" width="480" height="36" rx="18" fill="url(#dockGlass)" stroke="url(#dockBorder)" stroke-width="1.2" />
    
    <!-- Dock Item 1: Projects -->
    <g transform="translate(-190, 4)">
      <text x="0" y="0" class="dock-label">📁 PROJECTS</text>
    </g>
    <!-- Dock Item 2: Lab -->
    <g transform="translate(-90, 4)">
      <text x="0" y="0" class="dock-label" fill="#00DFD8">✨ LAB</text>
    </g>
    <!-- Dock Item 3: Skills -->
    <g transform="translate(0, 4)">
      <text x="0" y="0" class="dock-label">💻 SKILLS</text>
    </g>
    <!-- Dock Item 4: About -->
    <g transform="translate(90, 4)">
      <text x="0" y="0" class="dock-label">📚 ABOUT</text>
    </g>
    <!-- Dock Item 5: Contact -->
    <g transform="translate(180, 4)">
      <text x="0" y="0" class="dock-label" fill="#38BDF8">✉️ CONTACT</text>
    </g>
  </g>

</svg>
        `;

        fs.writeFileSync('header.svg', svg);
        console.log("Updated header.svg with authentic mathiya.cc portfolio animations & floating dock!");
    });
});
