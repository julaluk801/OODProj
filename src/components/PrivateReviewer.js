import React from "react"
import { Route, Redirect } from "react-router-dom"
// import firebase from "firebase/app";
import "firebase/database";
// import { useAuth } from "../contexts/AuthContext"

export default function PrivateReviwer({ component: Component, ...rest }) {
  const reviewer = localStorage.getItem('reviewer');
    
  // if (currentUser != null) {
  //   owner = getOwner(user.uid)
  // }
console.log(reviewer)

return (
  <Route
    {...rest}
    render={props => {
      return reviewer ? <Component {...props} /> : <Redirect to="/" />
    }}
  ></Route>
)
}