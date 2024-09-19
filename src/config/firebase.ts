import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBulDytz_lboBH7ykd4GtKRFE0CUnnF-8A",
    authDomain: "cinema-d1047.firebaseapp.com",
    projectId: "cinema-d1047",
    storageBucket: "cinema-d1047.appspot.com",
    messagingSenderId: "1017053864727",
    appId: "1:1017053864727:web:a452950effefc6122bcd52"
  };
  

 const app = initializeApp(firebaseConfig)
 export const db = getFirestore(app)
 export const testimonialCollection = collection(db, 'testimonialFilms');
console.log('testimonialFilms iz firebase', testimonialCollection)