const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const { auth } = require('../middleware/auth')

router.get('/sign-up-view', userController.getSignUpView)
router.post('/', userController.registerUser)
router.post('/login', userController.login)
router.get('/chatbot', auth, userController.chatbot)

module.exports = router