// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { doc, collection, getFirestore, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiGHO1C6HbDi5b68YSE0myLE3dll53mek",
  authDomain: "contacts-db-fa7ca.firebaseapp.com",
  projectId: "contacts-db-fa7ca",
  storageBucket: "contacts-db-fa7ca.appspot.com",
  messagingSenderId: "709969566530",
  appId: "1:709969566530:web:64d301542f7ec8ec7386db",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
export const contactsCollectionRef = collection(db, "contacts");

// Get Collection Data
export function getData() {
  getDocs(contactsCollectionRef).then((data) => {
    let contacts = [];
    data.docs.forEach((contact) => {
      contacts.push({ ...contact.data(), id: contact.id });
    });
    console.log(contacts);
  });
}
