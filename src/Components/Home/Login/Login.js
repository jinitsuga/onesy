import React from "react";

export default function Login(props) {
  const [userName, setUserName] = React.useState("");

  function handleChange(e) {
    setUserName(e.target.value);
  }

  return (
    <div
      className="login"
      style={props.userLoggedIn ? { display: "none" } : { display: "block" }}
    >
      <h3 className="login-title">Log in anonymously: </h3>
      <form>
        <label htmlFor="name">
          <input
            className="name-input"
            placeholder="Your name"
            onChange={handleChange}
          ></input>
        </label>
        <button
          className="login-button"
          onClick={(e) => {
            e.preventDefault();
            props.userLogin(userName);
          }}
        >
          Log in!
        </button>
      </form>
    </div>
  );
}
