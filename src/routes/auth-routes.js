const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth-controller')

const {validateRegister} = require('../middleware/validate/validate-auth')
const {validateLogin} = require('../middleware/validate/validate-auth')

router.post('/register',validateRegister,authController.register)
router.post('/login',validateLogin,authController.login)

module.exports = router;
