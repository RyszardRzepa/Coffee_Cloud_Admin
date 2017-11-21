import React, { Component } from 'react';
import Dashboard from '../DashboardComponent';
import firebase from 'firebase';
import _ from 'lodash';

class CafeOrderHistory extends Component {
  state = {
    cafeInfo: {}
  };
  
  componentWillMount () {
    let _this = this;
    const db = firebase.firestore();
    this.setState({ isLoading: true });
    
    let ref = db.collection("coffee_bars").doc("accounts");
    ref.get().then(function (doc) {
      if (doc.exists) {
        _.map(doc.data(), cafe => {
          if(cafe.uid === _this.props.match.params.id) {
            _this.setState({ cafeInfo: cafe, isLoading: false });
          }
        })
      }
    });
  }
  
  render () {
    return (
      <Dashboard>
        {console.log(this.state.cafeInfo)}
      </Dashboard>
    )
  }
}

export default CafeOrderHistory;