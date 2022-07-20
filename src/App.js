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

const usersRef = collection(database, "users");
const tweetsRef = collection(database, "tweets");

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

  // getting tweets from users that client is following
  async function getTweets(tweetsStorage) {
    let tweets = [];
    const q = query(tweetsRef, where("userid", "in", userData.following));
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      console.log(doc.data());
      tweets.push(doc);
    });
  }

  async function userLogin(userName, userBio) {
    const user = doc(collection(database, "users"));
    const addUser = await setDoc(user, {
      name: userName,
      bio: userBio,
      following: [
        "SY9m6DQrvfdTBufof6bu",
        "bWMWhxJOE1tvPHjaomdP",
        "gtU3Eb7zFD264YvnND5v",
      ],
    });
    setUserData({
      name: userName,
      id: user.id,
      bio: userBio,
      following: [
        "SY9m6DQrvfdTBufof6bu",
        "bWMWhxJOE1tvPHjaomdP",
        "gtU3Eb7zFD264YvnND5v",
      ],
    });
    setUserLoggedIn(true);
  }
  //console.log(userData);
  return (
    <div className="App">
      <Home
        userLogin={userLogin}
        userLoggedIn={userLoggedIn}
        userData={userData}
        getTweets={getTweets}
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
