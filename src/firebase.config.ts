
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBR1-4IZApBfQkrTDJ9qwWJGPrBfZhDcPA",
    authDomain: "stage-seekers.firebaseapp.com",
    projectId: "stage-seekers",
    storageBucket: "stage-seekers.appspot.com",
    messagingSenderId: "535895440848",
    appId: "1:535895440848:web:71dc45296b5be68f1c4dd5"
};

export default function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}