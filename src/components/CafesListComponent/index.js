import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';

import Dashboard from '../DashboardComponent';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Spinning from 'grommet/components/icons/Spinning';

export default class CafeListComponent extends Component {
  state = {
    cafeOrders: [],
    isLoading: false,
    cafeList: null
  };
  
  async componentWillMount () {
    const db = firebase.firestore();
    this.setState({ isLoading: true });
    
    let ref = db.collection("coffee_bars").doc("accounts");
    let obj = {};
    await ref.get().then(function (doc) {
      if (doc.exists) {
        obj = Object.assign({}, doc.data());
      }
    });
    this.setState({ cafeList: obj, isLoading: false });
  }
  
  showLoadingIndicator = () => {
    return <Box justify='center' align='center' full>
      <Spinning responsive={true} size={'large'}/>
    </Box>
  };
  
  renderCafeList = () => {
    return _.map(this.state.cafeList, (cafe, i) => {
      if (cafe.ccPartner) {
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
            link={<Anchor path={`cafe-order/${cafe.uid}`} label='Sample anchor'/>}
          />
        </Box>
      }
    })
  };
  
  render () {
    return (
      <Dashboard>
        <Box align='center' direction='row' wrap>
          {this.state.isLoading ? this.showLoadingIndicator() : this.renderCafeList()}
        </Box>
      </Dashboard>
    )
  }
}