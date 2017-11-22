import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import Dashboard from '../DashboardComponent';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';

import LoadingIndicator from '../Common/LoadingIndicator';

export default class CafeListComponent extends Component {
  state = {
    cafeOrders: [],
    isLoading: false,
    cafeList: null
  };
  
  async componentWillMount () {
    let _this = this;
    
    const db = firebase.firestore();
    this.setState({ isLoading: true });
    
    let ref = db.collection("coffee_bars").where("ccPartner", "==", true);
    await ref.get().then(function (snap) {
      let cafeList = [];
      
      snap.forEach(doc => {
        if (doc.exists) {
          cafeList.push(doc.data())
        }
      });
      _this.setState({ cafeList, isLoading: false });
    });
  }
  
  renderCafeList = () => {
    return _.map(this.state.cafeList, (cafe, i) => {
      return <Box
        key={i}
        size='medium'
        align='center'
        pad='small'
        margin='small'
        colorIndex='light-2'
      >
        <Card
          thumbnail={cafe.cafeImage}
          label={cafe.name}
          link={<Anchor path={`cafe-order/${cafe.uid}`} label='Order History'/>}
        />
      </Box>
    })
  };
  
  render () {
    return (
      <Dashboard>
        <Box full align='center' direction='row' wrap>
          {this.state.isLoading ? <LoadingIndicator/> : this.renderCafeList()}
        </Box>
      </Dashboard>
    )
  }
}