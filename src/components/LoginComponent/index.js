import React, { Component } from 'react';
import firebase from 'firebase';

import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import LoginForm from 'grommet/components/LoginForm';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';

class Login extends Component {
  state = {
    loginErr: '',
    isLoading: false
  };
  
  componentWillMount () {
    let app = this;
  
    return app.props.history.push('/orders')
  }
  
  onLogin = async (e) => {
    this.setState({ isLoading: true });
    firebase.auth().signInWithEmailAndPassword(e.username, e.password)
      .then(user => {
        this.setState({ isLoading: false, loginErr: '' })
        this.props.history.push('/orders')
      })
      .catch(err => this.setState({ isLoading: false, loginErr: 'Wrong email or password' }))
  };
  showSpinner = () => {
    if (this.state.isLoading) {
      return <Box align='center' justify='center' style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.2)' }}
                  full>
        <Spinning size='large' className='spinning'/>
      </Box>
    }
  };
  
  render () {
    return (
      <Split flex='left' separator={true}>
        <Article>
          <Section
            full={true}
            style={{ backgroundColor: 'rgb(0, 128, 202)' }}
            texture='url(img/splash.png)'
            pad='large'
            justify='center' align='center'>
            <Heading style={{ color: '#fff' }} tag='h1'><strong>Coffee Cloud</strong></Heading>
            <Paragraph style={{ color: '#fff' }} align='center' size='large'>
              Administrative dashboard for Coffee Bars
            </Paragraph>
          </Section>
        </Article>
        
        <Sidebar justify='between' align='center' pad='none' size='large'>
          <span/>
          <LoginForm
            align='start'
            title='Partners Café Admin'
            onSubmit={this.onLogin}
            errors={[this.state.loginErr]}
            usernameType='text'
          />
          <Footer direction='row' size='small'
                  pad={{ horizontal: 'medium', vertical: 'small' }}>
            <span className='secondary'>&copy; 2017 Coffee Cloud AS</span>
          </Footer>
          {this.showSpinner()}
        </Sidebar>
      </Split>
    );
  }
}

export default Login;