import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SIZES = {
  mobile: 100,
  tablet: 110,
  desktop: 120
};

async function optimizeImage(inputPath, filename) {
  const outputDir = path.join(__dirname, '../public/images/optimized');
  
  // Create output directory if it doesn't exist
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Calculate the aspect ratio
    const aspectRatio = metadata.width / metadata.height;
    
    // Process image for each size
    for (const [device, width] of Object.entries(SIZES)) {
      const height = Math.round(width / aspectRatio);
      
      await sharp(inputPath)
        .resize(width, width)
        .webp({ quality: 80 })
        .toFile(path.join(outputDir, `${path.parse(filename).name}_${device}.webp`));
    }

    console.log(`✅ Processed: ${filename}`);
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error);
  }
}

async function processDirectory() {
  const inputDir = path.join(__dirname, '../public/images');
  
  try {
    const files = await fs.readdir(inputDir);
    
    console.log(`Found ${files.length} images to process...`);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
        await optimizeImage(path.join(inputDir, file), file);
      }
    }
    
    console.log('✨ All images processed successfully!');
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

processDirectory();
