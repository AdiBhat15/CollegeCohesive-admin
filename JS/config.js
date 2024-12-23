
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    setDoc,
    doc,
    updateDoc,
    query,
    where,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFqDKIWaADj5RpcO-p8Ny0bx2ZfFV8UsI",
    authDomain: "college-cohesive-admin.firebaseapp.com",
    projectId: "college-cohesive-admin",
    storageBucket: "college-cohesive-admin.appspot.com",
    messagingSenderId: "23786372825",
    appId: "1:23786372825:web:9579d28db485315f2288c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);

export { app, db, storage, collection, addDoc, getDoc, setDoc, doc, updateDoc, query, where, getDocs, storageRef, uploadBytes, getDownloadURL };

