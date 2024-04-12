const { storage } = require('../../config/cloudinaryConfig');
const multer = require('multer');

const upload = multer({ storage: storage });

// Fonction pour gérer le téléchargement d'image
async function uploadImage(req, res, next) {
    const uploadSingle = upload.single('url');

    uploadSingle(req, res, function (error) {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        next();
    });
}

module.exports = {
    uploadImage
};
