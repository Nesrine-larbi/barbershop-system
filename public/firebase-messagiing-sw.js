// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in your app's Firebase config object.
firebase.initializeApp({
  apiKey: "AIzaSyA3rubUq06rVm1fRoxC4BJOCEJSihPRts8",
  authDomain: "barbershop-app-a3657.firebaseapp.com",
  projectId: "barbershop-app-a3657",
  storageBucket: "barbershop-app-a3657.firebasestorage.app",
  messagingSenderId: "488932919037",
  appId: "1:488932919037:web:59d045eb788e909389e094"
});

const messaging = firebase.messaging();