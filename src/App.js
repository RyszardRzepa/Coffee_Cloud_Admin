import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCIPm4Ae7tcl8Fpwp7QvARabOu0zeDaBT4",
  authDomain: "coffee-cloud-mobile-app.firebaseapp.com",
  databaseURL: "https://coffee-cloud-mobile-app.firebaseio.com",
  projectId: "coffee-cloud-mobile-app",
  storageBucket: "coffee-cloud-mobile-app.appspot.com",
  messagingSenderId: "838735469817"
};

firebase.initializeApp(config);

import Main from './components/Main';

class App extends Component {
  render () {
    return (
      <Main/>
    );
  }
}

export default App;
