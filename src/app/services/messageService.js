const messageModel = require('../models/messageModel')
const userModel = require('../models/userModel')
module.exports = {
    sendMessage: async ({text, userId, recipientId}) => {
        const recipient = await userModel.findById(recipientId)
        if(!recipient || recipient.isDeleted){
            return {status: true, code: 404, message: "recipient not found"}
        }
        const data = await messageModel.create({text, sender: userId, recipient: recipientId})
        return {status: true, code: 201, data}
    },
    getMessages: async ({userId}) => {
        const data = await messageModel.find({isDeleted: false, $or: [
            {sender: userId},
            {recipient: userId}
        ]}).sort({createdAt: -1}).populate('sender recipient').lean();
        const messages = data.map(message => (
             {
                text: message.text,
                contactName: String(message.sender?._id) === userId ? message.recipient?.fullName : message.sender?.fullName,
                direction: String(message.sender?._id) === userId ? 'Sent': 'Received'
            }
        ))
        return messages
    },
}