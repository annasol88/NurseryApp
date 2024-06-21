import { setDoc, doc, getDoc } from 'firebase/firestore'; 
import { uploadString, ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/main'
import { updateUserChild } from './user.service'

const ACTIVITY_DATA = [
    {
        type: 'ABSENT',
        date: new Date(),
        reason: 'fever'
    },
    {
        type: 'PRESENT',
        date: new Date(),
        signIn: new Date(),
        signOut: new Date(),
        meals: ['pesto pasta', 'oat cakes']
    },
    {
        type: 'PRESENT',
        date: new Date(),
        signIn: new Date(),
        signOut: new Date(),
        meals: ['pesto pasta', 'oat cakes']
    }
]

const CHILDREN_PATH = 'children'

export async function getChild(childUserName) {
  const docRef = doc(db, CHILDREN_PATH, childUserName);
  docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
    return docSnap.data()
  }
  console.warn(`Child with username: ${childUserName} not found.`)
  return Promise.resolve(undefined)
}

export function generateUserName(parentEmail, name) {
  return `${parentEmail}_${name}`
}

export function newChild(username, name, avatarUrl, dob, address, allergies, diet, doctor) {
  return {
    userName: username,
    name: name,
    avatarUrl: avatarUrl,
    dob: dob,
    address: address,
    allergies: allergies,
    diet: diet,
    doctor: doctor,
    activities: []
  }
}

export async function setChildAndAvatar(parentEmail, childData, avatarFile) {
  const avatarRef = ref(storage, `avatars/child/${childData.userName}`);
  const snapshot = await uploadString(avatarRef, avatarFile)
  const url = await getDownloadURL(snapshot.ref);
  childData.avatarUrl = url
  return await setChild(parentEmail, childData);
}

export async function setChild(parentEmail, childData) {
  const childRef = doc(db, CHILDREN_PATH, childData.userName);
  let setChild = setDoc(childRef, childData, { merge: true });

  // handle seperately...
  let setUserChildren = updateUserChild(parentEmail, childData.userName)

  return Promise.all([setChild, setUserChildren])
}

export async function addActivity(username) {
  const ref = doc(db, CHILDREN_PATH, username);

}