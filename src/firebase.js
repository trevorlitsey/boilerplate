import firebase from 'firebase';
import 'firebase/firestore';
import Rebase from 're-base';

const app = firebase.initializeApp({
	apiKey: 'AIzaSyA2xwZ2FGGJXcTOku1RUvu-xq57bKADXiQ',
	authDomain: 'boilerplate-tl.firebaseapp.com',
	databaseURL: 'https://boilerplate-tl.firebaseio.com',
	projectId: 'boilerplate-tl',
	storageBucket: 'boilerplate-tl.appspot.com',
	messagingSenderId: '517479425728'
});

const provider = new firebase.auth.GoogleAuthProvider();


// -------- exports ---------

export const signIn = () => {
	firebase.auth().signInWithPopup(provider).then((result) => {
		// hooray
	}).catch((error) => {
		return console.error(error);
	});
}

export const signOut = () => {
	firebase.auth().signOut().then(function () {
		// Sign-out successful.
	}).catch(function (error) {
		// An error happened.
	});
}

export const db = app.firestore();

export default firebase;
