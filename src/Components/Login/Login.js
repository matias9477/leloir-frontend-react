import React, { Component } from 'react';
import { Button, Form, Label, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import { loginAction } from '../../Redux/userDuck';
import './login.css';

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: '',
        };
    }

    cambioUsuario = (e) =>{
        this.setState({
            usernameOrEmail: e.target.value
        })
    }

    cambioPass = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    loginClicked = (e) => {
        e.preventDefault();
        const { usernameOrEmail, password } = this.state
        if(usernameOrEmail && password){
            this.props.loginAction(usernameOrEmail, password)
        }
    }


    render() {
        const { hasLoginFailed, fetching, loggedIn } = this.props
        return (
            <div>
                {fetching === true ?
                    <div className='login'>
                        <ClipLoader
                            size={60}
                            color={'black'}
                        />
                    </div>

                :
                    <Form className='login' >
                        <Form.Input type='text' icon='user' iconPosition='left' label='Usuario' placeholder='Usuario'
                        onChange={this.cambioUsuario}
                        className={hasLoginFailed ? 'error' : null}
                        />

                        <Form.Input type='password' icon='lock' iconPosition='left' label='Contraseña' 
                        placeholder='Contraseña'
                        onChange={this.cambioPass}
                        className={hasLoginFailed ? 'error' : null}
                        />
                        
                            <Button disabled={(this.state.password === '' || this.state.usernameOrEmail === '') ? true : false} exact='true' primary onClick={this.loginClicked}>
                                        Iniciar Sesión
                            </Button>
                        
                        {hasLoginFailed ?
                        <Label style={errorStyle}>
                            <Icon name='warning circle' color='red' /> Usuario y/o contraseña errónea. Revise los datos ingresados.
                        </Label> : null }
                    </Form>
                }
                {loggedIn ? <Redirect to="/"/> : null}
            </div>
        )
    }
}

const errorStyle = {
    marginTop: '15px',
    backgroundColor: 'white',
};


function mapStateToProps(state){
    return {
        fetching:state.user.fetching,
        loggedIn:state.user.loggedIn,
        hasLoginFailed:state.user.hasLoginFailed
    }
}


export default withRouter(connect(mapStateToProps,{loginAction})(LoginComponent))