import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId",
    measurementId: "measurementId"
};

firebase.initializeApp(config);
const db = firebase.firestore();
const storage = firebase.storage();

export {
    storage, db
}
