import React from "react"
import { Route, Redirect } from "react-router-dom"
// import firebase from "firebase/app";
import "firebase/database";
// import { useAuth } from "../contexts/AuthContext"

export default function PrivateOwner({  component: Component, ...rest }) {
    // const user = firebase.auth().currentUser;
    // const ref = firebase.database().ref("users/" + user.uid);
    // const [owner, setOwner] = useState("")
    // const { currentUser, getOwner } = useAuth()
    const owner = localStorage.getItem('owner');
    console.log(owner)
    // if (currentUser != null) {
    //   owner = getOwner(user.uid)
    // }

  return (
    <Route
      {...rest}
      render={props => {
        return owner ? <Component {...props} /> : <Redirect to="/" />
      }}
    ></Route>
  )
}