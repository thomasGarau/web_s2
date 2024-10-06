const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Configuration des clés API Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuration du stockage Cloudinary pour multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'VotreDossier',  // Nom du dossier sur Cloudinary pour organiser les images
        allowedFormats: ['jpeg', 'png', 'jpg'],  // Formats de fichiers autorisés
    },
});

module.exports = { cloudinary, storage };
