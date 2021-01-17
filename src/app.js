require('dotenv').config()

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDir))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
hbs.registerPartials(partialsPath)

app.post('/search', (req, res) => {
    const search = req.body.search

    fetch('https://api.ft.com/content/search/v1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.API_KEY
        },
        body: JSON.stringify({
            queryString: search.value,
            queryContext: {
                curations: [
                    'ARTICLES',
                    'BLOGS',
                    'PAGES',
                ]
            },
            resultContext: {
                aspects: ['title', 'lifecycle', 'location', 'summary', 'editorial']
            }
        })
    })
        .then(resp => resp.json())
        .then(data => {
            // const headlines = data.results[0].results
            return res.send(data)
        })
        .catch((error) => {
            res.status(500).send({ error })
        })
});



app.get('/', (req, res) => {
    res.render('index', {
        title: 'Financial Times Headlines',
        author: 'Zuzana',
        script: true,
    })
})


// app.get('/search', (req,res) => {
//     const search = req.body.search
//     const headlines = {}
//     const body = JSON.stringify({
//         queryString: search,
//         queryContext: {
//             curations: [
//                 'ARTICLES',
//                 'BLOGS',
//                 'PAGES',
//             ]
//         },
//         resultContext: {
//             aspects :['title','lifecycle','location','summary','editorial' ]
//         }
//     });
//     console.log(search)
//     // const response = await fetch('https://api.ft.com/content/search/v1', {
//     //     method: 'POST',
//     //     headers: {
//     //         'Content-Type':'application/json',
//     //         'X-Api-Key': process.env.API_KEY
//     //     },
//     //     body,
//     // }).then(response => response.json())
//     //     .then(data => {
//     //         const headlines = data.results[0].results
//     //         console.log(headlines)
//     //     })
//     //     .catch(err => console.log(err));
// })


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this app',
        author: 'Zuzana'
    })
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
})