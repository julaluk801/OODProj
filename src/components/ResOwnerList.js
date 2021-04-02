import React, { Component, useState} from "react";
// import { Link } from "react-router-dom";
import firebase from '../config/firebase';
// import ApprovalList from './ApprovalList'
import _ from 'lodash';
import NavbarLogout from './NavbarLogout';
import { Button , Navbar , Nav , NavDropdown , FormControl , Form , Alert } from 'react-bootstrap';

class ResOwnerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            Resonwlist:[],
        }
    }

    showResOwnerRequest(){
        let app = firebase.database().ref('Restaurants');
        app.orderByChild('uid').equalTo(this.props.match.params.uid).on("value", snapshot=> {
          console.log('Hello world',snapshot.val());
          this.getData(snapshot.val());
        });
    }

    getData(values){
        let messagesVal = values;
        let messages = _(messagesVal).keys().map(messageKey => {
                              let cloned = _.clone(messagesVal[messageKey]);
                              cloned.key = messageKey;
                              return cloned;
                          }).value();
        this.setState({
          Resonwlist: messages
        });
        console.log("mess", messages)
    }

    render() {
        var resNodes = this.state.Resonwlist?.map((res) => {
            return (
            <tr>
              <td>{res.SubmitDate}</td>
              <td>{res.Name}</td>
              <td>
                <a href={"/resregis/" + this.props.match.params.uid +'/'+this.props.match.params.owner + '/' + res.key} >ตรวจสอบข้อมูล</a></td>
            </tr>

            )
        });
        
        return (

            <>
                <div>
                <NavbarLogout/>
                </div>    
                    <div>
                    <div class='container' style={{marginTop: 20}}>
                    <h5>ชื่อเจ้าของร้าน: {this.props.match.params.owner} </h5>
                    <table className="table table-sm table-bordered" >
                            <tr className="thead-dark">
                            <th width="20%">วัน/เวลาที่ส่งคำร้องขอ</th>
                                <th width="20%">ชื่อร้านอาหาร</th>
                                <th width="20%">ข้อมูลการลงทะเบียน</th>
                            </tr>
                            {resNodes}
                        </table>
                    </div>
                </div>

            </>
        )
    }


}

export default ResOwnerList;