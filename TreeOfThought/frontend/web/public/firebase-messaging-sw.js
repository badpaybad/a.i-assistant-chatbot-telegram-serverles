importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAeOXhZrhaadsOIp1e_0tklcnH8H5KfRZ8",
  authDomain: "realtimedbtest-d8c6b.firebaseapp.com",
  databaseURL: "https://realtimedbtest-d8c6b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtimedbtest-d8c6b",
  storageBucket: "realtimedbtest-d8c6b.firebasestorage.app",
  messagingSenderId: "787425357847",
  appId: "1:787425357847:web:70987cc599fe6242a92c52"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
