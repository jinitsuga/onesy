import React from "react";

export default function Feed(props) {
  const [tweets, setTweets] = React.useState([]);

  // Potentially useEffect() function to load tweets onto the state once, then display them.
  // useEffect potentially managed by a different state. Maybe send tweets from App component instead?

  return <section className="feed">random feed stuff</section>;
}
