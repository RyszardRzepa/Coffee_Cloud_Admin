import React, { Component } from 'react';
import firebase from 'firebase';

import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import User from 'grommet/components/icons/base/User';
import UserSettings from 'grommet/components/icons/base/UserSettings';
import SVGIcon from 'grommet/components/SVGIcon';

class NavSidebar extends Component {
  state = {
    userEmail: ''
  };
  
  logOut = () => {
    return firebase.auth().signOut();
  };
  
  async componentDidMount () {
    let _this = this;
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        _this.setState({ userEmail: user.email });
      }
    })
  }
  
   render () {
    return (
      <Sidebar colorIndex='light-2'>
        <Header style={{ backgroundColor: 'rgb(0, 128, 202)' }} pad='medium' justify='between'>
          <Title>
            <Box full='horizontal' direction='row' align='center' justify='between'>
              <Paragraph style={{ color: '#fff', fontWeight: '600' }} margin='none' size='large'>
                {this.state.userEmail.substring(0, this.state.userEmail.indexOf('@'))}
              </Paragraph>
              <Anchor path='/settings'>
                <i className="material-icons">settings</i>
              </Anchor>
            </Box>
          </Title>
        </Header>
        <Box flex='grow'
             justify='start'>
          <Menu primary={true}>
            <Anchor style={{ color: '#000001' }} path='/orders'>
              Cafes List
            </Anchor>
            <Anchor style={{ color: '#000001' }} path='/filter-orders'>
              Filter Orders By Date Range
            </Anchor>
          </Menu>
        </Box>
        <Footer style={{ backgroundColor: '#ececec' }} pad='small'>
          <Button onClick={this.logOut} icon={<User/>}>
            Logout
          </Button>
        </Footer>
      </Sidebar>
    );
  }
  
}

export default NavSidebar;