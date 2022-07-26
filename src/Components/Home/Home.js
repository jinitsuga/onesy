import React from "react";
import Login from "./Login/Login";
import Personal from "./Header/Personal";
import Feed from "../Feed/Feed";
import Post from "../Post/Post";
export default function Home(props) {
  return (
    <section className="home">
      <Login userLogin={props.userLogin} userLoggedIn={props.userLoggedIn} />
      {props.userLoggedIn && (
        <Personal userLoggedIn={props.userLoggedIn} userData={props.userData} />
      )}
      {props.userLoggedIn && <Post userData={props.userData} />}
      {props.userLoggedIn && (
        <Feed
          getTweets={props.getTweets}
          getFollowed={props.getFollowed}
          feedTweets={props.feedTweets}
          followedUsers={props.followedUsers}
        />
      )}
    </section>
  );
}
