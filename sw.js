const CACHE_NAME = 'kanto-trip-2027-v43';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './data/trip-data.js',
  './data/places.js',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(
        CORE_ASSETS.map(url =>
          fetch(new Request(url, { cache: 'reload' })).then(res => {
            if (res && res.status === 200) return cache.put(url, res);
          })
        )
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML / CSS / JS: Network-first bypassing stale HTTP cache, with offline cache fallback
  const isCode = req.mode === 'navigate' || /\.(html|css|js)$/i.test(url.pathname) || url.pathname.endsWith('/');
  if (isCode) {
    event.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            const cacheKey = req.mode === 'navigate' ? './index.html' : url.pathname;
            caches.open(CACHE_NAME).then(cache => cache.put(cacheKey, copy));
          }
          return res;
        })
        .catch(() => caches.match(req.mode === 'navigate' ? './index.html' : url.pathname)
          .then(r => r || caches.match(req) || (req.mode === 'navigate' ? caches.match('./index.html') : undefined)))
    );
    return;
  }

  // Icons & manifest: Cache-first with network fallback
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});
