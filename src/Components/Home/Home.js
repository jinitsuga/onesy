import React from "react";
import Login from "./Login/Login";
import Personal from "./Header/Personal";
import Feed from "../Feed/Feed";
import Post from "../Post/Post";
export default function Home(props) {
  //
  // Probably a better way to render stuff than this - should reorganize later
  React.useEffect(() => {
    props.initializeUserData();
  }, [props.followedUsers]);
  return (
    <section className="home">
      {props.userLoggedIn && (
        <Personal
          userLoggedIn={props.userLoggedIn}
          userData={props.userData}
          initializeUserData={props.initializeUserData}
        />
      )}
      {props.userLoggedIn && (
        <Post userData={props.userData} addTweet={props.addTweet} />
      )}
      {props.userLoggedIn && (
        <Feed
          getTweets={props.getTweets}
          getFollowed={props.getFollowed}
          feedTweets={props.feedTweets}
          setFeedTweets={props.setFeedTweets}
          followedUsers={props.followedUsers}
          likeTweetDb={props.likeTweetDb}
          likeTweet={props.likeTweet}
          addTweetToDatabase={props.addTweetToDatabase}
          addTweetToFeed={props.addTweetToFeed}
          addComment={props.addComment}
          getSuggested={props.getSuggested}
          suggestedUsers={props.suggestedUsers}
          followUser={props.followUser}
        />
      )}
    </section>
  );
}
