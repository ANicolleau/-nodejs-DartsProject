const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const actual_date = Date.now()
const db = require('../db')

const schema = new mongoose.Schema({
    id: {
        type: Number
    },
    playerId: {
        type: Schema.Types.Mixed
    },
    gameId: {
        type: Schema.Types.Mixed
    },
    remainingShots: {
        type: Schema.Types.Mixed
    },
    score: {
        type: Number
    },
    rank: {
        type: Schema.Types.Mixed
    },
    order: {
        type: Schema.Types.Mixed
    },
    createdAt: {
        type: Date, default: new Date()
    }
})

const game_player = mongoose.model('GamePlayer', schema)

module.exports = {
    get: (id) => {
        id = +id
        return game_player.findOne({id: id})
    },
    count: () => {
        return game_player.estimatedDocumentCount()
    },
    getAll: async (limit, offset, sort, reverse, status) => {
        let sorted = {}
        if (sort)
            sorted[sort] = reverse
        else
            sorted = undefined
        const filter = status !== "" ? {'status': status} : {}
        return await game_player.find(filter).skip(offset).limit(limit).sort(sorted)
    },
    // insert: async (params) => {
    //     let id = await game_player.estimatedDocumentCount()
    //     // deux joueurs ne peuvent avoir le même id,
    //     // Le joueur ajouter doit exister
    //     // La game doit exister
    //     let add_player = await new game_player({
    //         id: id,
    //         name: params.name,
    //         email: params.email
    //     })
    //     return await add_player.save()
    // },
    // update: async (id, params) => {
    //     id = +id
    //     let update_user = await player.findOne({id: id})
    //     if (params.name)
    //         update_user.name = params.name
    //     if (params.email)
    //         update_user.email = params.email
    //
    //     return await update_user.save()
    // },
    //
    // remove: async (gameId) => {
    //     return await player.deleteOne({id: gameId})
    // }

}