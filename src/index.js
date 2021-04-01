import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//ส่วนที่ import เพิ่มเติม
import {BrowserRouter, Router, Route, Link} from 'react-router-dom'
// import {browserHistory} from 'react-router'
import ReactDOM, {render} from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
)

serviceWorker.unregister();