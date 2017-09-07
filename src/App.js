import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBaB_6jFIUG7q8lpYHbxvtsNzyVr0xDuXA",
  authDomain: "weather-forecast-9a2a5.firebaseapp.com",
  databaseURL: "https://weather-forecast-9a2a5.firebaseio.com",
  projectId: "weather-forecast-9a2a5",
  storageBucket: "weather-forecast-9a2a5.appspot.com",
  messagingSenderId: "317335334484"
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
