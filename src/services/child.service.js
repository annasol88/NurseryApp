import { setDoc, doc, getDoc } from 'firebase/firestore'; 
import { uploadString, ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/main'
import { updateUserChildren } from './user.service'

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

const CHILD_DATA = {
    fullName: 'Anna Solek',
    avatar: 'https://avataaars.io/?avatarStyle=Circle',
    dob: new Date(23, 4, 2003),
    addess: {
        line1: '1 blah bla road',
        line2: '',
        city: 'Glasgow',
        country: 'United Kingdom',
        postCode: 'ABC 123'
    },
    allergies: 'strawberries',
    diet: 'lots of brocolli',
    doctor: {
        name: 'Dr getbetter',
        phone: '12345678910',
        email: 'drgetbetter@hospital.com'
    },
    activities: ACTIVITY_DATA
  }

const CHILDREN_PATH = 'children'

export async function getChild(childUserName) {
  const docRef = doc(db, CHILDREN_PATH, childUserName);
  docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
    return docSnap.data()
  }
  console.warn(`Child with username: ${childUserName} not found.`)
  return undefined
}

export function newChild(parentEmail, name, dob, address, allergies, diet, doctor) {
  return {
    userName: `${parentEmail}_${name}`,
    name: name,
    dob: dob,
    address: address,
    allergies: allergies,
    diet: diet,
    doctor: doctor,
    activities: []
  }
}

export async function setChild(parentEmail, childData, avatarFile) {
  if(avatarFile) {
    const avatarRef = ref(storage, `avatars/child/${childData.userName}`);
    uploadString(avatarRef, avatarFile).then((snapshot) => {
      const childRef = doc(db, CHILDREN_PATH, childData.userName);
      getDownloadURL(snapshot.ref).then(function(url) {
        setDoc(childRef, {
          avatarUrl: url,
          ...childData
        });
        updateUserChildren(parentEmail, childData.userName)
      });
    });
  }
  // TODO set doc without updating image
}

export async function addActivity(username) {
  const ref = doc(db, CHILDREN_PATH, username);
  return setDoc(ref, { activities: true }, { merge: true });
}