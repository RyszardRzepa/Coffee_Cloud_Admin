import React, { Component } from 'react';
import firebase from 'firebase';

import Dashboard from '../DashboardComponent';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';

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
  
  renderOrders = () => {
    if (this.state.cafeOrders) {
      return this.state.cafeOrders.map((item, i) => {
        console.log(item)
        return <Accordion key={i}>
          <AccordionPanel heading={`Order Number: ${i} |   Order Total Price: ${item.order.total} NOK`}>
            <div>
              {item.order.cart.map((order, i) => {
                return <div style={styles.contentContainer} key={i}>
                  <Paragraph  style={styles.contentText}>
                    {order.count}
                  </Paragraph>
                  <Paragraph  style={styles.contentText}>
                    {order.name}
                  </Paragraph>
                  <Paragraph  style={styles.contentText}>
                    {order.size}
                  </Paragraph>
                  <Paragraph  style={styles.contentText}>
                    {order.price} NOK
                  </Paragraph>
                </div>
              })}
              
            </div>
          </AccordionPanel>
        </Accordion>
      })
    }
  };
  
  render () {
    return (
      <Dashboard>
        <Heading>
          Order History
        </Heading>
        {this.renderOrders()}
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