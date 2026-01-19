// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3rubUq06rVm1fRoxC4BJOCEJSihPRts8",
  authDomain: "barbershop-app-a3657.firebaseapp.com",
  projectId: "barbershop-app-a3657",
  storageBucket: "barbershop-app-a3657.firebasestorage.app",
  messagingSenderId: "488932919037",
  appId: "1:488932919037:web:59d045eb788e909389e094"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

console.log("Firebase connected");

export { app, auth, db, messaging };
