
const CACHE_NAME = "brawl-letters-85";
const ASSETS = [
  "./",
  "./index.html?v=85",
  "./styles.css?v=85",
  "./app.js?v=85",
  "./manifest.webmanifest?v=85",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/logos/logo1.png", "./assets/logos/logo2.png", "./assets/logos/logo3.png", "./assets/logos/logo4.png", "./assets/logos/logo5.png", "./assets/logos/logo6.png",
  // bosses and brawlers are optional; cache as available
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(()=>{}));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
