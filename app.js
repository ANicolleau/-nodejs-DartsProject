const express = require('express')
const mainRouter = require('./routes')
const app = express()
const methodOverride = require('method-override')
const PORT = process.env.PORT || 8080

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}));

app.use(mainRouter, ()=>{
    console.log('ici')
})

app.listen(PORT, () => {
    console.log('Serveur sur port :', PORT)
})

app.use((err, req, res, next)=>{
    console.log('Here is the error : ', err)
})
