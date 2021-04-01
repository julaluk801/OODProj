import React from "react"
import { Route, Redirect } from "react-router-dom"
// import firebase from "firebase/app";
import "firebase/database";
// import { useAuth } from "../contexts/AuthContext"

export default function PrivateAdmin({ component: Component, ...rest }) {
  const admin = localStorage.getItem('admin');
    
  // if (currentUser != null) {
  //   owner = getOwner(user.uid)
  // }

return (
  <Route
    {...rest}
    render={props => {
      return admin ? <Component {...props} /> : <Redirect to="/" />
    }}
  ></Route>
)
}