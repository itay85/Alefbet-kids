const CACHE_NAME = "brawl-letters-v10";
const ASSETS = [
  "assets/logos/logo1.png","assets/logos/logo2.png","assets/logos/logo3.png","assets/logos/logo4.png","assets/logos/logo5.png","assets/logos/logo6.png","./","./index.html","./styles.css","./app.js","./manifest.webmanifest"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
