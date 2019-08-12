import React, { Component } from 'react'
import AuthenticationService from '../../Services/AuthenticationService';
import {Button, Form} from 'semantic-ui-react';
import './styles.css';

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

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
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
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.setState({ showSuccessMessage: true})
                //this.props.history.push(`/alta`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
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
        this.alert();
    }
    
    alert(){
        if (this.state.showSuccessMessage){
            return alert("Logeo exitoso.");
        } else{
            return alert("Usted ha ingresado un Usuario o Contraseña Inválida. Intente nuevamente.");
        }
    }


    render() {
        return (
            <Form className='login'>
                <Form.Input type='text' icon='user' iconPosition='left' label='Usuario' placeholder='Usuario' onChange={this.handleChange}/>         
                <Form.Input icon='lock' iconPosition='left' label='Contraseña' placeholder='Contraseña'  onChange={this.handleChange}/>  
                <Button content='Iniciar Sesión' primary onClick={this.loginClicked}/>

            </Form>      
            
            
        )
    }
}

export default LoginComponent