const router = require('express').Router()
const gameRouter = require('./routers/game')
const playerRouter = require('./routers/game/player')
const error = require('./errors/not_api_available')

router.get('/', (req,res,next) =>{
    res.format({
        html: () => {
            res.redirect('/games')
        },
        json: () => {
            res.send({
                data: error
            })
        }
    })

})

router.use('/games', gameRouter, () =>{
    console.log("heheheheh")
})

router.use('/players', playerRouter ,() =>{
    console.log('iciici')
})

module.exports = router