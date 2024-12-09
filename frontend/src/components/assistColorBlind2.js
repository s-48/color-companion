const { v2: cloudinary } = require('cloudinary');
const path = require('path');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

async function processImage(effectType = 'stripes', effectStrength = 50) {
  try {
    const filePath = path.join(__dirname, 'plaid_image1.png');
    console.log('Using file path:', filePath);

    // upload
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: 'color-companion'
    });

    console.log('Image uploaded to Cloudinary:', uploadResult.secure_url);

    let transformation = [];

    if (effectType === 'stripes') {
      transformation.push({ effect: `assist_colorblind:stripes:${effectStrength}` });
    } else if (effectType === 'xray') {
      transformation.push({ effect: 'assist_colorblind:xray' });
    }

    transformation.push({ quality: 'auto' });
    transformation.push({ fetch_format: 'auto' });

    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      transformation
    });

    console.log(`Transformed Image URL (${effectType}):`, transformedUrl);
    return transformedUrl;

  } catch (error) {
    console.error('Error processing image:', error.message);
    throw error;
  }
}

(async () => {
  try {
    // stripes effect
    const stripesUrl = await processImage('stripes', 100);
    console.log('Stripes Effect URL:', stripesUrl);

    // x-ray effect
    const xrayUrl = await processImage('xray');
    console.log('X-ray Effect URL:', xrayUrl);
  } catch (error) {
    console.error('Failed to process the image:', error.message);
  }
})();
