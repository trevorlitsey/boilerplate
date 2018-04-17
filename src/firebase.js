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

const db = app.firestore();

export default db;