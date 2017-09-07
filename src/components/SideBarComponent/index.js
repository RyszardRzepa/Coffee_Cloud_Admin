import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import User from 'grommet/components/icons/base/User';
import Edit from 'grommet/components/icons/base/Edit';

class NavSidebar extends Component {
  render() {
    return (
      <Sidebar colorIndex='neutral-1'>
        <Header pad='medium'
                justify='between'>
          <Title>
            Title
          </Title>
        </Header>
        <Box flex='grow'
             justify='start'>
          <Menu primary={true}>
            <Anchor path='/orders' className='active'>
              Orders
            </Anchor>
            <Anchor path='/settings' className='active'>
              Settings
            </Anchor>
          </Menu>
        </Box>
        <Footer pad='medium'>
          <Button icon={<User />} />
        </Footer>
      </Sidebar>
    );
  }
  
}

export default NavSidebar;