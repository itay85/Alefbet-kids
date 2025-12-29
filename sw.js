// Brawl Letters Service Worker (v28)
const VERSION = "v39";
const CACHE = `brawl-letters-${VERSION}`;

// Precache core files (assets will still be cache-first when fetched)
const CORE = [
  "./",
  "./index.html?v=39",
  "./styles.css?v=39",
  "./app.js?v=39",
  "./manifest.webmanifest?v=39",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if(url.origin !== location.origin) return;

  // Network-first for navigations / HTML so updates take effect immediately
  if (req.mode === "navigate" || url.pathname.endsWith(".html")) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: "no-store" });
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        const cached = await caches.match(req);
        return cached || caches.match("./");
      }
    })());
    return;
  }

  // For JS/CSS, prefer network but fall back to cache
  if (url.pathname.endsWith(".js") || url.pathname.endsWith(".css") || url.pathname.endsWith(".webmanifest")) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: "no-store" });
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        return (await caches.match(req)) || fetch(req);
      }
    })());
    return;
  }

  // Cache-first for everything else (images, icons, etc.)
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
