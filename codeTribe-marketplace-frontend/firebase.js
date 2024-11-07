// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKfDt2pW-d0kYgkxFEYdyxcO8IWfi0xHs',
  authDomain: 'marketplace-84441.firebaseapp.com',
  projectId: 'marketplace-84441',
  storageBucket: 'marketplace-84441.firebasestorage.app',
  messagingSenderId: '516512100076',
  appId: '1:516512100076:web:68e5dcfb804deef89b3fc9',
  measurementId: 'G-TEJM1ZKV7D',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Auth
const auth = getAuth(app);

// Firebase Firestore
const db = getFirestore(app);

// Firebase Storage
const storage = getStorage(app); // Initialize Firebase Storage

// Register user and store their role (user/admin)
const registerUser = async (email, password, role = 'user') => {
  try {
    // Create user with email and password using Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user data in Firestore, including role (default to 'user' or set 'admin')
    await setDoc(doc(db, 'users', user.uid), {
      email: email,
      role: role, // Store role as 'user' or 'admin'
    });

    console.log('User registered and role set:', role);
  } catch (error) {
    console.error('Error registering user: ', error);
  }
};

// Function to login user
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
  } catch (error) {
    console.error('Error logging in: ', error);
  }
};

// Get user role from Firestore (useful during login or profile check)
const getUserRole = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId); // Get the document reference for the user
    const userDoc = await getDoc(userDocRef); // Fetch the document

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role; // Return the user's role (user or admin)
    } else {
      console.error('No such document!');
      return null; // Return null if no document is found
    }
  } catch (error) {
    console.error('Error getting user role: ', error);
    return null; // Handle any errors
  }
};

// Export Firebase features for use in other files
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  collection,
  doc,
  getDoc,
  setDoc,
  getStorage,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  getAnalytics,
  registerUser, // Export registerUser function
  loginUser, // Export loginUser function
  getUserRole, // Export getUserRole function
};
