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

class Login extends Component {
  componentWillMount () {
    let app = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        app.props.history.push('/orders')
      }
    });
  }
  
  onLogin = (e) => {
    firebase.auth().signInWithEmailAndPassword(e.username, e.password)
  };
  
  render () {
    return (
      <Split flex='left' separator={true}>
        <Article>
          <Section
            full={true}
            colorIndex='brand'
            texture='url(img/splash.png)'
            pad='large'
            justify='center' align='center'>
            <Heading tag='h1'><strong>Coffee Cloud</strong></Heading>
            <Paragraph align='center' size='large'>
              Here You Can Manage Coffee Bars
            </Paragraph>
          </Section>
        </Article>
        
        <Sidebar justify='between' align='center' pad='none' size='large'>
          <span/>
          <LoginForm
            align='start'
            title='CC Admin'
            onSubmit={this.onLogin}
            errors={[]}
            usernameType='text'
          />
          <Footer direction='row' size='small'
                  pad={{ horizontal: 'medium', vertical: 'small' }}>
            <span className='secondary'>&copy; 2017 Coffee Cloud AS</span>
          </Footer>
        </Sidebar>
      </Split>
    );
  }
}

export default Login;