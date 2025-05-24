self.addEventListener('install', event => {
  console.log('Service Worker instalado');
});

self.addEventListener('fetch', function (event) {
  // Cache ou interceptar as requisições aqui se quiser
});
