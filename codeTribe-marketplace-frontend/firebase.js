// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDKfDt2pW-d0kYgkxFEYdyxcO8IWfi0xHs',
  authDomain: 'marketplace-84441.firebaseapp.com',
  projectId: 'marketplace-84441',
  storageBucket: 'marketplace-84441.firebasestorage.app',
  messagingSenderId: '516512100076',
  appId: '1:516512100076:web:68e5dcfb804deef89b3fc9',
  measurementId: 'G-TEJM1ZKV7D',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, analytics, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc, getDoc };
