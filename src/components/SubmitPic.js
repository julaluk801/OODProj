
import React, { useState , Component } from "react";
// import {firebase,storage} from '../firebase'
import firebase from "firebase/app";
import "firebase/database";
import { storage } from "../config/firebase";

import { Link } from 'react-router-dom';

import { getidSubmit } from "./Register";
import './SubmitPic.css';
class Showdetail extends Component {
 
  constructor(){
    super();
    this.state = {
      Restaurants:[],
      Restaurants_id:'',
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
       
    }
    this.handleChangePic = this.handleChangePic.bind(this);
    this.handleUploadPic = this.handleUploadPic.bind(this);

    this.handleChangePic2 = this.handleChangePic2.bind(this);
    this.handleUploadPic2 = this.handleUploadPic2.bind(this);

    this.handleChangePic3 = this.handleChangePic3.bind(this);
    this.handleUploadPic3 = this.handleUploadPic3.bind(this);

    this.handleChangePic4 = this.handleChangePic4.bind(this);
    this.handleUploadPic4 = this.handleUploadPic4.bind(this);

    this.handleChangePic5 = this.handleChangePic5.bind(this);
    this.handleUploadPic5 = this.handleUploadPic5.bind(this);

    this.handleChangePic6 = this.handleChangePic6.bind(this);
    this.handleUploadPic6 = this.handleUploadPic6.bind(this);

    this.handleChangePic7 = this.handleChangePic7.bind(this);
    this.handleUploadPic7 = this.handleUploadPic7.bind(this);

    this.handleChangePic8 = this.handleChangePic8.bind(this);
    this.handleUploadPic8 = this.handleUploadPic8.bind(this);


 }
 
 componentDidMount(props){
//    if(ids.idrest ==null){
//      return;
//    }
   console.log('UploadPicID: '+getidSubmit.idSubmit)
  const itemsRef = firebase.database().ref('Restaurants/' + getidSubmit.idSubmit );  
   itemsRef.on('value',(snapshot) => {
       let Restaurants = snapshot.val();
         this.setState({
              
              picture:Restaurants.picture,
              picture2:Restaurants.picture2,
              picture3:Restaurants.picture3,
              picture4:Restaurants.picture4,
              picture5:Restaurants.picture5,
              picture6:Restaurants.picture6,
              picture7:Restaurants.picture7,
              picture8:Restaurants.picture8,
         })
       
   })
 }

 handleChange(e){
   this.setState({
     [e.target.name]: e.target.value
     
   })
 }
 /////////////////////////PICTURE////////////////////

