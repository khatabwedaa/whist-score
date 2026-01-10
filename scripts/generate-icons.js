/**
 * Generate App Icons for West Score
 * Creates icon.png, adaptive-icon.png, favicon.png, and splash-icon.png
 * with the Ford-style cursive "W" design
 */

const fs = require("fs");
const path = require("path");

// SVG template for the app icon
const createIconSVG = (size, padding = 0.15) => {
  const paddedSize = size * (1 - padding * 2);
  const offset = size * padding;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="50%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
  </defs>
  
  <!-- Background with rounded corners -->
  <rect x="0" y="0" width="${size}" height="${size}" rx="${size * 0.22}" ry="${
    size * 0.22
  }" fill="url(#bgGradient)"/>
  
  <!-- Ford-style smooth cursive "W" -->
  <g transform="translate(${offset}, ${offset}) scale(${paddedSize / 100})">
    <path
      d="M 12 30
         Q 14 28, 18 32
         Q 24 45, 30 60
         Q 32 65, 35 62
         Q 40 50, 45 38
         Q 47 34, 50 36
         Q 53 38, 55 42
         Q 60 54, 65 62
         Q 68 65, 70 60
         Q 76 45, 82 32
         Q 86 28, 88 30
         Q 90 32, 88 36
         Q 80 55, 72 72
         Q 68 80, 62 78
         Q 58 76, 55 70
         Q 50 60, 50 58
         Q 50 60, 45 70
         Q 42 76, 38 78
         Q 32 80, 28 72
         Q 20 55, 12 36
         Q 10 32, 12 30
         Z"
      fill="url(#logoGradient)"
      stroke="#f1f5f9"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Decorative underline swoosh -->
    <path
      d="M 18 78
         Q 35 82, 50 80
         Q 65 78, 82 74"
      fill="none"
      stroke="url(#logoGradient)"
      stroke-width="2.5"
      stroke-linecap="round"
    />
  </g>
</svg>`;
};

// SVG for adaptive icon (Android) - no background, just the logo
const createAdaptiveIconSVG = (size) => {
  const padding = 0.25; // More padding for adaptive icon safe zone
  const paddedSize = size * (1 - padding * 2);
  const offset = size * padding;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="50%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
  </defs>
  
  <!-- Ford-style smooth cursive "W" -->
  <g transform="translate(${offset}, ${offset}) scale(${paddedSize / 100})">
    <path
      d="M 12 30
         Q 14 28, 18 32
         Q 24 45, 30 60
         Q 32 65, 35 62
         Q 40 50, 45 38
         Q 47 34, 50 36
         Q 53 38, 55 42
         Q 60 54, 65 62
         Q 68 65, 70 60
         Q 76 45, 82 32
         Q 86 28, 88 30
         Q 90 32, 88 36
         Q 80 55, 72 72
         Q 68 80, 62 78
         Q 58 76, 55 70
         Q 50 60, 50 58
         Q 50 60, 45 70
         Q 42 76, 38 78
         Q 32 80, 28 72
         Q 20 55, 12 36
         Q 10 32, 12 30
         Z"
      fill="url(#logoGradient)"
      stroke="#f1f5f9"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Decorative underline swoosh -->
    <path
      d="M 18 78
         Q 35 82, 50 80
         Q 65 78, 82 74"
      fill="none"
      stroke="url(#logoGradient)"
      stroke-width="2.5"
      stroke-linecap="round"
    />
  </g>
</svg>`;
};

// SVG for splash icon - larger with more room
const createSplashIconSVG = (size) => {
  const padding = 0.2;
  const paddedSize = size * (1 - padding * 2);
  const offset = size * padding;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="50%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
  </defs>
  
  <!-- Ford-style smooth cursive "W" -->
  <g transform="translate(${offset}, ${offset}) scale(${paddedSize / 100})">
    <path
      d="M 12 30
         Q 14 28, 18 32
         Q 24 45, 30 60
         Q 32 65, 35 62
         Q 40 50, 45 38
         Q 47 34, 50 36
         Q 53 38, 55 42
         Q 60 54, 65 62
         Q 68 65, 70 60
         Q 76 45, 82 32
         Q 86 28, 88 30
         Q 90 32, 88 36
         Q 80 55, 72 72
         Q 68 80, 62 78
         Q 58 76, 55 70
         Q 50 60, 50 58
         Q 50 60, 45 70
         Q 42 76, 38 78
         Q 32 80, 28 72
         Q 20 55, 12 36
         Q 10 32, 12 30
         Z"
      fill="url(#logoGradient)"
      stroke="#f1f5f9"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Decorative underline swoosh -->
    <path
      d="M 18 78
         Q 35 82, 50 80
         Q 65 78, 82 74"
      fill="none"
      stroke="url(#logoGradient)"
      stroke-width="2.5"
      stroke-linecap="round"
    />
  </g>
</svg>`;
};

const assetsDir = path.join(__dirname, "..", "assets");

// Save SVG files first (can be converted to PNG using sharp or online tools)
const icons = [
  {
    name: "icon.svg",
    svg: createIconSVG(1024),
    description: "Main app icon (1024x1024)",
  },
  {
    name: "adaptive-icon.svg",
    svg: createAdaptiveIconSVG(1024),
    description: "Android adaptive icon foreground (1024x1024)",
  },
  {
    name: "favicon.svg",
    svg: createIconSVG(48, 0.1),
    description: "Web favicon (48x48)",
  },
  {
    name: "splash-icon.svg",
    svg: createSplashIconSVG(200),
    description: "Splash screen icon (200x200)",
  },
];

console.log("🎨 Generating West Score app icons...\n");

icons.forEach(({ name, svg, description }) => {
  const filePath = path.join(assetsDir, name);
  fs.writeFileSync(filePath, svg);
  console.log(`✅ Created ${name} - ${description}`);
});

console.log("\n📝 SVG files created in assets folder.");
console.log("   To convert to PNG, you can use:");
console.log("   - sharp library: npm install sharp");
console.log("   - Online: svgtopng.com or cloudconvert.com");
console.log("   - Inkscape: inkscape -w 1024 -h 1024 icon.svg -o icon.png");
console.log(
  "\n🚀 Or run: node scripts/convert-to-png.js (after installing sharp)"
);
