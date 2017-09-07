import React, { Component } from 'react';
import firebase from 'firebase';
import {withRouter} from "react-router-dom";

import Article from 'grommet/components/Article';
import Split from 'grommet/components/Split';
import NavSidebar from "../SideBarComponent/index";

class Dashboard extends Component {
  componentWillMount () {
    let app = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        app.props.history.push('/')
      }
    });
  }
  
  render () {
    return (
      <Article>
        <Split flex='right' separator={false} showOnResponsive='both'>
          <NavSidebar/>
          {this.props.children}
        </Split>
      </Article>
    );
  }
}

export default withRouter(Dashboard);