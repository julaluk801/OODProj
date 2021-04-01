import React, { Component } from 'react';
import './App.css';
// Router
// import { BrowserRouter, Route, Link, Router, Redirect } from 'react-router-dom';
//import Components and Pages
// import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Order from './components/Order'
//หน้าแอปส่วนหลักในการทำการ Route และrender หน้า
//จากดวงพร
// import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import SetRole from "./components/SetRole";
import SignupOwner from "./components/SignupOwner";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import UpdateProfileOwner from "./components/UpdateProfileOwner"
import PrivateReviewer from "./components/PrivateReviewer";
import PrivateOwner from "./components/PrivateOwner";
import PrivateAdmin from "./components/PrivateAdmin";
import RestaurantList from "./components/RestaurantList"
import Register from "./components/Register";
import Showdetail from "./components/Showdetail";
import SubmitPic from "./components/SubmitPic";
import EditPic from "./components/EditPic";
import Res from "./components/Res";
import ApprovalList from "./components/ApprovalList";
import ResOwnerList from "./components/ResOwnerList";
import ResRegistInfo from "./components/ResRegistInfo";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

// import firebase from './config/firebase'
import _ from 'lodash';

class App extends Component {

  render() {
  return (
    <AuthProvider>
      {/* <Container> */}
        <div>
          <Router>
            <AuthProvider>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/orders/:rid" component={Order} />
                <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
                <PrivateReviewer path="/update-profile" component={UpdateProfile}></PrivateReviewer>
                <PrivateOwner path="/RestaurantList" component={RestaurantList}></PrivateOwner>
                <PrivateOwner path="/update-profile-owner" component={UpdateProfileOwner}></PrivateOwner>
                <Route path="/signupReviewer" component={Signup}></Route>
                <Route path="/signupOwner" component={SignupOwner}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/Res" component={Res}></Route>
                <Route path="/SetRole" component={SetRole}></Route>
                <Route path="/forgot-password" component={ForgotPassword}></Route>
                <Route path="/Register" component={Register}></Route>
                <Route path="/Showdetail" component={Showdetail}></Route>
                <Route path="/SubmitPic" component={SubmitPic}></Route>
                <Route path="/EditPic" component={EditPic}></Route>
                <PrivateAdmin path="/approval" component={ApprovalList}></PrivateAdmin>
                <PrivateAdmin path="/resown/:uid/:owner" component={ResOwnerList}></PrivateAdmin>
                <PrivateAdmin path="/resregis/:uid/:owner/:key" component={ResRegistInfo} ></PrivateAdmin>
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      {/* </Container> */}
  </AuthProvider>
  )
}
}
export default App;






