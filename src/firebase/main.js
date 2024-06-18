import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBjILKi8MZxosXBgMkJvKxQLtea2sggvTM",
  authDomain: "nurseryapp-anna.firebaseapp.com",
  projectId: "nurseryapp-anna",
  storageBucket: "nurseryapp-anna.appspot.com",
  messagingSenderId: "803869444436",
  appId: "1:803869444436:web:c6764fff9c625f1b2ee0c1"
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp);
export { auth }

const db = getFirestore(firebaseApp);
export { db }