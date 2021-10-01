// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyD7D3dUbVUBorEJnoStCksTpIHkDH_kVeM",
    authDomain: "image-community-adbcc.firebaseapp.com",
    projectId: "image-community-adbcc",
    storageBucket: "image-community-adbcc.appspot.com",
    messagingSenderId: "683155189033",
    appId: "1:683155189033:web:2c57b8b9e956b391161b38",
    measurementId: "G-BX4HKLEXBR"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const apiKey =firebaseConfig.apiKey;
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export {auth, apiKey};