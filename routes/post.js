const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
//const {
//    json
//} = require('body-parser')

function result(succ, msg, details) {
    if (details) {
        return {
            success: succ,
            message: msg,
            data: details
        }
    } else {
        return {
            success: succ,
            message: msg
        }
    }
}

router.get('/', async (req, res) => {
    try {
        const post = await Post.aggregate([{
            $lookup: {
                from: 'user',
                localField: 'user_id',
                foreignField: '_id',
                as: 'userData'
            }
        },
        {
            $set: {
                id: '$id',
                username: {
                    $arrayElemAt: ['$userData.username', 0]
                },
                created_date: {
                    $dateToString: {
                        format: '%d-%m,%Y %H:%M:%S',
                        date: '$created_date',
                        timezone: "+07:00"
                    }
                },
                modified_date: {
                    $dateToString: {
                        format: '%d-%m,%Y %H:%M:%S',
                        date: '$modified_date',
                        timezone: "+07:00"
                    }
                }
            }
        },
        {
            $project: {
                userData: 0,
                _id: 0
            }
        }
        ]);

        if (post.length > 0) {
            res.status(200).json(result(1, 'Retrieve Data Succes!', post))
        } else {
            res.status(200).json(result(0, 'Zero Data!'))
        }
    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})

router.post('/', async (req, res) => {
    const inputPost = new Post({
        nama: req.body.nama,
        nomor_hp: req.body.nomor_hp,
        jenis_barang: req.body.jenis_barang,
        jumlah_barang: req.body.jumlah_barang,
        harga: req.body.harga,
        user_id: req.body.user_id
    })

    try {
        const post = await inputPost.save()
        res.status(200).json(result(1, 'Insert Post Success!'))
    } catch (error) {
        res.status(500), json(result(0, error.message))
        console(error)
    }
})

router.put('/', async (req, res) => {
    const data = {
        id: req.body.id,
        nama: req.body.nama,
        nomor_hp: req.body.nomor_hp,
        jenis_barang: req.body.jenis_barang,
        jumlah_barang: req.body.jumlah_barang,
        harga: req.body.harga,
        user_id: req.body.user_id
    }

    try {
        const post = await Post.updateOne({
            _id: data.id
        }, data)

        if (post.matchedCount > 0) {
            res.status(200).json(result(1, 'Update Post Success!'))
        } else {
            res.status(200).json(result(0, 'Update Post Failed!'))
        }
    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.deleteOne({
            _id: req.params.id
        })

        if (post.deletedCount > 0) {
            res.status(200).json(result(1, 'Delete Post Success!'))
        } else {
            res.status(200).json(result(0, 'Delete Post Failed!'))
        }
    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})

module.exports = router