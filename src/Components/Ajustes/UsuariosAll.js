import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getAllUsers } from '../../Redux/userDuck';
import { getHumanDate } from '../../Services/MetodosPaciente';


class UsuariosAll extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            users: [],
        });
    }

    componentDidMount(){
        this.props.getAllUsers();
    }


    render() {
      console.log(this.props.allUsers)
        return (
            <div>
                <h1>Usuarios</h1>
                <div className="ui divider"/>
                <Table celled fixed singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Id</Table.HeaderCell>
                      <Table.HeaderCell>Fecha Alta</Table.HeaderCell>
                      <Table.HeaderCell>Nombre de Usuario</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {this.props.allUsers.map((user, index) =>
                      <Table.Row>
                        <Table.Cell>{user.id}</Table.Cell>
                        <Table.Cell>{getHumanDate(user.createdAt)}</Table.Cell>
                        <Table.Cell>{user.username}</Table.Cell>
                        <Table.Cell/>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
            </div>
        );
    }
}


const mapStateToProps = state => ({  
  allUsers: state.user.allUsers,
})

export default connect(mapStateToProps, { getAllUsers })(UsuariosAll)