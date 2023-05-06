// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

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
  });
}

// Getting the documents
export const getContacts = () => {
  const res = getDocs(contactsCollectionRef).then((data) => {
    let contacts = [];

    data.docs.forEach((contact) => {
      contacts.push({ ...contact.data(), id: contact.id });
    });
    return contacts;
  });
  return res;
};

// Get the document by Id
export const getContactById = async (contactId) => {
  // const q = query(collection(db, "contacts"), where("first", "==", "Rachel"));
  // debugger;
  // const res = getDocs(q).then((snapshot) => {
  //   let contact = [];
  //   snapshot.forEach((doc) => {
  //     console.log(doc.data());
  //     contact.push({ ...doc.data(), id: doc.id });
  //   });
  //   return contact;
  // });
  // debugger;
  // return res;

  const docRef = doc(db, "contacts", contactId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
};

// Setting the documents
export const createContact = () => {
  const res = addDoc(contactsCollectionRef, {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle@twitter.com",
    favorite: true,
  }).then((docRef) => docRef.id);
  return res;
};

// updating the document by Id
export const updateContactById = (contactId, updateObj) => {
  const docRef = doc(db, "contacts", contactId);

  const res = updateDoc(docRef, { ...updateObj, favorite: true }).then(() =>
    getContacts()
  );
  return res;
};

// deleting the document by Id
export const deleteContactById = (contactId) => {
  const docRef = doc(db, "contacts", contactId);

  // const res = deleteDoc(docRef).then(() => getContacts());
  // return res;
  deleteDoc(docRef);
};

// onSnapshot(contactsCollectionRef, (snapshot) => {
//   let contacts = [];
//   snapshot.docs.forEach((doc) => {
//     contacts.push({ ...doc.data(), id: doc.id });
//   });
//   getContacts(contacts);
// });

// export const getContacts = async () => {
//   const docSnap = await getDocs(contactsCollectionRef);
//   console.log(docSnap.data());
// };
