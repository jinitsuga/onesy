import React from "react";
import "./Post.css";

export default function Post(props) {
  const [tweetText, setTweetText] = React.useState("");

  function handleChange(e) {
    setTweetText(e.target.value);
  }
  return (
    <div className="new-tweet">
      <input
        onChange={handleChange}
        type="text"
        className="new-tweet-text"
        placeholder={"Anything to share, " + props.userData.name + "?"}
      ></input>
      <button className="submit-post">Send</button>
    </div>
  );
}
