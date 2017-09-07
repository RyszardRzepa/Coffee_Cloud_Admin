import React, { Component } from 'react';

import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import User from 'grommet/components/icons/base/User';

class NavSidebar extends Component {
  render() {
    return (
      <Sidebar colorIndex='neutral-1'
               fixed={true}>
        <Header pad='medium'
                justify='between'>
          <Title>
            Title
          </Title>
        </Header>
        <Box flex='grow'
             justify='start'>
          <Menu primary={true}>
            <Anchor href='#'
                    className='active'>
              First
            </Anchor>
            <Anchor href='#'>
              Second
            </Anchor>
            <Anchor href='#'>
              Third
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