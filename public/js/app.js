const headlinesForm = document.querySelector('form')
const search = document.querySelector('input')
const headlinesContent = document.querySelector('.headlines')
const loading = document.querySelector('.loading')

headlinesForm.addEventListener('submit', (e) => {
    e.preventDefault()
    loading.textContent = 'Loading ...'

    fetch('/', {
        method: 'POST',
        body: JSON.stringify({
            searchTerm: search.value
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const headlines = data.results[0].results

            if (data.error || headlines === undefined) {
                loading.textContent = ''
                headlinesContent.textContent = "Invalid search term, please try again"
            } else {
                loading.textContent = ''
                headlinesContent.innerHTML = ''
                headlines.forEach((hl) => {
                    headlinesContent.innerHTML += `
                        <ul>
                            <li>
                                 <a href="${hl.location.uri}">${hl.title.title}</a>
                                 <p>${hl.editorial.subheading}</p>
<!--                                 <span>By ${hl.editorial.byline}</span>-->
                            </li>
                        </ul>
                    `
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })
})