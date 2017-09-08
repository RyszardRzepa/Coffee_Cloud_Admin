import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';

import Dashboard from '../DashboardComponent';
import Heading from 'grommet/components/Heading';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

export default class OrdersComponent extends Component {
  state = {
    cafeOrders: []
  };
  
  async componentWillMount () {
    let _this = this;
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = firebase.auth().currentUser.uid;
        const userRef = firebase.database().ref(`coffee_bars/orders/${uid}`);
        
        userRef.on('value', orders => {
          let cafeOrders = [];
          orders.forEach(order => {
            cafeOrders.push({
              order: order.val().order,
              date: order.val().date,
              receipt_number: order.val().receipt_number
            })
          });
          _this.setState({ cafeOrders })
        })
      }
    })
  }
  
  filterOrdersByToday = () => {
    let today = Date.now();
    const todayStr = moment(today).format('MMMM Do YYYY')
    console.log(todayStr)
    
    return this.state.cafeOrders.map((item, i) => {
      if (todayStr === moment(item.date).format('MMMM Do YYYY'))
        return <Accordion key={i}>
          <AccordionPanel
            heading={`Order Number: ${i} |   Order Total Price: ${item.order.total} NOK`}>
            <div>
              {item.order.cart.map((order, i) => {
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
                    {order.price} NOK
                  </Paragraph>
                </div>
              })}
            </div>
          </AccordionPanel>
        </Accordion>
    })
  };
  
  renderAccordionHeading = (item, i) => {
    return <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <h4>Order Number: <b>{i}</b></h4>
      <h4>Order Total Price: <b>{item.order.total} NOK</b></h4>
      <h4> Order Date: <b>{moment(item.date).format('MMMM Do YYYY')}</b></h4>
    </div>
  };
  
  showOrderHistory = () => {
    let today = Date.now();
    const todayStr = moment(today).format('MMMM Do YYYY')
    console.log(todayStr)
    
    return this.state.cafeOrders.map((item, i) => {
      if (todayStr !== moment(item.date).format('MMMM Do YYYY'))
        return <Accordion key={i}>
          <AccordionPanel
            heading={this.renderAccordionHeading(item, i)}>
            <div>
              {item.order.cart.map((order, i) => {
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
                    {order.price} NOK
                  </Paragraph>
                </div>
              })}
            </div>
          </AccordionPanel>
        </Accordion>
    })
  };
  
  renderOrders = () => {
    if (this.state.cafeOrders) {
      return <Tabs justify='start'>
        <Tab title='Today Orders'>
          {this.filterOrdersByToday()}
        </Tab>
        <Tab title='Order History'>
          {this.showOrderHistory()}
        </Tab>
      </Tabs>
    }
  };
  
  render () {
    return (
      <Dashboard>
        <div style={{ margin: 20 }}>
          <Heading>
            Order History
          </Heading>
          <br/><br/>
          {this.renderOrders()}
        </div>
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
  },
  contentText: {
    fontSize: 20,
    fontWeight: '500'
  }
}