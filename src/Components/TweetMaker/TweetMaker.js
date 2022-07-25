import React from "react";
import "./TweetMaker.css";

export default function TweetMaker(props) {
  return (
    <div className="new-tweet">
      <input
        type="text"
        className="new-tweet-text"
        placeholder={"Anything to share, " + props.userData.name + "?"}
      ></input>
    </div>
  );
}
