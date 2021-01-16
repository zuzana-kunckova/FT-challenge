const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDir))
app.use(cors())
hbs.registerPartials(partialsPath)

app.get('/', (req,res) => {
    res.render('index', {
        title: 'Financial Times Headlines',
        author: 'Zuzana',
        script: true
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this app',
        author: 'Zuzana'
    })
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
})