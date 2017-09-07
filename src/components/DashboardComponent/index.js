import React, { Component } from 'react';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Split from 'grommet/components/Split';
import Paragraph from 'grommet/components/Paragraph';
import NavSidebar from "../SideBarComponent/index";

class Dashboard extends Component {
  render () {
    return (
      <Split flex='right'>
        <NavSidebar/>
        <Box colorIndex='neutral-2'
             justify='center'
             align='center'
             pad='medium'>
          Right Side
        </Box>
      </Split>
    );
  }
}

export default Dashboard;