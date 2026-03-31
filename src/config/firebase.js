// src/config/firebase.js

// 1. Import the specific Firebase tools we need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 2. Your actual secret keys from Google
const firebaseConfig = {
  apiKey: "AIzaSyBHhBzTixwvEfWUTPIPQN24jNgGeVE9Rt8",
  authDomain: "kissan-harvest-id.firebaseapp.com",
  projectId: "kissan-harvest-id",
  storageBucket: "kissan-harvest-id.firebasestorage.app",
  messagingSenderId: "262781104939",
  appId: "1:262781104939:web:e31b02c6a93c540e078b6e",
};

// 3. Initialize the app (This "turns on" the connection)
const app = initializeApp(firebaseConfig);

// 4. Export the tools so our other screens can use them
export const auth = getAuth(app); // For Admin Login
export const db = getFirestore(app); // For the Crop Prices
