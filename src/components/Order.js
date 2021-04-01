import React, {Component} from 'react'
import firebase from '../config/firebase'
import Restaurants from './Restaurants'
import Home from './Home'
import NavbarLogout from './NavbarLogout'


class Order extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render (){
    
    return (
        <div>
            <NavbarLogout />
            <div>
              {/* <Restaurants db={firebase} rid={this.state.rid} /> */}
              <Restaurants db={firebase} rid={this.props.match.params.rid} />
            </div>
    </div>
        
    )
}
}

export default Order; 