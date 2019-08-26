import React, { Component } from 'react'
import AuthenticationService from '../../Services/AuthenticationService';
import {Button, Form} from 'semantic-ui-react';
import './../styles.css';
import {withRouter} from 'react-router-dom';

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            open: false,
        }

        this.cambioUsuario = this.cambioUsuario.bind(this);
        this.cambioPass = this.cambioPass.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    cambioUsuario(e){
        this.setState({
            username: e.target.value
        })
    }

    cambioPass(e){
        this.setState({
            password: e.target.value
        })
    }

    redirectLoginSuccessful(){
       this.props.history.push('/');
    }


    loginClicked(e) {
        e.preventDefault();
        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                this.setState({ showSuccessMessage: true, hasLoginFailed: false})
                this.redirectLoginSuccessful();

                
            }).catch(() => {
                this.setState({ showSuccessMessage: false, hasLoginFailed: true })
            })
    }
    
    render() {
        return (
            <Form className='login'>
                <Form.Input type='text' icon='user' iconPosition='left' label='Usuario' placeholder='Usuario' onChange={this.cambioUsuario}/>         
                <Form.Input type='password' icon='lock' iconPosition='left' label='Contraseña' placeholder='Contraseña'  onChange={this.cambioPass}/>  
                <Button content='Iniciar Sesión' primary onClick={this.loginClicked}/>              
            </Form>
            
        )
    }
}

export default withRouter(LoginComponent)