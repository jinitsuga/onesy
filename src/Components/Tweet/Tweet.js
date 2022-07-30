import React from "react";
import "./Tweet.css";

// Get the tweets from users followed by client

export default function Tweet(props) {
  return (
    <div className="tweet">
      <div className="tweet-userinfo">
        <img className="tweet-avatar" href={props.avatar}></img>
        <h4 className="tweet-username">{props.name}</h4>
      </div>
      <p className="tweet-text"> {props.text} </p>
      <div className="tweet-details">
        <span className="tweet-date"> {props.date} </span>
        <span className="tweet-likes"> Likes: {props.likes} </span>
        <button className="like-tweet">Like this tweet</button>
      </div>
    </div>
  );
}
