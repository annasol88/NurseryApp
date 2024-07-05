import { deleteDoc, getDoc, setDoc, doc } from 'firebase/firestore'; 
import { db } from '../firebase/main'
import { updateUserPosts, updateUserLikedPosts } from './news-feed.service'
import { generateUserName, getChild, setChild, removeChild} from './child.service';

const USER_PATH = 'users'
  
export async function getUser(userEmail) {
  const docRef = doc(db, USER_PATH, userEmail);
  docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
    return docSnap.data()
  }
  return Promise.reject(`User with email: ${userEmail} not found.`)
}

export async function setUser(email, data) {
  const ref = doc(db, USER_PATH, email);
  return setDoc(ref, data, { merge: true });
}

export async function createParentUser(userEmail) {
  // user email is used as path because this is taken from auth so will always be unique 
  return setUser(userEmail, {
    email: userEmail,
    role: 'PARENT',
  });
}

export async function updateUserEmail(currentEmail, newEmail) {
  let userData = await getUser(currentEmail)

  // if user has a child - their username will be updated
  if(userData.child) {
    let userChild = await getChild(userData.child)
    oldUsername = userChild.userName
    newUserName = generateUserName(newEmail, userChild.name)

    userData.child = newUserName
    userChild.userName = newUserName

    await setChild(userChild)
    await removeChild(oldUsername)
  }

  userData.email = newEmail

  await setUser(newEmail, userData)
  await deleteDoc(doc(db, USER_PATH, currentEmail));

  await updateUserPosts(newEmail, cleanEmail)
  await updateUserLikedPosts(newEmail, cleanEmail) 
}