import React from "react";
import "./Suggested.css";

export default function Suggested(props) {
  // This useEffect will make one extra query to the DB - Later fix
  React.useEffect(() => {
    props.getSuggested();
  }, [props.followedUsers]);

  console.log(props.suggestedUsers);
  const suggested = props.suggestedUsers.map((user) => {
    return (
      <div className="suggested-user" key={user.data.random} id={user.id}>
        <button
          onClick={(e) => {
            props.followUser(e.target.parentElement.id);
            props.setUpdatedFeed((oldFeed) => {
              return !oldFeed;
            });
          }}
          className="follow-user"
        >
          Follow
        </button>
        <div className="user-info">
          <h3>{user.data.metadata.name}</h3>
          <img className="user-avatar" src={user.data.metadata.avatar}></img>
        </div>
      </div>
    );
  });
  return (
    <div className="suggested">
      <h3 className="suggested-title">Random users you may know</h3>
      {suggested}
    </div>
  );
}
