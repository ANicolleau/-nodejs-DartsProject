const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const actual_date = Date.now()
const db = require('../db')

const schema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    gameWin: {
        type: Number
    },
    gameLost: {
        type: Number
    },
    createdAt: {
        type: Date, default: new Date()
    }
})

const player = mongoose.model('Player', schema)

module.exports = {
    get: (id) => {
        id = +id
        return player.findOne({id: id})
    },
    count: () => {
        return player.estimatedDocumentCount()
    },
    getAll: async (limit, offset, sort, reverse, status) => {
        let sorted = {}
        if (sort)
            sorted[sort] = reverse
        else
            sorted = undefined
        const filter = status !== "" ? {'status': status} : {}
        return await player.find(filter).skip(offset).limit(limit).sort(sorted)
    },
    insert: async (params) => {
        console.log(params.name)
        let id = await player.estimatedDocumentCount()
        let add_player = await new player({
            id: id,
            name: params.name,
            email: params.email
        })
        return await add_player.save()
    },

    update: async (id, params) => {
        id = +id
        let update_user = await player.findOne({id: id})
        if (params.name)
            update_user.name = params.name
        if (params.email)
            update_user.email = params.email

        return await update_user.save()
    },

    remove: async (gameId) => {
        return await player.deleteOne({id: gameId})
    }

}