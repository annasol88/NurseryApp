import { collection, getDoc, setDoc, updateDoc, doc, where, query } from 'firebase/firestore'; 
import { db } from '../firebase/main'

const USER_PATH = 'users'

export async function createUser(userEmail) {
  const usersRef = collection(db, USER_PATH);
  // user email is used as path because this is taken from auth so will always be unique 
  return setDoc(doc(usersRef, userEmail), {
    email: userEmail,
    // only parent accounts can be created through app for security purposes
    role: 'PARENT',
  });
}
  
export async function getUser(userEmail) {
  const docRef = doc(db, USER_PATH, userEmail);
  docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
    return docSnap.data()
  }
  console.error(`User with email: ${userEmail} not found.`)
  return Promise.resolve(undefined)
}

export async function updateUserChild(userEmail, chilUserName) {
  const ref = doc(db, USER_PATH, userEmail);
  return setDoc(ref, { child: chilUserName }, { merge: true });
}