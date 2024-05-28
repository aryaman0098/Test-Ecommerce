import { initializeApp } from 'firebase/app'
import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAR3Ad3DIefcEORgfa0wYr201-zKwIox7U",
  authDomain: "crwn-clothing-3bd69.firebaseapp.com",
  projectId: "crwn-clothing-3bd69",
  storageBucket: "crwn-clothing-3bd69.appspot.com",
  messagingSenderId: "332006916450",
  appId: "1:332006916450:web:8984a1a55927a5b26cec3b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()   // Can have different providers like google, github, facebook hence it is instantiated as classes 
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth() // Singleton because it manages the authentication of the entire application

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()

}

export const getCategoriesAndDocuments = async() => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
}

export const createUserDocumenFromAuth = async(userAuth, additionalInformation) => {

  if(!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapShot = await getDoc(userDocRef)

  if(!userSnapShot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch(e) {
      console.log('Error creating the user ', e.message)
    }
  }

  return userDocRef 
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  
  if(!email || !password) return
  
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
  
  if(!email || !password) return
  
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)