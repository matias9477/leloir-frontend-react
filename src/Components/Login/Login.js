import React, {Component} from 'react';
import AuthenticationService from '../../Services/AuthenticationService';
import {Button, Form, Label, Icon} from 'semantic-ui-react';
import './../styles.css';
import {withRouter} from 'react-router-dom';

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            open: false,
        };

        this.cambioUsuario = this.cambioUsuario.bind(this);
        this.cambioPass = this.cambioPass.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    cambioUsuario(e) {
        this.setState({
            usernameOrEmail: e.target.value
        })
    }

    cambioPass(e) {
        this.setState({
            password: e.target.value
        })
    }

    redirectLoginSuccessful() {
        this.props.history.push('/');
    }


    loginClicked(e) {
        e.preventDefault();
        AuthenticationService
            .executeJwtAuthenticationService(this.state.usernameOrEmail, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.usernameOrEmail, response.data.tokenType, response.data.accessToken);
                this.props.history.push(`/`)
            }).catch(() => {
            this.setState({showSuccessMessage: false});
            this.setState({hasLoginFailed: true})
        })
    }

    render() {
        return (
            <Form className='login'>
                <Form.Input type='text' icon='user' iconPosition='left' label='Usuario' placeholder='Usuario'
                onChange={this.cambioUsuario}
                className={this.state.hasLoginFailed ? 'error' : null}
                />

                <Form.Input type='password' icon='lock' iconPosition='left' label='Contraseña' 
                placeholder='Contraseña'
                onChange={this.cambioPass}
                className={this.state.hasLoginFailed ? 'error' : null}
                />

                <Button content='Iniciar Sesión' primary onClick={this.loginClicked}/>
                
                {this.state.hasLoginFailed ?
                <Label style={errorStyle}>
                    <Icon name='warning circle' color='red' /> Usuario y/o contraseña errónea. Revise los datos ingresados.
                </Label> : null }
            </Form>

        )
    }
}

const errorStyle = {
    marginTop: '15px',
    backgroundColor: 'white',
  };

export default withRouter(LoginComponent)