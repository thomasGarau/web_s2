const express = require('express')
const router = express.Router()
const { getPanier, getProduitsPanier, addPanier, deletePanier, deleteProduitPanier, removeFromPanier, getPanierWithPrice } = require('../controllers/panier-controller.js')
const { verifyTokenBlacklist, verifyAuthorisation } = require('../middlewares/verifyAuthorisation.js');
const { validateField } = require('../middlewares/sanitizeInput.js');

router.post('/get', [verifyAuthorisation, verifyTokenBlacklist, validateField('id_utilisateur')], getPanier);
router.post('/getPanierPrice', [verifyAuthorisation, verifyTokenBlacklist, validateField('id_utilisateur')], getPanierWithPrice);
router.post('/getProduits', [verifyAuthorisation, verifyTokenBlacklist, validateField('id_utilisateur', 'id_produit')], getProduitsPanier);
router.post('/add', [verifyAuthorisation, verifyTokenBlacklist, validateField('id_utilisateur', 'id_produit')], addPanier);
router.delete('/delete', [verifyAuthorisation, verifyTokenBlacklist, validateField('id_utilisateur')], deletePanier);
router.delete('/deleteProduit', [verifyAuthorisation, verifyTokenBlacklist], deleteProduitPanier);
router.delete('/RemoveFromPanier', [verifyAuthorisation, verifyTokenBlacklist], removeFromPanier);
module.exports = router;