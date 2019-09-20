import React, { Component } from 'react'
import AuthenticationService from '../../Services/AuthenticationService';
import {Button, Form} from 'semantic-ui-react';
import './../styles.css';
import {withRouter} from 'react-router-dom';

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usernameOrEmail: '',
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
            usernameOrEmail: e.target.value
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
            .executeJwtAuthenticationService(this.state.usernameOrEmail, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.usernameOrEmail, response.data.token)
                this.props.history.push(`/`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
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