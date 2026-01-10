/**
 * Generate Whist Score App Icon
 * Creates a modern card game themed icon
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

// Create SVG for the icon - dark theme with playing cards design
function createIconSVG(size) {
  const padding = size * 0.1;
  const cardWidth = size * 0.35;
  const cardHeight = cardWidth * 1.4;
  const cornerRadius = size * 0.08;

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1f2937"/>
      <stop offset="100%" style="stop-color:#111827"/>
    </linearGradient>
    
    <!-- Card shadow -->
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="${size * 0.02}" stdDeviation="${
    size * 0.03
  }" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
    
    <!-- Glow effect -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="${size * 0.01}" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background with rounded corners for iOS -->
  <rect width="${size}" height="${size}" rx="${cornerRadius}" fill="url(#bgGrad)"/>
  
  <!-- Subtle pattern overlay -->
  <rect width="${size}" height="${size}" rx="${cornerRadius}" fill="none" stroke="#374151" stroke-width="${
    size * 0.002
  }"/>
  
  <!-- Left Card (Spade - Blue team) -->
  <g transform="translate(${size * 0.18}, ${size * 0.25}) rotate(-12, ${
    cardWidth / 2
  }, ${cardHeight / 2})" filter="url(#cardShadow)">
    <rect width="${cardWidth}" height="${cardHeight}" rx="${
    size * 0.03
  }" fill="#f9fafb"/>
    <rect width="${cardWidth}" height="${cardHeight}" rx="${
    size * 0.03
  }" fill="none" stroke="#e5e7eb" stroke-width="${size * 0.003}"/>
    
    <!-- Spade symbol -->
    <text x="${cardWidth / 2}" y="${cardHeight * 0.45}" 
          font-family="Arial, sans-serif" 
          font-size="${size * 0.15}" 
          fill="#0ea5e9" 
          text-anchor="middle" 
          dominant-baseline="middle"
          filter="url(#glow)">♠</text>
    
    <!-- A letter -->
    <text x="${cardWidth * 0.2}" y="${cardHeight * 0.15}" 
          font-family="Arial, sans-serif" 
          font-size="${size * 0.06}" 
          font-weight="bold"
          fill="#0ea5e9">A</text>
  </g>
  
  <!-- Right Card (Heart - Amber team) -->
  <g transform="translate(${size * 0.42}, ${size * 0.3}) rotate(12, ${
    cardWidth / 2
  }, ${cardHeight / 2})" filter="url(#cardShadow)">
    <rect width="${cardWidth}" height="${cardHeight}" rx="${
    size * 0.03
  }" fill="#f9fafb"/>
    <rect width="${cardWidth}" height="${cardHeight}" rx="${
    size * 0.03
  }" fill="none" stroke="#e5e7eb" stroke-width="${size * 0.003}"/>
    
    <!-- Heart symbol -->
    <text x="${cardWidth / 2}" y="${cardHeight * 0.45}" 
          font-family="Arial, sans-serif" 
          font-size="${size * 0.15}" 
          fill="#f59e0b" 
          text-anchor="middle" 
          dominant-baseline="middle"
          filter="url(#glow)">♥</text>
    
    <!-- K letter -->
    <text x="${cardWidth * 0.2}" y="${cardHeight * 0.15}" 
          font-family="Arial, sans-serif" 
          font-size="${size * 0.06}" 
          font-weight="bold"
          fill="#f59e0b">K</text>
  </g>
  
  <!-- Score badge at bottom -->
  <g transform="translate(${size / 2}, ${size * 0.82})">
    <ellipse cx="0" cy="0" rx="${size * 0.18}" ry="${
    size * 0.08
  }" fill="#111827" stroke="#4b5563" stroke-width="${size * 0.004}"/>
    <text x="0" y="${size * 0.015}" 
          font-family="Arial, sans-serif" 
          font-size="${size * 0.055}" 
          font-weight="bold"
          fill="#f9fafb" 
          text-anchor="middle">WHIST</text>
  </g>
</svg>`;
}

async function generateIcons() {
  const assetsDir = path.join(__dirname, "..", "assets");

  console.log("🎴 Generating Whist Score app icons...\n");

  for (const [filename, size] of Object.entries(sizes)) {
    const svg = createIconSVG(size);
    const outputPath = path.join(assetsDir, filename);

    await sharp(Buffer.from(svg)).png().toFile(outputPath);

    console.log(`✅ Generated ${filename} (${size}x${size})`);
  }

  console.log("\n🎉 All icons generated successfully!");
}

generateIcons().catch(console.error);
