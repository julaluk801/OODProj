
import React, { useState , Component } from "react";

// import {firebase,storage} from '../firebase'
import firebase from "firebase/app";
import "firebase/database";
import { storage } from "../config/firebase";

import { Link } from 'react-router-dom';
import './RestaurantList.css';
import NavbarLogout from "./NavbarLogout"

export function ids(){
  var idrest='';
}
class RestaurantList extends Component {
  constructor(){
    super();
    this.state = {
       Restaurants:[],
       rid:'',
       Name:'',
       Address:'',
       Price:'',
       Phone:'',
       Email:'',
       Facebook:'',
       Line:'',
       TypeofFood:'',
       TypeofService:'',
       TypeofCountryFood:'',
       TypeofRes:'',
        
       statues: false,

       files: [], //ใช้เก็บข้อมูล File ที่ Upload
       uploadValue: 0, //ใช้เพื่อดู Process การ Upload
       filesMetadata:[], //ใช้เพื่อรับข้อมูล Metadata จาก Firebase
       
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)


 }
 
 componentDidMount(){
   
   const itemsRef = firebase.database().ref('Restaurants' );
   
   itemsRef.on('value',(snapshot) => {
       let Restaurants = snapshot.val();
       
       let newState = [];
       for(let item in Restaurants){
         newState.push({
             rid:item,
             Name:Restaurants[item].Name,
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
             status:Restaurants[item].status,
   
             
         })
       }
       this.setState({
         Restaurants:newState
       })
       console.log(this.state.Restaurants);

   })
 }

 handleChange(e){
   this.setState({
     [e.target.name]: e.target.value
     
   })
 }



  
 handleUpdate = (rid = null , Name = null , TypeofFood = null,Address= null,Price= null,Phone= null,Email= null,Facebook= null,Line= null,TypeofService= null,TypeofCountryFood= null,TypeofRes= null) => {
   this.setState({rid,Name,TypeofFood,Address,Price,Phone,Email,Facebook,Line,TypeofService,TypeofCountryFood,TypeofRes})
   ids.idrest=rid;
   
 }

 

 removeItem(RestaurantsId){
   const itemsRef = firebase.database().ref('/Restaurants');
   itemsRef.child(RestaurantsId).remove();
}
///////////// เก็บ id เพื่อส่งต่อให้ showdetail////////////////
getrid(rid=null){
  ids.idrest=rid; 
}

////////////////////////////////////////////////////////////////////



  render() {


    return (
      
      <div>
      <NavbarLogout/>
      <div className="app">
          <div className="container" style={{marginTop:70}}>
            <div class="header">
                <h2>รายชื่อร้านอาหาร</h2>
            </div>
        <br></br>
        <table className="table table-sm table-bordered"> 
        <tr className="thead-dark">
          <th width="15%">Name Restaurant</th>
          <th width="5%">Edit</th>
          <th width="5%">Delete</th>
          <th width="5%">Status</th>
        </tr>
        {
            this.state.Restaurants.map((item) => {
              return (
                
                  <tr>
                    <td><Link to ={`/Res/${item.rid}`} onClick={() => this.getrid(item.rid) } className='link' >{item.Name}</Link></td>
                    
                    <td><Link to={`/Showdetail/${item.rid}`} className="btn btn-warning btn-sm" onClick={() => this.handleUpdate(item.rid,item.Name,item.TypeofFood,item.Address,item.Price,item.Phone,item.Email,item.Facebook,item.Line,item.TypeofService,item.TypeofCountryFood,item.TypeofRes)}>Edit</Link></td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => this.removeItem(item.rid)}>Delete</button></td>

                        <td>{item.status ? "pass":"Waiting"}</td>
                    
                    
                  </tr>
                  
                  
              )
            })
            
        }
    </table>
          <div className="new">
                          <Link to ={`/register`} class="btn btn-primary" > + New </Link>      
                    </div>
          </div>
         

            </div>
            </div>
        

      
    );
    
  }
}
 
export default RestaurantList;