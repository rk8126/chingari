const express = require('express')
const router = express.Router()

const messageController = require('../controllers/messageController')
const { auth } = require('../middleware/auth')

router.post('/', auth, messageController.sendMessage)

module.exports = router