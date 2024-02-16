const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth-controller')

const validateRegister = require('../middleware/validator')

router.post('/register',validateRegister,authController.register)

module.exports = router;
