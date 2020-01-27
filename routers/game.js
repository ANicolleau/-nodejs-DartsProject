const router = require('express').Router()
const game = require('../models/Game')

router.get('/', async (req, res, next) => {
    let limit = parseInt(req.query.limit) || 10
    if (limit > 10)
        limit = 20
    let page = parseInt(req.query.offset) || 0
    let sort = req.query.sort
    let reverse = req.query.reverse || 1
    let status = req.query.status || ""
    Promise.all([
        game.getAll(limit, page, sort, reverse, status),
        game.count()
    ]).then(([results, count]) => {
        res.format({
            // html: () => {
            //     res.render('', {
            //         games: results,
            //         count: count.count,
            //         limit: limit,
            //         page: page
            //     })
            // },
            json: () => {
                res.send({
                    data: results,
                    count: count.count
                })
            }
        })
    }).catch(next)
})

router.get('/new', (req, res, next) => {
    console.log('ON EST SUR LA ROUTE QUI MENE AU FORM DU CREATE')
})

router.post('/', (req, res, next) => {

})

router.get('/{id}', (req, res, next) => {
    console.log('ON EST LA')
})

router.get('/{id}/edit', (req, res, next) => {
    console.log('ON EST LA')
})

router.put('/{id}', (req, res, next) => {
    console.log('ON EST LA')
})

router.delete('/{id}', (req, res, next) => {
    console.log('ON EST LA')
})

router.get('/{id}/players', (req, res, next) => {
    console.log('ON EST LA')
})

router.post('/{id}/players', (req, res, next) => {
    console.log('ON EST LA')
})

router.delete('/{id}/players', (req, res, next) => {
    console.log('ON EST LA')
})

router.post('/{id}/shots', (req, res, next) => {
    console.log('ON EST LA')
})

router.delete('/{id}/shots/previous', (req, res, next) => {
    console.log('ON EST LA')
})

module.exports = router;