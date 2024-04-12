const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration des clés API Cloudinary
cloudinary.config({
    cloud_name: 'dxijg3lmb',
    api_key: '755815624728998',
    api_secret: 'jvTn6NeXXtQ3ePIyz_3F9Lb1t40'
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
