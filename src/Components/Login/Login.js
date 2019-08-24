import React, { Component } from 'react'
import AuthenticationService from '../../Services/AuthenticationService';
import {Button, Form} from 'semantic-ui-react';
import './../styles.css';
import {Link} from 'react-router-dom';

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


    loginClicked(e) {
        e.preventDefault();
        //in28minutes,dummy
        // if(this.state.username==='in28minutes' && this.state.password==='dummy'){
        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/courses`)
        //     //this.setState({showSuccessMessage:true})
        //     //this.setState({hasLoginFailed:false})
        // }
        // else {
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // }

        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                this.setState({ showSuccessMessage: true, hasLoginFailed: false})
                //this.props.history.push(`/alta`)
                
            }).catch(() => {
                this.setState({ showSuccessMessage: false, hasLoginFailed: true })
            })

        // AuthenticationService
        //     .executeJwtAuthenticationService(this.state.username, this.state.password)
        //     .then((response) => {
        //         AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
        //         this.props.history.push(`/courses`)
        //     }).catch(() => {
        //         this.setState({ showSuccessMessage: false })
        //         this.setState({ hasLoginFailed: true })
        //     })
        
    }
    
    render() {
        return (
            <Form className='login'>
                <Form.Input type='text' icon='user' iconPosition='left' label='Usuario' placeholder='Usuario' onChange={this.cambioUsuario}/>         
                <Form.Input type='password' icon='lock' iconPosition='left' label='Contraseña' placeholder='Contraseña'  onChange={this.cambioPass}/>  
                <Button content='Iniciar Sesión' primary onClick={this.loginClicked}/>              
                 
                {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
 
                {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                

            </Form>
            
        )
    }
}

export default LoginComponent