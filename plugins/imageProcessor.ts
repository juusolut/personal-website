import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export function autoImageProcessor(userOptions = {}) {
  const opts = {
    watchDir: 'static/images/raw',
    outputDir: 'static/images/processed',
    cropSuffix: '_16x9',
    format: 'webp',
    quality: 80,
    effort: 5,
    sizes: {
      thumb: 640,
      large: 1920
    },
    fit: 'cover',
    position: 'attention',
    ...userOptions
  };

  const watchDir = path.resolve(opts.watchDir);
  const outputDir = path.resolve(opts.outputDir);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  async function processImage(filePath, force = false) {
    const filename = path.basename(filePath);
    const ext = path.extname(filename);
    const nameWithoutExt = path.basename(filename, ext);

    if (filename.startsWith('.') || Object.keys(opts.sizes).some((k) => filename.includes(`-${k}`))) {
      return;
    }

    const shouldCrop = nameWithoutExt.endsWith(opts.cropSuffix);
    const cleanBaseName = shouldCrop
      ? nameWithoutExt.slice(0, -opts.cropSuffix.length)
      : nameWithoutExt;

    try {
      for (const [key, sizeVal] of Object.entries(opts.sizes)) {
        const outputPath = path.join(outputDir, `${cleanBaseName}-${key}.${opts.format}`);

        // If not forced and file already exists, skip processing
        if (!force && fs.existsSync(outputPath)) {
          continue;
        }

        const width = typeof sizeVal === 'number' ? sizeVal : sizeVal.width;
        const targetHeight = shouldCrop ? Math.round((width * 9) / 16) : null;

        const resizeOptions = {
          withoutEnlargement: true
        };

        if (shouldCrop) {
          resizeOptions.fit = opts.fit;
          resizeOptions.position = opts.position;
        } else {
          resizeOptions.fit = 'inside';
        }

        let pipeline = sharp(filePath).resize(width, targetHeight, resizeOptions);

        if (opts.format === 'avif') {
          pipeline = pipeline.avif({ quality: opts.quality, effort: opts.effort });
        } else {
          pipeline = pipeline.webp({ quality: opts.quality, effort: opts.effort, smartSubsample: true });
        }

        await pipeline.toFile(outputPath);
        console.log(`[Image Plugin] Generated: ${path.basename(outputPath)}`);
      }
    } catch (err) {
      console.error(`[Image Plugin] Error processing ${filename}:`, err);
    }
  }

  // Scan all existing files in /raw and process any missing outputs
  async function syncAllImages() {
    if (!fs.existsSync(watchDir)) return;

    const files = fs.readdirSync(watchDir);
    for (const file of files) {
      const fullPath = path.join(watchDir, file);
      if (fs.statSync(fullPath).isFile()) {
        await processImage(fullPath, false);
      }
    }
  }

  return {
    name: 'vite-plugin-auto-image-processor',
    async configureServer(server) {
      // 1. Check for missing images when dev server starts
      await syncAllImages();

      // 2. Process images as they are added or modified
      const handleFile = (filePath) => {
        if (filePath.startsWith(watchDir)) {
          processImage(filePath, true);
        }
      };

      server.watcher.on('add', handleFile);
      server.watcher.on('change', handleFile);
    }
  };
}