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
        value={tweetText}
      ></input>
      <button
        className="submit-post"
        onClick={(e) => {
          e.preventDefault();
          props.addTweet(tweetText);

          setTweetText("");
        }}
      >
        Send
      </button>
    </div>
  );
}
