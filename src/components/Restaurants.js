import React, {Component} from 'react';
import firebase from '../config/firebase'
import MessageList from './MessageList'
import MessageBox from './MessageBox'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import Carousel from "./Carousel/Carousel";
import CheckRoleBox from './CheckRoleBox';
class Restaurants extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            image: null,
            Restaurants: {}
        };
      }
      componentDidMount(){
        let app = this.props.db.database().ref('Restaurants/'+ this.props.rid);
            app.on('value', snapshot => {
                console.log(snapshot.val());
                
                this.setState({
            Restaurants: snapshot.val()
          });
        });
      }
    
    render() {
        return (
        <div>
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
            <Carousel
                show={4}
            >
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
            </Carousel>
            </div>
            

            <br/>
            <hr class="mb-5"/>
            
            <div className="container">
                <br/>
            <h5>ความคิดเห็น</h5>
            <br/>
            <div className="columns">
                <div className="column is-3"></div> 
                <div className="column is-6">
                    <MessageList db={firebase} rid={this.props.rid}/>
                </div>
            </div>
            <br/>
            <div className="columns">
                <div className="column is-3"></div>
                <div className="column is-6">
                    {/* <MessageBox db={firebase} rid={this.props.rid}/> */}
                    <CheckRoleBox db={firebase} rid={this.props.rid}/>
                </div>
            </div>
            </div>
            <br/><br/>
            </div>

        </div>
        )
    }
}
export default Restaurants;