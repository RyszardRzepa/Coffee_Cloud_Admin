import React, { Component } from 'react';
import firebase from 'firebase';

import Toast from 'grommet/components/Toast';
import Form from 'grommet/components/Form';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

import Dashboard from '../DashboardComponent';

export default class UpdateMenu extends Component {
  state = {
    email: '',
    password: '',
    updateMessage: '',
    toast: false
  };
  
  updatePassword = async () => {
    const user = firebase.auth().currentUser;
    this.setState({ isLoading: true });
    
    user.updatePassword(this.state.password)
      .then(() => this.setState({
        status: 'ok',
        updateMessage: 'Password updated to :' + this.state.password,
        isLoading: false,
        toast: true
      }))
      .catch((error) => this.setState({
        status: 'warning',
        updateMessage: error.message,
        isLoading: false,
        toast: true
      }));
    this.setState({ toast: false });
  };
  
  updateEmail = async () => {
    const user = firebase.auth().currentUser;
    this.setState({ isLoading: true });
    
    user.updateEmail(this.state.email)
      .then(() => {
        this.setState({
          status: 'ok',
          updateMessage: 'Email updated to: ' + this.state.email,
          isLoading: false,
          toast: true
        })
      })
      .catch((error) => {
        this.setState({
          status: 'warning',
          updateMessage: error.message,
          isLoading: false,
          toast: true
        })
      });
    this.setState({ toast: false });
  };
  
  showToast = () => {
    if (this.state.toast) {
      return <Toast onClose={console.log} status={this.state.status}>
        {this.state.updateMessage}
      </Toast>
    }
  };
  
  render () {
    return (
      <Dashboard>
        <Box pad='medium' justify='between'>
          <Heading>
            User Settings
          </Heading>
          
          <Box pad={{ vertical: 'medium' }}>
            <h3>Update Email</h3>
            <Form style={{ display: 'flex' }}>
              <FormField label='Email'>
                <TextInput onDOMChange={(e) => this.setState({ email: e.target.value })}/>
              </FormField>
              <Button label='Submit' primary={true} onClick={this.updateEmail}/>
            </Form>
          </Box>
          
          <Box pad={{ vertical: 'medium' }}>
            <h3>Update Password</h3>
            <Form style={{ display: 'flex' }}>
              <FormField label='Password must have min 6 characters '>
                <TextInput onDOMChange={(p) => this.setState({ password: p.target.value })}/>
              </FormField>
              <Button label='Submit' primary={true} onClick={this.updatePassword}/>
            </Form>
          </Box>
        </Box>
        {this.showToast()}
      </Dashboard>
    )
  }
}