const CACHE_NAME = "brawl-letters-v23";
const ASSETS = [
  "assets/bosses/boss_01_א.png","assets/bosses/boss_02_ב.png","assets/bosses/boss_03_ג.png","assets/bosses/boss_04_ד.png","assets/bosses/boss_05_ה.png","assets/bosses/boss_06_ו.png","assets/bosses/boss_07_ז.png","assets/bosses/boss_08_ח.png","assets/bosses/boss_09_ט.png","assets/bosses/boss_10_י.png","assets/bosses/boss_11_כ.png","assets/bosses/boss_12_ל.png","assets/bosses/boss_13_מ.png","assets/bosses/boss_14_נ.png","assets/bosses/boss_15_ס.png","assets/bosses/boss_16_ע.png","assets/bosses/boss_17_פ.png","assets/bosses/boss_18_צ.png","assets/bosses/boss_19_ק.png","assets/bosses/boss_20_ר.png","assets/bosses/boss_21_ש.png","assets/bosses/boss_22_ת.png",
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
