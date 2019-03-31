import firebase from 'firebase';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyA2xwZ2FGGJXcTOku1RUvu-xq57bKADXiQ',
  authDomain: 'boilerplate-tl.firebaseapp.com',
  databaseURL: 'https://boilerplate-tl.firebaseio.com',
  projectId: 'boilerplate-tl',
  storageBucket: 'boilerplate-tl.appspot.com',
  messagingSenderId: '517479425728',
});

const provider = new firebase.auth.GoogleAuthProvider();

// -------- exports ---------

export const signIn = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      // hooray
    })
    .catch(error => {
      return console.error(error);
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      return console.error(err);
    });
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.error(error);
    });
};

export const db = app.firestore();

export default firebase;
