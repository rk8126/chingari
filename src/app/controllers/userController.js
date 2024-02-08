const userService = require('../services/userService')
const messageService = require('../services/messageService')
const { isValidEmail } = require('../utils/validation')

module.exports = {
    registerUser: async (req, res) => {
        try{
            const {fullName, email, password} = req.body
            if(!fullName){
                return res.status(400).send({ status: false, message: "fullName is required" })
            }
            if(!email || !isValidEmail(email)){
                return res.status(400).send({ status: false, message: "email is required and should be a valid email" })
            }
            if(!password){
                return res.status(400).send({ status: false, message: "password is required" })
            }
            const {status, code, data, message} = await userService.registerUser({fullName, email, password})
            if(!status){
                return res.render('register', {errorMessage: message})
            }
            return res.render('login');
        }catch(error){
            console.error(`Error in registeration for user with this email-${req.body?.email}`, error.message)
            return res.status(500).send({ status: false, message: error.message })
        }
    },
    login: async (req, res) => {
        try{
            const { email, password } = req.body;
            const {status, code, token, message} = await userService.login({ email, password })
            if(!status){
                return res.render('login', {errorMessage: message});
            }
            res.cookie('token', token);
            return res.redirect('/user/chatbot')
        }catch(error){
            console.error(`Error in login for user with this email-${req.body?.email}`, error.message)
            res.status(500).send({ status: false, message: error.message })
        }
    },
    chatbot: async (req, res) => {
        try{
            const userId = req.user?._id
            const messages = await messageService.getMessages({userId})
            const users = await userService.getUsers({userId})
            return res.render('chatbot', {messages, users})
        }catch(error){
            console.error(`Error to get chatbot page`, error.message)
            return res.render('login', {errorMessage: error.message});
        }
    },
    getSignUpView: (req, res) => {
        return res.render('register')
    }
}