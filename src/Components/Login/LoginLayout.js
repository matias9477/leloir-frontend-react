import React from 'react'; 
import { Image, Segment } from 'semantic-ui-react';
import LoginComponent from './Login';
import './login.css'

const LoginForm = () => (
  <div className='loginLayout'>
    <Segment>
      <Image src='/android-chrome-192x192.png' centered size='small' />

      <LoginComponent/>
    </Segment>
  </div>
)

export default LoginForm