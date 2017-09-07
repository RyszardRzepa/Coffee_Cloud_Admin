import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from 'grommet/components/App';
import Login from './LoginComponent/index';
import Dashboard from './DashboardComponent/index';
import Orders from './OrdersComponent';
import Settings from './Settings';

class Main extends Component {
  render () {
    return (
      <App centered={false}>
        <Router>
          <Switch>
            <Route exact={true} path='/' component={Login}/>
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/orders' component={Orders}/>
            <Route path='/settings' component={Settings}/>
            <Route path='/*' component={Login}/>
          </Switch>
        </Router>
      </App>
    );
  }
}

export default (Main);