const CACHE_NAME = 'neon-connect-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Note: Add paths to your sound files here once you have them, e.g., './sounds/drop.mp3'
];

// 1. Install Phase: Cache the essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching Files');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Forces the waiting service worker to become the active service worker
  self.skipWaiting();
});

// 2. Activate Phase: Clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Ensures that updates happen across all tabs immediately
  return self.clients.claim();
});

// 3. Fetch Phase: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
