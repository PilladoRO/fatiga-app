self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("fetch", () => {
  // solo habilita cache básico
});
