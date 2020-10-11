import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllUsers, deleteUser } from '../../Redux/userDuck';
import { Table, Button } from 'semantic-ui-react';
import { getHumanDate } from '../../Services/MetodosPaciente';


class UsuariosAll extends Component {
 
  componentDidMount(){
    this.props.getAllUsers();
  }

  render() {
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
            <Table.Row key={index}>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{getHumanDate(user.createdAt)}</Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>
                {user.rol==='ROLE_ADMIN' ? null :
                  <Button circular inverted icon='cancel' color='red' onClick={ () => this.props.deleteUser(user.username)}/>
                }              
                </Table.Cell>
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

export default connect(mapStateToProps, { getAllUsers, deleteUser })(UsuariosAll)