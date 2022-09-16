import React from "react";
import "./Post.css";

export default function Post(props) {
  const [tweetText, setTweetText] = React.useState("");

  function handleKeyDown(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      props.addTweet(tweetText, false);
    }
  }

  function handleChange(e) {
    setTweetText(e.target.value);
  }
  return (
    <div className="new-post">
      <input
        onChange={handleChange}
        type="text"
        className="new-post-text"
        placeholder={"Anything to share, " + props.userData.name + "?"}
        value={tweetText}
        onKeyDown={handleKeyDown}
      ></input>
      <button
        className="submit-post"
        onClick={(e) => {
          e.preventDefault();
          props.addTweet(tweetText, false);

          setTweetText("");
        }}
      >
        Send
      </button>
    </div>
  );
}
