import React from "react";
import "./Suggested.css";

export default function Suggested(props) {
  // This useEffect will make one extra query to the DB - Later fix
  React.useEffect(() => {
    props.getSuggested();
  }, [props.userLoggedIn]);

  console.log(props.suggestedUsers);
  const suggested = props.suggestedUsers.map((user) => {
    return (
      <div className="suggested-user" key={user.data.random} id={user.id}>
        <button
          onClick={(e) => {
            props.followUser(e.target.parentElement.id);
          }}
          className="follow-user"
        >
          Follow
        </button>
        <h3>{user.data.metadata.name}</h3>
        <img className="user-avatar" src={user.data.metadata.avatar}></img>
      </div>
    );
  });
  return <div className="suggested"> {suggested} </div>;
}
