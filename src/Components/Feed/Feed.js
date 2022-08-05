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

    // sort tweets by date using dateSeconds prop.
    tweetObjs.sort(function (a, b) {
      return b.dateSeconds - a.dateSeconds;
    });

    userTweets = tweetObjs;
  }

  formTweetUsers(tweets);
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
