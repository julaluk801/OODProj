import React, { useContext, useState, useEffect } from "react"
import { auth } from "../config/firebase"
import firebase from "firebase/app";
import "firebase/database";
import moment from "moment"

const AuthContext = React.createContext();
var database = firebase.database();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function SignupReviewer(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
    .then(function(data){
      // console.log('uid',data.user.uid)
      database.ref('users/' + data.user.uid).set({
          uid: data.user.uid,
          email: email,
          password: password,
          Fname: '',
          Lname: '',
          role: {
              reviewer: true,
              admin: false,
              owner: false
          },
          profileIMG: 'https://firebasestorage.googleapis.com/v0/b/ood-proj.appspot.com/o/images%2Fuser.png?alt=media&token=175e4c4e-e853-40b0-8649-00ff4cb9191d',
          IDCard: null,
          LoginDate: moment().format("DD-MM-YYYY hh:mm:ss")
      })
      //Here if you want you can sign in the user
    }).catch(function(error) {
        //Handle error
    });
  }
  
  function SignupOwner(email, password, IDCardIMG) {
    return auth.createUserWithEmailAndPassword(email, password)
    .then(function(data){
      // console.log('uid', data.user.uid)
      database.ref('users/' + data.user.uid).set({
          uid: data.user.uid,
          email: email,
          password: password,
          Fname: '',
          Lname: '',
          role: {
              reviewer: false,
              admin: false,
              owner: true
          },
          profileIMG: 'https://firebasestorage.googleapis.com/v0/b/ood-proj.appspot.com/o/images%2Fuser.png?alt=media&token=175e4c4e-e853-40b0-8649-00ff4cb9191d',
          IDCard: IDCardIMG,
          LoginDate: moment().format("DD-MM-YYYY hh:mm:ss")
      })
      //Here if you want you can sign in the user
    }).catch(function(error) {
        //Handle error
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
      .then(function(data) {
          database.ref("users").child(data.user.uid).update({"LoginDate": moment().format("DD-MM-YYYY hh:mm:ss")})
          database.ref('/users/' + data.user.uid).once('value').then((snapshot) => {
            localStorage.setItem('admin', snapshot.val().role.admin)
            localStorage.setItem('reviewer', snapshot.val().role.reviewer)
            localStorage.setItem('owner', snapshot.val().role.owner)
            localStorage.setItem('emaillogin', email)
        })
        // database.ref("users").child(data.user.uid).update({"LoginDate": moment().format("DD-MM-YYYY hh:mm:ss")})
        // localStorage.setItem('admin', database.ref("users").child(data.user.uid).child("role").child("admin"))
        // localStorage.setItem('owner', database.ref("users").child(data.user.uid).child("role").child("owner"))
        // localStorage.setItem('reviewer', database.ref("users").child(data.user.uid).child("role").child("reviewer"))
        // localStorage.setItem('emaillogin', email)
      }
    )
  }

  function logout() {
    return auth.signOut().then(localStorage.clear())
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function updateFname(uid, Fname) {
    database.ref("users").child(uid).update({"Fname": Fname})
  }

  function updateLname(uid, Lname) {
    // const user = firebase.auth().currentUser;
    database.ref("users").child(uid).update({"Lname": Lname})
  }

  function updateProfileIMG(uid, img) {
    database.ref("users").child(uid).update({"profileIMG": img})
  }

  function updateIDCardIMG(uid, img) {
    database.ref("users").child(uid).update({"IDCard": img})
  }

  function getOwner(uid){
    return database.ref("users").child(uid).child("role").child("owner")
  }

  function getReviewer(uid){
    return database.ref("users").child(uid).child("role").child("reviewer")
  }
  function getAdmin(uid){
    return database.ref("users").child(uid).child("role").child("admin")
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    SignupOwner,
    SignupReviewer,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateFname,
    updateLname,
    updateProfileIMG,
    updateIDCardIMG,
    getOwner,
    getAdmin,
    getReviewer
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
