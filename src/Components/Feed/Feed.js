import React from "react";
import Tweet from "../Tweet/Tweet.js";

export default function Feed(props) {
  // Potentially forming "user" objects in this Feed component, to have it easier constructing tweets.

  React.useEffect(() => {
    props.getTweets();
    props.getFollowed();
  }, []);

  return <section className="feed">random feed stuff</section>;
}
