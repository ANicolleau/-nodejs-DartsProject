const mongoose = require('mongoose')
const actual_date = Date.now()

const schema = new mongoose.Schema({
    id: Number | String,
    mode: 'around-the-world' | '301' | 'cricket',
    name: String,
    currentPlayerId: null | String | Number,
    status: 'draft' | 'started' | 'ended',
    createdAt: actual_date,
})


const game = mongoose.model('Game', schema)

module.exports = {
    get: async (gameId) => {
        return await game.findOne({id: gameId})
    },
    count: async () => {
        return await game.estimatedDocumentCount()
    },
    getAll: async (limit, offset) => {
        return await game.find().skip(offset).limit(limit)
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