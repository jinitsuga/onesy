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
      if (props.comments[0] != undefined) {
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
    console.log(commentsFeed);
    if (props.comments[0] !== undefined) {
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
        <img className="tweet-avatar" href={props.avatar}></img>
        <h4 className="tweet-username">{props.name}</h4>
      </div>
      <p className="tweet-text"> {props.text} </p>
      <div className="tweet-details" id={props.id}>
        <span className="tweet-date"> {props.date} </span>
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
      {commentPost ? (
        <PostComment
          feedTweets={props.feedTweets}
          setFeedTweets={props.setFeedTweets}
          addTweetToDatabase={props.addTweetToDatabase}
          addTweetToFeed={props.addTweetToFeed}
          parentId={props.id}
        />
      ) : (
        ""
      )}
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
