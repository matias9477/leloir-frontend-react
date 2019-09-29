import React from 'react'; 
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import LoginComponent from './Login';

const LoginForm = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='black' textAlign='center'>
         <div> 
         <Image src='/android-chrome-192x192.png' centered /> 
         </div>
        Ingrese a su cuenta
      </Header>
      <Segment stacked>
        <LoginComponent/>
      </Segment>
    </Grid.Column>
  </Grid>
)

export default LoginForm