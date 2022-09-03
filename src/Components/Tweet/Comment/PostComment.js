import React from "react";
import Tweet from "../Tweet";
import { doc, collection } from "firebase/firestore";
import "./PostComment.css";

export default function PostComment(props) {
  const [commentText, setCommentText] = React.useState("");
  const [postCommentShown, setPostCommentShown] = React.useState(true);
  // const [openModal, setOpenModal] = React.useState(true);

  const postCommentRef = React.useRef(null);

  // Autofocusing comment input (so it closes on escape press as well as better UX)

  const commentInput = React.useCallback(
    (inputElement) => {
      if (inputElement) {
        inputElement.focus();
      }
    },
    [props.commentPost]
  );

  function handleEscape() {
    props.setCommentPost(false);
  }
  React.useEffect(() => {
    document.addEventListener("click", handleClick, true);
  }, []);

  function handleChange(e) {
    setCommentText(e.target.value);
  }
  function handleClick(e) {
    if (!postCommentRef.current.contains(e.target)) {
      props.setCommentPost(false);
    }
  }
  function handleKeyDown(e) {
    if (e.key == "Escape") {
      e.preventDefault();
      handleEscape();
    } else if (e.key == "Enter") {
      e.preventDefault();
      handleSend();
    }
  }
  function handleSend() {
    props.addComment(commentText, true, props.parentId);
    props.setCommentPost(false);
  }
  return (
    <div
      className="modal-container"
      style={{ display: props.commentPost ? "flex" : "none" }}
    >
      <div className="post-comment-container" ref={postCommentRef}>
        <p className="commenting">Commenting {props.opName}'s post</p>
        <button
          onClick={() => {
            handleEscape();
          }}
          className="close-modal"
        >
          X
        </button>
        <input
          ref={commentInput}
          className="comment-text"
          placeholder="Any comments?"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
    </div>
  );
}
// 1) Filter the feedTweets state array to find the parent tweet with props.id
// 2) Make a copy the feedTweets array and modify the property we want (comments, in this case) on the filtered tweet.
// 3) Use setFeedTweets to update feedTweets with our new, modified array. Should re-render the necessary UI elements
