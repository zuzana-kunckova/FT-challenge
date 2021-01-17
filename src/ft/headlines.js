require('dotenv').config()
const fetch = require('node-fetch')

const getHeadlines = (searchTerm = '') => {
    return fetch('https://api.ft.com/content/search/v1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.API_KEY
        },
        body: JSON.stringify({
            queryString: searchTerm,
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
}

module.exports = getHeadlines
