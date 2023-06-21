const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 45
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    created_date: {
        type: Date,
        deafult: Date.now
    },
    modified_date: {
        type: Date,
        default: null
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('User', userSchema, 'user')