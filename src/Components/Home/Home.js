import React from "react";
import Login from "./Login/Login";
import Personal from "./Header/Personal";
export default function Home(props) {
  return (
    <section className="home">
      <Login userLogin={props.userLogin} userLoggedIn={props.userLoggedIn} />
      <Personal userLoggedIn={props.userLoggedIn} userData={props.userData} />
    </section>
  );
}
