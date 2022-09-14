import React from "react";
import "./Personal.css";
export default function Personal(props) {
  // Personal info / "Header" component at the top of the application

  return (
    <div className="personal-display">
      <header></header>
      <div
        className="personal-info"
        style={props.userLoggedIn ? { display: "block" } : { display: "none" }}
      >
        <div className="personal-data">
          <img className="profile-pic" href={props.userData.avatar}></img>
          <h3 className="username"> {props.userData.name} </h3>
          <p className="bio"> {props.userData.bio} </p>
          <div className="details">
            <span className="following-number">
              {" "}
              Following: {props.userData.following.length}{" "}
            </span>
            <span className="location"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
