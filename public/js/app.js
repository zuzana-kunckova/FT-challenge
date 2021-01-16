const headlinesForm = document.querySelector('form')
const search = document.querySelector('input')
const headlinesContent = document.querySelector('.headlines')
const loading = document.querySelector('.loading')

headlinesForm.addEventListener('submit', (e) => {
    e.preventDefault()

    loading.textContent = 'Loading ...'
    headlinesContent.textContent = ''

    const body = JSON.stringify({
        queryString: search.value,
        queryContext: {
            curations: [
                'ARTICLES',
                'BLOGS',
                'PAGES',
            ]
        },
        resultContext: {
            aspects :['title','lifecycle','location','summary','editorial' ]
        }
    });

    const headers = new Headers({
        'Content-Type':'application/json',
        'X-Api-Key': API_KEY,
    })

    fetch('https://api.ft.com/content/search/v1', {
        method: 'POST',
        headers: headers,
        body,
    }).then(response => response.json())
        .then(data => {
            const headlines = data.results[0].results

            if (data.error || headlines === undefined) {
                loading.textContent = ''
                headlinesContent.textContent = "Invalid search term, please try again"
            } else if (search.value === '') {
                    loading.textContent = ''
                    headlinesContent.textContent = "Please use a search term"
            } else {
                loading.textContent = ''
                headlinesContent.innerHTML = ''
                headlines.forEach((hl) => {
                    headlinesContent.innerHTML += `
                        <ul>
                            <li>
                                 <a href="${hl.location.uri}">${hl.title.title}</a>
                                 <p>${hl.editorial.subheading}</p>
                                 <span>By ${hl.editorial.byline}</span>
                            </li>
                        </ul>
                    `
                })
            }
        })
})