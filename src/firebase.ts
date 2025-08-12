import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC2LhUQRAqa01T9ZQ30RnjPO0KQGj2JOWM",
    authDomain: "mindful-f910d.firebaseapp.com",
    projectId: "mindful-f910d",
    storageBucket: "mindful-f910d.firebasestorage.app",
    messagingSenderId: "364290161269",
    appId: "1:364290161269:web:e2ce03a474eed7c0bb563c",
    measurementId: "G-M91GCL53L3"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
