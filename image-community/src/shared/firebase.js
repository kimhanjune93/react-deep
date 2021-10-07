// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {getFirestore} from "firebase/firestore";
import "firebase/compat/storage";
import dotenv from "dotenv";
import "firebase/compat/database";
dotenv.config();
// import "firebase/compat/firestore";  //8버전
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    // firebase 컨피그데이터 암호화!
    apiKey: process.env.REACT_APP_API_KEY,
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
const db = getFirestore();
const storage = firebase.storage();
const realtime = firebase.database();

export {auth, apiKey, db, storage, realtime};