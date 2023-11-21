const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String , unique: true},
    age: Number,
    _id: {
        type: String,
        default: () => uuidv4(),
      },
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel