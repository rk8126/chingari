const mongoose = require('mongoose');

const {EMAIL_REGEX} = require('./const')

const isValidEmail = (email)=> {
    return EMAIL_REGEX.test(email)
}

const isValidObjectId = (objectId)=> {
    return mongoose.Types.ObjectId.isValid(objectId)
}

module.exports = {
    isValidEmail,
    isValidObjectId
}