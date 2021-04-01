 
import React, { useState , Component } from "react";
import { Button } from 'react-bootstrap';
// import {firebase,storage} from '../firebase'
import firebase from "firebase/app";
import "firebase/database";
import { storage } from "../config/firebase";

import Select from 'react-select';
import moment from 'moment'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './Register.css';
/////////Option Selection////////////////


const TypeOfFoodOptions = [
  { value: '1', label: 'ทั่วไป' },
  { value: '2', label: 'มังสวิรัต' },
  { value: '3', label: 'เจ' },
  { value: '3', label: 'อิสลาม' },
];
const TypeOfResOptions = [
  { value: '1', label: 'ปิ้งย่าง' },
  { value: '2', label: 'ร้านเบเกอรี่' },
  { value: '3', label: 'ร้านอาหารทะเล' },
];

const TypeOfServiceOptions = [
  { value: '1', label: 'รับกลับบ้าน' },
  { value: '2', label: 'ทานที่ร้าน' },
  { value: '3', label: 'กลับบ้านและนั่งทานร้าน' },
];

const TypeOfCountryFoodOptions = [
  { value: '1', label: 'ไทย' },
  { value: '2', label: 'ญี่ปุ่น' },
  { value: '3', label: 'จีน' },
  { value: '4', label: 'อินเดีย' },
];
const DayOptions = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
];

const Time_Open = [
  { value: '01:00', label: '01:00' },
  { value: '02:00', label: '02:00' },
  { value: '03:00', label: '03:00' },
  { value: '04:00', label: '04:00' },
  { value: '05:00', label: '05:00' },
  { value: '06:00', label: '06:00' },
  { value: '07:00', label: '07:00' },
  { value: '08:00', label: '08:00' },
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
  { value: '17:00', label: '17:00' },
  { value: '18:00', label: '18:00' },
  { value: '19:00', label: '19:00' },
  { value: '20:00', label: '20:00' },
  { value: '21:00', label: '21:00' },
  { value: '22:00', label: '22:00' },
  { value: '23:00', label: '23:00' },
  { value: '24:00', label: '24:00' },

];
const Time_Close= [
  { value: '01:00', label: '01:00' },
  { value: '02:00', label: '02:00' },
  { value: '03:00', label: '03:00' },
  { value: '04:00', label: '04:00' },
  { value: '05:00', label: '05:00' },
  { value: '06:00', label: '06:00' },
  { value: '07:00', label: '07:00' },
  { value: '08:00', label: '08:00' },
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
  { value: '17:00', label: '17:00' },
  { value: '18:00', label: '18:00' },
  { value: '19:00', label: '19:00' },
  { value: '20:00', label: '20:00' },
  { value: '21:00', label: '21:00' },
  { value: '22:00', label: '22:00' },
  { value: '23:00', label: '23:00' },
  { value: '24:00', label: '24:00' },

];
/////////Option Selection////////////////

var getkey; // Get Restaurant_id
export function getidSubmit(){
  var idSumbit='';
}
  class home extends Component {
 
  constructor(){
     super();
     this.state = {
       
        Restaurants:[],
        rid:'',
        Name:'',
        Branch:'',
        Address:'',
        Price:'',
        Phone:'',
        Email:'',
        Facebook:'',
        Line:'',
        TypeofFood:null,
        TypeofService:null,
        TypeofCountryFood:null,
        TypeofRes:null,
        Time_Open:null,
        Time_Close:null,
        Day:null,
        statues: false,
        SubmitDate:'',
        uid:'',
        //image1
        picture:'',
        image:null,
        progress:0,
        //image2
        picture2:'',
        image2:null,
        progress2:0,
        //image3
        picture3:'',
        image3:null,
        progress3:0,
        //image4
        picture4:'',
        image4:null, 
        progress4:0,
        //image5
        picture5:'',
        image5:null, 
        progress5:0,
        //image6
        picture6:'',
        image6:null,
        progress6:0, 
        //image7
        picture7:'',
        image7:null, 
        progress7:0,
        //image8
        picture8:'',
        image8:null, 
        progress8:0,
        Rester:[]
        
     }
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)

  }
  
  componentDidMount(){
   
    const itemsRef = firebase.database().ref('Restaurants' );
    
    itemsRef.on('value',(snapshot) => {
        let Restaurants = snapshot.val();
        let newState = [];
        for(let item in Restaurants){
          newState.push({
              rid:Restaurants[item].rid,
              Name:Restaurants[item].Name,
              Branch:Restaurants[item].Branch,
              TypeofFood:Restaurants[item].TypeofFood,
              Address:Restaurants[item].Address,
              Price:Restaurants[item].Price,
              Phone:Restaurants[item].Phone,
              Email:Restaurants[item].Email,
              Facebook:Restaurants[item].Facebook,
              Line:Restaurants[item].Line,
              TypeofService:Restaurants[item].TypeofService,
              TypeofCountryFood:Restaurants[item].TypeofCountryFood,
              TypeofRes:Restaurants[item].TypeofRes,
              Day:Restaurants[item].Day,
              Time_Open:Restaurants[item].Time_Open,
              Time_Close:Restaurants[item].Time_Close,
              status:false,
              uid:Restaurants[item].uid,
              SubmitDate:Restaurants[item].SubmitDate,

              picture:Restaurants[item].picture,
              picture2:Restaurants[item].picture2,
              picture3:Restaurants[item].picture3,
              picture4:Restaurants[item].picture4,
              picture5:Restaurants[item].picture5,
              picture6:Restaurants[item].picture6,
              picture7:Restaurants[item].picture7,
              picture8:Restaurants[item].picture8,
              
              
          })
        }
        this.setState({
          Restaurants:newState
        })
    })
  }


