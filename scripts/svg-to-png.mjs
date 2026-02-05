#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';

const DIRECTORIES = [
  {
    input: 'public/logos/combination-mark',
    output: 'public/logos/combination-mark/png',
  },
  {
    input: 'public/logos/backup',
    output: 'public/logos/backup/png',
  },
];

// Generate multiple sizes for different use cases
const SIZES = [
  { name: 'favicon', size: 32 },
  { name: 'small', size: 64 },
  { name: 'medium', size: 128 },
  { name: 'large', size: 256 },
  { name: 'xlarge', size: 512 },
  { name: 'xxlarge', size: 1024 },
];

async function convertDirectory(inputDir, outputDir) {
  // Create output directory
  await mkdir(outputDir, { recursive: true });

  // Read all SVG files
  const files = await readdir(inputDir);
  const svgFiles = files.filter((file) => file.endsWith('.svg'));

  console.log(`📁 ${inputDir}`);
  console.log(`Found ${svgFiles.length} SVG files\n`);

  for (const svgFile of svgFiles) {
    const inputPath = join(inputDir, svgFile);
    const { name } = parse(svgFile);

    console.log(`Converting ${svgFile}...`);

    for (const { name: sizeName, size } of SIZES) {
      const outputPath = join(outputDir, `${name}-${sizeName}.png`);

      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png({
          compressionLevel: 9,
          quality: 100,
          palette: true, // Reduce file size
        })
        .toFile(outputPath);

      console.log(`  ✓ ${name}-${sizeName}.png (${size}x${size})`);
    }

    console.log();
  }
}

async function convertSvgToPng() {
  try {
    console.log('🚀 Starting SVG to PNG conversion\n');

    for (const { input, output } of DIRECTORIES) {
      await convertDirectory(input, output);
    }

    console.log('✅ All conversions complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

convertSvgToPng();
