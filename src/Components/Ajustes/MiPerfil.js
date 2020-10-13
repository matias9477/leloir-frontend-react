import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getLoggedInUserAction } from "../../Redux/userDuck";


class MiPerfil extends Component {
   
    componentDidMount(){
        this.props.getLoggedInUserAction();
    }


    render() {
        return (
            <div>
                <h1>Mi Perfil</h1>
                <div className="ui divider"/>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field readOnly label='Usuario' control='input' placeholder='Usuario' value={this.props.loggedUser.username===undefined ? '' : this.props.loggedUser.username}/>
                        <Form.Field readOnly label='Rol' control='input' placeholder='id' value={this.props.loggedUser.id===undefined ? '' : this.props.loggedUser.rol}/>
                    </Form.Group>   
                </Form>
            </div>
        );
    }
}


const mapStateToProps = state => ({  
    loggedUser: state.user.loggedInUser,
})

export default connect(mapStateToProps, { getLoggedInUserAction })(MiPerfil)