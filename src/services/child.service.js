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

// all data uploads are created through calling newChild to ensure consistent data mappings
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

export async function setAvatar(childUserName, avatarFile) {
  const avatarRef = ref(storage, `avatars/child/${childUserName}`);
  const snapshot = await uploadString(avatarRef, avatarFile, 'data_url')
  return await getDownloadURL(snapshot.ref);
}

export async function setChild(childData) {
  const childRef = doc(db, CHILDREN_PATH, childData.userName);
  return setDoc(childRef, childData, { merge: true });
}

export async function addActivity(username) {
  const ref = doc(db, CHILDREN_PATH, username);
//ToDo
}