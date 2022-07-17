import React from "react";
import Login from "./Login/Login";
export default function Home(props) {
  return (
    <section className="home">
      <Login userLogin={props.userLogin} userLoggedIn={props.userLoggedIn} />
    </section>
  );
}
