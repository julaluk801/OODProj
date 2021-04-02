import React, { Component, useState} from "react";
import firebase from '../config/firebase';
import _ from 'lodash';
// import { Button , Navbar , Nav , NavDropdown , FormControl , Form , Alert } from 'react-bootstrap';
import NavbarLogout from "./NavbarLogout"
//import './style.css'
import './ResRegistInfo.css'
class ApprovalList extends Component {
// class ResOwnerList extends Component {
  constructor(props){
    super(props);
    this.state = {
      hello:"Hello World",
      users:[],
      Restaurants:[],
      userList:[],     
      resList:[],
    }
  }
    
  async showListRequest(){
    const userRef = firebase.database().ref('users');
    var shapshotuser = await userRef.once('value');
    this.SelectData(shapshotuser.val());


    const resRef = firebase.database().ref('Restaurants');
    var resshapshot = await resRef.once('value');
    this.SelectDataRes(resshapshot.val());


    var templist = [];
    for(var i in this.state.users){
      if(this.state.users[i].role.owner === true){
        var countRes =0;
        if(this.state.users[i].Fname == ""){
          for(var j in this.state.Restaurants){
            if((this.state.Restaurants[j].uid === this.state.users[i].uid) && this.state.Restaurants[j].status != true){
              countRes++;
            }
          }
          if(countRes!==0){
            templist.push({uid: this.state.users[i].uid, owner: "None", countRes: countRes})
          }
        }  
          
        else{
          for(var j in this.state.Restaurants){
            if((this.state.Restaurants[j].uid === this.state.users[i].uid) && this.state.Restaurants[j].status != true){
              countRes++;
            }
          }
          if(countRes!==0){
            templist.push({uid: this.state.users[i].uid, owner: this.state.users[i].Fname+" "+  this.state.users[i].Lname, countRes: countRes})
          }

        }
        
      }

    };
    this.setState({
      userList : templist,
    })
    //console.log(templist)
    
  }

  SelectData(values){
    let user = values;
    let user_ = _(user).keys().map(messageKey => {
                          let cloned = _.clone(user[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      }).value();
                      console.log("first")
    this.setState({
      users: user_,
    });
  };

  SelectDataRes(values){
    let res = values;
    let res_ = _(res).keys().map(messageKey => {
                          let cloned = _.clone(res[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      }).value();
                      console.log("second")
    this.setState({
      Restaurants: res_,

      });
      console.log("res",res_)
      // this.ewrwe()
      
    };

    render() {
        let userNodes = this.state.userList?.map((user) => {
          return (
          <tr>
            <td>{user.owner}</td>
            <td>{user.countRes}</td>
            <td>
              <a href={"/resown/"+ user.uid+"/"+user.owner} >ดูร้านอาหาร</a></td>
          </tr>
          )
        });
        return (
          <>
          <div>
            <NavbarLogout/>
            <div/>
              <br></br>
              <div class='container'>
                <div>
                  <div class="headerapp" style={{marginTop:10}}>
                    <h5>รายการคำร้องขออนุมัติร้านอาหาร</h5>
                  </div>
                  <table className="table table-sm table-bordered">
                    <tr className="thead-dark">
                      <th width="20%">ชื่อเจ้าของร้าน</th>
                        <th width="20%">ชื่อร้านอาหาร</th>
                        <th width="20%">รายการร้านอาหาร</th>
                    </tr>
                    {userNodes}
                  </table>
                </div>
            </div>
          </div>
          </>

        )
    }

}

export default ApprovalList;
