// Asign name and cache version
const CACHE_NAME = 'v1_cache_demo_vertikal_pwa';

// Application cacheable files
let urlsToCache = [
  './',
  './css/styles.css',
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/facebook.png',
  './img/favicon-16.png',
  './img/favicon-32.png',
  './img/favicon-64.png',
  './img/favicon-96.png',
  './img/favicon-128.png',
  './img/favicon-192.png',
  './img/favicon-256.png',
  './img/favicon-384.png',
  './img/favicon-512.png',
  './img/favicon-1024.png',
  './img/favicon.png',
  './img/instagram.png',
  './img/social-media-behance.png',
  './img/social-media-facebook.png',
  './img/social-media-instagram.png',
  './img/twitter.png',
  './img/Vertikal-ecommerce.png',
  './img/Vertikal-pagina-web.png',
  './img/Vertikal-posicionamiento-web.png',
  './img/Vertikal-redes-sociales.png',
];

// Install Event - Service worker installation, store static files in cache, 
// self is a native variable for serviceworkers
// caches is an existing object
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
          .then(cache => {
            return cache.addAll(urlsToCache)
                        .then(() => {
                          self.skipWaiting();
                        });
            })
          .catch(err => {
            console.log('Cache wasnt registered, error: ', err);
          })
  );
});

// Activate Event
self.addEventListener('activate', e => {
  const cacheWhiteList = [CACHE_NAME];
  e.waitUntil(
    caches.keys()
          .then(cacheNames => {
            return Promise.all(
              cacheNames.map(cacheName => {
                if (cacheNames.indexOf(cacheName) === -1) {
                  // Remove unnecessary elements
                  return caches.delete(cacheName);
                }
              })
            );
          })
          .catch(() => {
            // Activate current cache on devices
            self.clients.claim();
          })
  );
});

// Fetch Event
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
          .then(res => {
            if (res) {
              // Return data from cache
              return res;
            } 
            return fetch(e.request);
          })
  );
});