const express = require('express')
const router = express.Router()
const { getCategorie, getAllCategorie, addCategorie, deleteCategorie, updateCategorie } = require('../controllers/categorie-controller.js')
const { validateField } = require('../middlewares/sanitizeInput.js');
const { verifyTokenBlacklist, verifyAuthorisation } = require('../middlewares/verifyAuthorisation.js');

router.post('/categorie', validateField('label'), getCategorie);
router.get('/all',getAllCategorie);
router.post('/add', [verifyAuthorisation, verifyTokenBlacklist, validateField('label')] , addCategorie);
router.delete('/delete',[verifyAuthorisation, verifyTokenBlacklist, validateField('id_categorie')],  deleteCategorie);
router.put('/update', [verifyAuthorisation, verifyTokenBlacklist, validateField()],  updateCategorie);

module.exports = router