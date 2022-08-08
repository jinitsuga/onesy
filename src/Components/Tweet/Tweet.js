import React from "react";
import "./Tweet.css";

// Get the tweets from users followed by client

export default function Tweet(props) {
  const [shownComments, setShownComments] = React.useState(false);
  const [commentsFeed, setCommentsFeed] = React.useState([]);

  // Show comments on click
  function logComments() {
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
        />
      ));
      console.log(props.comments);
      setCommentsFeed(comments);
    }
  }
  return (
    <div className="tweet" id={props.id} onClick={logComments}>
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
          className="like-tweet"
          onClick={(e) => {
            e.preventDefault();
            console.log(e.target.parentElement.id);
            props.likeTweet(e.target.parentElement.id);
          }}
        >
          Like this tweet
        </button>
      </div>
      <div className="comments-container"> {commentsFeed} </div>
    </div>
  );
}
