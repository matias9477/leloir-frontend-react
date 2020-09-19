import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getLoggedInUserAction } from "../../Redux/userDuck";


class UsuariosAll extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            users: [],
        });
    }

    componentDidMount(){
        this.props.getLoggedInUserAction();
    }


    render() {
        return (
            <div>
                <h1>Usuarios</h1>
                <div className="ui divider"/>
                <Table celled fixed singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                      <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Jill</Table.Cell>
                      <Table.Cell>Denied</Table.Cell>
                      <Table.Cell>Shorter description</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
            </div>
        );
    }
}


const mapStateToProps = state => ({  
    loggedUser: state.user.loggedInUser,
})

export default connect(mapStateToProps, { getLoggedInUserAction })(UsuariosAll)