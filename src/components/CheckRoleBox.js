import React, {Component, useState} from 'react';
import firebase from '../config/firebase'
// import fb from "firebase/app";
// import MessageList from './MessageList'
import MessageBox from './MessageBox'
import fb from "firebase/app";
import "firebase/database";

export default function CheckRoleBox(props) {
    const user = firebase.auth().currentUser;
    const [reviewer, setReviwer] = useState()
 
    
    var db = fb.database().ref('users/' + user.uid);
    db.once('value').then((snapshot) => {
        console.log('role',snapshot.val())
        setReviwer(snapshot.child("role").child("reviewer").val())
    })

    if (reviewer === true) {
        return(
        <MessageBox db={firebase} rid={props.rid}/>
        )
    }
    else{
        return (null)
    }


}