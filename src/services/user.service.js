import { deleteDoc, getDoc, setDoc, doc } from 'firebase/firestore'; 
import { db } from '../firebase/main'

const USER_PATH = 'users'

export async function createUser(userEmail) {
  // user email is used as path because this is taken from auth so will always be unique 
  return setUser(userEmail, {
    email: userEmail,
    // currently only parents can be created through the app
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

export async function updateUserEmail(currentEmail, newEmail) {
  let userData = await getUser(currentEmail)

  if(!userData) { 
    return Promise.reject('User not found')
  }

  userData.email = newEmail

  await setUser(newEmail, userData)
  await deleteDoc(doc(db, USER_PATH, currentEmail));
  // TODO update child username 
  // update child in DB with new username 
  // update posts 
  // update post likes
}

export async function setUser(email, data) {
  const ref = doc(db, USER_PATH, email);
  return setDoc(ref, data, { merge: true });
}