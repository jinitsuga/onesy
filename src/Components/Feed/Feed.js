import React from "react";
import Tweet from "../Tweet/Tweet.js";
import "./Feed.css";
import Suggested from "../Home/Suggested/Suggested.js";

export default function Feed(props) {
  // React.useEffect(() => {
  //   props.getTweets();
  //   props.getFollowed();
  // }, []);

  React.useEffect(() => {
    console.log("effect triggered");
    const tweets = props.feedTweets.filter(
      (tweet) => tweet.data.comment == false
    );

    const responses = props.feedTweets.filter(
      (tweet) => tweet.data.comment == true
    );
    setFeedTweets(tweets);
    setFeedResponses(responses);
  }, [props.feedTweets]);

  const [feedTweets, setFeedTweets] = React.useState([]);
  const [feedResponses, setFeedResponses] = React.useState([]);

  const followed = props.followedUsers;

  // Toggling feedUpdate to refresh the feed on comments made
  // AA
  // Separating feed tweets between non-comment/reply tweets and reply/comment tweets

  let userTweets = [];
  let comments = [];

  // Forming "user" objects in this Feed component, to have it easier constructing tweets.
  function formTweetUsers(array) {
    let tweetObjs = [];
    followed.forEach((user) => {
      for (let i = 0; i < array.length; i++) {
        if (array[i].data.userid == user.id) {
          tweetObjs.push({
            name: user.data.metadata.name,
            avatar: user.data.metadata.avatar,
            text: array[i].data.text,
            likes: array[i].data.likes,
            comments: array[i].data.comments,
            comment: array[i].data.comment,

            // Firebase's "timestamp" object is different than a regular Date object so had to tweak
            dateSeconds: array[i].data.date.seconds
              ? array[i].data.date.seconds
              : array[i].data.date.valueOf(),
            date:
              array[i].data.date instanceof Date
                ? array[i].data.date.toDateString()
                : array[i].data.date.toDate().toDateString(),
            key: i,
            id: array[i].id,
          });
        }
      }
    });
    //
    // sort tweets by date using dateSeconds prop.
    return tweetObjs.sort(function (a, b) {
      return b.dateSeconds - a.dateSeconds;
    });
  }

  // Forming tweets and responses objects formed with their respective authors info etc

  userTweets = formTweetUsers(feedTweets);

  comments = formTweetUsers(feedResponses);

  const shownTweets = userTweets.map((tweet) => {
    let tweetComments = [];
    for (let i = 0; i < comments.length; i++) {
      if (tweet.comments.includes(comments[i].id))
        tweetComments.push(comments[i]);
    }
    return (
      <Tweet
        name={tweet.name}
        text={tweet.text}
        likes={tweet.likes}
        avatar={tweet.avatar}
        date={tweet.date}
        key={tweet.key}
        id={tweet.id}
        likeTweetDb={props.likeTweetDb}
        likeTweet={props.likeTweet}
        comments={typeof tweetComments[0] == "object" ? tweetComments : ""}
        feedTweets={props.feedTweets}
        setFeedTweets={props.setFeedTweets}
        addTweetToDatabase={props.addTweetToDatabase}
        addTweetToFeed={props.addTweetToFeed}
        addComment={props.addComment}
      />
    );
  });

  return (
    <section className="feed">
      {shownTweets}

      <div className="suggested-container">
        {" "}
        <Suggested
          getSuggested={props.getSuggested}
          suggestedUsers={props.suggestedUsers}
          followUser={props.followUser}
          followedUsers={props.followedUsers}
          userLoggedIn={props.userLoggedIn}
        />
      </div>
    </section>
  );
}
