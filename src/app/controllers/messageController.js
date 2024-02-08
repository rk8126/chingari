const messageService = require('../services/messageService')
const { isValidEmail, isValidObjectId } = require('../utils/validation')

module.exports = {
    sendMessage: async (req, res) => {
        try{
            const {text, recipientId} = req.body
            const userId = req.user?._id
            if(!text.trim()){
                return res.status(400).send({status: false, message:"Please enter a valid text"})
            }
            if(!recipientId || !isValidObjectId(recipientId)){
                return res.status(400).send({status: false, message:"recipientId is required and must be a valid object id"})
            }
            const {status, code, data, message} = await messageService.sendMessage({text, userId, recipientId})
            return res.status(code).send({status, ...(data && {data}), ...(message && {message})})
        }catch(error){
            console.error(`Error in sending message for userId-${req.body?.user?._id}`, error.message)
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}