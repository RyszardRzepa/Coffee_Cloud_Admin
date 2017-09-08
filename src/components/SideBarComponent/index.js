import React, { Component } from 'react';
import firebase from 'firebase';

import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import User from 'grommet/components/icons/base/User';

class NavSidebar extends Component {
  logOut = () => {
    return firebase.auth().signOut();
  };
  
  render() {
    return (
      <Sidebar colorIndex='neutral-1-a'>
        <Header colorIndex='neutral-1-a' pad='medium' justify='between' >
          <Title>
            Cafe Bar Name
          </Title>
        </Header>
        <Box flex='grow'
             justify='start'>
          <Menu primary={true}>
            <Anchor path='/orders'>
              Orders
            </Anchor>
            <Anchor path='/update-cafe-info'>
              Update Cafe Info
            </Anchor>
            <Anchor path='/update-menu'>
              Update Menu
            </Anchor>
          </Menu>
        </Box>
        <Footer pad='medium'>
          <Button onClick={this.logOut} icon={<User />} >
            Logout
          </Button>
        </Footer>
      </Sidebar>
    );
  }
  
}

export default NavSidebar;