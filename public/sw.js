const cacheName = 'FT Headlines1';
const urlsToCache = [
    './',
    './about',
    './js/app.js',
    './css/styles.css'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('Opened cache')
                return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});

// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.open(cacheName)
//             .then(cache => cache.match(event.request, { ignoreSearch: true }))
//             .then(response => {
//                 return response || fetch(event.request);
//             })
//     );
// });