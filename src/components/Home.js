import React, { Component } from 'react';
import firebase from '../config/firebase';
import _ from 'lodash';
import style from './style.css'

import { Button , Navbar , Nav , NavDropdown , FormControl , Form , Alert } from 'react-bootstrap';
import Restaurants from './Order'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import NavbarLogin from './NavbarLogin';
import NavbarLogout from './NavbarLogout';
import { left } from 'trim';

const TypeOfFoodOptions = [
    { value: '0', label: 'ทั่วไป' },
    { value: '1', label: 'มังสวิรัต' },
    { value: '2', label: 'เจ' },
    { value: '3', label: 'อิสลาม' },
  ];
  
  const TypeOfResOptions = [
    { value: '0', label: '-' },
    { value: '1', label: 'ตามสั่ง' },
    { value: '2', label: 'ปิ้งย่าง' },
    { value: '3', label: 'ชาบูหม้อไฟ' },
    { value: '4', label: 'บุฟเฟ่ต์' },
    { value: '5', label: 'คาเฟ่' },
    { value: '6', label: 'บริการตัวเอง' },
    { value: '7', label: 'ร้านเบเกอรี่' },
    { value: '8', label: 'ร้านอาหารทะเล' },
  ];
  const TypeOfServiceOptions = [
    { value: '0', label: '-' },
    { value: '1', label: 'รับกลับบ้าน' },
    { value: '2', label: 'ทานที่ร้าน' },
    { value: '3', label: 'กลับบ้านและนั่งทานร้าน' },
  ];
  const TypeOfCountryFoodOptions = [
    { value: '0', label: '-' },
    { value: '1', label: 'ไทย' },
    { value: '2', label: 'ญี่ปุ่น' },
    { value: '3', label: 'จีน' },
    { value: '4', label: 'อินเดีย' },
  ];
  const DayOptions = [
    { value: '0', label: 'Monday' },
    { value: '1', label: 'Tuesday' },
    { value: '2', label: 'Wednesday' },
    { value: '3', label: 'Thursday' },
    { value: '4', label: 'Friday' },
    { value: '5', label: 'Saturday' },
    { value: '6', label: 'Sunday' },
  ];
  const Time_Open = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
  ];
  const Time_Close= [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
  ];
  /////////Option Selection////////////////
  
  class Home extends Component {
  
    constructor(props){
      super(props);
      this.InputName = this.InputName.bind(this);
      this.SearchByName = this.SearchByName.bind(this);
      this.state = {
        hello:"Hello World",
        Rester:[],          // firebase เอาไว้ loop
        ResterList:[],      // แสดงตาม firebase origin
        message: '',
  
        TypeOfFoodOptions:'',
        TypeOfResOptions:'',
        TypeOfServiceOptions:'',
        TypeOfCountryFoodOptions:'',
  
      }
      
  
    }
  
    componentDidMount(){
      const ResRef = firebase.database().ref('Restaurants');
      ResRef.on('value', snapshot => {
        this.SelectData(snapshot.val());
      });
    }
  
    SelectData(values){
      let res = values;
      let res_ = _(res).keys().map(messageKey => {
                            let cloned = _.clone(res[messageKey]);
                            cloned.key = messageKey;
                            return cloned;
                        }).value();
      // console.log("Hello World",res_[0].Name);                                      // วิธีดึงข้อมูลมาจาก object
      this.setState({
        Rester: res_ ,
        ResterList: res_                                                            // กำหนดการแสดงผลรอบแรกให้แสดงทุกหน้าร้านที่มีอยู่ภายในระบบทันที
      });
   
    
    };
  
    InputName(e){
      this.setState({
        message: e.target.value
      });
    }
  
    SearchByName(e){
      // console.log("hello message",this.state.message)
      var temp = [];
      for (let i in this.state.Rester){
        // console.log(this.state.Rester[i].Name)
        if (this.state.Rester[i].Name.includes(this.state.message)){          // list origin ที่ประกอบด้วย message มีไหม
          // console.log(this.state.Rester[i].Name)
          temp.push(this.state.Rester[i])
        }
      };
      this.setState({
        ResterList : temp,
        message: "",
      })
    }
    
    SelectTypeOfFood = (e) => {
      // console.log("Heellooo~!!OKPKPDKJAPSDI",e.target.value)
      this.setState({
        TypeOfFoodOptions: e.target.value,
      })
    }
  
    SelectTypeOfRes = (e) => {
      // console.log("Heellooo~!!OKPKPDKJAPSDI",e.target.value)
      this.setState({
        TypeOfResOptions: e.target.value,
      })
    }
  
    SelectTypeOfSer = (e) => {
      this.setState({ 
        TypeOfServiceOptions: e.target.value,
      })
    }
  
    SelectTypeOfCount = (e) => {
      this.setState({
        TypeOfCountryFoodOptions: e.target.value,
      })
    }
    
    SearchResOfChoice = () => {
      for (let i in this.state.Rester){
        console.log("Rester[i] :",this.state.Rester[i].TypeofFood.label)
        if (this.state.TypeOfFoodOptions != "" &&  (this.state.Rester[i].TypeofFood.label.includes(this.state.TypeOfFoodOptions) ) 
        && (this.state.TypeOfResOptions != "" && this.state.Rester[i].TypeOfResOptions.includes(this.state.TypeOfResOptions))
        && (this.state.TypeOfServiceOptions != "" && this.state.Rester[i].TypeofService.includes(this.state.TypeOfServiceOptions))
        && (this.state.TypeOfCountryFoodOptions != "" && this.state.Rester[i].TypeofRes.includes(this.state.TypeOfCountryFoodOptions))
        ){          // list origin ที่ประกอบด้วย message มีไหม
          console.log(i)
        }
      };
    }
  
    ClearSearchName = () =>{
      this.setState({
        message: "",
      })
    }

    navbar() {
      const user = firebase.auth().currentUser;
      if (user != null){
        return <NavbarLogout/>
      } else {
        return <NavbarLogin/>
      }
    }
  
    render() {
      let listRester = this.state.ResterList.map((res) => {
        if ({res}){
          return (
            <div class="card" style={{height:"200px"}} >
                        <div style={{float: "left"}}>
                          <img style={{
                            width:"150px",
                            height:"143px",
                            float: "left"}} 
                            src={res.picture}
                            >
                            </img>
                            <div class="card2">
                              {/* <Link to='/orders' rid={res.key}>{res.Name}</Link>  href ใส่ลิงค์เก้า */}
                              <a href={"/orders/" + res.key}>{res.Name}</a>
                              <p>@Address : {res.Address}</p>
                              {/* <p>Open [Time] : {res.Time_Open.value} to {res.Time_Close.value}</p> */}
                            </div>
                        </div>
            </div> 
          )
        }
        return(
          <p>No result you looking for</p>
        )
        
      });
      
      return(
        <div>
            <this.navbar/>
          <div className="mask">
            <div class="header">
  {/* Input name to search */}
  
              <form  onSubmit={this.handleSubmit}>
                <div className="card3">
                <FormControl 
                
                onChange={this.InputName} // InputName
                type="text" 
                placeholder="ใส่ชื่อร้านอาหาร ex. ข้าวขาหมู, ต้มเล้งเตี้ย" 
                aria-label="Name" 
                aria-describedby="basic-addon1" 
                className="mr-sm-2" 
                value={this.state.message}
                />
                </div>
                 
                <Button variant="outline-danger" onClick={this.ClearSearchName}>Clear</Button> <Button variant="outline-success"  onClick={this.SearchByName} >Search</Button>
              </form>
  
  {/* Input name to search */}          
            </div>
            <div class="row">
  
              <div class="leftcolumn">
                <div class="card">
                  <h5>Latest update : </h5>
  
  
  {/* From show list of res */}
                <div>
                  {listRester}
                </div>
  {/* From show list of res */}
                  <br></br>
                  
                </div>
              </div>
              <div class="rightcolumn">
                    <div className="card">
                    <h2>ตัวเลือกเสริม</h2>
                      
                      <div className="from-check">
                        {/* name ทำให้เลือก choice ทับกันไม่ได้ */}
                        <input type="radio" value="ทั่วไป" name="choice1" onChange={this.SelectTypeOfFood}/> ทั่วไป<br></br>       
                        <input type="radio" value="เจ" name="choice1" onChange={this.SelectTypeOfFood}/> เจ<br></br>
                        <input type="radio" value="มังสวิรัติ" name="choice1" onChange={this.SelectTypeOfFood}/> มังสวิรัติ<br></br>
                        <input type="radio" value="อิสราม" name="choice1" onChange={this.SelectTypeOfFood}/> อิสราม<br></br>
                      
                      </div>
  
                    <div class="form-check">
                      <br></br>
                    <label for="exampleFormControlSelect1" >ประเภทร้านอาหาร</label>
                    <select class="form-control" id="exampleFormControlSelect1" onChange={this.SelectTypeOfRes} >
                      <option value="-" >-</option>
                      <option value="ตามสั่ง" >ตามสั่ง</option>
                      <option value="ปิ้งย่าง" >ปิ้งย่าง</option>
                      <option value="ชาบูหม้อไฟ" >ชาบูหม้อไฟ</option>
                      <option value="บุฟเฟ่ต์" >บุฟเฟ่ต์</option>
                      <option value="คาเฟ่" >คาเฟ่</option>
                      <option value="บริการตนเอง" >บริการตนเอง</option>
                      <option value="ร้านเบเกอรี่">ร้านเบเกอรี่</option>
                      <option value="ร้านอาหารทะเล" >ร้านอาหารทะเล</option>
                    </select>
                    </div>
                   
                    <div class="form-check">
                    <br></br>
                    <label for="exampleFormControlSelect1">ประเภทการให้บริการร้านอาหาร</label>
                    <select class="form-control" id="exampleFormControlSelect1" onChange={this.SelectTypeOfSer}>
                      <option value="-" >-</option>
                      <option value="รับกลับบ้าน" >รับกลับบ้าน</option>
                      <option value="ทานที่ร้าน" >ทานที่ร้าน</option>
                      <option value="กลับบ้านและนั่งทานร้าน" >กลับบ้านและนั่งทานร้าน</option>
                    </select>
                    </div>
  
                    <div class="form-check">
                    <br></br>
                    <label for="exampleFormControlSelect1">สัญชาติร้านอาหาร</label>
                    <select class="form-control" id="exampleFormControlSelect1" onChange={this.SelectTypeOfCount}>
                      <option value="-">-</option>
                      <option value="ไทย">ไทย</option>
                      <option value="ญี่ปุ่น">ญี่ปุ่น</option>
                      <option value="จีน">จีน</option>
                      <option value="อินเดีย">อินเดีย</option>
                    </select>
                    
                    </div>
                    
                    
                    <br></br>
                      <Button variant="success" onClick={this.SearchResOfChoice} >Search</Button>
                    </div>
  
  
              </div>
  
            </div>
  
          </div>
        </div>
        )
    }
  }
export default Home;