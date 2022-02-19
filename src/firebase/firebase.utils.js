import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNILcT4POhEAJgtcvLV2kr-O3mnsrg4Y0",
  authDomain: "crwn-clothing-34ba9.firebaseapp.com",
  projectId: "crwn-clothing-34ba9",
  storageBucket: "crwn-clothing-34ba9.appspot.com",
  messagingSenderId: "951053357627",
  appId: "1:951053357627:web:fcc510d9df6979b191421e",
  measurementId: "G-W8ESH7L759"
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

//getting the authentication object, so we can use it, or export it
const auth = getAuth();

const signInWithGoogle = ()=> 
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  //gettint the firestore, to store users in the database
  const firestore = getFirestore();

  //store user data in firebase
  const createUserProfileDocument = async (userAuth, additionalData)=> {
    if (!userAuth) return;

    const userRef = doc(firestore, `users/${userAuth.uid}`)
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user ' + error);
      }
    }
    return userRef;
  }

  const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(firestore, collectionKey);

    const batch = writeBatch(firestore);

    objectsToAdd.forEach(obj =>{
      const newDocRef = doc(collectionRef);
      batch.set(newDocRef, obj)
    })

    return await batch.commit();
  }

  const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase),
        id: doc.id,
        title,
        items
      }
    })

    return transformedCollection.reduce((acc, collection)=> {
      acc[collection.title.toLowerCase()] = collection;
      return acc;
    }, {});
  }

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        resolve(userAuth);
      }, reject)
      unsubscribe();
    })
  }

export { signInWithGoogle, googleProvider, auth, firestore, createUserProfileDocument, convertCollectionsSnapshotToMap, addCollectionAndDocuments, getCurrentUser }; 