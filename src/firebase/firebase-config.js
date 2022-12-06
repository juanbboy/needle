import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCSaJzJYoLaAhDK7w55MC4Oz4MVvxjUE4E",
  authDomain: "react-auth-app-6a340.firebaseapp.com",
  projectId: "react-auth-app-6a340",
  storageBucket: "react-auth-app-6a340.appspot.com",
  messagingSenderId: "778269297947",
  appId: "1:778269297947:web:fe855452be4a5d767257be",
  measurementId: "G-960E23P220"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}
