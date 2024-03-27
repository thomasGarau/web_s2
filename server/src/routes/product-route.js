const express = require('express')
const router = express.Router()
const { getProduct, getAllProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/product-controller.js')
const { validateField } = require('../middlewares/sanitizeInput.js');
const { verifyTokenBlacklist, verifyAuthorisation } = require('../middlewares/verifyAuthorisation.js');

router.get('/product', validateField('label'), getProduct);
router.get('/all',validateField('id_categorie'), getAllProduct);
router.post('/add', [verifyAuthorisation, verifyTokenBlacklist, validateField('label','price', 'id_category', 'stock')] , addProduct);
router.delete('/delete',[verifyAuthorisation, verifyTokenBlacklist, validateField('id_user')],  deleteProduct);
router.put('/update', [verifyAuthorisation, verifyTokenBlacklist, validateField()],  updateProduct);

module.exports = router;