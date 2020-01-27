const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const actual_date = Date.now()
const db = require('../db')


const schema = new mongoose.Schema({
    _id: {
        type: Schema.Types.Mixed
    },
    gameId: {
        type: Schema.Types.Mixed
    },
    mode: {
        type: String,
        enum: ['around-the-world', '301', 'cricket']
    },
    name: {
        type: String
    },
    currentPlayerId: {
        any: Schema.Types.Mixed
    },
    status: {
        type: String,
        enum: ['draft', 'started', 'ended']
    },
    createdAt: {
        type: Date
    },
})


const game = mongoose.model('Game', schema)

module.exports = {
    get: (gameId) => {
        return game.findOne({id: gameId})
    },
    count: () => {
        return game.estimatedDocumentCount()
    },
    getAll: async (limit, offset, sort, reverse, status) => {
        let sorted = {}
        if (sort)
            sorted[sort] = reverse
        else
            sorted = undefined
        const filter = status !== "" ? {'status': status} : {}
        return await game.find(filter).skip(offset).limit(limit).sort(sorted)
    },
    insert: async (params) => {
        let gameId = await game.estimatedDocumentCount()
        let add_game = new game({
            id: gameId,
            mode: params.mode,
            name: params.name,
            currentPlayerId: params.currentPlayerId,
            status: 'draft',
            createdAt: actual_date
        })
        return await add_game.save()
    },

    update: async (gameId, params) => {
        let update_user = await user.findOne({id: gameId})

        if (params.mode)
            update_user.mode = params.mode
        if (params.name)
            update_user.name = params.name
        if (params.currentPlayerId)
            update_user.currentPlayerId = params.currentPlayerId
        if (params.status)
            update_user.status = params.status

        return await update_user.save()
    },

    remove: async (gameId) => {
        return await game.deleteOne({id: gameId})
    }

}