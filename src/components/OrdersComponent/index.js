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
    orders: []
  };
  
  renderOrders = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
      
      }
    })
  };
  
  render () {
    return (
      <Dashboard>
        <Heading>
          Order History
        </Heading>
        <Accordion>
          <AccordionPanel heading='First Title'>
          
          </AccordionPanel>
        </Accordion>
      </Dashboard>
    )
  }
}