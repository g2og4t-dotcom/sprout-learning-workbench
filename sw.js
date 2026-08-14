const CACHE_NAME = 'sprout-workbench-v3';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.mjs',
  './core.mjs',
  './speech.mjs',
  './content.mjs',
  './school-content.mjs',
  './manifest.webmanifest',
  './icons/app-icon.svg',
  './icons/apple-touch-icon.png'
];
const APP_PATHS = new Set(APP_SHELL.map((path) => new URL(path, self.location.href).pathname));

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const network = fetch(event.request).then(async (response) => {
    const requestURL = new URL(event.request.url);
    if (response.ok && requestURL.origin === self.location.origin && APP_PATHS.has(requestURL.pathname)) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(event.request, response.clone());
    }
    return response;
  }).catch(() => null);
  event.waitUntil(network.then(() => undefined));
  event.respondWith(caches.match(event.request).then(async (cached) => cached || await network || await caches.match('./index.html')));
});