 handleChangePic = e => {
  if (e.target.files[0]) {
    const image = e.target.files[0];
    this.setState(() => ({image}));
  }
}
handleUploadPic = () => {
  const {image} = this.state;
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on('state_changed', 
  (snapshot) => {
    // progrss function ....
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    this.setState({progress});
  }, 
  (error) => {
       // error function ....
    console.log(error);
  }, 
() => {
    // complete function ....
    storage.ref('images').child(image.name).getDownloadURL().then(picture => {
        console.log(picture);
        this.setState({picture});
    })
    firebase.database().ref('Restaurants/' + getidSubmit.idSubmit).update({'picture':this.state.picture})
});

}

handleChangePic2 = e => {
  if (e.target.files[0]) {
    const image = e.target.files[0];
    this.setState(() => ({image}));
  }
}
handleUploadPic2 = () => {
  const {image} = this.state;
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on('state_changed', 
  (snapshot) => {
    // progrss function ....
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    this.setState({progress});
  }, 
  (error) => {
       // error function ....
    console.log(error);
  }, 
() => {
    // complete function ....
    storage.ref('images').child(image.name).getDownloadURL().then(picture2 => {
        console.log(picture2);
        this.setState({picture2});
    })
    console.log(getidSubmit.idSubmit);
    firebase.database().ref('Restaurants/' + getidSubmit.idSubmit).update({'picture2':this.state.picture2})
});

}
////////////////////////////////
handleChangePic3 = e => {
  if (e.target.files[0]) {
    const image = e.target.files[0];
    this.setState(() => ({image}));
  }
}
handleUploadPic3 = () => {
  const {image} = this.state;
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on('state_changed', 
  (snapshot) => {
    // progrss function ....
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    this.setState({progress});
  }, 
  (error) => {
       // error function ....
    console.log(error);
  }, 
() => {
    // complete function ....
    storage.ref('images').child(image.name).getDownloadURL().then(picture3 => {
        console.log(picture3);
        this.setState({picture3});
    })
    console.log(getidSubmit.idSubmit);
    firebase.database().ref('Restaurants/' + getidSubmit.idSubmit).update({'picture3':this.state.picture3})
});

}
////////////////////////////////
handleChangePic4 = e => {
  if (e.target.files[0]) {
    const image = e.target.files[0];
    this.setState(() => ({image}));
  }
}
handleUploadPic4 = () => {
  const {image} = this.state;
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on('state_changed', 
  (snapshot) => {
    // progrss function ....
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    this.setState({progress});
  }, 
  (error) => {
       // error function ....
    console.log(error);
  }, 
() => {
    // complete function ....
    storage.ref('images').child(image.name).getDownloadURL().then(picture4 => {
        console.log(picture4);
        this.setState({picture4});
    })
    console.log(getidSubmit.idSubmit);
    firebase.database().ref('Restaurants/' + getidSubmit.idSubmit).update({'picture4':this.state.picture4})
});

}
////////////////////////////////
handleChangePic5 = e => {
  if (e.target.files[0]) {
    const image = e.target.files[0];
    this.setState(() => ({image}));
  }
}
handleUploadPic5 = () => {
  const {image} = this.state;
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on('state_changed', 
  (snapshot) => {
    // progrss function ....
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    this.setState({progress});
  }, 
  (error) => {
       // error function ....
    console.log(error);
  }, 
() => {
    // complete function ....
    storage.ref('images').child(image.name).getDownloadURL().then(picture5 => {
        console.log(picture5);
        this.setState({picture5});
    })
    console.log(getidSubmit.idSubmit);
    firebase.database().ref('Restaurants/' + getidSubmit.idSubmit).update({'picture5':this.state.picture5})
});

}
////////////////////////////////
handleChangePic6 = e => {
  if (e.target.files[0]) {
    const image = e.target.files[0];
    this.setState(() => ({image}));
  }
}
handleUploadPic6 = () => {
  const {image} = this.state;
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on('state_changed', 
  (snapshot) => {
    // progrss function ....
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    this.setState({progress});
  }, 
  (error) => {
       // error function ....
    console.log(error);
  }, 
() => {
    // complete function ....
    storage.ref('images').child(image.name).getDownloadURL().then(picture6 => {
        console.log(picture6);
        this.setState({picture6});
    })
    console.log(getidSubmit.idSubmit);
    firebase.database().ref('Restaurants/' + getidSubmit.idSubmit).update({'picture6':this.state.picture6})
});

}
////////////////////////////////
handleChangePic7 = e => {
  if (e.target.files[0]) {
    const image = e.target.files[0];
    this.setState(() => ({image}));
  }
}
handleUploadPic7 = () => {
  const {image} = this.state;
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on('state_changed', 
  (snapshot) => {
    // progrss function ....
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    this.setState({progress});
  }, 
  (error) => {
       // error function ....
    console.log(error);
  }, 
() => {
    // complete function ....
    storage.ref('images').child(image.name).getDownloadURL().then(picture7 => {
        console.log(picture7);
        this.setState({picture7});
    })
    console.log(getidSubmit.idSubmit);
    firebase.database().ref('Restaurants/' + getidSubmit.idSubmit).update({'picture7':this.state.picture7})
});

}
////////////////////////////////
handleChangePic8 = e => {
  if (e.target.files[0]) {
    const image = e.target.files[0];
    this.setState(() => ({image}));
  }
}
handleUploadPic8 = () => {
  const {image} = this.state;
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on('state_changed', 
  (snapshot) => {
    // progrss function ....
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    this.setState({progress});
  }, 
  (error) => {
       // error function ....
    console.log(error);
  }, 
() => {
    // complete function ....
    storage.ref('images').child(image.name).getDownloadURL().then(picture8 => {
        console.log(picture8);
        this.setState({picture8});
    })
    console.log(getidSubmit.idSubmit);
    firebase.database().ref('Restaurants/' + getidSubmit.idSubmit).update({'picture8':this.state.picture8})
});

}


////////////////////////////////////////////////////////////////////

