import React from "react";
import Tweet from "../Tweet/Tweet.js";

export default function Feed(props) {
  React.useEffect(() => {
    props.getTweets();
    props.getFollowed();
  }, []);

  const followed = props.followedUsers;

  // Separating feed tweets between non-comment/reply tweets and reply/comment tweets

  const tweets = props.feedTweets.filter(
    (tweet) => tweet.data.comment == false
  );
  const responses = props.feedTweets.filter(
    (tweet) => tweet.data.comment == true
  );

  let userTweets = [];

  // Forming "user" objects in this Feed component, to have it easier constructing tweets.
  function formTweetUsers() {
    let tweetObjs = [];
    followed.forEach((user) => {
      for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].data.userid == user.id) {
          tweetObjs.push({
            name: user.data.metadata.name,
            avatar: user.data.metadata.avatar,
            text: tweets[i].data.text,
            likes: tweets[i].data.likes,
            comments: tweets[i].data.comments,
            // Firebase's "timestamp" object is different than a regular Date object so had to tweak
            dateSeconds: tweets[i].data.date.seconds
              ? tweets[i].data.date.seconds
              : tweets[i].data.date.valueOf(),
            date:
              tweets[i].data.date instanceof Date
                ? tweets[i].data.date.toDateString()
                : tweets[i].data.date.toDate().toDateString(),
            key: i,
            id: tweets[i].id,
          });
        }
      }
    });

    // sort tweets by date using dateSeconds prop.
    tweetObjs.sort(function (a, b) {
      return b.dateSeconds - a.dateSeconds;
    });

    userTweets = tweetObjs;
  }

  formTweetUsers();
  console.log(userTweets);
  const shownTweets = userTweets.map((tweet) => (
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
    />
  ));

  return <section className="feed">{shownTweets} </section>;
}
