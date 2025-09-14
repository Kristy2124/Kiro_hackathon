const cacheName = 'app-cache-v1';
const staticAssets = [
  './',
  './index.html',
  './information.html',
  './camera.html',
  './analysis.html',
  './end_or_continue.html',
  './last_page.html',
  './functionality.js',
  './images/front_image.png',
  './images/start_button.png',
  './images/next_button.png',
  './images/camera_button.png',
  './images/sustainable.png',
  './images/continue_button.png',
  './images/end_button.png',
  './images/icon-192.png',
  './images/icon-512.png'
];

self.addEventListener('install', async event => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== cacheName).map(key => caches.delete(key))
    ))
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

