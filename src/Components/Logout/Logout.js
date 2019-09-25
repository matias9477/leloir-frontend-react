import React, {Component} from 'react';
import AuthenticationService from '../../Services/AuthenticationService';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()){
            AuthenticationService.logout();
            return (
                <Redirect to="/login" />
            );

        }
    }
}

Logout.propTypes = {};

export default Logout;
