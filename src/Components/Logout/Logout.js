import React, {Component} from 'react';
import AuthenticationService from '../../Services/AuthenticationService';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {logoutAction} from '../../Redux/userDuck'

class Logout extends Component {
    render() {
        this.props.logoutAction() 
        return (
            <Redirect to="/login" />
        )
    }
}

function mapState(state){
    return {}
}

export default connect(mapState,{logoutAction})(Logout);
