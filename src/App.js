import "./App.css";
import React from "react";
import Home from "./Components/Home/Home";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ghostUsers } from "./ghostUsers";
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const q = query(collection(database, "users"));

async function printUsersCollection() {
  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
}
printUsersCollection();
// adding ghost users
// async function addGhostUser(user) {
//   await addDoc(collection(database, "users"), {
//     metadata: user.metadata,
//     followers: [],
//     following: [],
//   });
// }
// // ghostUsers.forEach((user) => {

// //   addGhostUser(user)});

function App() {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);

  function logUserIn() {}

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

// 0. Create login
// 1. Get client data
// 2. Get iterated following data (from client)
// 3. (same iteration) Get following tweets
// 4. Form "following" user objects with metadata and their tweets
// 5. Show feed of tweets, ordered by date.
