import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getLoggedInUserAction } from "../../Redux/userDuck";


class MiPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loggedUser: [],
            id: '',
            username: '',
            name: '',
            lastName: '',
            role: '',
            date: '',
        });
    }

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
                        <Form.Field readOnly label='id' control='input' placeholder='id' value={this.props.loggedUser.id===undefined ? '' : this.props.loggedUser.id}/>
                        <Form.Field readOnly label='Usuario' control='input' placeholder='Usuario' value={this.props.loggedUser.username===undefined ? '' : this.props.loggedUser.username}/>
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