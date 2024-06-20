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

const CHILDREN_PATH = 'CHILDREN'

export async function getChild(childUserName) {
  const docRef = doc(db, CHILDREN_PATH, childUserName);
  docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
    return docSnap.data()
  }
  console.warn(`Child with username: ${childUserName} not found.`)
  return undefined
}

export async function setChild() {
    // if not exists create
    // validate child exists
    // and associate with current user as parent
}