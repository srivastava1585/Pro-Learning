var cacheName = 'Static-pwa-v1';
var cacheNameD = 'Dynamic-pwa-v1';
var filesToCache = [
    '/'
];



self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
          return Promise.all(
            cacheNames.filter(function (cacheName) {
                // Return true if you want to remove this cache,
                // but remember that caches are shared across
                // the whole origin
            }).map(function (cacheName) {
                return caches.delete(cacheName);
            })
          );
      })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.open(cacheNameD).then(function (cache) {
          return fetch(event.request).then(function (response) {
              cache.put(event.request, response.clone());
              return response;
          });
      })
    );
});

self.addEventListener('push', function (e) {
    var body;
    if (e.data) {
        body = e.data.text();
    } else {
        body = 'Push message no payload';
    }

    var options = {
        body: body,
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
          {
              action: 'explore', title: 'Explore this new world',
              icon: 'images/checkmark.png'
          },
          {
              action: 'close', title: 'Close',
              icon: 'images/xmark.png'
          },
        ]
    };
    e.waitUntil(
      self.registration.showNotification('Hello world!', options)
    );
});

self.addEventListener('notificationclick', function (e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow('http://www.example.com');
        notification.close();
    }
});



