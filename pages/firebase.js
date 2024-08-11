import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBmYz-4K0F5qcYcaJTEoYhcMbK7NAbhgyc",
  authDomain: "reactgoviapp.firebaseapp.com",
  projectId: "reactgoviapp",
  storageBucket: "reactgoviapp.appspot.com",
  messagingSenderId: "294893103403",
  appId: "1:294893103403:web:dd17cf8452a18315e93d6e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
