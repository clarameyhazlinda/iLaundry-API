const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    nomor_hp: {
        type: String,
        required: true
    },
    jenis_barang: {
        type: String,
        required: true
    },
    jumlah_barang: {
        type: String,
        required: true
    },
    harga: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    modified_date: {
        type: Date,
        default: null
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Post', postSchema, 'post')