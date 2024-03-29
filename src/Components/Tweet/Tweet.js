import React from "react";
import "./Tweet.css";
import PostComment from "./Comment/PostComment";

// Get the tweets from users followed by client

export default function Tweet(props) {
  const [shownComments, setShownComments] = React.useState(false);
  const [commentsFeed, setCommentsFeed] = React.useState([]);
  const [tweetLiked, setTweetLiked] = React.useState(false);
  const [commentPost, setCommentPost] = React.useState(false);

  const tweetRef = React.useRef(null);
  function handleLike() {
    setTweetLiked(true);
  }

  React.useEffect(() => {
    document.addEventListener("click", handleClick, true);
  }, []);

  function handleClick(e) {
    if (!tweetRef.current.contains(e.target)) {
      setShownComments(false);
    } else {
      if (props.comments[0] !== undefined) {
        setShownComments(true);
        logComments();
      }
    }
  }
  function enableCommentPost() {
    setCommentPost(true);
  }

  // Show comments on click
  function logComments() {
    if (props.comments !== "") {
      const comments = props.comments.map((comment) => (
        <Tweet
          name={comment.name}
          text={comment.text}
          id={comment.id}
          date={comment.date}
          comments={comment.comments}
          likes={comment.likes}
          key={comment.key}
          likeTweetDb={props.likeTweetDb}
          likeTweet={props.likeTweet}
        />
      ));

      setCommentsFeed(comments);
    }
  }
  return (
    <div className="tweet" id={props.id} ref={tweetRef} onClick={handleClick}>
      <div className="tweet-userinfo">
        <img className="tweet-avatar" src={props.avatar}></img>
        <h4 className="tweet-username">{props.name}</h4>
      </div>
      <p className="tweet-text"> {props.text} </p>
      <span className="tweet-date"> {props.date} </span>
      <div className="tweet-details" id={props.id}>
        {/* <span className="comments-number">
          Comments: {props.comments.length}
        </span> */}
        <span className="tweet-likes"> Likes: {props.likes} </span>
        <button
          disabled={tweetLiked ? true : false}
          style={{ display: tweetLiked ? "none" : "" }}
          className="like-tweet"
          onClick={(e) => {
            e.preventDefault();
            handleLike();
            props.likeTweet(e.target.parentElement.id);
          }}
        >
          Like this tweet
        </button>
        <button className="comment-tweet" onClick={enableCommentPost}>
          Comment
        </button>
      </div>

      <PostComment
        opName={props.name}
        feedTweets={props.feedTweets}
        setFeedTweets={props.setFeedTweets}
        addComment={props.addComment}
        parentId={props.id}
        refreshFeed={props.refreshFeed}
        setCommentPost={setCommentPost}
        commentPost={commentPost}
      />

      <div
        className="comments-container"
        style={
          shownComments
            ? { display: "block", border: "solid 1px" }
            : { display: "none", border: "none" }
        }
      >
        {" "}
        {commentsFeed}{" "}
      </div>
    </div>
  );
}
