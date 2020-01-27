const router = require('express').Router()
const gameRouter = require('./routers/game')
const playerRouter = require('./routers/game/player')

router.get('/', (req,res,next) =>{
    res.redirect('/games')
})

router.use('/games', gameRouter)

router.use('/players', playerRouter ,() =>{
    console.log('iciici')
})

module.exports = router