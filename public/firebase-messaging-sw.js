// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
firebase.initializeApp({
  apiKey: "AIzaSyAjikAgqsDF22OwbG455jEnS960uqC49bw",
  authDomain: "barbershop-954c6.firebaseapp.com",
  projectId: "barbershop-954c6",
  storageBucket: "barbershop-954c6.firebasestorage.app",
  messagingSenderId: "427301002353",
  appId: "1:427301002353:web:ef8225d1ee445339694fd0"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png' // You can add your barbershop icon here
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
