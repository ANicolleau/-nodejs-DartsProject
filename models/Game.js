const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const actual_date = Date.now()
const db = require('../db')


const schema = new mongoose.Schema({
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
        type: Date, default: new Date()
    },
})


const game = mongoose.model('Game', schema)

module.exports = {
    get: async (gameId) => {
        gameId = +gameId
        return game.findOne({gameId: gameId})
    },
    getPlayers: async (gameId) => {
        gameId = +gameId
        return game.find
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
            gameId: gameId,
            mode: params.mode,
            name: params.name,
            currentPlayerId: params.currentPlayerId,
            status: 'draft',
            createdAt: actual_date
        })
        return await add_game.save()
    },

    update: async (gameId, params) => {
        return await game.updateOne({gameId}, params)
    },

    remove: async (gameId) => {
        return await game.deleteOne({gameId: gameId})
    }

}