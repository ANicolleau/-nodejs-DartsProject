const router = require('express').Router()
const player = require('../../models/Player')
const error_not_api_available = require('../../errors/not_api_available')


router.get('/', (req, res, next) => {
    let limit = parseInt(req.query.limit) || 10
    if (limit > 10)
        limit = 20
    let page = parseInt(req.query.offset) || 0
    let sort = req.query.sort
    let reverse = req.query.reverse || 1
    let status = req.query.status || ""
    Promise.all([
        player.getAll(limit, page, sort, reverse, status),
        player.count()
    ]).then(([results, count]) => {
        res.format({
            html: () => {
                res.render('players.pug', {
                    players: results,
                    count: count.count,
                    limit: limit,
                    page: page
                })
            },
            json: () => {
                res.send({
                    data: results,
                    count: count.count
                })
            }
        })
    }).catch(next)
})

router.patch('/', async (req, res) => {
    console.log(req.body)
    await player.insert(req.body)
        .then((results) => {
            res.format({
                html: () => {
                    res.redirect(`/players/${results.id}`)
                },
                json: () => {
                    res.send({
                        data: results
                    })
                }
            })
        })
})

router.get('/new', (req, res) => {
    res.format({
        html: () => {
            const player = {}
            const title = "Ajouter un utilisateur"
            res.render('new_player.pug', {player, title})
        },
        json: () => {
            res.send({
                data: error_not_api_available
            })
        }
    })
})

router.get('/:id', async (req, res, next) => {
    await player.get(req.params.id)
        .then((result) => {
        res.format({
            html: () => {
                res.redirect(`/players/${result.id}/edit`)
            },
            json: () => {
                res.send({
                    data: result
                })
            }
        })
    }).catch(next)
})

router.get('/:id/edit', async (req, res, next) => {
    await player.get(req.params.id).then((player)=>{
        res.format({
            html: () => {
                const method_override = `/${req.params.id}?_method=PATCH`
                const title = "Modifier un utilisateur"
                res.render('new_player.pug', {
                    player, title, method_override
                })
            },
            json: () => {
                res.send({
                    data: error_not_api_available
                })
            }
        })
    })
})

router.patch('/:id', async (req, res, next) => {
    let id = req.params.id
    id = +id
    await player.update(id, req.body)
        .then((player) => {
            res.format({
                html: () => {
                    res.redirect(`/players`)
                },
                json: () => {
                    res.send({
                        data: player
                    })
                }
            })
        }).catch(next)
})

router.delete('/:id', async (req, res, next) => {
    let id = req.params.id
    id = +id
    // Permet de supprimer un joueur s'il n'est dans aucune partie dont le statut est 'started' ou 'ended'
    await player.remove(id)
        .then(() => {
            res.format({
                html: () => {
                    res.redirect(`/players`)
                },
                json: () => {
                    res.send({
                        data: res.redirect('/players')
                    })
                }
            })
        }).catch(next)
})

module.exports = router;