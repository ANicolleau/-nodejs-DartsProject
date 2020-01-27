const router = require('express').Router()
const game = require('../models/Game')

router.get('/', (req, res, next) => {
    let limit = parseInt(req.query.limit) || 10
    if (limit > 10)
        limit = 20
    let page = parseInt(req.query.offset) || 0
    let sort = req.name || req.status
    


    Promise.all()
})

router.get('/new', (req, res, next) => {
    console.log('ON EST LA')
})

router.post('/', (req, res, next) => {
    console.log('ON EST LA')
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