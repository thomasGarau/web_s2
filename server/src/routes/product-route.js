const express = require('express')
const router = express.Router()
const { getProduct, getAllProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/product-controller.js')
const { validateField } = require('../middlewares/sanitizeInput.js');
const { verifyTokenBlacklist, verifyAuthorisation } = require('../middlewares/verifyAuthorisation.js');

/* peut etre nécessaire d'ajuster le type (get, put etc .. si besoin) +
d'ajouté des appels à des middlewares si par exemple il est nécessaire d'être co pour accéder au produits il faut voir en fonction du tp */
// les routes commence à /product/ le premier paramètre de chaque route est le chemin de l'url
//donc /product/product , /product/all etc ...
router.get('/product', validateField('label'), getProduct);
router.get('/all',validateField('id_categorie'), getAllProduct);
/*est on appel verifyAuthorisation avec verifytokenblackList au moins si y a pas de token fournis ca leve pas d'erreur hein  */
/* validate field est une fonction rest parameter c'est à dire avec en parametre (...quelqueChose)
tu peut mettre autant de parmètre que tu veux les nom doivent correspondre au key de ton objet json dans le req.body de ta requete*/
router.post('/add', [verifyAuthorisation, verifyTokenBlacklist, validateField('label','price', 'id_category', 'stock')] , addProduct);
router.delete('/delete',[verifyAuthorisation, verifyTokenBlacklist, validateField('id_user')],  deleteProduct);
/*pour l'update à toi de définir les champ à vérifié */
router.put('/update', [verifyAuthorisation, verifyTokenBlacklist, validateField()],  updateProduct);

module.exports = router;