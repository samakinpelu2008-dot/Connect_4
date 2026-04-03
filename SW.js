const CACHE_NAME = 'neon-arcade-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './images/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// ... rest of the fetch code remains the same
