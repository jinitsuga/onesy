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
  getDoc,
} from "firebase/firestore";
import { ghostUsers } from "./ghostUsers";
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const q = doc(database, "users", "OGmanCsPkvM0cDHaC2CC");

async function printUsersCollection() {
  const querySnap = await getDoc(q);

  console.log(querySnap.data());
}
printUsersCollection();

async function fakeLogIn(username) {
  const randUser = doc(collection(database, "users"));
  const userData = await setDoc(randUser, username);
}

// ----- Code to run in case of issue with 'users' collection -----
// adding ghost users
// async function addGhostUser(user) {
//   await addDoc(collection(database, "users"), {
//     metadata: user.metadata,
//     followers: [],
//     following: [],
//   });
// }
// ghostUsers.forEach((user) => {
//   addGhostUser(user);
// });

function App() {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  async function userLogin(userInfo) {
    const user = doc(collection(database, "users"));
    const addUser = await setDoc(user, {
      name: userInfo,
      following: [
        "gz3xzLQfCKdzIxsNHB0n",
        "OGmanCsPkvM0cDHaC2CC",
        "KxBr3e3fhIBgryYzKbXc",
      ],
    });
    setUserData({
      name: userInfo,
      id: user.id,
      following: [
        "gz3xzLQfCKdzIxsNHB0n",
        "OGmanCsPkvM0cDHaC2CC",
        "KxBr3e3fhIBgryYzKbXc",
      ],
    });
    setUserLoggedIn(true);
  }
  console.log(userData);
  return (
    <div className="App">
      <Home
        userLogin={userLogin}
        userLoggedIn={userLoggedIn}
        userData={userData}
      />
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
