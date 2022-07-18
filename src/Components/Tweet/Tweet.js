import React from "react";
import "./Tweet.css";

// Get the tweets from users followed by client

// Tweets should display:
// #1 Username and avatar
// #2 its text  Text: the tweet's main body
// #3 some sort of date or time
// #4 number of likes

export default function Tweet(props) {
  return (
    <div className="tweet">
      <div className="tweet-userinfo">
        <img className="tweet-avatar" href="#"></img>
        <h4 className="tweet-username"></h4>
      </div>
      <p className="tweet-text"></p>
      <div className="tweet-details">
        <span className="tweet-date"></span>
        <span className="tweet-likes"></span>
      </div>
    </div>
  );
}