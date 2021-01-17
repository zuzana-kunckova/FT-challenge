const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')

const getHeadlines = require('./ft/headlines')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDir))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    getHeadlines()
        .then(resp => resp.json())
        .then(data => {
            return res.render('index', {
                title: 'Financial Times Headlines',
                author: 'Zuzana',
                script: true,
                headlines: data.results[0].results
            })
        })
        .catch((error) => {
            res.status(500).send({error})
        })
})

app.post('/', (req, res) => {
    const search = req.body.searchTerm
    getHeadlines(search)
        .then(resp => resp.json())
        .then(data => {
            return res.send(data)
        })
        .catch((error) => {
            res.status(500).send({error})
        })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this app',
        author: 'Zuzana'
    })
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
})