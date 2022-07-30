import React from "react";
import Tweet from "../Tweet/Tweet.js";

export default function Feed(props) {
  React.useEffect(() => {
    props.getTweets();
    props.getFollowed();
  }, []);

  const followed = props.followedUsers;
  const tweets = props.feedTweets;

  let userTweets = [];

  // Forming "user" objects in this Feed component, to have it easier constructing tweets.
  function formTweetUsers() {
    let tweetObjs = [];
    followed.forEach((user) => {
      for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].userid == user.id) {
          console.log(tweets[i].date.seconds);
          tweetObjs.push({
            name: user.data.metadata.name,
            avatar: user.data.metadata.avatar,
            text: tweets[i].text,
            likes: tweets[i].likes,
            dateSeconds: tweets[i].date.seconds
              ? tweets[i].date.seconds
              : tweets[i].date.valueOf(),
            date:
              tweets[i].date instanceof Date
                ? tweets[i].date.toDateString()
                : tweets[i].date.toDate().toDateString(),
            key: i,
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

  const shownTweets = userTweets.map((tweet) => (
    <Tweet
      name={tweet.name}
      text={tweet.text}
      likes={tweet.likes}
      avatar={tweet.avatar}
      date={tweet.date}
      key={tweet.key}
    />
  ));

  return <section className="feed">{shownTweets} </section>;
}
