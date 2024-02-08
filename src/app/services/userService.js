const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs');
module.exports = {
    registerUser: async ({fullName, email, password}) => {
        const user = await userModel.findOne({email})
        if(user){
            return {status: false, code: 400, message: "User already exist with this email"}
        }

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const data = await userModel.create({fullName, email, password})
        return {status: true, code: 201, data}
    },
    login: async ({ email, password }) => {
        const user = await userModel.findOne({email, isDeleted: false})
        if(!user){
            return {status: false, code: 404, message: "User not found"}
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {status: false, code: 401, message: "Invalid username/email or password"}
        }
        return {status: true, code: 200, token: user.generateToken()}
    },
    getUsers: async ({ userId }) => {
        const users = await userModel.find({isDeleted: false, _id: {$ne: userId}}).sort({createdAt:-1}).lean()
        return users
    }
}