import React from "react";
import Tweet from "../Tweet";
import { doc, collection } from "firebase/firestore";

export default function PostComment(props) {
  const [commentText, setCommentText] = React.useState("");
  const [postCommentShown, setPostCommentShown] = React.useState(false);

  function handleChange(e) {
    setCommentText(e.target.value);
  }

  function handleSend() {
    props.addComment(commentText, true, props.parentId);
    props.setCommentPost(false);
  }
  return (
    <div className="post-comment-container">
      <input
        className="comment-text"
        placeholder="Any comments?"
        onChange={handleChange}
      ></input>
      <button
        className="send-comment"
        onClick={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        Send
      </button>
    </div>
  );
}
// 1) Filter the feedTweets state array to find the parent tweet with props.id
// 2) Make a copy the feedTweets array and modify the property we want (comments, in this case) on the filtered tweet.
// 3) Use setFeedTweets to update feedTweets with our new, modified array. Should re-render the necessary UI elements
