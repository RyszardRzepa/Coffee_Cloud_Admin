import React, { Component } from 'react';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Anchor from 'grommet/components/Anchor';
import NavSidebar from "../SideBarComponent/index";

class Dashboard extends Component {
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

export default Dashboard;