import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBmYz-4K0F5qcYcaJTEoYhcMbK7NAbhgyc",
  authDomain: "reactgoviapp.firebaseapp.com",
  projectId: "reactgoviapp",
  storageBucket: "reactgoviapp.appspot.com",
  messagingSenderId: "294893103403",
  appId: "1:294893103403:web:dd17cf8452a18315e93d6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export the Firebase Authentication service
export const auth = getAuth(app);

// Initialize and export Firestore
export const db = getFirestore(app);
