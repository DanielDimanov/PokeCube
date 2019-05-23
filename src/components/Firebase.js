//Import Firebase
import * as firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from '../env/firebaseConfig';


firebase.initializeApp(firebaseConfig);

export const firebaseAppAuth = firebase.auth();
export const firebaseFirestore = firebase.firestore();

export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default firebase;