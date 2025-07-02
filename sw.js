const CACHE_NAME = 'controle-entregas-v1.1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png',
  './sw.js'
];

// INSTALAÇÃO – cacheia arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  console.log('[ServiceWorker] Instalado');
  self.skipWaiting(); // força ativação imediata
});

// ATIVAÇÃO – remove caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // ativa SW em todas as abas
});

// FETCH – responde com cache ou rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // retorna do cache se disponível, senão busca da rede
      return response || fetch(event.request);
    })
  );
});
