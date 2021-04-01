
import React, { useState , Component } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { storage } from "../config/firebase";
import { ids,idrest } from "./RestaurantList";
import NavbarLogout from "./NavbarLogout"

class Showdetail extends Component {
    constructor(){
        super();
        this.state = {
          Restaurants: {}
        };
      }
      componentDidMount(){
          //'-MWPYjQga9cU4h1BTTB-'
            let app = firebase.database().ref('Restaurants/' + ids.idrest);
            console.log(ids.idrest)
            app.on('value', snapshot => {
                console.log(app)
                console.log(snapshot.val());
                this.setState({
            Restaurants: snapshot.val()
          });
        });
      }
      
    render() {
        return (

            <div>
                <NavbarLogout/>
            <br/>
                <div class="container12 my-5">
                <div class="container my-5">
                    <br/>
                <div>
                    <h5>ชื่อร้านอาหาร: {this.state.Restaurants.Name}</h5>
                </div>
                <br/>
                <div>
                    <p>ที่อยู่: {this.state.Restaurants.Address}</p>
                </div>
                <div>
                    <p>อีเมล: {this.state.Restaurants.Email}</p>
                </div>
                <div>
                    <p>Facebook: {this.state.Restaurants.Facebook}</p>
                </div>
                <div>
                    <p>Line: {this.state.Restaurants.Line}</p>
                </div>
                <div>
                    <p>เบอร์ติดต่อ: {this.state.Restaurants.Phone}</p>
                </div>
                <div>
                    <p>ราคา: {this.state.Restaurants.Price}</p>
                </div>
                <div>
                    <p>สัญชาติอาหาร: {this.state.Restaurants.TypeofCountryFood?.label}</p>
                </div>
                <div>
                    <p>ประเภทอาหาร: {this.state.Restaurants.TypeofFood?.label}</p>
                </div>
                <div>
                    <p>ประเภทร้านอาหาร: {this.state.Restaurants.TypeofRes?.label}</p>
                </div>
                <div>
                    <p>การให้บริการ: {this.state.Restaurants.TypeofService?.label}</p>
                </div>
                </div>

                <hr class="mb-5"/>
            
            <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>

                <div>
                    <div style={{padding: 8}}>
                        <img src={this.state.Restaurants.picture} alt="placeholder" style={{width: '100%'}} />
                    </div>
                </div>
                <div>
                    <div style={{padding: 8}}>
                        <img src={this.state.Restaurants.picture2} alt="placeholder" style={{width: '100%'}} />
                    </div>
                </div>
                <div>
                    <div style={{padding: 8}}>
                        <img src={this.state.Restaurants.picture3} alt="placeholder" style={{width: '100%'}} />
                    </div>
                </div>
                <div>
                    <div style={{padding: 8}}>
                        <img src={this.state.Restaurants.picture4} alt="placeholder" style={{width: '100%'}} />
                    </div>
                </div>
                <div>
                    <div style={{padding: 8}}>
                        <img src={this.state.Restaurants.picture5} alt="placeholder" style={{width: '100%'}} />
                    </div>
                </div>
                <div>
                    <div style={{padding: 8}}>
                        <img src={this.state.Restaurants.picture6} alt="placeholder" style={{width: '100%'}} />
                    </div>
                </div>
                <div>
                    <div style={{padding: 8}}>
                        <img src={this.state.Restaurants.picture7} alt="placeholder" style={{width: '100%'}} />
                    </div>
                </div>
                <div>
                    <div style={{padding: 8}}>
                        <img src={this.state.Restaurants.picture8} alt="placeholder" style={{width: '100%'}} />
                    </div>
                </div>
            
            </div>
            </div>
            </div>
        )
    }
}
export default Showdetail;