import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import _ from 'lodash';

import Dashboard from '../DashboardComponent';
import Heading from 'grommet/components/Heading';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
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
    let items = [];
    
    let ref = db.collection("coffee_bars").doc("accounts");
    let obj = {};
    await ref.get().then(function (doc) {
      if (doc.exists) {
        obj = Object.assign({}, doc.data());
      }
    });
    this.setState({ cafeList: obj });
  }
  
  showLoadingIndicator = () => {
    return <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinning responsive={true} size={'large'}/>
    </div>
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
            textSize={15}
            thumbnail={cafe.cafeImage}
            label={cafe.name}
            link={<Anchor href='' label='Sample anchor'/>}
          />
        </Box>
      }
    })
  };
  
  render () {
    return (
      <Dashboard>
        <Box align='center' direction='row' wrap>
          {this.renderCafeList()}
        </Box>
      </Dashboard>
    )
  }
}

const styles = {
  contentContainer: {
    backgroundColor: '#f3f3f3',
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  contentText: {
    textAlign: 'flex-start',
    flex: 1,
    fontSize: 16,
    fontWeight: '500'
  },
  contentText2: {
    color: '#2b2b2b',
    textAlign: 'flex-start',
    flex: 1,
    fontSize: 18,
    fontWeight: '500'
  }
};