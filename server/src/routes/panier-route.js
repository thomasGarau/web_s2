const express = require('express')
const router = express.Router()
const { getPanier, getProduitsPanier, addPanier, deletePanier, deleteProduitPanier, removeFromPanier, getPanierWithPrice } = require('../controllers/panier-controller.js')
const { verifyTokenBlacklist, verifyAuthorisation, verifyIsUser } = require('../middlewares/verifyAuthorisation.js');
const { validateField } = require('../middlewares/sanitizeInput.js');

router.post('/get', [verifyAuthorisation, verifyTokenBlacklist, validateField('id_utilisateur')], getPanier);
router.post('/getPanierPrice', [verifyAuthorisation, verifyTokenBlacklist, validateField('id_utilisateur')], getPanierWithPrice);
router.post('/getProduits', [verifyAuthorisation, verifyTokenBlacklist, validateField('id_utilisateur', 'id_produit')], getProduitsPanier);
router.post('/add', [verifyAuthorisation, verifyTokenBlacklist, verifyIsUser, validateField('id_utilisateur', 'id_produit')], addPanier);
router.delete('/delete', [verifyAuthorisation, verifyTokenBlacklist, verifyIsUser, validateField('id_utilisateur')], deletePanier);
router.delete('/deleteProduit', [verifyAuthorisation, verifyTokenBlacklist, verifyIsUser], deleteProduitPanier);
router.delete('/RemoveFromPanier', [verifyAuthorisation, verifyTokenBlacklist, verifyIsUser], removeFromPanier);
module.exports = router;