  render() {
    
    return (
      <div className="app">

          <div className="container" style={{marginTop:70}}>

        <br/> 

            <div class="SubmitPicheader">
                <h2>Upload Pictures</h2>
            </div>
            <br/>
          <div className="SubmitPicMargin-25">
            <img src={this.state.picture || 'http://via.placeholder.com/250x150'} alt="Uploaded images" height="150" width="250"/>

            <input className="inp" type="file" onChange={this.handleChangePic}/>
            <button className="upload" onClick={this.handleUploadPic}>Upload</button>
                    {/* Pass FilePond properties as attributes */}

                </div>
            <div className="SubmitPicMargin-25">
              <img src={this.state.picture2 || 'http://via.placeholder.com/250x150'} alt="Uploaded images" height="150" width="250"/>

              <input className="inp" type="file" onChange={this.handleChangePic2}/>
              <button className="upload"  onClick={this.handleUploadPic2}>Upload</button>
                    {/* Pass FilePond properties as attributes */}

                </div>
            <div className="inp" className="SubmitPicMargin-25">
              <img src={this.state.picture3 || 'http://via.placeholder.com/250x150'} alt="Uploaded images" height="150" width="250"/>

              <input className="inp" type="file" onChange={this.handleChangePic3}/>
              <button className="upload"  onClick={this.handleUploadPic3}>Upload</button>
                    {/* Pass FilePond properties as attributes */}

                </div>
                <div className="SubmitPicMargin-25">
            <img src={this.state.picture4 || 'http://via.placeholder.com/250x150'} alt="Uploaded images" height="150" width="250"/>

              <input className="inp" type="file" onChange={this.handleChangePic4}/>
              <button className="upload"  onClick={this.handleUploadPic4}>Upload</button>
                    {/* Pass FilePond properties as attributes */}

                </div>
            <div className="fourpic">
            <div className="SubmitPicMargin-25">
              <img src={this.state.picture5 || 'http://via.placeholder.com/250x150'} alt="Uploaded images" height="150" width="250"/>

              <input className="inp" type="file" onChange={this.handleChangePic5}/>
              <button className="upload"  onClick={this.handleUploadPic5}>Upload</button>
                    {/* Pass FilePond properties as attributes */}

                </div>
                <div className="SubmitPicMargin-25">
            <img src={this.state.picture6 || 'http://via.placeholder.com/250x150'} alt="Uploaded images" height="150" width="250"/>

            <input className="inp" type="file" onChange={this.handleChangePic6}/>
            <button className="upload"  onClick={this.handleUploadPic6}>Upload</button>
                    {/* Pass FilePond properties as attributes */}

                </div>
                <div className="SubmitPicMargin-25">
            <img src={this.state.picture7 || 'http://via.placeholder.com/250x150'} alt="Uploaded images" height="150" width="250"/>

            <input className="inp" type="file" onChange={this.handleChangePic7}/>
            <button className="upload"  onClick={this.handleUploadPic7}>Upload</button>
                    {/* Pass FilePond properties as attributes */}

                </div>
                <div className="SubmitPicMargin-25">
            <img src={this.state.picture8 || 'http://via.placeholder.com/250x150'} alt="Uploaded images" height="150" width="250"/>

            <input className="inp" type="file" onChange={this.handleChangePic8}/>
            <button className="upload"  onClick={this.handleUploadPic8}>Upload</button>
                    {/* Pass FilePond properties as attributes */}

                </div>
              
              </div>  
            
                <div className="SubmitPiccol">
                          <Link to ={`/RestaurantList`} class="btn btn-primary" > Go to Restaurant List </Link>      
                </div>
                <br/>
            </div>
        
        </div>
      
    );
  }
}
 
export default Showdetail;

