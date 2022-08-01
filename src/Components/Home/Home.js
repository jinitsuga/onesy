import React from "react";
import Login from "./Login/Login";
import Personal from "./Header/Personal";
import Feed from "../Feed/Feed";
import Post from "../Post/Post";
export default function Home(props) {
  //
  // Probably a better way to render stuff than this - should reorganize later

  return (
    <section className="home">
      <Login userLogin={props.userLogin} userLoggedIn={props.userLoggedIn} />
      {props.userLoggedIn && (
        <Personal userLoggedIn={props.userLoggedIn} userData={props.userData} />
      )}
      {props.userLoggedIn && (
        <Post userData={props.userData} addTweet={props.addTweet} />
      )}
      {props.userLoggedIn && (
        <Feed
          getTweets={props.getTweets}
          getFollowed={props.getFollowed}
          feedTweets={props.feedTweets}
          followedUsers={props.followedUsers}
          likeTweetDb={props.likeTweetDb}
          likeTweet={props.likeTweet}
        />
      )}
    </section>
  );
}
