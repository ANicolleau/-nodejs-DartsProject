const router = require('express').Router()

router.get('/', (req, res, next) => {
    console.log('ON EST DANS GET PLAYERS')
    res.send('allo')
})

router.post('/', (req, res, next) => {
    console.log('ON EST DANS POST PLAYERS')
})

router.get('/new', (req, res, next) => {
    console.log('ON EST NEW PLAYERS')
})

router.get('/{id}', (req, res, next) => {
    console.log('ON EST DANS GET PLAYERS BY ID')
})

router.get('/{id}/edit', (req, res, next) => {
    console.log('ON EST DANS EDIT PLAYERS BY ID')
})

router.put('/{id}', (req, res, next) => {
    console.log('ON EST DANS LE UPDATE PLAYERS BY ID')
})

router.delete('/{id}', (req, res, next) => {
    console.log('ON EST DANS LE DELETE PLAYERS BY ID')
})

module.exports = router;