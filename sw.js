const CACHE_NAME = "fatiga-app-v1";

/* =========================
   INSTALL
========================= */
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

/* =========================
   ACTIVATE
========================= */
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

/* =========================
   FETCH (IMPORTANTE)
   - NO interceptar Google Sheets
   - Evitar romper fetch en móvil
========================= */
self.addEventListener("fetch", (event) => {

  const url = event.request.url;

  // ❌ CRÍTICO: no tocar Google Apps Script
  if (url.includes("script.google.com")) {
    return; // deja pasar directo a red
  }

  // ❌ tampoco romper POST requests
  if (event.request.method !== "GET") {
    return;
  }

  // ✔ para archivos normales (HTML, CSS, JS, imágenes)
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
