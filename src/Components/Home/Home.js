import React from "react";
import Login from "./Login/Login";
import Personal from "./Header/Personal";
import Feed from "../Feed/Feed";
export default function Home(props) {
  return (
    <section className="home">
      <Login userLogin={props.userLogin} userLoggedIn={props.userLoggedIn} />
      {props.userLoggedIn ? (
        <Personal userLoggedIn={props.userLoggedIn} userData={props.userData} />
      ) : (
        ""
      )}
    </section>
  );
}
