#!/usr/bin/env node

import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const SOURCE = 'public/logos/archive/logo-dark.svg';
const APP_DIR = 'src/app';
const PUBLIC_DIR = 'public';

const FAVICON_SIZES = [
  // Next.js App Router metadata files
  { output: join(APP_DIR, 'icon.png'), size: 32, description: 'Next.js default icon' },
  { output: join(APP_DIR, 'apple-icon.png'), size: 180, description: 'Apple touch icon' },

  // PWA icons in public
  { output: join(PUBLIC_DIR, 'icon-192.png'), size: 192, description: 'PWA icon 192' },
  { output: join(PUBLIC_DIR, 'icon-512.png'), size: 512, description: 'PWA icon 512' },

  // Standard favicon sizes in public
  { output: join(PUBLIC_DIR, 'favicon-16x16.png'), size: 16, description: 'Favicon 16x16' },
  { output: join(PUBLIC_DIR, 'favicon-32x32.png'), size: 32, description: 'Favicon 32x32' },
];

async function generateFavicons() {
  try {
    console.log('🎨 Generating favicons from', SOURCE, '\n');

    // Ensure directories exist
    await mkdir(APP_DIR, { recursive: true });
    await mkdir(PUBLIC_DIR, { recursive: true });

    for (const { output, size, description } of FAVICON_SIZES) {
      await sharp(SOURCE)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png({
          compressionLevel: 9,
          quality: 100,
          palette: true,
        })
        .toFile(output);

      console.log(`✓ ${output} (${size}x${size}) - ${description}`);
    }

    // Generate favicon.ico (multi-size)
    const icoPath = join(PUBLIC_DIR, 'favicon.ico');
    await sharp(SOURCE)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(icoPath);

    console.log(`✓ ${icoPath} (32x32) - Legacy favicon`);

    console.log('\n✅ All favicons generated!');
    console.log('\n📝 Next steps:');
    console.log('1. Update src/app/layout.tsx metadata');
    console.log('2. Add manifest.json for PWA');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateFavicons();
