const express = require('express')
const router = express.Router()
const {verifyToken,Authenticate,register, invalidateToken} = require('../controllers/user-controller.js')
const { validateField, validateEmail, validatePassword, validate, hashPassword } = require('../middlewares/sanitizeInput.js');
const { verifyTokenBlacklist } = require('../middlewares/verifyAuthorisation.js');

router.post('/login', [validateField(), validatePassword(), validate], Authenticate);
router.get('/verify-token',verifyTokenBlacklist ,verifyToken);
router.post('/register', [...validateField('name', 'firstname'), validatePassword(), validateEmail(), hashPassword(), validate], register);
router.post('/logout', invalidateToken)

module.exports = router;