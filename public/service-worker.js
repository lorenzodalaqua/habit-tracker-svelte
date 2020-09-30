const CACHE_NAME = '__HABIT_TRACKER_0.1__';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/global.css',
  '/build/bundle.css',
  '/build/main.js',
  '/build/app.js',
  '/build/authentication.js',
  '/build/habit-tracker-sync.js'
];

// Cache files in install event
self.addEventListener('install', function (event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Pre-caching app shell');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Network with cache fallback
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.open(CACHE_NAME).then(cache => cache.match(event.request))
    )
  );
});
