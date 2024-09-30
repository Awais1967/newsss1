// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyBrnQucaskZEo8D87m7FhHwDMj8RyN5pzU",
  authDomain: "siss-a83fb.firebaseapp.com",
  projectId: "siss-a83fb",
  storageBucket: "siss-a83fb.appspot.com",
  messagingSenderId: "128055857766",
  appId: "1:128055857766:web:d495b2b38747ec011793a7",
  measurementId: "G-BYVB2LFTVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { app, auth, database, storage };
