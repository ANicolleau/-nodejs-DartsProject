const express = require('express')
const mainRouter = require('./routes')
const app = express()
const PORT = process.env.PORT || 8080

app.use(mainRouter, ()=>{
    console.log('ici')
})

app.listen(PORT, () => {
    console.log('Serveur sur port :', PORT)
})

app.use((err, req, res, next)=>{
    console.log('Here is the error : ', err)
})