/////////////////////////////////////Select/////////////////////////////////
  handleChange1 = TypeofFood => {
    this.setState(
      { TypeofFood },
      () => console.log(`Option selected:`, this.state.TypeofFood)
    );
  };
  handleChange2 = TypeofRes => {
    this.setState(
      { TypeofRes },
      () => console.log(`Option selected:`, this.state.TypeofRes)
    );
  };
  handleChange3 = TypeofService => {
    this.setState(
      { TypeofService },
      () => console.log(`Option selected:`, this.state.TypeofService)
    );
  };
  handleChange4 = TypeofCountryFood => {
    this.setState(
      { TypeofCountryFood },
      () => console.log(`Option selected:`, this.state.TypeofCountryFood)
    );
  };
  handleChange5 = Day => {
    this.setState(
      { Day },
      () => console.log(`Option selected:`, this.state.Day)
    );
  };
  handleChange6 = Time_Open => {
    this.setState(
      { Time_Open },
      () => console.log(`Option selected:`, this.state.Time_Open)
    );
  };
  handleChange7 = Time_Close => {
    this.setState(
      { Time_Close },
      () => console.log(`Option selected:`, this.state.Time_Close)
    );
  };
  /////////////////////////////////////Select/////////////////////////////////

  ///////////////for submit//////////////////////
  handleChange(e){
      this.setState({
        [e.target.name]: e.target.value
        
      })
  }

  handleSubmit(e){
    //ป้องกัน refresh 
    e.preventDefault();
    let check = true;



    // alert("Name Restaurant already existed!")
    if(this.state.rid != ''){
      return this.updateItem();
    }
    const itemsRef = firebase.database().ref('Restaurants')

    itemsRef.on('value',(snapshot) => {
      let Restaurants = snapshot.val();
      let newState = [];
      for(let item in Restaurants){
        newState.push({
          Name:Restaurants[item].Name,
          Branch:Restaurants[item].Branch,
          
        })
      }
      var i;
      
      for (i=0; i<newState.length;i++){
        
          if(this.state.Name == newState[i].Name || this.state.Branch == newState[i].Branch)
            if(check){
              console.log(this.state.Name)
              alert("existed")
              check=false;
              return;
            }
            return;
        }
        
    })

    console.log(check);
    if(check){
      getkey = itemsRef.push().key;
      const Restaurants = {
         rid:this.state.rid,
         Name : this.state.Name,
         Branch: this.state.Branch,
         TypeofFood : this.state.TypeofFood,
         Address:this.state.Address,
         Price:this.state.Price,
         Phone:this.state.Phone,
         Email:this.state.Email,
         Facebook:this.state.Facebook,
         Line:this.state.Line,
         status:this.state.statues,
         TypeofService:this.state.TypeofService,
         TypeofCountryFood:this.state.TypeofCountryFood,
         TypeofRes:this.state.TypeofRes,
         Time_Open:this.state.Time_Open,
         Time_Close:this.state.Time_Close,
         Day:this.state.Day,
         uid:this.state.uid,
         SubmitDate:this.state.SubmitDate,
        
         picture:this.state.picture,
         picture2:this.state.picture2,
         picture3:this.state.picture3,
         picture4:this.state.picture4,
         picture5:this.state.picture5,
         picture6:this.state.picture6,
         picture7:this.state.picture7,
         picture8:this.state.picture8,
      }
  
      
      firebase.database().ref('Restaurants/' + getkey).set(Restaurants)
      var user = firebase.auth().currentUser;
        this.setState({
          rid: '',
          Name:'',
          Branch:'',
          TypeofFood:null,
          TypeofService:null,
          TypeofCountryFood:null,
          TypeofRes:null,
          Day:null,
          Time_Open:null,
          Time_Close:null,
          Address:'',
          Price:'',
          Phone:'',
          Email:'',
          Facebook:'',
          Line:'',
          status:'',
          TypeofService:'',
          TypeofCountryFood:'',
          TypeofRes:'',
          SubmitDate:'',
          url:'',
  
          picture:'',
          picture2:'',
          picture3:'',
          picture4:'',
          picture5:'',
          picture6:'',
          picture7:'',
          picture8:'',
  
         
      })
       console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
      
      console.log(getkey)
      getidSubmit.idSubmit=getkey;
      
      firebase.database().ref('Restaurants/' + getkey).update({'uid':user.uid,'rid': getkey,'SubmitDate': moment().format('MMMM Do YYYY, h:mm:ss a')})
  
      
    }
    else{
      return;
    }

  }

