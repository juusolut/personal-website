import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export function autoImageProcessor(userOptions = {}) {
  // Merge user options with sensible defaults
  const opts = {
    watchDir: 'static/images/raw',
    outputDir: 'static/images/processed',
    format: 'webp', // 'webp', 'jpeg', 'png', etc.
    quality: 80,
    sizes: {
      thumb: { width: 640, height: 360 },  // 16:9
      large: { width: 1920, height: 1080 } // 16:9
    },
    fit: 'cover',
    position: 'center',
    ...userOptions
  };

  const watchDir = path.resolve(opts.watchDir);
  const outputDir = path.resolve(opts.outputDir);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  async function processImage(filePath : string) {
    const filename = path.basename(filePath);
    const ext = path.extname(filename);
    const nameWithoutExt = path.basename(filename, ext);

    // Skip hidden files or already processed outputs
    if (filename.startsWith('.') || Object.keys(opts.sizes).some((key) => filename.includes(`-${key}`))) {
      return;
    }

    try {
      // Loop over configured size variants dynamically
      for (const [key, dim] of Object.entries(opts.sizes)) {
        const outputPath = path.join(outputDir, `${nameWithoutExt}-${key}.${opts.format}`);

        await sharp(filePath)
          .resize(dim.width, dim.height, {
            fit: opts.fit,
            position: opts.position
          })
          .toFormat(opts.format, { quality: opts.quality })
          .toFile(outputPath);
      }

      console.log(`[Image Plugin] Processed ${filename} (${opts.format.toUpperCase()})`);
    } catch (err) {
      console.error(`[Image Plugin] Error processing ${filename}:`, err);
    }
  }

  return {
    name: 'vite-plugin-auto-image-processor',
    configureServer(server) {
      const handleFile = (filePath) => {
        if (filePath.startsWith(watchDir)) {
          processImage(filePath);
        }
      };

      server.watcher.on('add', handleFile);
      server.watcher.on('change', handleFile);
    }
  };
}