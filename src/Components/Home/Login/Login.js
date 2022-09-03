import React from "react";
import "./Login.css";
export default function Login(props) {
  const [userName, setUserName] = React.useState("");
  const [userBio, setUserBio] = React.useState("");

  function handleKeyDown(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      props.userLogin(userName, userBio);
    }
  }
  // state handling functions --->
  function handleUserName(e) {
    setUserName(e.target.value);
  }
  function handleBio(e) {
    setUserBio(e.target.value);
  }
  return (
    <div
      className="login"
      style={props.userLoggedIn ? { display: "none" } : { display: "block" }}
    >
      <h3 className="login-title">Log in anonymously: </h3>
      <form className="login-form">
        <label htmlFor="name">
          Please include your name:
          <input
            autoFocus
            className="name-input"
            placeholder="Your name"
            onChange={handleUserName}
          ></input>
        </label>
        <label htmlFor="login-bio">
          Include some info about yourself! :) (or don't):
          <input
            className="bio-input"
            placeholder="e.g: I like long walks on the beach and lemon pie"
            onChange={handleBio}
            onKeyDown={handleKeyDown}
          ></input>
        </label>
        <button
          className="login-button"
          onClick={(e) => {
            e.preventDefault();
            props.userLogin(userName, userBio);
          }}
        >
          Log in!
        </button>
      </form>
    </div>
  );
}
