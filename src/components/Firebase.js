//Import Firebase
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../env/firebaseConfig';


const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAppAuth = firebaseApp.auth();

export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
