import { setDoc, doc, getDoc } from 'firebase/firestore'; 
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/main'

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
  const response = await fetch(avatarFile);
  const blob = await response.blob();
  await uploadBytes(avatarRef, blob)
  return await getDownloadURL(avatarRef);
}

export async function setChild(childData) {
  const childRef = doc(db, CHILDREN_PATH, childData.userName);
  return setDoc(childRef, childData, { merge: true });
}

export function newAbsence(date, reason) {
  return {
    type: 'ABSENCE',
    date: date,
    reason: reason
  }
}

export async function addActivity(username, activity) {
  let child = await getChild(username)
  if(!child) {
    return Promise.reject('child not found')
  }

  console.log(activity.date)
  console.log(child.activities)

  let alreadyRecorded = child.activities.find(a => {
    return a.date == activity.date
  })

  if(alreadyRecorded) {
    return Promise.reject({code:'ABSENCE_ALREADY_RECORDED'})
  } 
  child.activities.push(activity)
  return await setChild(child)
}
