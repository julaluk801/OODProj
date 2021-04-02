import firebase from '../config/firebase'
import React, { Component, useState} from "react";
import _ from 'lodash';
import "./ResRegistInfo.css"

import NavbarLogout from "./NavbarLogout"
import { Button , Navbar , Nav , NavDropdown , FormControl , Form , Alert } from 'react-bootstrap';

class ResRegistInfo extends Component {
  constructor(props){
      super(props);
      this.state = {
          Resinfo:[],
          usercard: null,
      };
  }

  sendingRequest(){
    let app = firebase.database().ref('Restaurants/'+ this.props.match.params.key);
        app.on('value', snapshot => {
            console.log(snapshot.val());
            
            this.setState({
        Resinfo: snapshot.val()
      });
    });

    console.log("res", this.state.Resinfo)

    let card = firebase.database().ref('users/'+ this.props.match.params.uid);
        card.on('value', snapshot => {
            console.log("img", snapshot.val());
            
           this.setState({
            usercard: snapshot.val().IDCard
      });
    });
    
  }
  render() {
      

    return (
        <>
          <div>
          <NavbarLogout/>
                  <br></br>
                  
                  <div class='containerres'>
                    <br></br>
                    <div className="parent" style={{textAlign:'left'}}>
                      <div className = "info">
                        <div>
                          <p><h5>ข้อมูลเจ้าของร้าน</h5></p>
                        </div>
                        
                        <p>Owner Name: {this.props.match.params.owner}</p>
                        <p>Restaurants Name: {this.state.Resinfo?.Name}</p>
                        <p>Address: {this.state.Resinfo?.Address}</p>
                        <p>Branch: {this.state.Resinfo?.Branch}</p>
                        {/* <p>Day: {this.state.Resinfo?.Day..lable}</p> */}
                        <p>Email: {this.state.Resinfo?.Email} </p>
                        <p>Facebook: {this.state.Resinfo?.Facebook}</p>
                        <p>Line: {this.state.Resinfo?.Line}</p>
                        <p>Phone: {this.state.Resinfo?.Phone}</p>
                        <p>Price: {this.state.Resinfo?.Price} ฿</p>
                        <p>Time Open-Close: {this.state.Resinfo?.Time_Open?.label} - {this.state.Resinfo?.Time_Close?.label}</p>
                        <p>Type of Country Food: {this.state.Resinfo?.TypeofCountryFood?.label}</p>
                        <p>Type of Food: {this.state.Resinfo?.TypeofFood?.label}</p>
                        <p>Type of Res: {this.state.Resinfo?.TypeofRes?.label}</p>
                        <p>Type of service: {this.state.Resinfo?.TypeofService?.label}</p>
                      </div>
                      <div className="info2">
                        <img src={this.state.usercard || 'http://via.placeholder.com/350x250'} alt="Uploaded images" height="250" width="350"></img>
                      </div>
                        {/* <button style={{margin:10}} onClick={this.handleUpdate}>อนุมัติ</button> <button type="button2" style = {{margin:10}}>ไม่อนุมัติ</button> */}
                        {/* <Button color='secondary'>
                          <Link to="/">อนุมัติ</Link>
                        </Button> */}    
                    </div>
                  </div>
                 
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                    <button type="button" class="btn btn-success" onClick={event=> window.location.href='/approval'} style={{margin:20}}>อนุมัติ</button>
                    <button type="button" class="btn btn-danger" onClick={event =>window.location.href='/approval'} style={{margin:20}}>ไม่อนุมัติ</button>

                    {/* <Button color="#841584" href="/" component={ApprovalList} style={{margin:20}}>อนุมัติ</Button> <Button color='red' href="/" component={ApprovalList} style={{margin:20}}>ไม่อนุมัติ</Button> */}
                  </div>
                  <br></br>
                  {/* <button name="approve" onClick = {this.handleUpdate(this.props.match.params)}>Approve</button><button onClick = {this.handleDisUpdate}>Disapprove</button> */}
                  {/* </div> */}
                  
              </div>
        </>

    )
  }



}

export default ResRegistInfo;