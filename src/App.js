import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import 'react-dates/initialize';


const config = {
  apiKey: "AIzaSyDDHG0bO6pmAmUgwVcjN0XQuZ_Z2DJUxMU",
  authDomain: "dev-coffee-cloud-mobile.firebaseapp.com",
  databaseURL: "https://dev-coffee-cloud-mobile.firebaseio.com",
  projectId: "dev-coffee-cloud-mobile",
  storageBucket: "dev-coffee-cloud-mobile.appspot.com",
  messagingSenderId: "550841968043"
};


firebase.initializeApp(config);
require("firebase/firestore");

import Main from './components/Main';

class App extends Component {
  render () {
    return (
      <Main/>
    );
  }
}

export default App;
