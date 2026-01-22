import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public/assets/images';

async function convertToWebp(inputPath) {
    const outputPath = inputPath.replace(/\.jpe?g$/i, '.webp');

    try {
        await sharp(inputPath)
            .webp({ quality: 85 })
            .resize(2000, 2000, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .toFile(outputPath);

        const inputStats = await stat(inputPath);
        const outputStats = await stat(outputPath);
        const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✓ ${basename(inputPath)} → ${basename(outputPath)} (${savings}% smaller)`);

        // Delete original JPG after successful conversion
        await unlink(inputPath);

        return true;
    } catch (err) {
        console.error(`✗ Failed: ${inputPath}`, err.message);
        return false;
    }
}

async function processDirectory(dir) {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (/\.jpe?g$/i.test(entry.name)) {
            await convertToWebp(fullPath);
        }
    }
}

console.log('Converting JPG images to WebP...\n');
await processDirectory(PUBLIC_DIR);
console.log('\n✓ Done!');