////////////////////////////////////////////////////////////////////

  render() {
    const { rows, filesMetadata } = this.state;


    return (
      <div className="app">
    <div className="container" style={{marginTop:70}}>
            <div class="Registerheader">
                <h2>ลงทะเบียนร้านอาหาร</h2>
            </div>
            <br/>
          <form  onSubmit={this.handleSubmit}>

            <div className="row">
                <div className="col-8">
                  <div className="form-row">
                    <div className="col-4">
                      <label for="exampleFormControlSelect1">Name*</label>
                      <input type="text" name="Name" className="form-control" placeholder="ชื่อภาษาอังกฤษ หรือ ชื่อภาษาไทย" onChange={this.handleChange} value={this.state.Name}/>
                      <label for="exampleFormControlSelect1">Branch</label>
                      <input type="text" name="Branch" className="form-control" placeholder="ชื่อภาษาอังกฤษ หรือ ชื่อภาษาไทย" onChange={this.handleChange} value={this.state.Branch}/>
                      <label for="exampleFormControlSelect1">Address</label>
                      <textarea  type="text" name="Address" className="form-control" placeholder="Address" onChange={this.handleChange} value={this.state.Address}/>
                      <label for="exampleFormControlSelect1">Price</label>
                      <input type="text" name="Price" className="form-control" placeholder="ราคาเบื้องต้น" onChange={this.handleChange} value={this.state.Price}/>
                      <label for="exampleFormControlSelect1">Phone</label>
                      <input type="text" name="Phone" className="form-control" placeholder="ใส่ ' , ' เพื่อเพิ่มเบอร์" onChange={this.handleChange} value={this.state.Phone}/>
                      <label for="exampleFormControlSelect1">Email</label>
                      <input type="text" name="Email" className="form-control" placeholder="Email" onChange={this.handleChange} value={this.state.Email}/>
                      <label for="exampleFormControlSelect1">Facebook</label>
                      <input type="text" name="Facebook" className="form-control" placeholder="Facebook" onChange={this.handleChange} value={this.state.Facebook}/>
                      <label for="exampleFormControlSelect1">Line</label>
                      <input type="text" name="Line" className="form-control" placeholder="Line" onChange={this.handleChange} value={this.state.Line}/>
                    </div>
                    <div className="col-6">
                 
                          <label for="exampleFormControlSelect1">ประเภทอาหาร*</label>
                          
                          <Select className="selected" name="TypeofFood" value={this.state.TypeofFood} onChange={this.handleChange1} options={TypeOfFoodOptions} />

                          <label for="exampleFormControlSelect2">ประเภทร้านอาหาร*</label>
                          <Select className="selected" name="TypeofRes" value={this.state.TypeofRes} onChange={this.handleChange2} options={TypeOfResOptions} />
                            
                          <label for="exampleFormControlSelect3">ประเภทการให้บริการร้านอาหาร*</label>
                          <Select  className="selected" name="TypeofService" value={this.state.TypeofService} onChange={this.handleChange3} options={TypeOfServiceOptions} />
                            
                          <label for="exampleFormControlSelect4">สัญชาติร้านอาหาร*</label>
                          <Select className="selected" name="TypeofCountryFood" value={this.state.TypeofCountryFood} onChange={this.handleChange4} options={TypeOfCountryFoodOptions} />

                          <label for="exampleFormControlSelect4">วันที่เปิดให้บริการ*</label>
                          <Select className="selected" name="Day" isMulti value={this.state.Day} onChange={this.handleChange5} options={DayOptions} />

                          <label for="exampleFormControlSelect4">เวลาที่เปิดให้บริการ*</label>
                          <Select className="selected" name="Time_Open"  value={this.state.Time_Open} onChange={this.handleChange6} options={Time_Open} />

                          <label for="exampleFormControlSelect4">เวลาที่ปิดให้บริการ*</label>
                          <Select className="selected" name="Time_Close" value={this.state.Time_Close} onChange={this.handleChange7} options={Time_Close} />

                      
                    </div>
                    <div className="submit">

                      <button  class="btn btn-primary" > Submit</button> 
                  
                      <Link to ={`/SubmitPic/${getkey}`}  class="btn btn-primary" > Upload Picture </Link>      
                       
                        
                    </div>
                  </div>
                </div>
            </div>
          </form>
          
        <br/> 

          </div>
         
            </div>
        

      
                        );
    
                        
  }
  
}

export default home;