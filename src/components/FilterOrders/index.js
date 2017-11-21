import React, { Component } from 'react';
import Dashboard from '../DashboardComponent';
import firebase from 'firebase';
// import { DateRange } from 'react-date-range';

import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

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
  
  // filterOrdersByToday = () => {
  //   if (this.state.filteredOrders.length > 0) {
  //     return this.state.filteredOrders.map((item, i) => {
  //       return <Accordion key={i}>
  //         <AccordionPanel
  //           heading={this.renderAccordionHeading(item, i)}>
  //           <div>
  //             <div style={styles.contentContainer} key={i}>
  //               <Paragraph style={styles.contentText2}>
  //                 amount
  //               </Paragraph>
  //               <Paragraph style={styles.contentText2}>
  //                 name
  //               </Paragraph>
  //               <Paragraph style={styles.contentText2}>
  //                 size
  //               </Paragraph>
  //               <Paragraph style={styles.contentText2}>
  //                 price
  //               </Paragraph>
  //               <Paragraph style={styles.contentText2}>
  //                 mva
  //               </Paragraph>
  //             </div>
  //             {item.order.cart.map((order, i) => {
  //               return <div style={styles.contentContainer} key={i}>
  //                 <Paragraph style={styles.contentText}>
  //                   {order.count}
  //                 </Paragraph>
  //                 <Paragraph style={styles.contentText}>
  //                   {order.name}
  //                 </Paragraph>
  //                 <Paragraph style={styles.contentText}>
  //                   {order.size}
  //                 </Paragraph>
  //                 <Paragraph style={styles.contentText}>
  //                   {Math.round(order.price * 100) / 100} NOK
  //                 </Paragraph>
  //                 {item.order.takeAway ? <Paragraph style={styles.contentText}>
  //                   15%
  //                 </Paragraph> : <Paragraph style={styles.contentText}>
  //                   25%
  //                 </Paragraph>}
  //               </div>
  //             })}
  //           </div>
  //         </AccordionPanel>
  //       </Accordion>
  //     });
  //   }
  // };
  
  // renderAccordionHeading = (item, i) => {
  //   return <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
  //     <h4>Order Number: <b>{i}</b></h4>
  //     <h4>Order Total Price: <b> {Math.round(item.order.total * 100) / 100} NOK</b></h4>
  //     <h4> Order Date: <b>{moment(item.date).format('D/M/YYYY')}</b></h4>
  //   </div>
  // };
  
  // handleSelect = (range) => {
  //   var start = moment(range.startDate._d).valueOf();
  //   var stop = moment(range.endDate._d).valueOf();
  //
  //   var res = _.filter(this.state.cafeOrders, function (item) {
  //     return _.inRange(
  //       item.date,
  //       start,
  //       stop + 1
  //     );
  //   });
  //
  //   this.setState({ filteredOrders: res })
  // };
  
  renderOrder = () => {
    return this.state.cafeOrders.map(order => {
      return <TableRow>
        <td>
          {order.date}
        </td>
        <td>
          {order.order.name}
        </td>
        <td className='secondary'>
          {order.order.total}
        </td>
      </TableRow>
    })
  };
  
  render () {
    return (
      <Dashboard>
        <Table selectable='multiple'
               onSelect={(item)=> console.log(item)}>
          <thead>
          <tr>
            <th>
              Id
            </th>
            <th>
              Name
            </th>
            <th>
              Note
            </th>
          </tr>
          </thead>
          <tbody>
          {this.renderOrder()}
          </tbody>
        </Table>
      </Dashboard>
    )
  }
}