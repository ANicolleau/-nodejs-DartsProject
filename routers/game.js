const router = require('express').Router()
const game = require('../models/Game')
const pug = require('pug')
const error_not_api_available = require('../errors/not_api_available')


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
    ]).then(([games, count]) => {
        res.format({
            html: () => {
                res.render('games.pug', {
                    games: games,
                    count: count.count,
                    limit: limit,
                    page: page
                })
            },
            json: () => {
                res.send({
                    data: games,
                    count: count.count
                })
            }
        })
    }).catch(next)
})

router.get('/new', (req, res, next) => {
    res.format({
        html: () => {
            const game = {}
            const title = "Créer une partie"
            res.render('new_game.pug', {game, title})
        },
        json: () => {
            res.send({
                data: error_not_api_available
            })
        }
    })
})

router.patch('/', async (req, res) => {
    console.log("Création d'un nouveau joueur")
    await game.insert(req.body)
        .then((game_created) => {
            res.format({
                html: () => {
                    console.log("game_created : " + game_created)
                    res.redirect(`/games/${game_created.id}`)
                },
                json: () => {
                    res.send({
                        data: game_created
                    })
                }
            })
        })
})

router.get('/:id', async (req, res, next) => {
    await game.get(req.params.id).then((result) => {
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
                    data: result
                })
            }
        })
    }).catch(next)
})

router.get('/:id/edit', (req, res, next) => {
    console.log('ON EST LA')
})

router.put('/:id', async (req, res, next) => {
    let id = req.params.id
    id = +id
    await game.update(id, req.body)
        .then((result) => {
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
                        data: result
                    })
                }
            })
        }).catch(next)
})

router.delete('/:id', async (req, res, next) => {
    let id = req.params.id
    id = +id
    await game.remove(id)
        .then(() => {
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
                        data: res.redirect('/games')
                    })
                }
            })
        }).catch(next)
})

router.get('/:id/players', (req, res, next) => {
    console.log('ON EST LA')
})

router.post('/:id/players', (req, res, next) => {
    console.log('ON EST LA')
})

router.delete('/:id/players', (req, res, next) => {
    console.log('ON EST LA')
})

router.post('/:id/shots', (req, res, next) => {
    console.log('ON EST LA')
})

router.delete('/:id/shots/previous', (req, res, next) => {
    console.log('ON EST LA')
})

module.exports = router;