import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDE6V7GpaSzni_69XxOgdcph7m2oi_mYc0",
    authDomain: "e-commerce-1affd.firebaseapp.com",
    databaseURL: "https://e-commerce-1affd.firebaseio.com",
    projectId: "e-commerce-1affd",
    storageBucket: "e-commerce-1affd.appspot.com",
    messagingSenderId: "236170393782",
    appId: "1:236170393782:web:8eb2953ea1bac23d8e0e17",
    measurementId: "G-774WWSXNZ2"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`/users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('error creating user', err.message)
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;