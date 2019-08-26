import React from 'react'; 
import { Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import LoginComponent from './Login';

const LoginForm = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='black' textAlign='center'>
        <Image src='/android-chrome-192x192.png' /> Ingrese a su cuenta
      </Header>
      <Form size='large'>
        <Segment stacked>

        <LoginComponent/>

        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
)

export default LoginForm