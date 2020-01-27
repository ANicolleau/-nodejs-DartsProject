const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, async (err, client) => {
    if (err) {
        await console.error('Une erreur est survenue : \n' + err)
        return 'ERREUR'
    }
    else {
        console.log('Database connected')
    }
})
module.exports = mongoose