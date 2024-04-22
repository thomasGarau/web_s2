const express = require('express')
const router = express.Router()
const {verifyToken,Authenticate,register, invalidateToken, getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/user-controller.js')
const { validateField, validateEmail, validatePassword, validate, hashPassword } = require('../middlewares/sanitizeInput.js');
const { verifyTokenBlacklist, verifyAuthorisation, verifyAdmin } = require('../middlewares/verifyAuthorisation.js');

router.get('/getAll',[verifyAuthorisation, verifyTokenBlacklist, verifyAdmin], getAllUsers);
router.post('/get', [verifyAuthorisation, verifyTokenBlacklist, validateField('id_user')], getUser);
router.post('/update', [verifyAuthorisation, verifyTokenBlacklist, verifyAdmin, validateField('id_user', 'nom', 'prenom', 'role'), validate], updateUser);
router.delete('/delete', [verifyAuthorisation, verifyTokenBlacklist, verifyAdmin, validate], deleteUser);
router.post('/login', [validateField(), validatePassword(), validate], Authenticate);
router.get('/verify-token',verifyTokenBlacklist ,verifyToken);
router.post('/register', [...validateField('name', 'firstname'), validatePassword(), validateEmail(), hashPassword(), validate], register);
router.post('/logout', invalidateToken)

module.exports = router;