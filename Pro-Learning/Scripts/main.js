const applicationServerPublicKey = '<Your Public Key>';

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}


Notification.requestPermission(function (status) {
    console.log('Notification permission status:', status);
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(function (registration) {
            console.log('Registered:', registration);
            //swRegistration = swReg;
            //initializeUI();
        })
        .catch(function (error) {
            console.log('Registration failed:', error)
        });
}

//function subscribeUser() {
//    if ('serviceWorker' in navigator) {
//        navigator.serviceWorker.ready.then(function (reg) {
//            reg.pushManager.subscribe({
//                userVisibleOnly: true
//            }).then(function (sub) {
//                console.log('Endpoint URL: ', sub.endpoint);
//            }).catch(function (e) {
//                if (Notification.permission === 'denied') {
//                    console.warn('Permission for notifications was denied');
//                } else {
//                    console.error('Unable to subscribe to push', e);
//                }
//            });
//        })
//    }
//}

function displayNotification() {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function (reg) {
            var options = {
                body: 'Here is a notification body!',
                icon: 'images/example.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                },
                actions: [
                  {
                      action: 'explore', title: 'Explore this new world',
                      icon: 'images/checkmark.png'
                  },
                  {
                      action: 'close', title: 'Close notification',
                      icon: 'images/xmark.png'
                  },
                ]
            };
            reg.showNotification('Hello world!', options);
        });
    }
}

//function initializeUI() {
//    pushButton.addEventListener('click', function () {
//        //pushButton.disabled = true;
//        if (isSubscribed) {
//            // TODO: Unsubscribe user
//        } else {
//            subscribeUser();
//        }
//    });

//    // Set the initial subscription value
//    swRegistration.pushManager.getSubscription()
//    .then(function (subscription) {
//        isSubscribed = !(subscription === null);

//        //updateSubscriptionOnServer(subscription);

//        if (isSubscribed) {
//            console.log('User IS subscribed.');
//        } else {
//            console.log('User is NOT subscribed.');
//        }

//        updateBtn();
//    });
//}

//function subscribeUser() {
//    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
//    swRegistration.pushManager.subscribe({
//        userVisibleOnly: true,
//        applicationServerKey: applicationServerKey
//    })
//    .then(function (subscription) {
//        console.log('User is subscribed.');

//        updateSubscriptionOnServer(subscription);

//        isSubscribed = true;

//        updateBtn();
//    })
//    .catch(function (err) {
//        console.log('Failed to subscribe the user: ', err);
//        updateBtn();
//    });
//}


