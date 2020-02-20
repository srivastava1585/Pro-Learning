importScripts('/firebase-app.js');
importScripts('/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    'messagingSenderId': '979804528771'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

var cacheName = 'Static-pwa-v1';

var filesToCache = [
    "/",
    "/Scripts/bootstrap.js",
    "/Scripts/respond.js",
    "/Scripts/jquery.fancybox.pack.js",
    "/Scripts/jquery.fancybox-media.js",
    "/Scripts/jquery.flexslider.js",
    "/Scripts/animate.js",
    "/Scripts/custom.js",
    "/Content/bootstrap.css",
    "/Content/style.css",
    "/Scripts/jquery.easing.1.3.js",
    "/firebase-app.js",
    "/firebase-messaging.js",
    "/Scripts/main.js"

];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

//self.addEventListener('activate', function (event) {
//    event.waitUntil(
//      caches.keys().then(function (cacheNames) {
//          return Promise.all(
//            cacheNames.filter(function (cacheName) {
//                // Return true if you want to remove this cache,
//                // but remember that caches are shared across
//                // the whole origin
//            }).map(function (cacheName) {
//                return caches.delete(cacheName);
//            })
//          );
//      })
//    );
//});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
    e.respondWith(caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
    })
    );
});
//self.addEventListener('fetch', function (event) {
//    event.respondWith(
//      caches.open(cacheName).then(function (cache) {
//          return fetch(event.request).then(function (response) {
//              cache.put(event.request, response.clone());
//              return response;
//          });
//      })
//    );
//});

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/itwonders-web-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

//self.addEventListener('push', function (e) {
//    var body;
//    if (e.data) {
//        body = e.data.text();
//    } else {
//        body = 'Push message no payload';
//    }

//    var options = {
//        body: body,
//        icon: 'images/example.png',
//        vibrate: [100, 50, 100],
//        data: {
//            dateOfArrival: Date.now(),
//            primaryKey: '1'
//        },
//        actions: [
//          {
//              action: 'explore', title: 'Explore this new world',
//              icon: 'images/checkmark.png'
//          },
//          {
//              action: 'close', title: 'Close',
//              icon: 'images/xmark.png'
//          },
//        ]
//    };
//    e.waitUntil(
//      self.registration.showNotification('Push Notification', options)
//    );
//});

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



