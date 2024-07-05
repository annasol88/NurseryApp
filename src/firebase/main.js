import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyBjILKi8MZxosXBgMkJvKxQLtea2sggvTM',
  authDomain: 'nurseryapp-anna.firebaseapp.com',
  projectId: 'nurseryapp-anna',
  storageBucket: 'nurseryapp-anna.appspot.com',
  messagingSenderId: '803869444436',
  appId: '1:803869444436:web:c6764fff9c625f1b2ee0c1'
};

const firebaseApp = initializeApp(firebaseConfig)

// uncomment below for WEB build 
//
const auth = initializeAuth(firebaseApp);

// uncomment below for IOS or android
//
// const auth = initializeAuth(firebaseApp, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });


const db = getFirestore(firebaseApp);

const storage = getStorage();

export { auth, db, storage}