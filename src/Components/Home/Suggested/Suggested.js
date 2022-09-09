import React from "react";

export default function Suggested(props) {
  props.getSuggested();
  // Pulling non followed users using the newly added 'random' property on each user in the database.

  // Filter already followed users out of the possibilities
  // Generate random number
  // Get user according to generated random number
  // Form the promise with 3-4 users and make the query
  return <div className="suggested"></div>;
}
