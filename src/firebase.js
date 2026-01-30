// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjikAgqsDF22OwbG455jEnS960uqC49bw",
  authDomain: "barbershop-954c6.firebaseapp.com",
  projectId: "barbershop-954c6",
  storageBucket: "barbershop-954c6.firebasestorage.app",
  messagingSenderId: "427301002353",
  appId: "1:427301002353:web:ef8225d1ee445339694fd0",
  measurementId: "G-KTZR7JQ0N4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

console.log("Firebase connected");

export { app, auth, db, messaging };
