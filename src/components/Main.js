import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase';

import App from 'grommet/components/App';
import Login from './LoginComponent/index';
import Orders from './OrdersComponent';
import UpdateCafeInfo from './UpdateCafeInfo';
import UpdateMenu from './UpdateMenuComponent';

class Main extends Component {
  render () {
    return (
      <App centered={false}>
        <Router>
          <Switch>
            <Route exact={true} path='/' component={Login}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/update-cafe-info' component={UpdateCafeInfo}/>
            <Route path='/update-menu' component={UpdateMenu}/>
            <Route path='/*' component={Login}/>
          </Switch>
        </Router>
      </App>
    );
  }
}

export default (Main);