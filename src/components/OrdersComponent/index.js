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
import Spinning from 'grommet/components/icons/Spinning';

export default class OrdersComponent extends Component {
  state = {
    cafeOrders: [],
    isLoading: false,
  };
  
  async componentWillMount () {
    let _this = this;
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = firebase.auth().currentUser.uid;
        const userRef = firebase.database().ref(`coffee_bars/orders/${uid}`);
       
        this.setState({ isLoading: true });
        
        userRef.on('value', orders => {
          let cafeOrders = [];
          orders.forEach(order => {
            cafeOrders.push({
              order: order.val().order,
              date: order.val().date,
              receipt_number: order.val().receipt_number
            })
          });
          
          _this.setState({ cafeOrders, isLoading: false })
        })
      }
    })
  }
  
  filterOrdersByToday = () => {
    let today = Date.now();
    const todayStr = moment(today).format('MMMM Do YYYY')
    
    return this.state.cafeOrders.map((item, i) => {
      if (todayStr === moment(item.date).format('MMMM Do YYYY'))
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
                  {item.order.takeAway ? <Paragraph style={styles.contentText}>
                    15%
                  </Paragraph>: <Paragraph style={styles.contentText}>
                    25%
                  </Paragraph> }
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
    
    return this.state.cafeOrders.map((item, i) => {
      if (todayStr !== moment(item.date).format('MMMM Do YYYY'))
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
            
              {item.order.cart.map((order, i) => {
                console.log(item)
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
                  {item.order.takeAway ? <Paragraph style={styles.contentText}>
                    15%
                  </Paragraph>: <Paragraph style={styles.contentText}>
                    25%
                  </Paragraph> }
                  
                </div>
              })}
            </div>
          </AccordionPanel>
        </Accordion>
    })
  };
  
  showLoadingIndicator = () => {
    return <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinning responsive={true} size={'large'}/>
    </div>
  };
  
  renderOrders = () => {
    const { cafeOrders, isLoading } = this.state;
    
    if (cafeOrders) {
      return <Tabs justify='start'>
        <Tab title='Today Orders'>
          {isLoading ? this.showLoadingIndicator() : this.filterOrdersByToday()}
        </Tab>
        <Tab title='Order History'>
          {isLoading ? this.showLoadingIndicator() : this.showOrderHistory()}
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
    flex: 1,
  },
  contentText: {
    textAlign: 'flex-start',
    flex: 1,
    fontSize: 18,
    fontWeight: '500'
  },
  contentText2: {
    color: '#2b2b2b',
    textAlign: 'flex-start',
    flex: 1,
    fontSize: 20,
    fontWeight: '500'
  }
};