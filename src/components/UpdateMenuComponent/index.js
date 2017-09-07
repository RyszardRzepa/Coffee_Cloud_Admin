import React, { Component } from 'react';
import Dashboard from '../DashboardComponent';

import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import FormField from 'grommet/components/FormField';
import CheckBox from 'grommet/components/CheckBox';
import TextInput from 'grommet/components/TextInput';

export default class UpdateMenu extends Component {
  render () {
    return (
      <Dashboard>
        <div style={{ marginLeft: 20, marginTop: 20 }}>
          <Heading>
            Update Menu
          </Heading>
          
          <div>
            <br/>
            <h3>Latte</h3>
            <Form style={{ display: 'flex'}}>
              <FormField label='Price '>
                <TextInput/>
              </FormField>
              <Button label='Submit' type='submit' primary={true} onSubmit={console.log}/>
            </Form>
          </div>
          
          <div>
            <br/>
            <h3>Mocha</h3>
            <Form style={{ display: 'flex' }}>
              <FormField label='Price '>
                <TextInput/>
              </FormField>
              <Button label='Submit' type='submit' primary={true} onSubmit={console.log}/>
            </Form>
          </div>
        </div>
      </Dashboard>
    )
  }
}