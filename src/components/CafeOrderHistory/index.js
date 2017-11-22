import React, { Component } from 'react';
import Dashboard from '../DashboardComponent';
import firebase from 'firebase';
import { DateRange } from 'react-date-range';

import Button from 'grommet/components/Button';
import moment from 'moment';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import _ from 'lodash';

export default class Settings extends Component {
  state = {
    startDate: '',
    cafeOrders: [],
    isLoading: false,
    noOrder: false,
    filteredOrders: []
  };
  
  async componentWillMount () {
    let _this = this;
    const db = firebase.firestore();
    
    this.setState({ isLoading: true });
    
    db.collection("cafe_orders").doc('orders')
      .collection(this.props.match.params.id).onSnapshot(item => {
      
      const orders = [];
      
      item.forEach(order => {
        orders.push({ id: order.id, orderData: order.data() });
      });
      _this.setState({ cafeOrders: orders, isLoading: false })
    });
  }
  
  filterOrdersByToday = () => {
    if (this.state.filteredOrders.length > 0) {
      return this.state.filteredOrders.map((item, i) => {
        const { orderData: { order } } = item;
        
        return <Accordion key={i}>
          <AccordionPanel
            heading={this.renderAccordionHeading(item, i)}>
            <div>
              <div style={styles.contentContainer} key={i}>
                <Paragraph style={styles.contentText2}>
                  amount
                </Paragraph>
                <Paragraph style={styles.contentText2}>
                  name
                </Paragraph>
                <Paragraph style={styles.contentText2}>
                  size
                </Paragraph>
                <Paragraph style={styles.contentText2}>
                  price
                </Paragraph>
                <Paragraph style={styles.contentText2}>
                  mva
                </Paragraph>
              </div>
              {order.cart.map((order, i) => {
                return <div style={styles.contentContainer} key={i}>
                  <Paragraph style={styles.contentText}>
                    {order.count}
                  </Paragraph>
                  <Paragraph style={styles.contentText}>
                    {order.name}
                  </Paragraph>
                  <Paragraph style={styles.contentText}>
                    {order.size}
                  </Paragraph>
                  <Paragraph style={styles.contentText}>
                    {Math.round(order.price * 100) / 100} NOK
                  </Paragraph>
                  {order.name === 'Tip' ? <Paragraph style={styles.contentText}>
                    0%
                  </Paragraph> : order.takeAway ? <Paragraph style={styles.contentText}>
                    15%
                  </Paragraph> : <Paragraph style={styles.contentText}>
                    25%
                  </Paragraph>}
                </div>
              })}
            </div>
          </AccordionPanel>
        </Accordion>
      });
    }
  };
  
  renderAccordionHeading = ({ orderData: { order, date } }, i) => {
    return <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <h4>Order Number: <b>{i}</b></h4>
      <h4>Order Total Price: <b> {Math.round(order.total * 100) / 100} NOK</b></h4>
      <h4> Order Date: <b>{moment(date).format('D/M/YYYY')}</b></h4>
    </div>
  };
  
  handleSelect = (range) => {
    var start = moment(range.startDate._d).valueOf();
    var stop = moment(range.endDate._d).valueOf();
    
    var res = _.filter(this.state.cafeOrders, function (item) {
      return _.inRange(
        item.orderData.date,
        start,
        stop + 1
      );
    });
    
    this.setState({ filteredOrders: res })
  };
  
  removeOrder = () => {
    var password =  prompt('Insert password to confirm');
    
    if(password === '123') {
      this.state.filteredOrders.map(orderItem => {
        const db = firebase.firestore();
    
        const moveOrders = db.collection("cafe_orders").doc('paid_order')
          .collection(this.props.match.params.id)
          .doc(orderItem.id).set(orderItem.orderData);
    
        const removeOrder = db.collection("cafe_orders").doc('orders')
          .collection(this.props.match.params.id)
          .doc(orderItem.id).delete();
    
        return Promise.all([moveOrders, removeOrder])
      });
    }
    else {
      console.log(false)
    }
  };
  
  render () {
    return (
      <Dashboard>
        <Box align='center' style={{ marginLeft: 20, marginTop: 20 }}>
        </Box>
        <br/>
        <Box>
          <Box align='center' justify='between' direction='row'>
            <div/>
            <h3><b>Choose Start Date</b></h3>
            <h3><b>Choose End Date</b></h3>
            <div/>
          </Box>
          <DateRange
            theme={{
              DateRange: {
                padding: 10,
                flex: 1,
                display: 'flex',
                justifyContent: 'center'
              },
              Calendar: {
                width: 450,
                cursor: 'pointer',
                border: '1px solid #d4d4d4',
                borderRadius: 1,
                margin: 5,
              },
              MonthButton: {
                width: 20,
                borderRadius: 30,
                padding: 0,
                margin: 0,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
                background: '#d4d4d4'
              },
              MonthAndYear: {
                fontSize: 18,
              },
              MonthArrowPrev: {
                fontSize: 30,
                borderRightColor: '#d96659',
              },
              MonthArrowNext: {
                float: 'right',
                borderLeftColor: '#d96659',
              },
            }}
            linkedCalendars={false}
            onInit={this.handleSelect}
            onChange={this.handleSelect}
          />
        </Box>
        <h3 style={{ textAlign: 'center' }}><b>
          Number of orders at this period:
        </b> {this.state.filteredOrders.length}
        </h3>
        <br/>
        {this.filterOrdersByToday() && this.filterOrdersByToday()}
        <Button
          label='Pay for Orders'
          onClick={this.removeOrder}
        />
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