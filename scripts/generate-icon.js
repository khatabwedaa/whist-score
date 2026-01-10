/**
 * Generate West Score App Icon
 * Elegant playing cards design - two cards crossed on dark background
 */

const sharp = require("sharp");
const path = require("path");

// Icon sizes needed for iOS and Android
const sizes = {
  "icon.png": 1024,
  "adaptive-icon.png": 1024,
  "favicon.png": 48,
  "splash-icon.png": 200,
};

// Create SVG for the icon - Elegant crossed cards design
function createIconSVG(size) {
  const cornerRadius = size * 0.22;
  const cardWidth = size * 0.32;
  const cardHeight = size * 0.45;
  const cardRadius = size * 0.025;

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Card shadow -->
    <filter id="cardShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="${size * 0.01}" stdDeviation="${
    size * 0.025
  }" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
    
    <!-- Gradient for background -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e"/>
      <stop offset="50%" style="stop-color:#16213e"/>
      <stop offset="100%" style="stop-color:#0f0f23"/>
    </linearGradient>
    
    <!-- Gold accent gradient -->
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffd700"/>
      <stop offset="50%" style="stop-color:#ffb347"/>
      <stop offset="100%" style="stop-color:#ffd700"/>
    </linearGradient>
    
    <!-- Card gradient for depth -->
    <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff"/>
      <stop offset="100%" style="stop-color:#f0f0f0"/>
    </linearGradient>
  </defs>
  
  <!-- Background with rounded corners -->
  <rect width="${size}" height="${size}" rx="${cornerRadius}" fill="url(#bgGradient)"/>
  
  <!-- Decorative corner accents -->
  <path d="M ${size * 0.08} ${size * 0.2} Q ${size * 0.08} ${size * 0.08} ${
    size * 0.2
  } ${size * 0.08}" 
        fill="none" stroke="url(#goldGradient)" stroke-width="${
          size * 0.008
        }" stroke-linecap="round" opacity="0.6"/>
  <path d="M ${size * 0.92} ${size * 0.2} Q ${size * 0.92} ${size * 0.08} ${
    size * 0.8
  } ${size * 0.08}" 
        fill="none" stroke="url(#goldGradient)" stroke-width="${
          size * 0.008
        }" stroke-linecap="round" opacity="0.6"/>
  <path d="M ${size * 0.08} ${size * 0.8} Q ${size * 0.08} ${size * 0.92} ${
    size * 0.2
  } ${size * 0.92}" 
        fill="none" stroke="url(#goldGradient)" stroke-width="${
          size * 0.008
        }" stroke-linecap="round" opacity="0.6"/>
  <path d="M ${size * 0.92} ${size * 0.8} Q ${size * 0.92} ${size * 0.92} ${
    size * 0.8
  } ${size * 0.92}" 
        fill="none" stroke="url(#goldGradient)" stroke-width="${
          size * 0.008
        }" stroke-linecap="round" opacity="0.6"/>

  <!-- Back Card (rotated left) -->
  <g filter="url(#cardShadow)" transform="rotate(-15 ${size * 0.5} ${
    size * 0.52
  })">
    <rect x="${size * 0.34}" y="${
    size * 0.28
  }" width="${cardWidth}" height="${cardHeight}" rx="${cardRadius}" fill="url(#cardGradient)"/>
    <!-- Card back pattern - red with diamond pattern -->
    <rect x="${size * 0.355}" y="${size * 0.295}" width="${
    cardWidth - size * 0.03
  }" height="${cardHeight - size * 0.03}" rx="${size * 0.015}" fill="#dc2626"/>
    <!-- Inner border -->
    <rect x="${size * 0.37}" y="${size * 0.31}" width="${
    cardWidth - size * 0.06
  }" height="${cardHeight - size * 0.06}" rx="${
    size * 0.01
  }" fill="none" stroke="#ffd700" stroke-width="${size * 0.003}"/>
    <!-- Diamond pattern -->
    <path d="M ${size * 0.5} ${size * 0.38} L ${size * 0.54} ${size * 0.5} L ${
    size * 0.5
  } ${size * 0.62} L ${size * 0.46} ${
    size * 0.5
  } Z" fill="#b91c1c" opacity="0.5"/>
  </g>

  <!-- Front Card (rotated right) - Spade Ace -->
  <g filter="url(#cardShadow)" transform="rotate(15 ${size * 0.5} ${
    size * 0.52
  })">
    <rect x="${size * 0.34}" y="${
    size * 0.28
  }" width="${cardWidth}" height="${cardHeight}" rx="${cardRadius}" fill="url(#cardGradient)"/>
    
    <!-- Card content - Ace of Spades style -->
    <!-- Top left A -->
    <text x="${size * 0.365}" y="${size * 0.345}" 
          font-family="Georgia, serif" 
          font-size="${size * 0.045}" 
          font-weight="bold"
          fill="#1f2937">A</text>
    
    <!-- Top left spade -->
    <path d="M ${size * 0.385} ${size * 0.36} 
             C ${size * 0.385} ${size * 0.36} ${size * 0.365} ${size * 0.38} ${
    size * 0.365
  } ${size * 0.395}
             C ${size * 0.365} ${size * 0.41} ${size * 0.385} ${size * 0.415} ${
    size * 0.385
  } ${size * 0.415}
             C ${size * 0.385} ${size * 0.415} ${size * 0.405} ${size * 0.41} ${
    size * 0.405
  } ${size * 0.395}
             C ${size * 0.405} ${size * 0.38} ${size * 0.385} ${size * 0.36} ${
    size * 0.385
  } ${size * 0.36} Z
             M ${size * 0.378} ${size * 0.41} L ${size * 0.385} ${
    size * 0.43
  } L ${size * 0.392} ${size * 0.41}" 
          fill="#1f2937" stroke="#1f2937" stroke-width="${size * 0.002}"/>
    
    <!-- Center large spade -->
    <path d="M ${size * 0.5} ${size * 0.4} 
             C ${size * 0.5} ${size * 0.4} ${size * 0.42} ${size * 0.48} ${
    size * 0.42
  } ${size * 0.54}
             C ${size * 0.42} ${size * 0.6} ${size * 0.5} ${size * 0.62} ${
    size * 0.5
  } ${size * 0.62}
             C ${size * 0.5} ${size * 0.62} ${size * 0.58} ${size * 0.6} ${
    size * 0.58
  } ${size * 0.54}
             C ${size * 0.58} ${size * 0.48} ${size * 0.5} ${size * 0.4} ${
    size * 0.5
  } ${size * 0.4} Z" 
          fill="#1f2937"/>
    <!-- Spade stem -->
    <path d="M ${size * 0.47} ${size * 0.58} Q ${size * 0.5} ${size * 0.66} ${
    size * 0.53
  } ${size * 0.58}" 
          fill="#1f2937"/>
    
    <!-- Bottom right A (inverted) -->
    <text x="${size * 0.635}" y="${size * 0.7}" 
          font-family="Georgia, serif" 
          font-size="${size * 0.045}" 
          font-weight="bold"
          fill="#1f2937"
          transform="rotate(180 ${size * 0.615} ${size * 0.68})">A</text>
  </g>

  <!-- "W" letter overlay for West Score branding -->
  <text x="${size * 0.5}" y="${size * 0.88}" 
        font-family="Georgia, serif" 
        font-size="${size * 0.1}" 
        font-weight="bold"
        fill="url(#goldGradient)"
        text-anchor="middle"
        opacity="0.9">W</text>
</svg>`;
}

async function generateIcons() {
  const assetsDir = path.join(__dirname, "..", "assets");

  for (const [filename, size] of Object.entries(sizes)) {
    const svg = createIconSVG(size);

    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(path.join(assetsDir, filename));

    console.log(`✅ Generated ${filename} (${size}x${size})`);
  }

  console.log("\n🎴 All icons generated successfully!");
}

generateIcons().catch(console.error);
