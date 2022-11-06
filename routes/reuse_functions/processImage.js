const sharp = require('sharp');

async function processImage(req_file) {
    image_name = req_file.originalname.replace(/\s/g, "") + Date.now();

    await sharp(req_file.buffer).resize({
        width: 600
    }).toFile('./public/assets/images/' + image_name);

    return image_name;
}

module.exports = processImage;

