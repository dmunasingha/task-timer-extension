import { writeFileSync } from 'fs';

// Generate a simple timer icon as SVG
const generateSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${size/2}" cy="${size/2}" r="${size*0.4}" fill="none" stroke="#4F46E5" stroke-width="${size*0.1}"/>
  <line x1="${size/2}" y1="${size/2}" x2="${size/2}" y2="${size*0.3}" stroke="#4F46E5" stroke-width="${size*0.08}" stroke-linecap="round"/>
  <line x1="${size/2}" y1="${size/2}" x2="${size*0.7}" y2="${size/2}" stroke="#4F46E5" stroke-width="${size*0.08}" stroke-linecap="round"/>
</svg>`;

// Generate icons of different sizes
[16, 48, 128].forEach(size => {
  writeFileSync(`public/icons/icon${size}.svg`, generateSVG(size));
});