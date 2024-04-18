const express = require('express')
const router = express.Router()
const multer = require('multer');
const { storage } = require('../../config/cloudinaryConfig');
const { getCategorie, getAllCategorie, addCategorie, deleteCategorie, updateCategorie } = require('../controllers/categorie-controller.js')
const { uploadImage } = require('../services/image-service.js');
const { validateField } = require('../middlewares/sanitizeInput.js');
const Categorie = require('../models/categorie-model.js'); 
const { verifyTokenBlacklist, verifyAuthorisation } = require('../middlewares/verifyAuthorisation.js');
const parser = multer({ storage: storage });


router.post('/get', validateField('id_categorie'), getCategorie);
router.get('/all',getAllCategorie);
router.delete('/delete',[verifyAuthorisation, verifyTokenBlacklist, validateField('id_categorie')],  deleteCategorie);
router.put('/update', [verifyAuthorisation, verifyTokenBlacklist, validateField()],  uploadImage, async (req, res) => {
    try {
        const { id_categorie, label } = req.body;
        let url = req.file ? req.file.path : null;
        const categorie = await Categorie.findOne({ where: { id_categorie } });
        if (!categorie) {
            return res.status(404).json({ message: 'Categorie not found' });
        }
        if (!url) {
            url = categorie.url;
        }
        await Categorie.update({ label, url }, { where: { id_categorie } });
        res.status(200).json({ message: 'Categorie updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/add',[verifyAuthorisation, verifyTokenBlacklist], uploadImage, async (req, res) => {
    try {
        // L'image est maintenant téléchargée, l'URL est disponible dans req.file.path
        const { label } = req.body; // Assurez-vous que 'label' est envoyé dans le corps de la requête
        const url = req.file.path;
        
        const categorie = await Categorie.create({
            label,
            url
        });

        res.status(201).json(categorie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;



module.exports = router