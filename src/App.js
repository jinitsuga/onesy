import "./App.css";
import React from "react";
import Home from "./Components/Home/Home";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import { arrayUnion, getFirestore, increment } from "firebase/firestore";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ghostUsers } from "./ghostUsers";
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const usersRef = collection(database, "users");
const tweetsRef = collection(database, "tweets");

// Tracking # of users since Firebase doesn't have a built-in way to know the number of docs in a collection
let usersNumber = 6;

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
  const [feedTweets, setFeedTweets] = React.useState([]);
  const [followedUsers, setFollowedUsers] = React.useState([]);
  const [suggestedUsers, setSuggestedUsers] = React.useState([]);

  // getting non-followed users to suggest
  async function getSuggested() {
    let alreadyFollowed = [];
    followedUsers.forEach((user) => {
      alreadyFollowed.push(user.data.metadata.random);
    });
    console.log(alreadyFollowed);
  }

  // getting followed users data to form tweet components
  async function getFollowed() {
    let usersPromise = [];
    let followed = [];
    userData.following.forEach((userid) =>
      usersPromise.push(doc(database, "users", userid))
    );

    const followedPromises = usersPromise.map((prom) => getDoc(prom));

    await Promise.all(followedPromises).then((values) =>
      values.forEach((value) =>
        followed.push({ id: value.id, data: value.data() })
      )
    );
    setFollowedUsers(followed);
  }
  console.log(followedUsers);
  // getting tweets from users that client is following
  async function getTweets() {
    let tweets = [];
    const q = query(tweetsRef, where("userid", "in", userData.following));
    const querySnap = await getDocs(q);

    querySnap.forEach((doc) => {
      tweets.push({ data: doc.data(), id: doc.id });
    });
    setFeedTweets(tweets);
  }

  //  Sending new tweet to the backend and adding it to the frontend state on the same click
  // (This is probably wrong but saves costly backend calls + sharing doc id with front end feels wrong)
  async function addTweetToDatabase(text, doc, comment) {
    const docSent = await setDoc(doc, {
      userid: userData.id,
      text: text,
      likes: 0,
      date: new Date(),
      comment: comment,
      comments: [],
    });
  }
  // function addTweetToFeed(text, id, comment) {
  //   setFeedTweets([
  //     ...feedTweets,
  //     {
  //       data: {
  //         userid: userData.id,
  //         text: text,
  //         likes: 0,
  //         date: new Date(),
  //         comment: comment,
  //         comments: [],
  //       },
  //       id: id,
  //     },
  //   ]);
  // }

  function addTweetToFeed(text, id, comment) {
    setFeedTweets((oldFeed) => {
      const newFeed = [
        ...oldFeed,
        {
          data: {
            userid: userData.id,
            text: text,
            likes: 0,
            date: new Date(),
            comment: comment,
            comments: [],
          },
          id: id,
        },
      ];
      return newFeed;
    });
  }
  // the prop  'comment' takes a boolean value and refers to if the is a comment or not
  function addTweet(text, comment) {
    const tweet = doc(collection(database, "tweets"));
    addTweetToDatabase(text, tweet, comment);
    addTweetToFeed(text, tweet.id, comment);
  }

  // getting comments from backend for each tweet

  // Different function to add comments since they aren't regular tweets (function's getting really messy)

  async function addCommentToParent(id, childTweetId) {
    const parentTweet = doc(database, "tweets", id);
    await updateDoc(parentTweet, {
      comments: arrayUnion(childTweetId),
    });
  }

  // All I needed was to add the ids to the parent FIRST, and then add the tweet as an object to the feed.
  function addComment(text, comment, parentId) {
    const commentPost = doc(collection(database, "tweets"));

    addCommentToParent(parentId, commentPost.id);

    addTweetToDatabase(text, commentPost, comment);

    const updatedTweets = feedTweets.map((tweet) => {
      if (tweet.id == parentId) {
        return {
          ...tweet,
          data: {
            ...tweet.data,
            comments: [...tweet.data.comments, commentPost.id],
          },
        };
      } else {
        return tweet;
      }
    });
    setFeedTweets(updatedTweets);
    addTweetToFeed(text, commentPost.id, comment);
  }

  // Likes handler functions - on both front and backend

  async function likeTweetDb(id) {
    const tweetRef = doc(database, "tweets", id);
    await updateDoc(tweetRef, {
      likes: increment(1),
    });
  }

  function likeTweetApp(id) {
    setFeedTweets((oldTweets) => {
      const changedTweets = oldTweets.map((tweet) => {
        if (tweet.id === id) {
          console.log("lol");
          return {
            ...tweet,
            data: { ...tweet.data, likes: tweet.data.likes + 1 },
          };
        } else {
          return tweet;
        }
      });

      return changedTweets;
    });
  }

  function likeTweet(id) {
    likeTweetDb(id);
    likeTweetApp(id);
  }
  // User log in - follows itself and ghost users automatically in order to show stuff on feed

  function initializeUserData() {
    getTweets();
    getFollowed();
  }

  async function userLogin(userName, userBio) {
    const user = doc(collection(database, "users"));
    const addUser = await setDoc(user, {
      metadata: {
        name: userName,
        bio: userBio,
      },
      following: [
        "SY9m6DQrvfdTBufof6bu",
        "bWMWhxJOE1tvPHjaomdP",
        "gtU3Eb7zFD264YvnND5v",
        user.id,
      ],
      followers: [],
      random: usersNumber + 1,
    });
    setUserData({
      name: userName,
      id: user.id,
      bio: userBio,
      following: [
        "SY9m6DQrvfdTBufof6bu",
        "bWMWhxJOE1tvPHjaomdP",
        "gtU3Eb7zFD264YvnND5v",
        user.id,
      ],
    });
    usersNumber++;
    setUserLoggedIn(true);
  }
  getSuggested();
  return (
    <div className="app">
      <Home
        userLogin={userLogin}
        userLoggedIn={userLoggedIn}
        userData={userData}
        getTweets={getTweets}
        getFollowed={getFollowed}
        feedTweets={feedTweets}
        setFeedTweets={setFeedTweets}
        followedUsers={followedUsers}
        addTweet={addTweet}
        addTweetToDatabase={addTweetToDatabase}
        addTweetToFeed={addTweetToFeed}
        addComment={addComment}
        likeTweetDb={likeTweetDb}
        likeTweet={likeTweet}
        initializeUserData={initializeUserData}
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
