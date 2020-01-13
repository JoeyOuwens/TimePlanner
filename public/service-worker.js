// This is the "Offline page" service worker

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineCache = "/offline";

const cacheables = [
    offlineCache,
    '/stylesheets/style.css',
    '/manifest.json',
    '/service-worker-register.js',
    '/images/favicon.ico',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
];

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener('install', e => {
    // Wait until promise is finished  
    // Until it get rid of the service worker 
    e.waitUntil(
        setInterval(() => {
            caches.open(CACHE)
                .then(cache => {
                    cache.addAll(cacheables)
                        // When everything is set 
                        .then(() => self.skipWaiting());
                });
        }, 60*60*1000));
});

self.addEventListener('activate', e => {
    console.log('Service Worker - Activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(
                    cache => {
                        if (cache !== CACHE) {
                            console.log(
                                'Service Worker: Clearing Old Cache');
                            return caches.delete(cache);
                        }
                    }
                )
            );
        })
    );

}); 


// Call Fetch Event  
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');

    e.respondWith(
        // If there is no internet 
        fetch(e.request).catch( async (error) =>
            await caches.match(e.request.url.replace('http://localhost:1337', '')) !== undefined ? await caches.match(e.request.url.replace('http://localhost:1337', '')) : await caches.match(offlineCache)
        )
    );
}); 
