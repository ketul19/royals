#!/usr/bin/env node
/**
 * generate-placeholders.js
 * Creates SVG placeholder images for all paths referenced in the site's JSON data files.
 * Run: node scripts/generate-placeholders.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

/**
 * Generate a simple SVG placeholder with a label.
 * Uses the hotel's gold-on-dark palette.
 */
function makeSvg(label, width = 800, height = 600) {
  const shortLabel = label.split('/').pop().replace(/-/g, ' ').replace('.jpg', '');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#1a1a1a"/>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#c9a84c" stroke-width="2" opacity="0.3"/>
  <!-- Diagonal lines pattern -->
  <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="40" stroke="#c9a84c" stroke-width="0.5" opacity="0.08"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#p)"/>
  <!-- Crown icon -->
  <text x="${width / 2}" y="${height / 2 - 30}" text-anchor="middle" font-size="48" fill="#c9a84c" opacity="0.4">♛</text>
  <!-- Label -->
  <text x="${width / 2}" y="${height / 2 + 20}" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#c9a84c" opacity="0.7">${shortLabel}</text>
  <text x="${width / 2}" y="${height / 2 + 48}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#8a8279">Royal's Inn — Placeholder Image</text>
</svg>`;
}

// All image paths to generate (from JSON files)
const images = [
  // Hero
  'images/hero-bg.jpg',
  // Rooms
  'images/rooms/ac-deluxe-1.jpg',
  'images/rooms/ac-deluxe-2.jpg',
  'images/rooms/ac-twin-1.jpg',
  'images/rooms/ac-twin-2.jpg',
  'images/rooms/ac-suite-1.jpg',
  'images/rooms/ac-suite-2.jpg',
  'images/rooms/nonac-standard-1.jpg',
  'images/rooms/nonac-standard-2.jpg',
  'images/rooms/nonac-twin-1.jpg',
  'images/rooms/nonac-twin-2.jpg',
  'images/rooms/hostel-1.jpg',
  'images/rooms/hostel-2.jpg',
  'images/rooms/hostel-private-1.jpg',
  'images/rooms/hostel-private-2.jpg',
  // Dining
  'images/dining/dal-makhani.jpg',
  'images/dining/butter-chicken.jpg',
  'images/dining/paneer-tikka.jpg',
  'images/dining/naan.jpg',
  'images/dining/lassi.jpg',
  'images/dining/guj-thali.jpg',
  'images/dining/dhokla.jpg',
  'images/dining/undhiyu.jpg',
  'images/dining/kadhi.jpg',
  'images/dining/masala-dosa.jpg',
  'images/dining/idli.jpg',
  'images/dining/medu-vada.jpg',
  'images/dining/uttapam.jpg',
  'images/dining/fried-rice.jpg',
  'images/dining/manchurian.jpg',
  'images/dining/hakka-noodles.jpg',
  'images/dining/chai.jpg',
  'images/dining/sandwich.jpg',
  'images/dining/samosa.jpg',
  'images/dining/lime-soda.jpg',
  // Gallery - Events
  'images/gallery/events/wedding-1.jpg',
  'images/gallery/events/wedding-2.jpg',
  'images/gallery/events/wedding-3.jpg',
  'images/gallery/events/wedding-4.jpg',
  'images/gallery/events/birthday-1.jpg',
  'images/gallery/events/birthday-2.jpg',
  'images/gallery/events/birthday-3.jpg',
  'images/gallery/events/party-1.jpg',
  'images/gallery/events/party-2.jpg',
  'images/gallery/events/party-3.jpg',
  // Gallery - Spaces
  'images/gallery/spaces/room-1.jpg',
  'images/gallery/spaces/room-2.jpg',
  'images/gallery/spaces/room-3.jpg',
  'images/gallery/spaces/room-4.jpg',
  'images/gallery/spaces/amenity-1.jpg',
  'images/gallery/spaces/amenity-2.jpg',
  'images/gallery/spaces/amenity-3.jpg',
  'images/gallery/spaces/surrounding-1.jpg',
  'images/gallery/spaces/surrounding-2.jpg',
  'images/gallery/spaces/surrounding-3.jpg',
  'images/gallery/spaces/hostel-1.jpg',
  'images/gallery/spaces/hostel-2.jpg',
  'images/gallery/spaces/hostel-3.jpg',
];

let created = 0;
let skipped = 0;

for (const imgPath of images) {
  // Use .svg extension but save with original name so next/image picks it up
  // Actually save as .jpg but with SVG content — browsers and next/image (unoptimized) handle it
  // Better: save as .svg with renamed extension trick. Instead, just save as SVG with .svg
  // Since images are unoptimized in static export, we can save SVG as-is
  const svgPath = imgPath.replace('.jpg', '.svg');
  const fullPath = path.join(PUBLIC, svgPath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }

  if (fs.existsSync(fullPath)) {
    skipped++;
    continue;
  }

  // Determine dimensions
  let w = 800, h = 600;
  if (imgPath.includes('hero')) { w = 1920; h = 1080; }
  else if (imgPath.includes('dining')) { w = 600; h = 600; }
  else if (imgPath.includes('hostel') && !imgPath.includes('gallery')) { w = 800; h = 500; }

  fs.writeFileSync(fullPath, makeSvg(imgPath, w, h), 'utf8');
  created++;
  console.log(`✅ ${svgPath}`);
}

console.log(`\n🏨 Royal's Inn placeholder generator complete.`);
console.log(`   Created: ${created} | Skipped (already exist): ${skipped}`);
console.log(`\nIMPORTANT: Update image paths in JSON files from .jpg to .svg`);
console.log(`(or replace placeholder SVGs with real photos when available)`);

