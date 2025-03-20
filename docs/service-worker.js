self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('app-cache').then((cache) => {
        return cache.addAll([
          '/pwa-micropages/',
          '/pwa-micropages/index.html',
          '/pwa-micropages/assets/**/*',
          '/pwa-micropages/icons/*',
          '/pwa-micropages/manifest.json'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  });