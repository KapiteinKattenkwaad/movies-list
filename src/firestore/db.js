import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyARDyMhhgI2IqGiisTRpuHW1eC70ZBFxZY",
    authDomain: "movies-list-db.firebaseapp.com",
    databaseURL: "https://movies-list-db-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "movies-list-db",
    storageBucket: "movies-list-db.appspot.com",
    messagingSenderId: "759508318345",
    appId: "1:759508318345:web:d4279cea154bd322c9ae58",
    measurementId: "G-LZMV2K7KMG"
};
// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore()
