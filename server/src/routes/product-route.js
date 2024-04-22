const express = require('express')
const router = express.Router()
const multer = require('multer');
const Product = require('../models/product-model.js');
const { getProduct, getAllProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/product-controller.js')
const { validateField } = require('../middlewares/sanitizeInput.js');
const { verifyTokenBlacklist, verifyAuthorisation, verifyAdmin } = require('../middlewares/verifyAuthorisation.js');
const { storage } = require('../../config/cloudinaryConfig');
const parser = multer({ storage: storage });

// Ajouter des produits avec upload d'image
router.post('/add', [verifyAuthorisation, verifyTokenBlacklist, verifyAdmin, validateField('label', 'prix', 'id_categorie', 'stock'), parser.single('url')], async (req, res) => {
    try {
        const { label, prix, stock, id_categorie } = req.body;
        const url = req.file ? req.file.path : null;
        const product = await Product.create({ label, prix, stock, id_categorie, url });
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Mise à jour des produits avec possibilité de changer l'image
router.put('/update', [verifyAuthorisation, verifyTokenBlacklist, verifyAdmin,  validateField('id_produit', 'label', 'prix', 'stock'), parser.single('url')], async (req, res) => {
    try {
        const { id_produit, label, prix, stock } = req.body;
        let url = req.file ? req.file.path : null;
        const product = await Product.findOne({ where: { id_produit } });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (!url) url = product.url;
        await Product.update({ label, prix, stock, url }, { where: { id_produit } });
        res.status(200).json({ message: 'Product updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/product', validateField('label'), getProduct);
router.post('/all',validateField('id_categorie'), getAllProduct);
router.delete('/delete',[verifyAuthorisation, verifyTokenBlacklist, verifyAdmin, validateField('id_produit')],  deleteProduct);

module.exports = router;