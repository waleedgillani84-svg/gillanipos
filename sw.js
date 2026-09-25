/* ============================================================
   Gillani Gas Point - Service Worker (PWA)
   Version: 5.6
   ============================================================ */

const CACHE_NAME = 'ggp-cache-v5.6';

/* App shell + external libraries that must work offline */
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',

  /* Tailwind CSS (browser build) */
  'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',

  /* html2canvas */
  'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',

  /* JSZip */
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',

  /* Outfit font (variable) */
  'https://cdn.jsdelivr.net/fontsource/fonts/outfit:vf@latest/latin-wght-normal.woff2',

  /* Outfit fallback static weights */
  'https://cdn.jsdelivr.net/fontsource/fonts/outfit@latest/latin-400-normal.woff2',
  'https://cdn.jsdelivr.net/fontsource/fonts/outfit@latest/latin-600-normal.woff2',
  'https://cdn.jsdelivr.net/fontsource/fonts/outfit@latest/latin-700-normal.woff2',
  'https://cdn.jsdelivr.net/fontsource/fonts/outfit@latest/latin-800-normal.woff2'
];

/* ---------------- INSTALL ---------------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching app shell');
        /* addAll fails if any single request fails.
           We use individual adds so one failure doesn't break install. */
        return Promise.all(
          PRECACHE_ASSETS.map((url) =>
            cache.add(url).catch((err) => {
              console.warn('[SW] Pre-cache failed for:', url, err);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

/* ---------------- ACTIVATE ---------------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

/* ---------------- FETCH ---------------- */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  /* Only handle GET requests */
  if (request.method !== 'GET') return;

  /* Skip non-http(s) requests (e.g. chrome-extension) */
  if (!url.protocol.startsWith('http')) return;

  /* ---- Navigation requests (HTML pages) ----
     Network-first, fallback to cached index.html for offline */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match('./index.html').then(
            (cached) =>
              cached ||
              new Response('<h1>Offline</h1><p>App offline hai. Dobara koshish karein.</p>', {
                status: 503,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
              })
          )
        )
    );
    return;
  }

  /* ---- Other requests (CSS, JS, fonts, images, CDN) ----
     Cache-first with background update (stale-while-revalidate) */
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          /* Cache successful responses (opaque responses from CDN are also fine) */
          if (networkResponse && (networkResponse.ok || networkResponse.type === 'opaque')) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(() => null);

      /* Return cached immediately if available, otherwise wait for network */
      if (cached) {
        return cached;
      }

      return fetchPromise.then((response) => {
        if (response) return response;
        /* Final fallback for images */
        if (request.destination === 'image') {
          return new Response('', { status: 404, statusText: 'Offline' });
        }
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});

/* ---------------- MESSAGE (manual update support) ---------------- */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});