self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {

  const request = event.request;

  // ❌ NUNCA interceptar POST (CRÍTICO)
  if (request.method !== "GET") {
    return;
  }

  // ❌ NO interferir con Google Apps Script
  if (request.url.includes("script.google.com")) {
    return;
  }

  // ✔ solo cache básico para navegación
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});
